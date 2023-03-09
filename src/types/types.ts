import { ElementStates } from "./element-states";

export type TLetter = {
  char?: string;
  state: ElementStates;
  head?: string | null;
  tail?: string | null;
  extraCircle?: TLetter | null;
  isAdding?: boolean;
  isDeleting?: boolean;
};

export type TElement = {
  value: number;
  state: ElementStates;
};

export type TButtonStates = {
  isAddingToHead: boolean;
  isAddingToTail: boolean;
  isDeletingFromHead: boolean;
  isDeletingFromTail: boolean;
  isAddingByIdex: boolean;
  isDeletingByIdex: boolean;
};
