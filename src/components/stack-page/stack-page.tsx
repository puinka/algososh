import React, { useMemo, useState } from "react";
import { delay, renderStep } from "../../common/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { TLetter } from "../../types/types";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./stack.module.css";
import { Stack } from "./utils";

export const StackPage: React.FC = () => {
  const [stringInput, setStringInput] = useState<string>("");
  const [elements, setElements] = useState<TLetter[]>([]);
  const [isPushing, setIsPushing] = useState<boolean>(false);
  const [isPopping, setIsPopping] = useState<boolean>(false);

  const stack = useMemo(() => new Stack<string>(), []);

  const handleInputChange = (evt: React.FormEvent<HTMLInputElement>): void => {
    setStringInput(evt.currentTarget.value);
  };

  const handleAdd = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setStringInput("");
    setIsPushing(true);
    stack.push(stringInput);

    elements.forEach((element) => {
      element.state = ElementStates.Default;
      element.head = null;
    });
    const topElement = stack.peek();
    elements.push({
      char: topElement ? topElement : undefined,
      state: ElementStates.Default,
    });

    elements[elements.length - 1].head = "top";
    elements[elements.length - 1].state = ElementStates.Changing;

    await renderStep(elements, SHORT_DELAY_IN_MS, setElements);

    setIsPushing(false);
  };

  const handleRemove = async (): Promise<void> => {
    setIsPopping(true);

    stack.pop();
    if (stack.getSize()) {
      elements.pop();
      setElements([...elements]);
      await delay(SHORT_DELAY_IN_MS);
      elements[elements.length - 1].head = "top";
      setElements([...elements]);
      elements[elements.length - 1].state = ElementStates.Changing;
    } else {
      setElements([]);
    }
    setIsPopping(false);
  };

  const handleClearAll = (): void => {
    stack.clear();
    setElements([]);
  };

  return (
    <SolutionLayout title="Стек">
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
            disabled={isPushing || elements.length < 1}
            test-id="remove-button"
          />
        </form>
        <Button
          text={"Очистить"}
          disabled={isPopping || isPushing || elements.length < 1}
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
                index={index}
              />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
