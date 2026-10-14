"use client";

import { useRef, useState, type FormEvent } from "react";
import { LoaderCircle, Send } from "lucide-react";
import { validateContactFields, type ContactFieldErrors, type ContactFields } from "@/lib/contact-validation";

const emptyFields: ContactFields = { name: "", email: "", subject: "", message: "" };

export function ContactForm() {
  const [fields, setFields] = useState(emptyFields);
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const startedAt = useRef<number | null>(null);

  function startFormTimer() {
    startedAt.current ??= Date.now();
  }

  function updateField(field: keyof ContactFields, value: string) {
    setFields((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setFeedback(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const result = validateContactFields(fields);
    setErrors(result.errors);
    setFeedback(null);
    if (Object.keys(result.errors).length > 0) {
      const firstInvalid = Object.keys(result.errors)[0];
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...result.fields, website: "", startedAt: startedAt.current ?? Date.now() }),
      });
      const data: unknown = await response.json().catch(() => null);
      const payload = data && typeof data === "object" ? data as {
        error?: unknown;
        fieldErrors?: ContactFieldErrors;
      } : {};

      if (!response.ok) {
        if (payload.fieldErrors) setErrors(payload.fieldErrors);
        setFeedback({
          type: "error",
          message: typeof payload.error === "string"
            ? payload.error
            : "Your message could not be sent. Please try again or email me directly.",
        });
        return;
      }

      setFields(emptyFields);
      setErrors({});
      setFeedback({ type: "success", message: "Your message was accepted by the email provider. Thank you for reaching out." });
    } catch {
      setFeedback({ type: "error", message: "We couldn’t connect to the contact service. Your message is still here; please try again." });
    } finally {
      setIsSubmitting(false);
    }
  }

  function fieldDescription(field: keyof ContactFields) {
    const ids = [errors[field] ? `contact-${field}-error` : "", field === "message" ? "contact-message-hint" : ""]
      .filter(Boolean)
      .join(" ");
    return ids || undefined;
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} onFocusCapture={startFormTimer} onChangeCapture={startFormTimer} onPointerDownCapture={startFormTimer} noValidate>
      <div className="contact-form-grid">
        <div className="contact-field">
          <label htmlFor="contact-name">Your name <span aria-hidden="true">*</span></label>
          <input id="contact-name" name="name" autoComplete="name" value={fields.name} onChange={(event) => updateField("name", event.target.value)} maxLength={100} required aria-invalid={Boolean(errors.name)} aria-describedby={fieldDescription("name")} />
          {errors.name && <p className="contact-field-error" id="contact-name-error">{errors.name}</p>}
        </div>
        <div className="contact-field">
          <label htmlFor="contact-email">Your email <span aria-hidden="true">*</span></label>
          <input id="contact-email" name="email" type="email" autoComplete="email" inputMode="email" value={fields.email} onChange={(event) => updateField("email", event.target.value)} maxLength={254} required aria-invalid={Boolean(errors.email)} aria-describedby={fieldDescription("email")} />
          {errors.email && <p className="contact-field-error" id="contact-email-error">{errors.email}</p>}
        </div>
        <div className="contact-field contact-field-wide">
          <label htmlFor="contact-subject">Subject <span className="contact-optional">(optional)</span></label>
          <input id="contact-subject" name="subject" value={fields.subject} onChange={(event) => updateField("subject", event.target.value)} maxLength={120} aria-invalid={Boolean(errors.subject)} aria-describedby={fieldDescription("subject")} />
          {errors.subject && <p className="contact-field-error" id="contact-subject-error">{errors.subject}</p>}
        </div>
        <div className="contact-field contact-field-wide">
          <label htmlFor="contact-message">Message <span aria-hidden="true">*</span></label>
          <textarea id="contact-message" name="message" value={fields.message} onChange={(event) => updateField("message", event.target.value)} minLength={20} maxLength={4000} rows={6} required aria-invalid={Boolean(errors.message)} aria-describedby={fieldDescription("message")} />
          <p className="contact-field-hint" id="contact-message-hint">Share a little context (20–4,000 characters).</p>
          {errors.message && <p className="contact-field-error" id="contact-message-error">{errors.message}</p>}
        </div>
      </div>

      <div className="contact-honeypot" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field blank</label>
        <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" value="" readOnly />
      </div>
      {feedback && <p className={`contact-feedback contact-feedback-${feedback.type}`} role={feedback.type === "error" ? "alert" : "status"} aria-live={feedback.type === "error" ? "assertive" : "polite"}>{feedback.message}</p>}
      <button className="button button-primary contact-submit" type="submit" disabled={isSubmitting}>
        {isSubmitting ? <><LoaderCircle size={17} className="contact-spinner" aria-hidden="true" /> Sending…</> : <><Send size={16} aria-hidden="true" /> Send Message</>}
      </button>
    </form>
  );
}
