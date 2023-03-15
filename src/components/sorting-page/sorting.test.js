import { bubbleSort, selectSort } from "./utils";

describe("should return sorted array", () => {
  it("empty array with select sort", () => {
    const input = [];
    const expected = [];
    expect(selectSort(input)).toEqual(expected);
  });

  it("one element array with select sort", () => {
    const input = [5];
    const expected = [5];
    expect(selectSort(input)).toEqual(expected);
  });

  it("several elements array with select sort", () => {
    const input = [5, 8, 1, 2, 6];
    const expected = [1, 2, 5, 6, 8];
    expect(selectSort(input)).toEqual(expected);
  });

  it("empty array with bubble sort", () => {
    const input = [];
    const expected = [];
    expect(bubbleSort(input)).toEqual(expected);
  });

  it("one element array with bubble sort", () => {
    const input = [5];
    const expected = [5];
    expect(bubbleSort(input)).toEqual(expected);
  });

  it("several elements array with bubble sort", () => {
    const input = [5, 8, 1, 2, 6];
    const expected = [1, 2, 5, 6, 8];
    expect(bubbleSort(input)).toEqual(expected);
  });
});
