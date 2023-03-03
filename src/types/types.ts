import { ElementStates } from "./element-states";

export type TLetter = {
  char: string;
  state: ElementStates;
};

export type TElement = {
  value: number;
  state: ElementStates;
};
