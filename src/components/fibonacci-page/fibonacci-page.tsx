import React, { useEffect, useState } from "react";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import s from "./fibonacci-page.module.css";

export const FibonacciPage: React.FC = () => {
  const [loader, setLoader] = useState(false);
  const [input, setInput] = useState("");
  const [fibArray, setFibArray] = useState<number[]>([]);
  let fib: number[] = [1, 1];
  const [justify, setJustify] = useState('center')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

  const handleClick = async () => {
    if (input && (Number(input) > 19 || Number(input) < 1)) { return }
    setLoader(true);
  }

  useEffect(() => {
    let interval: number | null = null;
    if (loader) {
      let array: number[] = [];
      fibbonacci();
      interval = window.setInterval(() => {
        setJustify('center');
        if (fib.length !== 0) {
          let elem = fib.shift()!;
          array.push(elem);
          setFibArray([...array]);
        }
        if (array.length > 10) {
          setJustify('start');
        }
        if (fib.length === 0) {
          setLoader(false);
          clearInterval(interval!);
        }
      }, 500)
    }

    return function cleanup() {
      interval && clearInterval(interval)
    }
  }, [loader])


  const fibbonacci = () => {
    let previous = fib[0];
    let current = fib[1];
    let next = fib[0] + fib[1];
    for (let i = 0; i < Number(input) - 1; i++) {
      fib.push(next);
      previous = current;
      current = next;
      next = current + previous;
    }
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={s.wrapper}>
        <Input max={19} isLimitText={true} extraClass={"pr-6"} onChange={handleChange} placeholder={"Введите число"} type={"number"} />
        <Button text={"Рассчитать"} onClick={handleClick} isLoader={loader} />

      </div>
      <div className={`d-flex justify-content-${justify} col-md-8 m-auto flex-wrap`}>
        {fibArray && fibArray.map((el, index) =>
          <Circle letter={String(el)} key={index} index={index} extraClass={"pr-6 pt-5 mt-4 mr-auto"} />)}
      </div>
    </SolutionLayout>
  );
};
