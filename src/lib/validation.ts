import { z } from "zod";

export type PasswordStrengthLabel = "Weak" | "Fair" | "Strong" | "Very Strong";

export const PASSWORD_MIN_LENGTH = 10;
const REQUIRED_VARIETY_COUNT = 3;

// 4 character types beyond the length floor. Fair/Weak are variety-only feedback
// while still typing; Strong/Very Strong additionally require the length floor,
// so a short password can't read as "strong" just by mixing character types.
const VARIETY_PATTERNS = [/[A-Z]/, /[a-z]/, /[0-9]/, /[^A-Za-z0-9]/];

export function passwordVarietyCount(value: string): number {
  return VARIETY_PATTERNS.filter((pattern) => pattern.test(value)).length;
}

// 0-4, one per bar segment.
export function passwordBarLevel(value: string): number {
  const level = Math.min(passwordVarietyCount(value), VARIETY_PATTERNS.length);
  const meetsLength = value.length >= PASSWORD_MIN_LENGTH;
  return meetsLength ? level : Math.min(level, REQUIRED_VARIETY_COUNT - 1);
}

export function passwordStrengthLabel(value: string): PasswordStrengthLabel {
  const level = passwordBarLevel(value);
  if (level >= 4) return "Very Strong";
  if (level >= REQUIRED_VARIETY_COUNT) return "Strong";
  if (level >= 2) return "Fair";
  return "Weak";
}

export function isPasswordAcceptable(value: string): boolean {
  return passwordBarLevel(value) >= REQUIRED_VARIETY_COUNT;
}

export const signupSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().refine((v) => isPasswordAcceptable(v), {
    message: `Use at least ${PASSWORD_MIN_LENGTH} characters with a mix of uppercase, lowercase, numbers, and symbols`,
  }),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
