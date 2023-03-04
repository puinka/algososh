import { ElementStates } from "./element-states";

export type TLetter = {
  char?: string;
  state: ElementStates;
  head?: string | null;
  tail?: string | null;
};

export type TElement = {
  value: number;
  state: ElementStates;
};
