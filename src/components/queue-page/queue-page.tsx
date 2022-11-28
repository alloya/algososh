import React, { useEffect, useState } from "react";
import { Queue } from "./queue";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { TCircle } from "../../types/circle";
import { ElementStates } from "../../types/element-states";
import { delay, getCircle } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

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

  const addToQueue = async () => {
    if (!input.length) { return };
    setLoader(true);
    const el = getCircle(input, ElementStates.Changing);
    queue.enqueue(el);
    setQueueEl(queue.elements());
    await delay(SHORT_DELAY_IN_MS);
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
    await delay(SHORT_DELAY_IN_MS);
    queue.dequeue();
    setQueueEl([...queue.elements()]);
    setDeleteLoader(false);
  }

  const clearQueue = () => {
    setQueue(new Queue(QUEUE_LENGTH));
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
              onClick={addToQueue}
              isLoader={loader}
              disabled={deleteLoader || queue.tailIndex() === queueEl?.length || !input.length} />
            <Button
              text={"Удалить"}
              extraClass={'col-auto mr-6'}
              onClick={removeFromQueue}
              isLoader={deleteLoader}
              disabled={loader || queue.isEmpty()} />
            <Button
              text={"Очистить"}
              onClick={clearQueue}
              extraClass={'col-auto'}
              disabled={loader || deleteLoader} />
          </div>
        </div>
      </div>
      <div className={`d-flex justify-content-center col-md-8 m-auto flex-wrap`}>
        {queueEl?.map((el, index) =>
          <Circle
            letter={el?.char}
            state={el?.style}
            key={index}
            index={index}
            extraClass={"pr-6 mr-auto mb-30"}
            head={isHead(index)}
            tail={isTail(index)}
            innerIndex={index} />)}
      </div>
    </SolutionLayout>
  );
};
