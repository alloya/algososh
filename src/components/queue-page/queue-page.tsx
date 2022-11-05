import React, { useEffect, useState } from "react";
import { TCircle } from "../../types/circle";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

const DELAY = 500;


export const QueuePage: React.FC = () => {
  const [queue, setQueue] = useState<TCircle[]>([{ style: ElementStates.Default }]);
  const [input, setInput] = useState("");
  const [loader, setLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [tail, setTail] = useState(-1);
  const [head, setHead] = useState(0);

  useEffect(() => {
    clearQueue()
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

  const addToQueue = async () => {
    if (input.length && tail < queue.length - 1) {
      setLoader(true);
      queue[tail + 1].style = ElementStates.Changing;
      setQueue([...queue]);
      await delay(DELAY);
      queue[tail + 1].char = input;
      setInput("");
      queue[tail + 1].style = ElementStates.Default;
      setQueue([...queue]);
      setLoader(false);
      setTail(tail + 1);
    }
  }

  const removeFromQueue = async () => {
    if (head < queue.length) {
      setDeleteLoader(true);
      queue[head].style = ElementStates.Changing;
      setQueue([...queue]);
      await delay(DELAY);
      queue[head].char = "";
      queue[head].style = ElementStates.Default;
      setQueue([...queue]);
      setHead(head + 1);
      setDeleteLoader(false);
    }
  }

  const clearQueue = () => {
    let array: TCircle[] = [];
    for (let i = 0; i < 7; i++) {
      array.push({ style: ElementStates.Default })
    }
    setQueue(array);
    setTail(-1);
    setHead(0);
    setInput("");
  }

  const isTail = (index: number): string | null => {
    return index === tail ? "tail" : null
  }

  const isHead = (index: number): string | null => {
    return (queue[index].char?.length && index === head) ? "head" : null
  }

  return (
    <SolutionLayout title="Очередь">
      <div className={'justify-content-between col-md-7 d-flex m-auto mb-5'}>
        <div className="d-flex">
          <Input
            maxLength={4}
            isLimitText={true}
            extraClass={"col-md-8 pr-6"}
            placeholder={"Введите текст"}
            type={"text"}
            onChange={handleChange}
            value={input} />
          <Button
            text={"Добавить"}
            extraClass={'mr-6'}
            onClick={addToQueue}
            isLoader={loader}
            disabled={deleteLoader || (tail === queue.length - 1)} />
          <Button
            text={"Удалить"}
            extraClass={'mr-6'}
            onClick={removeFromQueue}
            isLoader={deleteLoader}
            disabled={loader || (head === queue.length)} />
        </div>
        <Button
          text={"Очистить"}
          onClick={clearQueue}
          disabled={loader || deleteLoader} /></div>
      <div className={`d-flex justify-content-center col-md-8 m-auto flex-wrap`}>
        {queue && queue.map((el, index) =>
          <Circle
            letter={el.char}
            state={el.style}
            key={index}
            index={index}
            extraClass={"pr-6 mr-auto"}
            head={isHead(index)}
            tail={isTail(index)} />)}
      </div>
    </SolutionLayout>
  );
};
