import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import style from "./string.module.css";
import { delay, renderStep, swap } from "../../common/utils";
import { TLetter } from "../../types/types";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";
import { convertStringToLetters } from "./utils";

export const StringComponent: React.FC = () => {
  const MAX_LENGTH = 11;

  const [stringInput, setStringInput] = useState<string>("");
  const [letters, setLetters] = useState<TLetter[]>([]);
  const [isLoader, setIsLoader] = useState<boolean>(false);

  const handleInputChange = (evt: React.FormEvent<HTMLInputElement>): void => {
    setStringInput(evt.currentTarget.value);
  };

  const handleReverseClick = async (
    evt: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    evt.preventDefault();
    setStringInput("");
    setIsLoader(true);

    await renderReversedString(stringInput);
    await delay(SHORT_DELAY_IN_MS);
    setIsLoader(false);
  };

  const renderReversedString = async (str: string) => {
    const arr = convertStringToLetters(str);
    await renderStep(arr, DELAY_IN_MS, setLetters);

    const mid = Math.floor(arr.length / 2);
    for (let i = 0; i < mid; i++) {
      arr[i].state = ElementStates.Changing;
      arr[arr.length - i - 1].state = ElementStates.Changing;

      await renderStep(arr, DELAY_IN_MS, setLetters);

      swap(arr, i, arr.length - i - 1);

      arr[i].state = ElementStates.Modified;
      arr[arr.length - i - 1].state = ElementStates.Modified;

      await renderStep(arr, DELAY_IN_MS, setLetters);
    }
    if (arr.length % 2 !== 0) {
      arr[mid].state = ElementStates.Modified;
      setLetters([...arr]);
    }
  };

  return (
    <SolutionLayout title="Строка">
      <form className={style.inputsContainer} onSubmit={handleReverseClick}>
        <Input
          maxLength={MAX_LENGTH}
          isLimitText
          value={stringInput}
          onChange={handleInputChange}
        />
        <Button
          text="Развернуть"
          type="submit"
          disabled={!stringInput}
          isLoader={isLoader}
        />
      </form>
      <ul className={style.circlesContainer}>
        {letters &&
          letters.map((letter, index) => (
            <li key={index}>
              <Circle letter={letter.char} state={letter.state} />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
