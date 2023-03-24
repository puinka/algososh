import React, { useEffect, useMemo, useState } from "react";
import { delay } from "../../common/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { TLetter } from "../../types/types";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./queue.module.css";
import Queue from "./utils";

export const QueuePage: React.FC = () => {
  const QUEUE_SIZE = 7;

  const initialElements: TLetter[] = Array.from({ length: QUEUE_SIZE }, () => ({
    char: "",
    state: ElementStates.Default,
  }));

  const queue = useMemo(() => new Queue<string>(QUEUE_SIZE), []);

  const [stringInput, setStringInput] = useState<string>("");
  const [elements, setElements] = useState<TLetter[]>(initialElements);
  const [isPushing, setIsPushing] = useState<boolean>(false);
  const [isPopping, setIsPopping] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  useEffect(() => {
    setIsEmpty(elements.every((element) => element.char === ""));
  });

  const handleInputChange = (evt: React.FormEvent<HTMLInputElement>): void => {
    setStringInput(evt.currentTarget.value);
  };

  const handleAdd = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setStringInput("");
    setIsPushing(true);

    const head = queue.getHead();
    const tail = queue.getTail();
    queue.enqueue(stringInput);

    elements[head].head = "head";

    if (tail > 0) {
      elements[tail - 1].tail = "";
    } else {
      elements[tail].tail = "";
    }

    elements[tail].state = ElementStates.Changing;
    elements[tail].char = stringInput;
    await delay(SHORT_DELAY_IN_MS);

    elements[tail].state = ElementStates.Default;

    elements[tail].tail = "tail";
    setIsPushing(false);
  };

  const handleRemove = async () => {
    setIsPopping(true);
    setStringInput("");

    let head = queue.getHead();
    const tail = queue.getTail();

    if (head === tail - 1) {
      handleClearAll();
    } else {
      queue.dequeue();
      head = queue.getHead();
      if (head > 0) {
        elements[head - 1].state = ElementStates.Changing;
        await delay(SHORT_DELAY_IN_MS);
        elements[head - 1].head = "";
        elements[head - 1].char = "";
      }
      elements[head].head = "head";
      elements[head - 1].state = ElementStates.Default;
      setElements([...elements]);
    }

    setIsPopping(false);
  };

  const handleClearAll = () => {
    queue.clear();
    setElements([...initialElements]);
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={style.inputsContainer}>
        <form className={style.form} onSubmit={handleAdd} test-id="form">
          <Input
            maxLength={4}
            isLimitText
            onChange={handleInputChange}
            value={stringInput}
            test-id="input"
          />
          <Button
            text={"Добавить"}
            type="submit"
            isLoader={isPushing}
            disabled={isPopping || stringInput.length < 1}
            test-id="add-button"
          />
          <Button
            text={"Удалить"}
            onClick={handleRemove}
            isLoader={isPopping}
            disabled={isPushing || isEmpty}
            test-id="remove-button"
          />
        </form>
        <Button
          text={"Очистить"}
          disabled={isPopping || isPushing || isEmpty}
          onClick={handleClearAll}
          test-id="clear-button"
        />
      </div>
      <ul className={style.circlesContainer}>
        {elements &&
          elements.map((element, index) => (
            <li key={index}>
              <Circle
                letter={element.char}
                state={element.state}
                head={element.head}
                tail={element.tail}
                index={index}
              />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
