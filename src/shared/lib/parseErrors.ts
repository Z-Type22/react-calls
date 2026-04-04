import axios from "axios";

const FORM_FIELDS = [
  "username",
  "email",
  "password1",
  "password2",
  "gender",
] as const;

type FormField = typeof FORM_FIELDS[number];

function isFormField(value: unknown): value is FormField {
  return typeof value === "string" && FORM_FIELDS.includes(value as FormField);
}

export type FieldErrors = Partial<Record<FormField, string>>;

export function parseErrors(error: unknown): FieldErrors {
  if (!axios.isAxiosError(error)) return {};
  if (error.response?.status !== 422) return {};

  const detail = error.response.data?.detail;
  if (!Array.isArray(detail)) return {};

  const fieldErrors: FieldErrors = {};

  for (const item of detail) {
    const field = item.loc?.[1];

    if (isFormField(field)) {
      fieldErrors[field] = item.msg;
    }
  }

  return fieldErrors;
}
