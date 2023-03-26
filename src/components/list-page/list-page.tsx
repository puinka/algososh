import React, { useEffect, useMemo, useState } from "react";
import {
  delay,
  randomCharacter,
  randomNumber,
  renderStep,
} from "../../common/utils";
import { ElementStates } from "../../types/element-states";
import { TButtonStates, TLetter } from "../../types/types";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./list.module.css";
import { LinkedList } from "./utils";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { render } from "@testing-library/react";

export const ListPage: React.FC = () => {
  const MIN_LIST_LENGTH = 3;
  const MAX_LIST_LENGTH = 6;
  const MAX_INDEX = 5;
  const MAX_VALUE_LENGTH = 4;
  const MAX_SIZE = 8;

  const initialValues: string[] = Array.from(
    { length: randomNumber(MIN_LIST_LENGTH, MAX_LIST_LENGTH) },
    () => randomCharacter()
  );

  const [valueInput, setValue] = useState<string>("");
  const [indexInput, setIndex] = useState<number>();
  const [elements, setElements] = useState<TLetter[]>([]);
  const [buttonStates, setButtonStates] = useState<TButtonStates>({
    isAddingToHead: false,
    isAddingToTail: false,
    isDeletingFromHead: false,
    isDeletingFromTail: false,
    isAddingByIdex: false,
    isDeletingByIdex: false,
  });

  const linkedList = useMemo(() => new LinkedList<string>(initialValues), []);

  useEffect(() => {
    setElements(
      initialValues.map((item) => ({
        char: item,
        state: ElementStates.Default,
      }))
    );
  }, []);

  // const renderStep = async () => {
  //   setElements([...elements]);
  //   await delay(SHORT_DELAY_IN_MS);
  // };

  const handleValueInputChange = (
    evt: React.FormEvent<HTMLInputElement>
  ): void => {
    setValue(evt.currentTarget.value);
  };

  const handleIndexInputChange = (
    evt: React.FormEvent<HTMLInputElement>
  ): void => {
    setIndex(Number(evt.currentTarget.value));
  };

  const handleAddToHead = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (elements.length >= MAX_SIZE) {
      throw new Error("List size is exceeded!");
    }

    setButtonStates({
      ...buttonStates,
      isAddingToHead: true,
    });

    linkedList.prepend(valueInput);
    elements[0] = {
      ...elements[0],
      extraCircle: { char: valueInput, state: ElementStates.Changing },
      isAdding: true,
    };

    await renderStep(elements, SHORT_DELAY_IN_MS, setElements);

    elements[0] = {
      ...elements[0],
      extraCircle: null,
    };
    elements.unshift({ char: valueInput, state: ElementStates.Modified });

    await renderStep(elements, SHORT_DELAY_IN_MS, setElements);

    elements[0].state = ElementStates.Default;

    setValue("");
    setButtonStates({
      ...buttonStates,
      isAddingToHead: false,
    });
  };

  const handleAddToTail = async () => {
    if (elements.length >= MAX_SIZE) {
      throw new Error("List size is exceeded!");
    }

    setButtonStates({
      ...buttonStates,
      isAddingToTail: true,
    });
    linkedList.append(valueInput);

    const i = elements.length - 1;
    elements[i] = {
      ...elements[i],
      extraCircle: { char: valueInput, state: ElementStates.Changing },
      isAdding: true,
    };

    await renderStep(elements, SHORT_DELAY_IN_MS, setElements);

    elements[i] = {
      ...elements[i],
      extraCircle: null,
    };
    elements.push({ char: valueInput, state: ElementStates.Modified });

    await renderStep(elements, SHORT_DELAY_IN_MS, setElements);

    elements[i + 1].state = ElementStates.Default;

    setValue("");
    setButtonStates({
      ...buttonStates,
      isAddingToTail: false,
    });
  };

  const handleDeleteFromHead = async () => {
    setButtonStates({
      ...buttonStates,
      isDeletingFromHead: true,
    });

    elements[0] = {
      ...elements[0],
      char: "",
      extraCircle: {
        char: elements[0].char,
        state: ElementStates.Changing,
      },
      isDeleting: true,
    };

    await renderStep(elements, SHORT_DELAY_IN_MS, setElements);
    linkedList.deleteByIndex(0);
    elements.shift();

    await renderStep(elements, SHORT_DELAY_IN_MS, setElements);

    setButtonStates({
      ...buttonStates,
      isDeletingFromHead: false,
    });
  };

  const handleDeleteFromTail = async () => {
    setButtonStates({
      ...buttonStates,
      isDeletingFromTail: true,
    });
    const i = elements.length - 1;
    elements[i] = {
      ...elements[i],
      char: "",
      extraCircle: {
        char: elements[i].char,
        state: ElementStates.Changing,
      },
      isDeleting: true,
    };

    await renderStep(elements, SHORT_DELAY_IN_MS, setElements);
    linkedList.deleteByIndex(i);
    elements.pop();

    setElements([...elements]);
    setButtonStates({
      ...buttonStates,
      isDeletingFromTail: false,
    });
  };

  const handleAddByIndex = async () => {
    setButtonStates({
      ...buttonStates,
      isAddingByIdex: true,
    });

    if (indexInput) {
      linkedList.addByIndex(valueInput, indexInput);

      for (let i = 0; i <= indexInput; i++) {
        elements[i] = {
          ...elements[i],
          extraCircle: {
            char: valueInput,
            state: ElementStates.Changing,
          },
          isAdding: true,
        };

        if (i > 0) {
          elements[i - 1] = {
            ...elements[i - 1],
            isAdding: false,
            state: ElementStates.Changing,
            extraCircle: null,
          };
        }

        await renderStep(elements, SHORT_DELAY_IN_MS, setElements);
      }
      elements[indexInput] = {
        ...elements[indexInput],
        isAdding: false,
        extraCircle: null,
      };
      elements.splice(indexInput, 0, {
        char: valueInput,
        state: ElementStates.Modified,
      });
      await renderStep(elements, SHORT_DELAY_IN_MS, setElements);
    }

    elements.forEach((item) => (item.state = ElementStates.Default));
    await renderStep(elements, SHORT_DELAY_IN_MS, setElements);

    setButtonStates({
      ...buttonStates,
      isAddingByIdex: false,
    });
    setValue("");
    setIndex(undefined);
  };

  const handleDeleteByIndex = async () => {
    setButtonStates({
      ...buttonStates,
      isDeletingByIdex: true,
    });

    if (indexInput) {
      if (indexInput > elements.length) {
        throw new Error("there is no element on this index");
      }
      linkedList.deleteByIndex(indexInput);

      for (let i = 0; i <= indexInput; i++) {
        elements[i] = {
          ...elements[i],
          state: ElementStates.Changing,
        };
        await renderStep(elements, SHORT_DELAY_IN_MS, setElements);
      }

      elements[indexInput] = {
        ...elements[indexInput],
        char: "",
        isDeleting: true,
        state: ElementStates.Changing,
        extraCircle: {
          char: elements[indexInput].char,
          state: ElementStates.Changing,
        },
      };

      await renderStep(elements, SHORT_DELAY_IN_MS, setElements);

      elements.splice(indexInput, 1);
      elements[indexInput - 1] = {
        ...elements[indexInput - 1],
        char: elements[indexInput - 1].char,
        state: ElementStates.Default,
        extraCircle: null,
      };

      elements.forEach((item) => {
        item.state = ElementStates.Default;
      });
    }
    await renderStep(elements, SHORT_DELAY_IN_MS, setElements);

    setButtonStates({
      ...buttonStates,
      isDeletingByIdex: false,
    });
    setValue("");
    setIndex(undefined);
  };

  return (
    <SolutionLayout title="Связный список">
      <form
        className={style.inputsContainer}
        onSubmit={handleAddToHead}
        test-id="form"
      >
        <Input
          placeholder="Введите значение"
          maxLength={MAX_VALUE_LENGTH}
          isLimitText
          onChange={handleValueInputChange}
          value={valueInput}
          test-id="valueInput"
        />
        <Button
          text="Добавить в head"
          type="submit"
          disabled={
            !valueInput ||
            buttonStates.isAddingToTail ||
            buttonStates.isAddingByIdex ||
            buttonStates.isDeletingByIdex
          }
          isLoader={buttonStates.isAddingToHead}
          test-id="addToHead"
        />
        <Button
          text="Добавить в tail"
          disabled={
            !valueInput ||
            buttonStates.isAddingToHead ||
            buttonStates.isAddingByIdex ||
            buttonStates.isDeletingByIdex
          }
          onClick={handleAddToTail}
          isLoader={buttonStates.isAddingToTail}
          test-id="addToTail"
        />
        <Button
          text="Удалить из head"
          disabled={
            elements.length < 1 ||
            buttonStates.isAddingToHead ||
            buttonStates.isAddingToTail ||
            buttonStates.isAddingByIdex ||
            buttonStates.isDeletingByIdex
          }
          onClick={handleDeleteFromHead}
          test-id="removeFromHead"
        />
        <Button
          text="Удалить из tail"
          disabled={
            elements.length < 1 ||
            buttonStates.isAddingToHead ||
            buttonStates.isAddingToTail ||
            buttonStates.isAddingByIdex ||
            buttonStates.isDeletingByIdex
          }
          onClick={handleDeleteFromTail}
          test-id="removeFromTail"
        />
        <Input
          placeholder="Введите индекс"
          max={MAX_INDEX}
          type="number"
          onChange={handleIndexInputChange}
          value={indexInput || ""}
          test-id="indexInput"
        />
        <Button
          text="Добавить по индексу"
          extraClass={style.indexAdd}
          disabled={
            !valueInput ||
            !indexInput ||
            indexInput > elements.length ||
            buttonStates.isDeletingByIdex
          }
          onClick={handleAddByIndex}
          isLoader={buttonStates.isAddingByIdex}
          test-id="addByIndex"
        />
        <Button
          text="Удалить по индексу"
          extraClass={style.indexRemove}
          disabled={
            !indexInput ||
            elements.length === 0 ||
            indexInput > elements.length - 1 ||
            buttonStates.isAddingByIdex
          }
          onClick={handleDeleteByIndex}
          isLoader={buttonStates.isDeletingByIdex}
          test-id="removeByIndex"
        />
      </form>
      <ul className={style.circlesContainer} test-id="container">
        {elements &&
          elements.map((element, index, arr) => (
            <li key={index} className={style.listItem}>
              <Circle
                letter={element.char}
                state={element.state}
                head={
                  index === 0 && !element.isAdding && !element.isDeleting
                    ? "head"
                    : ""
                }
                tail={
                  index === arr.length - 1 && !element.isDeleting ? "tail" : ""
                }
                index={index}
                extraClass={style.circle}
              />
              {element.extraCircle && (
                <Circle
                  isSmall
                  letter={element.extraCircle.char}
                  state={element.extraCircle.state}
                  extraClass={`${style.extraCircle} ${
                    element.isAdding && !element.isDeleting
                      ? style.top
                      : style.bottom
                  }`}
                />
              )}
              {index < elements.length - 1 && (
                <ArrowIcon
                  fill={
                    element.state === ElementStates.Changing
                      ? "#d252e1"
                      : "#0032FF"
                  }
                />
              )}
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
