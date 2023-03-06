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

const alphabet = "abcdefghijklmnopqrstuvwxyz1234567890";
export const randomCharacter = () =>
  alphabet[Math.floor(Math.random() * alphabet.length)];

export const randomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
