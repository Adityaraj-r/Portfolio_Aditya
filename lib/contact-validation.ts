export type ContactFields = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactFieldErrors = Partial<Record<keyof ContactFields, string>>;

export function validateContactFields(value: unknown): {
  fields: ContactFields;
  errors: ContactFieldErrors;
} {
  const input = value && typeof value === "object" ? value as Record<string, unknown> : {};
  const fields: ContactFields = {
    name: typeof input.name === "string" ? input.name.trim() : "",
    email: typeof input.email === "string" ? input.email.trim() : "",
    subject: typeof input.subject === "string" ? input.subject.trim().replace(/[\r\n]+/g, " ") : "",
    message: typeof input.message === "string" ? input.message.trim() : "",
  };
  const errors: ContactFieldErrors = {};

  if (fields.name.length < 2) errors.name = "Enter your name (at least 2 characters).";
  else if (fields.name.length > 100) errors.name = "Name must be 100 characters or fewer.";

  if (!fields.email) errors.email = "Enter your email address.";
  else if (fields.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (fields.subject.length > 120) errors.subject = "Subject must be 120 characters or fewer.";

  if (fields.message.length < 20) errors.message = "Message must be at least 20 characters.";
  else if (fields.message.length > 4000) errors.message = "Message must be 4,000 characters or fewer.";

  return { fields, errors };
}
