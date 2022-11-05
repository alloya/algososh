import React, { useState } from "react";
import { TCircle } from "../../types/circle";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

const DELAY = 500;

export const StackPage: React.FC = () => {
  const [stack, setStack] = useState<TCircle[]>([]);
  const [input, setInput] = useState("");
  const [loader, setLoader] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

  const addToStack = async () => {
    if (input.length) {
      setLoader(true);
      const el: TCircle = { char: input, style: ElementStates.Changing };
      setStack([...stack, el]);
      setInput("");
      await delay(DELAY);
      el.style = ElementStates.Default;
      setStack([...stack, el]);
      setLoader(false);
    }
  }

  const removeFromStack = async () => {
    setLoader(true);
    const el: TCircle = stack[stack.length - 1];
    el.style = ElementStates.Changing;
    setStack([...stack]);
    await delay(DELAY);
    stack.pop();
    setStack([...stack]);
    setLoader(false);
  }

  const clearStack = () => {
    setStack([]);
  }

  const isTail = (index: number): string | null => {
    return index === stack.length - 1 ? "top" : null
  }

  return (
    <SolutionLayout title="Стек">
      <div className={'justify-content-between col-md-7 d-flex m-auto mb-5'}>
        <div className="d-flex">
          <Input
            maxLength={4}
            isLimitText={true}
            extraClass={"col-md-8 pr-6"}
            placeholder={"Введите текст"}
            type={"text"}
            onChange={handleChange}
            value={input}/>
          <Button
            text={"Добавить"}
            extraClass={'mr-6'}
            onClick={addToStack} 
            disabled={loader}/>
          <Button
            text={"Удалить"}
            extraClass={'mr-6'}
            onClick={removeFromStack}
            disabled={loader} />
        </div>
        <Button
          text={"Очистить"}
          onClick={clearStack}
          disabled={loader} /></div>
      <div className={`d-flex justify-content-center col-md-8 m-auto flex-wrap`}>
        {stack && stack.map((el, index) =>
          <Circle
            letter={el.char}
            state={el.style}
            key={index}
            index={index}
            extraClass={"pr-6 mr-auto"}
            head={isTail(index)} />)}
      </div>
    </SolutionLayout>
  );
};
