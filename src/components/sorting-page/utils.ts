import { swap } from "../../common/utils";

export const selectSort = (arr: number[]) => {
  for (let i = 0; i < arr.length - 1; i++) {
    let swapInd = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[swapInd] > arr[j]) {
        swapInd = j;
      }
    }
    if (swapInd !== i) {
      swap(arr, i, swapInd);
    }
  }
  return arr;
};

export const bubbleSort = (arr: number[]) => {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }
  return arr;
};
