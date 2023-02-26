import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import style from "./fibonacci.module.css";
import { Circle } from "../ui/circle/circle";
import { delay } from "../../common/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
  const max = 19;

  const [numberInput, setNumberInput] = useState<number>(0);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [fibonacciArr, setFibonacciArr] = useState<number[]>([]);

  const handleInputChange = (evt: React.FormEvent<HTMLInputElement>): void => {
    setNumberInput(Number(evt.currentTarget.value));
  };

  const handleCalculateClick = async (
    evt: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    evt.preventDefault();
    setIsLoader(true);

    const arr = [];

    for (let i = 0; i <= numberInput; i++) {
      arr.push(fibonacci(i));
      setFibonacciArr([...arr]);
      await delay(SHORT_DELAY_IN_MS);
    }

    setIsLoader(false);
  };

  const fibonacci = (num: number): number => {
    if (num === 0) return 1;
    if (num === 1) return 1;
    return fibonacci(num - 1) + fibonacci(num - 2);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={style.inputsContainer} onSubmit={handleCalculateClick}>
        <Input
          type="number"
          max={max}
          isLimitText
          onChange={handleInputChange}
          placeholder={"Введите число"}
        />
        <Button
          text="Рассчитать"
          type="submit"
          disabled={!numberInput || numberInput > max}
          isLoader={isLoader}
        />
      </form>
      <ul className={style.circlesContainer}>
        {fibonacciArr &&
          fibonacciArr.map((number, index) => (
            <li key={index}>
              <Circle letter={`${number}`} />
              <p className={style.index}>{index}</p>
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
