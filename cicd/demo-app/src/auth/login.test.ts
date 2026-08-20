import { describe, expect, it } from "vitest";
import { login } from "./login.js";

describe("login", () => {
  it("accepts a valid email and password", () => {
    const result = login({ email: "dev@kaopiz.com", password: "secret123" });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.token).toContain("dev@kaopiz.com");
  });

  it("rejects a missing email", () => {
    expect(login({ password: "secret123" }).ok).toBe(false);
  });

  it("rejects an email without @", () => {
    const result = login({ email: "not-an-email", password: "secret123" });
    expect(result).toEqual({ ok: false, error: "invalid_email" });
  });

  it("rejects a short password", () => {
    const result = login({ email: "dev@kaopiz.com", password: "123" });
    expect(result).toEqual({ ok: false, error: "invalid_password" });
  });

  it("rejects a blank password", () => {
    const result = login({ email: "dev@kaopiz.com", password: "   " });
    expect(result).toEqual({ ok: false, error: "invalid_password" });
  });
});
