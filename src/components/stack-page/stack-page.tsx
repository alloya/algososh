import React, { useEffect, useRef, useState } from "react";
import { Stack } from "./stack";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { TCircle } from "../../types/circle";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

export const StackPage: React.FC = () => {
  const stackInstance = useRef(new Stack<TCircle>(null)).current;
  const [stack, setStack] = useState(stackInstance.getElements());
  const [input, setInput] = useState("");
  const [loader, setLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [justify, setJustify] = useState('center');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

  useEffect(() => {
    if (justify === 'center' && stackInstance.getSize() > 10) {
      setJustify('start')
    }
    else if (justify !== 'center' && stackInstance.getSize() <= 10) {
      setJustify('center')
    }
  }, [stackInstance, justify, stack])

  const addToStack = async () => {
    if (input.length) {
      setLoader(true);
      const el: TCircle = { char: input, style: ElementStates.Changing };
      stackInstance.push(el);
      setStack(stackInstance.getElements());
      setInput("");
      await delay(SHORT_DELAY_IN_MS);
      el.style = ElementStates.Default;
      setStack([...stackInstance.getElements()]);
      setLoader(false);
    }
  }

  const removeFromStack = async () => {
    if (!stackInstance.getSize()) {
      return
    }
    setDeleteLoader(true);
    const el = stackInstance.peak();
    if (el) {
      el.style = ElementStates.Changing;
    }
    setStack(stackInstance.getElements());
    await delay(SHORT_DELAY_IN_MS);
    stackInstance.pop();
    setStack([...stackInstance.getElements()]);
    setDeleteLoader(false);
  }

  const clearStack = () => {
    stackInstance.clear()
    setStack(stackInstance.getElements());
  }

  const isTop = (index: number): string | null => {
    return index === stackInstance.getSize() - 1 ? "top" : null
  }

  return (
    <SolutionLayout title="Стек">
      <div className={'justify-content-center row mb-5'}>
        <div className="col-md-8 px-0 justify-content-center d-flex">
          <div className="row">
            <Input
              maxLength={4}
              isLimitText={true}
              extraClass={"col-md-4 px-0"}
              placeholder={"Введите текст"}
              type={"text"}
              onChange={handleChange}
              value={input} />
            <Button
              text={"Добавить"}
              extraClass={'col-auto ml-6 mr-6'}
              onClick={addToStack}
              isLoader={loader}
              disabled={deleteLoader || !input.length} />
            <Button
              text={"Удалить"}
              extraClass={'col-auto mr-6'}
              onClick={removeFromStack}
              isLoader={deleteLoader}
              disabled={loader || !stack.length} />
            <Button
              text={"Очистить"}
              onClick={clearStack}
              extraClass={'col-auto'}
              disabled={loader || deleteLoader || !stack.length} />
          </div>
        </div>
      </div>
      <div className={`d-flex justify-content-${justify} col-md-8 m-auto flex-wrap`}>
        {stack?.map((el, index) =>
          <Circle
            letter={el.char}
            state={el.style}
            key={index}
            index={index}
            extraClass={"pr-6 mr-auto mb-30"}
            head={isTop(index)}
            innerIndex={index} />)}
      </div>
    </SolutionLayout>
  );
};
