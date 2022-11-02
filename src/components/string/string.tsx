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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

  useEffect(() => {
    setnNextReverse(input.split(""));   
  }, [input])

  const handleClick = async () => {
    setWord(nextReverse);
    setLoader(true);
    await reverse();
    setLoader(false);
  }

  const sleep = (ms: number) => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const switchFunc = (array: string[], firstIndex: number, secondIndex: number): string[] => {
    const temp = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = temp;
    return array
  }

  const reverse = async () => {
    let start = 0;
    let end = nextReverse.length - 1;
    let newOrder = [...nextReverse];
    while (start < end) {
      await sleep(1000);
      newOrder= switchFunc(newOrder, start, end);
      setWord(newOrder);
      start++;
      end--;
    }
    setLoader(false);
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
