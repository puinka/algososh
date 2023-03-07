import { SHORT_DELAY_IN_MS, DELAY_IN_MS } from "../constants/delays";

export const delay = (ms: number): Promise<void> =>
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

const alphabet = "abcdefghijklmnopqrstuvwxyz1234567890";
export const randomCharacter = () =>
  alphabet[Math.floor(Math.random() * alphabet.length)];

export const randomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const renderStep = async <T>(
  arr: T[],
  ms: number = SHORT_DELAY_IN_MS,
  setter: (arr: T[]) => void
): Promise<void> => {
  setter([...arr]);
  await delay(ms);
};
