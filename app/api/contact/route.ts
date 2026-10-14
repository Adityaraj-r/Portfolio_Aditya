import { createHmac } from "node:crypto";
import { NextResponse } from "next/server";
import { validateContactFields } from "@/lib/contact-validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const bodyLimit = 10_000;
const rateLimit = 5;
const rateWindowSeconds = 10 * 60;
const rateLimitScript = `
  local count = redis.call("INCR", KEYS[1])
  if count == 1 then redis.call("EXPIRE", KEYS[1], ARGV[1]) end
  return count
`;

function json(body: Record<string, unknown>, status = 200, headers?: HeadersInit) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

function getClientIp(request: Request) {
  // Vercel overwrites this header at the edge to prevent client IP spoofing.
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function hasSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

async function readBoundedBody(request: Request, limit: number) {
  if (!request.body) return "";
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > limit) {
      await reader.cancel();
      throw new RangeError("Request body exceeded the allowed size.");
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(bytes);
}

async function isRateLimited(ip: string) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new Error("Rate limiting is not configured.");

  const fingerprint = createHmac("sha256", token).update(ip).digest("hex");
  const key = `portfolio:contact:${fingerprint}`;
  const endpoint = new URL(url);
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(["EVAL", rateLimitScript, 1, key, rateWindowSeconds]),
    signal: AbortSignal.timeout(3_000),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Rate limiting is unavailable.");
  const result: unknown = await response.json().then((data: unknown) => {
    if (!data || typeof data !== "object" || !("result" in data)) throw new Error("Invalid rate-limit response.");
    return (data as { result: unknown }).result;
  });
  if (typeof result !== "number" || !Number.isFinite(result)) throw new Error("Invalid rate-limit response.");
  return result > rateLimit;
}

export async function POST(request: Request) {
  if (!hasSameOrigin(request)) {
    return json({ error: "This form request could not be verified. Refresh the page and try again." }, 403);
  }

  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return json({ error: "This form only accepts JSON submissions." }, 415);
  }
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > bodyLimit) return json({ error: "Your message is too large. Shorten it and try again." }, 413);

  let rawBody: string;
  try {
    rawBody = await readBoundedBody(request, bodyLimit);
  } catch (error) {
    if (error instanceof RangeError) return json({ error: "Your message is too large. Shorten it and try again." }, 413);
    return json({ error: "We couldn’t read your message. Please try again." }, 400);
  }

  let input: unknown;
  try {
    input = JSON.parse(rawBody);
  } catch {
    return json({ error: "The form data wasn’t valid. Please check it and try again." }, 400);
  }
  if (!input || typeof input !== "object") return json({ error: "The form data wasn’t valid." }, 400);

  const payload = input as Record<string, unknown>;
  if (typeof payload.website === "string" && payload.website.trim()) {
    return json({ error: "This submission could not be accepted. Please try again." }, 400);
  }
  const startedAt = Number(payload.startedAt);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 2_500 || startedAt > Date.now() + 60_000) {
    return json({ error: "Please take a moment to review your message, then submit it again." }, 400);
  }

  const { fields, errors } = validateContactFields(payload);
  if (Object.keys(errors).length > 0) return json({ error: "Please correct the highlighted fields.", fieldErrors: errors }, 400);

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_TO_EMAIL;
  const sender = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !recipient || !sender || !process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return json({ error: "The contact service isn’t configured yet. Please email me directly instead." }, 503);
  }

  let limited: boolean;
  try {
    limited = await isRateLimited(getClientIp(request));
  } catch {
    return json({ error: "The contact service is temporarily unavailable. Please try again later or email me directly." }, 503);
  }
  if (limited) {
    return json({ error: "Too many messages were sent from this connection. Please wait a few minutes and try again." }, 429, { "Retry-After": String(rateWindowSeconds) });
  }

  const email = fields.email;
  const displaySubject = fields.subject || "Portfolio contact";
  const text = [
    `Name: ${fields.name}`,
    `Email: ${email}`,
    `Subject: ${displaySubject}`,
    "",
    fields.message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: email,
        subject: `Portfolio inquiry: ${displaySubject}`,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (!response.ok) return json({ error: "The email provider couldn’t accept your message. Please try again later or email me directly." }, 502);
    const result: unknown = await response.json();
    if (!result || typeof result !== "object" || !("id" in result) || typeof (result as { id: unknown }).id !== "string") {
      return json({ error: "The email provider returned an unexpected response. Please try again later or email me directly." }, 502);
    }
    return json({ accepted: true });
  } catch {
    return json({ error: "We couldn’t reach the email provider. Your message is still here; please try again." }, 502);
  }
}
