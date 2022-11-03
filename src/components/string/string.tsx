import React, { useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import s from "./string.module.css";

type TCircle = {
  char: string,
  style: ElementStates
}

export const StringComponent: React.FC = () => {
  const [input, setInput] = useState("");
  const [word, setWord] = useState<TCircle[]>([]);
  const [loader, setLoader] = useState(false);
  const [nextReverse, setnNextReverse] = useState<TCircle[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

  useEffect(() => {
    setnNextReverse(input.split("").map(el => ({ char: el, style: ElementStates.Default })));
  }, [input])

  useEffect(() => {
    let interval: number | null = null;
    let colorInterval: number | null = null;
    if (loader) {
      let start = 0;
      let end = nextReverse.length - 1;
      let newOrder = nextReverse.map(el => el);
      colorInterval = window.setInterval(() => {
        newOrder = colorElements(newOrder, start, end)
        setWord(newOrder);
        if (start + 1 > end) {
          clearInterval(colorInterval!)
          setLoader(false);
        }
      }, 500)
      interval = window.setInterval(() => {
        if (start < end) {
          newOrder = switchFunc(newOrder, start, end)
          setWord(newOrder);
          start++;
          end--;
        }
        if (start >= end) {
          clearInterval(interval!);
        }
      }, 1000)
    }
    return function cleanup() {
      interval && clearInterval(interval)
    }
  }, [loader])

  const handleClick = async () => {
    if (!nextReverse.length) {return}
    setnNextReverse(nextReverse.map(el => ({ char: el.char, style: ElementStates.Default })))
    const elementsArray: TCircle[] = nextReverse.map(el => ({ char: el.char, style: ElementStates.Default }));
    setWord(elementsArray);
    setLoader(true);
  }

  const colorElements = (array: TCircle[], firstIndex: number, secondIndex: number): TCircle[] => {
    let newArray: TCircle[] = [...array];
    if (firstIndex !== 0 && secondIndex !== array.length - 1) {
      if (array[firstIndex - 1].style == ElementStates.Changing) {
        array[firstIndex - 1].style = ElementStates.Modified;
        array[secondIndex + 1].style = ElementStates.Modified;
      }
    }
    if (array[firstIndex].style == ElementStates.Default) {
      array[firstIndex].style = ElementStates.Changing;
      array[secondIndex].style = ElementStates.Changing;
    }
    if (firstIndex === secondIndex) {
      array[firstIndex].style = ElementStates.Modified;
    }
    return [...newArray]
  }

  const switchFunc = (array: TCircle[], firstIndex: number, secondIndex: number) => {
    const temp = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = temp;
    return [...array]
  }

  return (
    <SolutionLayout title="Строка">
      <div className={s.wrapper}>
        <Input maxLength={11} isLimitText={true} extraClass={"pr-6"} onChange={handleChange} />
        <Button text={"Развернуть"} onClick={handleClick} isLoader={loader} />
      </div>
      <div className={`d-flex justify-content-center ${s.charContainner}`}>
        {word.map((el, index) => <Circle letter={el.char} state={el.style} key={index} extraClass={"pr-6"} />)}
      </div>
    </SolutionLayout>
  );
};
