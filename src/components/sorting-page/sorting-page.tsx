import React, { useState } from "react";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Direction } from "../../types/direction";

import style from "./sorting.module.css";
import { Column } from "../ui/column/column";
import { TElement } from "../../types/types";
import { ElementStates } from "../../types/element-states";
import { delay, swap } from "../../common/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

const MIN_LENGTH = 3;
const MAX_LENGTH = 17;
const MIN_VALUE = 0;
const MAX_VALUE = 100;

const generateRandom = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const SortingPage: React.FC = () => {
  const [isBubble, setIsBubble] = useState(false);
  const [elements, setElements] = useState<TElement[]>([]);
  const [isLoadingAsc, setIsLoadingAsc] = useState<boolean>(false);
  const [isLoadingDsc, setIsLoadingDsc] = useState<boolean>(false);

  const generateArray = (): void => {
    const length = generateRandom(MIN_LENGTH, MAX_LENGTH);
    const arr: TElement[] = [];
    for (let i = 0; i <= length; i++) {
      const value = generateRandom(MIN_VALUE, MAX_VALUE);
      arr.push({ value: value, state: ElementStates.Default });
    }
    return setElements(arr);
  };

  const renderStep = async (arr: TElement[]): Promise<void> => {
    setElements([...arr]);
    await delay(SHORT_DELAY_IN_MS);
  };

  const selectionSorting = async (arr: TElement[], direction: Direction) => {
    for (let i = 0; i < arr.length - 1; i++) {
      let swapInd = i;
      arr[swapInd].state = ElementStates.Changing;

      for (let j = i + 1; j < arr.length; j++) {
        arr[j].state = ElementStates.Changing;
        await renderStep(arr);

        if (
          direction === Direction.Ascending
            ? arr[swapInd].value > arr[j].value
            : arr[swapInd].value < arr[j].value
        ) {
          swapInd = j;
          arr[swapInd].state =
            i === swapInd ? ElementStates.Changing : ElementStates.Default;
        }

        if (j !== swapInd) {
          arr[j].state = ElementStates.Default;
        }
      }
      if (i === swapInd) {
        arr[i].state = ElementStates.Modified;
      } else {
        swap(arr, swapInd, i);
        arr[i].state = ElementStates.Modified;
        arr[swapInd].state = ElementStates.Default;
      }
    }
    arr.forEach((item) => (item.state = ElementStates.Modified));
    await renderStep(arr);
  };

  const bubbleSorting = async (arr: TElement[], direction: Direction) => {
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        arr[j].state = ElementStates.Changing;
        arr[j + 1].state = ElementStates.Changing;

        await renderStep(arr);

        if (
          direction === Direction.Ascending
            ? arr[j].value > arr[j + 1].value
            : arr[j].value < arr[j + 1].value
        ) {
          swap(arr, j, j + 1);
          await renderStep(arr);
        }
        arr[j].state = ElementStates.Default;
        arr[j + 1].state = ElementStates.Default;

        if (j === arr.length - i - 2) {
          arr[j + 1].state = ElementStates.Modified;
        }
      }
    }
    arr.forEach((item) => (item.state = ElementStates.Modified));
    await renderStep(arr);
  };

  const handleAscendingSort = async (): Promise<void> => {
    setIsLoadingAsc(true);
    if (isBubble) {
      await bubbleSorting(elements, Direction.Ascending);
    } else {
      await selectionSorting(elements, Direction.Ascending);
    }

    setIsLoadingAsc(false);
  };

  const handleDescendingSort = async (): Promise<void> => {
    setIsLoadingDsc(true);
    if (isBubble) {
      await bubbleSorting(elements, Direction.Descending);
    } else {
      await selectionSorting(elements, Direction.Descending);
    }
    setIsLoadingDsc(false);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={style.inputsContainer}>
        <form className={style.form}>
          <div className={style.sorting}>
            <RadioInput
              label="Выбор"
              checked={!isBubble}
              name={"sorting"}
              onChange={() => {
                setIsBubble(false);
              }}
            />

            <RadioInput
              label="Пузырёк"
              checked={isBubble}
              name={"sorting"}
              onChange={() => {
                setIsBubble(true);
              }}
            />
          </div>
          <div className={style.direction}>
            <Button
              text="По возрастанию"
              sorting={Direction.Ascending}
              type={"button"}
              onClick={handleAscendingSort}
              isLoader={isLoadingAsc}
              disabled={isLoadingDsc || elements.length < 1}
            />
            <Button
              text="По убыванию"
              sorting={Direction.Descending}
              type={"button"}
              onClick={handleDescendingSort}
              isLoader={isLoadingDsc}
              disabled={isLoadingAsc || elements.length < 1}
            />
          </div>
        </form>
        <Button
          text="Новый массив"
          type="button"
          onClick={generateArray}
          disabled={isLoadingAsc || isLoadingDsc}
        />
      </div>
      <ul className={style.arrayContainer}>
        {elements &&
          elements.map((element, index) => (
            <li key={index}>
              <Column index={element.value} state={element.state} />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
