import { describe, expect, it } from "vitest";
import { fetchUserSummary, listUserIds } from "./api.js";

describe("api", () => {
  it("returns a known user", () => {
    expect(fetchUserSummary(1)).toEqual({ id: 1, name: "Dat" });
  });

  it("returns another known user", () => {
    expect(fetchUserSummary(2).name).toBe("Hoang");
  });

  it("throws when the user is missing", () => {
    expect(() => fetchUserSummary(99)).toThrow(/not found/);
  });

  it("lists user ids", () => {
    expect(listUserIds()).toEqual([1, 2]);
  });
});
