import React, { useEffect, useState } from "react";
import { LinkedList } from "../../classes/list";
import { TCircle } from "../../types/circle";
import { ElementStates } from "../../types/element-states";
import { delay, getRndInteger } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
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

const changingColor = "#d252e1";
const defaultColor = "#0032ff";
let disabled = false;

type TCircleIndex = TCircle & { index: number };

export const ListPage: React.FC = () => {
  const [list, setList] = useState<LinkedList<TCircle>>();
  const head = 0;
  const [queue, setQueue] = useState<TCircle[]>([{ style: ElementStates.Default }]);
  const [input, setInput] = useState("");
  const [indexInput, setIndexInput] = useState("");
  const [tail, setTail] = useState(4);
  const [loaders, setLoaders] = useState(defaultLoaders);
  const [tailObject, setTailObject] = useState<TCircleIndex>({ char: "", style: ElementStates.Changing, index: -1 });
  const [headObject, setHeadObject] = useState<TCircleIndex>({ char: "", style: ElementStates.Changing, index: -1 });
  const [color, setColor] = useState(defaultColor);
  const [movingIndex, setMovingIndex] = useState(0); 

  useEffect(() => {
    let array: TCircle[] = [];
    for (let i = 0; i < 5; i++) {
      array.push({ char: getRndInteger(0, 100).toString(), style: ElementStates.Default })
    }
    setQueue(array);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

  const handleIndexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIndexInput(event.target.value)
  }

  const colorList = async (index: number, type: string) => {
    setLoaders({ ...defaultLoaders, "addIndexLoader": true });
    disabled = true;
    let headIndex = head;
    while (headIndex <= index) {
      setMovingIndex(headIndex);
      queue[headIndex].style = ElementStates.Changing;
      setColor(changingColor);
      if (type === "add") {
        setHeadObject({...headObject, char: queue[headIndex].char, index: headIndex });
      }
      setQueue([...queue]);
      await delay(DELAY);
      headIndex++;
    }
    if (type === "delete") {
      setTailObject({...tailObject, char: queue[index].char, index: index});
      queue[index].char = '';
      setQueue([...queue]);
      await delay(DELAY);
    }
    const newList = [...queue];
    if (type === "add") {
      newList.splice(headIndex-1, 0, {char: input, style: ElementStates.Modified});
      setHeadObject({ ...headObject, char: "", index: -1 });
      setTail(tail + 1);
    }
    if (type === "delete") {
      newList.splice(index, 1);
      setTailObject({...tailObject, char: "", index: -1});
      setTail(tail - 1);
    }
    setQueue([...newList]);
    setMovingIndex(0);
    await delay(DELAY);
    newList.map(el => el.style = ElementStates.Default);
    setQueue([...newList]);
    disabled = false;
    setLoaders({ ...defaultLoaders });
  }

  const directAdd = async (index: number) => {
    if (input.length) {
      index === head
        ? setLoaders({ ...defaultLoaders, "addHeadLoader": true })
        : setLoaders({ ...defaultLoaders, "addTailLoader": true });
      disabled = true;
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
      queue[index === head ? index : index + 1].style = ElementStates.Default;
      setQueue([...queue]);
      disabled = false;
      setLoaders({ ...defaultLoaders });
    }
  }

  const directRemove = async (index: number) => {
    index === head
      ? setLoaders({ ...defaultLoaders, "removeHeadLoader": true })
      : setLoaders({ ...defaultLoaders, "removeTailLoader": true });
    disabled = true;
    setTailObject({ ...tailObject, char: queue[index].char, index: index });
    queue[index].char = "";
    setQueue([...queue]);
    await delay(DELAY);
    setTailObject({ ...tailObject, char: "", index: -1 });
    index === 0 ? queue.shift() : queue.pop();
    setTail(tail - 1);
    setQueue([...queue]);
    await delay(DELAY);
    disabled = false;
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
    <SolutionLayout title="Связанный список">
      <div className={'justify-content-between col-md-8 d-flex m-auto mb-3'}>
        <Input
          maxLength={4}
          isLimitText={true}
          extraClass={"col-md-3"}
          placeholder={"Введите число"}
          type={"text"}
          onChange={handleChange}
          value={input} />
        <Button
          text={"Добавить в head"}
          onClick={() => directAdd(head)}
          isLoader={loaders.addHeadLoader}
          disabled={disabled} />
        <Button
          text={"Добавить в tail"}
          onClick={() => directAdd(tail)}
          isLoader={loaders.addTailLoader}
          disabled={disabled} />
        <Button
          text={"Удалить из head"}
          onClick={() => directRemove(head)}
          isLoader={loaders.removeHeadLoader}
          disabled={disabled} />
        <Button
          text={"Удалить из tail"}
          extraClass={''}
          onClick={() => directRemove(tail)}
          isLoader={loaders.removeTailLoader}
          disabled={disabled} />
      </div>
      <div className={'justify-content-between col-md-8 d-flex m-auto mb-5 pb-5'}>
        <Input
          extraClass={"col-md-3"}
          placeholder={"Введите индекс"}
          type={"number"}
          onChange={handleIndexChange}
          value={indexInput} 
          max={queue.length - 1}/>
        <Button
          extraClass={"col mx-3"}
          text={"Добавить по индексу"}
          onClick={() => colorList(Number(indexInput), "add")}
          isLoader={loaders.addIndexLoader}
          disabled={disabled} />
        <Button
          text={"Удалить по индексу"}
          extraClass={'col'}
          onClick={() => colorList(Number(indexInput), "delete")}
          isLoader={loaders.removeIndexLoader}
          disabled={disabled} />
      </div>
      <div className={`d-flex justify-content-center col-md-10 m-auto flex-wrap`}>
        {queue && queue.map((el, index) =>
          <div key={index} className='d-flex align-items-center'>
            <Circle
              letter={el.char}
              state={el.style}
              index={index}
              extraClass={"p-6 mr-auto"}
              head={isHead(index)}
              tail={isTail(index)} />
            {(index !== queue.length - 1) && <ArrowIcon fill={index < movingIndex ? color : defaultColor}/>}
          </div>)}
      </div>
    </SolutionLayout>
  );
};