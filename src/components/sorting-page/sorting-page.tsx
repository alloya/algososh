import React, { useState } from "react";
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

  const handleClick = async (sortType: Direction) => {
    sortType === Direction.Ascending ? setAscLoader(true) : setDescLoader(true);
    select ? await selectSort(sortType) : await bubbleSort(sortType);
    sortType === Direction.Ascending ? setAscLoader(false) : setDescLoader(false);
  }

  const generateArray = () => {
    const len = getRndInteger(3, 17);
    let array = [];
    for (let i = 0; i < len; i++) {
      array.push(getRndInteger(1, 100));
    }
    array = array.map(el => ({ num: el, style: ElementStates.Default }))
    setArray(array);
  }

  const bubbleSort = async (sortType: Direction) => {
    let temp = [...array];
    let end = temp.length - 1;
    for (let i = 0; i < temp.length; i++) {
      for (let j = 0; j < temp.length - i - 1; j++) {
        temp[j].style = ElementStates.Changing;
        if (j+1 <= end) { temp[j + 1].style = ElementStates.Changing; }
        if (j > 0) { temp[j - 1].style = ElementStates.Default; }

        setArray([...temp]);
        await delay(DELAY)
        if (sortType === Direction.Ascending ? (temp[j].num > temp[j+1].num) : (temp[j].num < temp[j+1].num)) {
          let newA = switchFunc(temp, j, j + 1);
          setArray(newA);
          await delay(DELAY)
        }
      }
      if (end-1 > 0) {
        temp[end-1].style = ElementStates.Default;
      }
      temp[end].style = ElementStates.Modified;
      setArray([...temp]);
      end--;
    }
  }

  const selectSort = async (sortType: Direction) => {
    let indexToSwitch = 0;
    let start = 0;
    let temp = [...array];
    while (start < array.length) {
      for (let i = start + 1; i < array.length; i++) {
        if (i >= 2) {
          temp[i - 1].style = ElementStates.Default;
        }
        temp[indexToSwitch].style = ElementStates.Changing;
        temp[i].style = ElementStates.Changing;
        setArray([...temp]);
        await delay(DELAY);
        if (sortType === Direction.Ascending ? (temp[i].num < temp[indexToSwitch].num) : (temp[i].num > temp[indexToSwitch].num)) {
          temp[indexToSwitch].style = ElementStates.Default;
          indexToSwitch = i
        }
      }
      temp[indexToSwitch].style = ElementStates.Modified;
      if (indexToSwitch != array.length - 1) {
        temp[array.length - 1].style = ElementStates.Default;
      }
      setArray(switchFunc(temp, indexToSwitch, start));
      start++;
      indexToSwitch = start;
    }
  }

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
            extraClass={"mr-6"}
            disabled={descLoader} />
          <Button
            text={"По убыванию"}
            sorting={Direction.Descending}
            onClick={() => handleClick(Direction.Descending)}
            isLoader={descLoader}
            disabled={ascLoader} />
        </div>
        <Button
          text={"Новый массив"}
          onClick={generateArray}
          disabled={ascLoader || descLoader} />
      </div>
      <div className="d-flex justify-content-center align-items-end">
        {array && array.map((el, index) => {
          return <Column index={el.num} key={index} extraClass={"pr-5"} state={el.style} />
        })}
      </div>
    </SolutionLayout>
  );
};
