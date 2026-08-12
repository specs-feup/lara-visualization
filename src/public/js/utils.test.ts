import { countChar } from "./utils.js";

describe("countChar", () => {
  it("counts every occurrence of the requested character", () => {
    expect(countChar("abracadabra", "a")).toBe(5);
  });

  it("returns zero when the character is absent", () => {
    expect(countChar("visualization", "x")).toBe(0);
  });

  it("handles Unicode characters", () => {
    expect(countChar("a✨b✨c", "✨")).toBe(2);
  });
});
