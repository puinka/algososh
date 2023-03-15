import { reverseString } from "./utils";

describe("should return reversed String", () => {
  it("of even amount of symbols", () => {
    const input = "hello";
    const expected = "olleh";
    expect(reverseString(input)).toBe(expected);
  });

  it("of odd amount of symbols", () => {
    const input = "luck";
    const expected = "kcul";
    expect(reverseString(input)).toBe(expected);
  });

  it("of a single symbol", () => {
    const input = "a";
    const expected = "a";
    expect(reverseString(input)).toBe(expected);
  });

  it("of no symbols", () => {
    const input = "";
    const expected = "";
    expect(reverseString(input)).toBe(expected);
  });
});
