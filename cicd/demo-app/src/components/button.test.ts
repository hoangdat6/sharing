import { describe, expect, it } from "vitest";
import { buttonLabel, isDisabled } from "./button.js";

describe("Button", () => {
  it("shows Continue for the primary variant", () => {
    expect(buttonLabel("primary", false)).toBe("Continue");
  });

  it("shows Cancel for the ghost variant", () => {
    expect(buttonLabel("ghost", false)).toBe("Cancel");
  });

  it("shows Loading when busy", () => {
    expect(buttonLabel("primary", true)).toBe("Loading…");
  });

  it("disables the button while loading or explicitly disabled", () => {
    expect(isDisabled(true, false)).toBe(true);
    expect(isDisabled(false, true)).toBe(true);
    expect(isDisabled(false, false)).toBe(false);
  });
});
