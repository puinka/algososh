import { swap } from "../../common/utils";
import { ElementStates } from "../../types/element-states";
import { TLetter } from "../../types/types";

export const convertStringToLetters = (str: string): TLetter[] => {
  const arr: TLetter[] = [];
  str
    .split("")
    .forEach((item) => arr.push({ char: item, state: ElementStates.Default }));
  return arr;
};

export const reverseString = (str: string) => {
  const arr = str.split("");

  const mid = Math.floor(arr.length / 2);
  for (let i = 0; i < mid; i++) {
    swap(arr, i, arr.length - i - 1);
  }
  return arr.join("");
};
