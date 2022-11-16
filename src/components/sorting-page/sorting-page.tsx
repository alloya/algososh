import React, { useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { delay, getRndInteger, switchElements } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import s from "./sorting-page.module.css";
import { bubbleSortIteration, selectSortIteration, TColoring } from "./utils";

type TColumn = {
  num: number,
  style: ElementStates
};

const ARRAY_LENGTH = {
  min: 3,
  max: 17
}

const VALUE = {
  min: 1,
  max: 100
}

export const SortingPage: React.FC = () => {
  const [ascLoader, setAscLoader] = useState(false);
  const [descLoader, setDescLoader] = useState(false);
  const [selectSorting, setSelectSorting] = useState(true);
  const [bubble, setBubble] = useState(false);
  const [array, setArray] = useState<TColumn[]>([]);

  const handleClick = async (sortType: Direction) => {
    sortType === Direction.Ascending ? setAscLoader(true) : setDescLoader(true);
    selectSorting ? await performSelectSort(sortType) : await performBubbleSort(sortType);
    sortType === Direction.Ascending ? setAscLoader(false) : setDescLoader(false);
  }

  const generateArray = () => {
    const len = getRndInteger(ARRAY_LENGTH.min, ARRAY_LENGTH.max);
    let array = [];
    for (let i = 0; i < len; i++) {
      array.push({ num: getRndInteger(VALUE.min, VALUE.max), style: ElementStates.Default });
    }
    setArray(array);
  }

  const performBubbleSort = async (sortType: Direction) => {
    const arr = array.map(el => el.num);
    let sortOpt: TColoring = {
      numArray: arr,
      firstIndex: 0,
      secondIndex: 1,
      sortedIndex: null
    }
    let sortedCounter = array.length
    while (sortedCounter > 0) {
      setArray(colorArray(sortOpt, 'bubble'));
      await delay(SHORT_DELAY_IN_MS);
      sortOpt = bubbleSortIteration(sortOpt, sortType)
      setArray(colorArray(sortOpt, 'bubble'));
      sortedCounter = sortOpt.sortedIndex !== null ? sortOpt.sortedIndex : sortedCounter;
    }

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
        await delay(SHORT_DELAY_IN_MS)
        if (sortType === Direction.Ascending ? (temp[j].num > temp[j+1].num) : (temp[j].num < temp[j+1].num)) {
          let newA = switchElements(temp, j, j + 1);
          setArray(newA);
          await delay(SHORT_DELAY_IN_MS)
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

  const performSelectSort = async (sortType: Direction) => {
    const arr = array.map(el => el.num);
    let sortOpt: TColoring = {
      numArray: arr,
      firstIndex: 0,
      secondIndex: 1,
      sortedIndex: null
    }
    let sortedCounter = 0;
    while (sortedCounter < array.length) {
      setArray(colorArray(sortOpt, 'select'));
      await delay(SHORT_DELAY_IN_MS);
      sortOpt = selectSortIteration(sortOpt, sortType)
      setArray(colorArray(sortOpt, 'select'));
      sortedCounter = sortOpt.sortedIndex !== null ? sortOpt.sortedIndex + 1 : sortedCounter;
    }
  }

  const colorArray = (sortObj: TColoring, sort: string): any[] => {
    const {numArray: numArray, firstIndex, secondIndex, sortedIndex} = sortObj;
    const mappedArr: TColumn[] = [];
    numArray.map((num, index) => {
      if (sortedIndex !== null && (sort === 'select' ? (index <= sortedIndex) : (index >= sortedIndex))) {
        mappedArr.push({num: num, style: ElementStates.Modified} as TColumn);
      }
      else if (index === firstIndex || index === secondIndex) {
        mappedArr.push({num: num, style: ElementStates.Changing} as TColumn);
      }
      else {
        mappedArr.push({num: num, style: ElementStates.Default} as TColumn);
      }
    })
    return mappedArr;
  } 

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={s.wrapper + " pb-5"}>
        <div className="d-flex">
          <RadioInput
            label="Выбор"
            extraClass="pr-20"
            onChange={() => { setSelectSorting(true); setBubble(false) }}
            checked={selectSorting} 
            disabled={descLoader || ascLoader} />
          <RadioInput
            label="Пузырёк"
            onChange={() => { setSelectSorting(false); setBubble(true) }}
            checked={bubble}
            disabled={descLoader || ascLoader} />
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
      <div className={`${s.graph} d-flex justify-content-center align-items-end`}>
        {array && array.map((el, index) => {
          return <Column index={el.num} key={index} extraClass={"pr-5"} state={el.style} />
        })}
      </div>
    </SolutionLayout>
  );
};
