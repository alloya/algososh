import React, { useEffect, useState } from "react";
import { Queue } from "../../classes/queue";
import { TCircle } from "../../types/circle";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

const DELAY = 500;
const QUEUE_LENGTH = 8;

export const QueuePage: React.FC = () => {
  const [queue, setQueue] = useState(new Queue<TCircle>(QUEUE_LENGTH));
  const [queueEl, setQueueEl] = useState<(TCircle | null)[]>();
  const [input, setInput] = useState("");
  const [loader, setLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);

  useEffect(() => {
    setQueueEl(queue.elements());
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

  const getCircle = (char: string, style: ElementStates): TCircle => {
    return { char: char, style: style };
  }

  const addToQueue = async () => {
    if (!input.length) { return };
    setLoader(true);
    const el = getCircle(input, ElementStates.Changing);
    queue.enqueue(el);
    setQueueEl(queue.elements());
    await delay(DELAY);
    setInput("");
    el!.style = ElementStates.Default;
    setQueueEl([...queue.elements()]);
    setLoader(false);
  }

  const removeFromQueue = async () => {
      setDeleteLoader(true);
      const el = queue.peak();
      el!.style = ElementStates.Changing;
      setQueueEl([...queue.elements()]);
      await delay(DELAY);
      queue.dequeue();
      setQueueEl([...queue.elements()]);
      setDeleteLoader(false);
  }

  const clearQueue = () => {
    setQueue(new Queue(8));
    const clear = queueEl?.map(el => el = null)
    setQueueEl(clear);
  }

  const isTail = (index: number): string | null => {
    return !queue.isEmpty() && queue.isTail(index + 1) ? "tail" : null
  }

  const isHead = (index: number): string | null => {
    return !queue.isEmpty() && queue.isHead(index) ? "head" : null
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
            disabled={deleteLoader || queue.isFull()} />
          <Button
            text={"Удалить"}
            extraClass={'mr-6'}
            onClick={removeFromQueue}
            isLoader={deleteLoader}
            disabled={loader || queue.isEmpty()} />
        </div>
        <Button
          text={"Очистить"}
          onClick={clearQueue}
          disabled={loader || deleteLoader} /></div>
      <div className={`d-flex justify-content-center col-md-8 m-auto flex-wrap`}>
        {queueEl?.map((el, index) =>
          <Circle
            letter={el?.char}
            state={el?.style}
            key={index}
            index={index}
            extraClass={"pr-6 mr-auto"}
            head={isHead(index)}
            tail={isTail(index)} />)}
      </div>
    </SolutionLayout>
  );
};
