import React, { useEffect, useState } from "react";
import { TCircle } from "../../types/circle";
import { ElementStates } from "../../types/element-states";
import { delay, getRndInteger } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

const DELAY = 500;
const defaultLoaders = {
  "addHeadLoader": false,
  "addTailLoader": false,
  "removeHeadLoader": false,
  "removeTailLoader": false,
  "addIndexLoader": false,
  "removeIndexLoader": false
};

type TCircleIndex = TCircle & { index: number };

export const ListPage: React.FC = () => {
  const [queue, setQueue] = useState<TCircle[]>([{ style: ElementStates.Default }]);
  const [input, setInput] = useState("");
  const [indexInput, setIndexInput] = useState("");
  const [tail, setTail] = useState(4);
  const [head, setHead] = useState(0);
  const [loaders, setLoaders] = useState(defaultLoaders);
  const [tailObject, setTailObject] = useState<TCircleIndex>({ char: "", style: ElementStates.Changing, index: -1 });
  const [headObject, setHeadObject] = useState<TCircleIndex>({ char: "", style: ElementStates.Changing, index: -1 });

  useEffect(() => {
    let array: TCircle[] = [];
    for (let i = 0; i < 5; i++) {
      array.push({ char: getRndInteger(0, 100).toString(), style: ElementStates.Default })
    }
    setQueue(array);
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

  const directAdd = async (index: number) => {
    if (input.length) {
      index === head
        ? setLoaders({ ...defaultLoaders, "addHeadLoader": true })
        : setLoaders({ ...defaultLoaders, "addTailLoader": true });
      setHeadObject({ ...headObject, char: input, index: index });
      await delay(DELAY);
      setHeadObject({ ...headObject, char: "", index: -1 });
      index === head
        ? queue.unshift({ char: input, style: ElementStates.Modified })
        : queue.push({ char: input, style: ElementStates.Modified });
      setTail(tail + 1);
      setQueue([...queue]);
      await delay(DELAY);
      setInput("");
      queue[index].style = ElementStates.Default;
      setQueue([...queue]);
      setLoaders({ ...defaultLoaders });
    }
  }

  const directRemove = async (index: number) => {
    index === head
      ? setLoaders({ ...defaultLoaders, "removeHeadLoader": true })
      : setLoaders({ ...defaultLoaders, "removeTailLoader": true });
    setTailObject({ ...tailObject, char: queue[index].char, index: index });
    queue[index].char = "";
    setQueue([...queue]);
    await delay(DELAY);
    setTailObject({ ...tailObject, char: "", index: -1 });
    index === head ? queue.shift() : queue.pop();
    setTail(tail - 1);
    setQueue([...queue]);
    await delay(DELAY);
    setLoaders({ ...defaultLoaders });
  }

  const isTail = (index: number): string | null | React.ReactElement => {
    if (tailObject.index >= 0 && index === tailObject.index) {
      return <Circle state={ElementStates.Changing} letter={tailObject.char} isSmall={true} />
    }
    return index === tail ? "tail" : null
  }

  const isHead = (index: number): string | null | React.ReactElement => {
    if (headObject.index >= 0 && index === headObject.index) {
      return <Circle state={ElementStates.Changing} letter={input} isSmall={true} />
    }
    return (queue[index].char?.length && index === head) ? "head" : null
  }

  return (
    <SolutionLayout title="Очередь">
      <div className={'justify-content-between col-md-8 d-flex m-auto mb-3'}>
        <Input
          maxLength={4}
          isLimitText={true}
          extraClass={"col-md-3"}
          placeholder={"Введите текст"}
          type={"text"}
          onChange={handleChange}
          value={input} />
        <Button
          text={"Добавить в head"}
          onClick={() => directAdd(head)}
          isLoader={loaders.addHeadLoader}
          disabled={false} />
        <Button
          text={"Добавить в tail"}
          onClick={() => directAdd(tail)}
          isLoader={loaders.addTailLoader}
          disabled={false} />
        <Button
          text={"Удалить из head"}
          onClick={() => directRemove(head)}
          isLoader={loaders.removeHeadLoader}
          disabled={false} />
        <Button
          text={"Удалить из tail"}
          extraClass={''}
          onClick={() => directRemove(tail)}
          isLoader={loaders.removeTailLoader}
          disabled={false} />
      </div>
      <div className={'justify-content-between col-md-8 d-flex m-auto mb-5 pb-5'}>
        <Input
          extraClass={"col-md-3"}
          placeholder={"Введите индекс"}
          type={"number"}
          onChange={handleChange}
          value={indexInput} />
        <Button
          extraClass={"col mx-3"}
          text={"Добавить по индексу"}
          // onClick={addToQueue}
          isLoader={loaders.addIndexLoader}
          disabled={false} />
        <Button
          text={"Удалить по индексу"}
          extraClass={'col'}
          //onClick={removeFromQueue}
          isLoader={loaders.removeIndexLoader}
          disabled={false} />
      </div>
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
