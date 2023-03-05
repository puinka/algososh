import React from "react";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./list.module.css";

export const ListPage: React.FC = () => {
  return (
    <SolutionLayout title="Связный список">
      <form className={style.inputsContainer}>
        <Input placeholder="Введите значение" />
        <Button text="Добавить в head" />
        <Button text="Добавить в tail" />
        <Button text="Удалить из head" />
        <Button text="Удалить из tail" />
        <Input placeholder="Введите индекс" />
        <Button text="Добавить по индексу" extraClass={style.indexAdd} />
        <Button text="Удалить по индексу" extraClass={style.indexRemove} />
      </form>
    </SolutionLayout>
  );
};
