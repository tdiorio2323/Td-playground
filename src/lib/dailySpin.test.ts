import { describe, expect, it, vi, afterEach } from "vitest";
import { msUntilUtcMidnight, parseSpinResult, formatSpinResult } from "./dailySpin";

afterEach(() => {
  vi.useRealTimers();
});

describe("msUntilUtcMidnight", () => {
  it("returns milliseconds remaining until the next UTC midnight", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-01-01T12:00:00Z"));
    expect(msUntilUtcMidnight()).toBe(12 * 60 * 60 * 1000);
  });

  it("handles times just before midnight", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-01-01T23:59:30Z"));
    expect(msUntilUtcMidnight()).toBe(30 * 1000);
  });
});

describe("result parsing", () => {
  it("splits tokens and removes whitespace", () => {
    const parsed = parseSpinResult(" layouts | route-two |   creator-tools  ");
    expect(parsed).toEqual(["layouts", "route-two", "creator-tools"]);
  });

  it("ignores empty segments", () => {
    const parsed = parseSpinResult("first||third|");
    expect(parsed).toEqual(["first", "third"]);
  });

  it("formats tokens using the shared formatter", () => {
    const formatted = formatSpinResult(["alpha", "beta", "gamma"]);
    expect(formatted).toBe("alpha|beta|gamma");
  });
});
