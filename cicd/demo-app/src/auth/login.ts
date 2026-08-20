import { isNonEmptyString } from "../utils/validator.js";

export type LoginInput = {
  email?: unknown;
  password?: unknown;
};

export type LoginResult =
  | { ok: true; token: string }
  | { ok: false; error: string };

export function login(input: LoginInput): LoginResult {
  if (!isNonEmptyString(input.email) || !input.email.includes("@")) {
    return { ok: false, error: "invalid_email" };
  }
  if (!isNonEmptyString(input.password) || input.password.length < 8) {
    return { ok: false, error: "invalid_password" };
  }
  return { ok: true, token: `session-${input.email}` };
}
