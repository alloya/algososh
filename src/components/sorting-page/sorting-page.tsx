import React, { useEffect, useState } from "react";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { delay, getRndInteger, switchFunc } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import s from "./sorting-page.module.css";

type TColumn = {
  num: number,
  style: ElementStates
};
const DELAY = 500;

export const SortingPage: React.FC = () => {
  const [ascLoader, setAscLoader] = useState(false);
  const [descLoader, setDescLoader] = useState(false);
  const [select, setSelect] = useState(true);
  const [bubble, setBubble] = useState(false);
  const [array, setArray] = useState<TColumn[]>([]);

  const handleClick = async (sortType: string) => {
    sortType === Direction.Ascending ? setAscLoader(true) : setAscLoader(true)
    await selectSort("");
    setAscLoader(false)
  }

  const generateArray = () => {
    const len = getRndInteger(3, 17);
    let array = [];
    for (let i = 0; i < len; i++) {
      array.push(getRndInteger(1, 100));
    }
    array = array.map(el => ({ num: el, style: ElementStates.Default }))
    setArray(array);
    console.log(array);

  }

  const selectSort = async (sortType: string) => {
    let minIndex = 0;
    let start = 0;
    let temp = [...array];
    while (start < array.length) {
      for (let i = start + 1; i < array.length; i++) {
        if (i >= 2) {
          temp[i-1].style = ElementStates.Default;
        }
        temp[minIndex].style = ElementStates.Changing;
        temp[i].style = ElementStates.Changing;
        setArray(temp);
        await delay(DELAY);
        if (temp[i].num < temp[minIndex].num) {
          temp[minIndex].style = ElementStates.Default;
          minIndex = i
        }
      }
      temp[minIndex].style = ElementStates.Modified;
      if (minIndex != array.length-1) {
        temp[array.length-1].style = ElementStates.Default;
      }
      setArray(switchFunc(temp, minIndex, start));
      start++;
      minIndex = start;
    }
  }

  const colorElements = (array: TColumn[], color: ElementStates, ...elements: number[]) => {
    for (let el of elements) {
      array[el].style = color;
    }
    return [...array];
  }

  // useEffect(() => {
  //   selectSort("")
  // }, [ascLoader])

  // useEffect(() => {
  //   let interval: number | null = null;
  //   if (descLoader) {
  //     interval = window.setInterval(() => {

  //     }, 500)
  //     if (bubble) {

  //     }
  //   }
  // }, [descLoader])

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={s.wrapper + " pb-5"}>
        <div className="d-flex">
          <RadioInput
            label="Выбор"
            extraClass="pr-20"
            onChange={() => { setSelect(true); setBubble(false) }}
            checked={select} />
          <RadioInput
            label="Пузырёк"
            onChange={() => { setSelect(false); setBubble(true) }}
            checked={bubble} />
        </div>
        <div className="d-flex">
          <Button
            text={"По возрастанию"}
            sorting={Direction.Ascending}
            onClick={() => handleClick(Direction.Ascending)}
            isLoader={ascLoader}
            extraClass={"mr-6"} />
          <Button
            text={"По убыванию"}
            sorting={Direction.Descending}
            onClick={() => handleClick(Direction.Descending)}
            isLoader={descLoader} />
        </div>
        <Button
          text={"Новый массив"}
          onClick={generateArray} />
      </div>
      <div className="d-flex justify-content-center align-items-end">
        {array && array.map((el, index) => {
          return <Column index={el.num} key={index} extraClass={"pr-5"} state={el.style} />
        })}
      </div>

    </SolutionLayout>
  );
};
