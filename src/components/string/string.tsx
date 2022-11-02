import React, { useEffect, useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import s from "./string.module.css";

export const StringComponent: React.FC = () => {
  const [input, setInput] = useState("");
  const [word, setWord] = useState<string[]>([]);
  const [loader, setLoader] = useState(false);
  const [nextReverse, setnNextReverse] = useState<string[]>([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  //let newOrder:string[] = [];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

  useEffect(() => {
    setnNextReverse(input.split(""));
  }, [input])

  useEffect(() => {
    let interval: number | null = null;
    if (loader) {
      let start = 0;
      let end = nextReverse.length - 1;
      let newOrder = [...nextReverse];
      interval = window.setInterval(() => {
        if (start < end) {
          newOrder = switchFunc(newOrder, start, end)
          setWord(newOrder);
          start++;
          end--;
        }
        if (start >= end) {
          setLoader(false);
          clearInterval(interval!);
        }
      }, 1000)
    }
    return function cleanup() {
      interval && clearInterval(interval)
    }
  }, [loader])

  const handleClick = async () => {
    setWord(nextReverse);
    setEnd(nextReverse.length - 1);
    setStart(0);
    setLoader(true);
  }

  const switchFunc = (array: string[], firstIndex: number, secondIndex: number) => {
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
        {word.map((char, index) => <Circle letter={char} key={index} extraClass={"pr-6"} />)}
      </div>
    </SolutionLayout>
  );
};
