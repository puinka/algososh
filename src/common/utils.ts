import { TElement } from "../types/types";

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const swap = <T>(
  arr: T[],
  firstIndex: number,
  secondIndex: number
): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};
