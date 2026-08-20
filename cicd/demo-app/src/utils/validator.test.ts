import { describe, expect, it } from "vitest";
import { clamp, isEmail, isNonEmptyString } from "./validator.js";

describe("validator", () => {
  it("accepts a non-empty string", () => {
    expect(isNonEmptyString("ok")).toBe(true);
  });

  it("rejects blank strings", () => {
    expect(isNonEmptyString("   ")).toBe(false);
  });

  it("rejects non-strings", () => {
    expect(isNonEmptyString(12)).toBe(false);
  });

  it("validates email shape", () => {
    expect(isEmail("a@b.com")).toBe(true);
    expect(isEmail("a@b")).toBe(false);
  });

  it("clamps numbers into range", () => {
    expect(clamp(15, 0, 10)).toBe(10);
    expect(clamp(-2, 0, 10)).toBe(0);
    expect(clamp(5, 0, 10)).toBe(5);
  });
});
