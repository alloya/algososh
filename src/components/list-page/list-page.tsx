import React, { useRef, useState } from "react";
import { LinkedList } from "./list";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { TCircle } from "../../types/circle";
import { ElementStates } from "../../types/element-states";
import { delay, getCircle, getRandomCircleArray } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

const DEFAULT_LOADERS = {
  "addHeadLoader": false,
  "addTailLoader": false,
  "removeHeadLoader": false,
  "removeTailLoader": false,
  "addIndexLoader": false,
  "removeIndexLoader": false
};

const CHANGING_COLOR = "#d252e1";
const DEFAULT_COLOR = "#0032ff";

type TCircleIndex = TCircle & { index: number };

export const ListPage: React.FC = () => {
  const linkedList = useRef(new LinkedList(getRandomCircleArray())).current;
  const [list, setList] = useState<TCircle[]>(linkedList.getElements());
  const [input, setInput] = useState("");
  const [indexInput, setIndexInput] = useState("");
  const [loaders, setLoaders] = useState(DEFAULT_LOADERS);
  const [tailObject, setTailObject] = useState<TCircleIndex>({ char: "", style: ElementStates.Changing, index: -1 });
  const [headObject, setHeadObject] = useState<TCircleIndex>({ char: "", style: ElementStates.Changing, index: -1 });
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [movingIndex, setMovingIndex] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

  const handleIndexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIndexInput(event.target.value)
  }

  const colorList = async (index: number, type: string) => {
    type === "add"
     ? setLoaders({ ...DEFAULT_LOADERS, "addIndexLoader": true })
     : setLoaders({ ...DEFAULT_LOADERS, "removeIndexLoader": true });
    setDisabled(true);
    let headIndex = 0;
    while (headIndex <= index) {
      setMovingIndex(headIndex);
      list[headIndex].style = ElementStates.Changing;
      setColor(CHANGING_COLOR);
      if (type === "add") {
        setHeadObject({ ...headObject, char: input, index: headIndex });
      }
      setList([...list]);
      await delay(SHORT_DELAY_IN_MS);
      headIndex++;
    }
    if (type === "delete") {
      setTailObject({ ...tailObject, char: list[index].char, index: index });
      list[index].char = '';
      setList([...list]);
      await delay(SHORT_DELAY_IN_MS);
      linkedList.deleteByIndex(index);
      setTailObject({ ...tailObject, char: "", index: -1 });
    }
    if (type === "add") {
      linkedList.addByIndex({ char: input, style: ElementStates.Modified }, index);
      setHeadObject({ ...headObject, char: "", index: -1 });
    }
    setList(linkedList.getElements());
    setMovingIndex(0);
    await delay(SHORT_DELAY_IN_MS);
    linkedList.getElements().map(el => el.style = ElementStates.Default);
    setList([...linkedList.getElements()]);
    setInput('');
    setIndexInput('');
    setDisabled(false);
    setLoaders({ ...DEFAULT_LOADERS });
  }

  const directRemove = async (type: string) => {
    type === 'head'
      ? setLoaders({ ...DEFAULT_LOADERS, "removeHeadLoader": true })
      : setLoaders({ ...DEFAULT_LOADERS, "removeTailLoader": true });
    const index = type === 'head' ? 0 : linkedList.getSize() - 1;
    setDisabled(true);
    setTailObject({ ...tailObject, char: list[index].char, index: index });
    list[index].char = "";
    await delay(SHORT_DELAY_IN_MS);
    setTailObject({ ...tailObject, char: "", index: -1 });
    index === 0 ? linkedList.deleteHead() : linkedList.deleteTail();
    setList([...linkedList.getElements()]);
    await delay(SHORT_DELAY_IN_MS);
    setDisabled(false);
    setLoaders({ ...DEFAULT_LOADERS });
  }

  const directAdd = async (type: string) => {
    if (!input.length) { return };
    type === 'head'
      ? setLoaders({ ...DEFAULT_LOADERS, "addHeadLoader": true })
      : setLoaders({ ...DEFAULT_LOADERS, "addTailLoader": true });
    setDisabled(true);
    setHeadObject({ ...headObject, char: input, index: type === 'head' ? 0 : linkedList.getSize() - 1 });
    await delay(SHORT_DELAY_IN_MS);
    setHeadObject({ ...headObject, char: "", index: -1 });
    const el = getCircle(input, ElementStates.Modified);
    type === 'head' ? linkedList.prepend(el) : linkedList.append(el);
    setList(linkedList.getElements());
    await delay(SHORT_DELAY_IN_MS);
    setInput("");
    el.style = ElementStates.Default;
    setList([...linkedList.getElements()]);
    setDisabled(false);
    setLoaders({ ...DEFAULT_LOADERS });
  }

  const isTail = (index: number): string | null | React.ReactElement => {
    if (tailObject.index >= 0 && index === tailObject.index) {
      return <Circle state={ElementStates.Changing} letter={tailObject.char} isSmall={true} />
    }
    return index === linkedList.getSize() - 1 ? "tail" : null
  }

  const isHead = (index: number): string | null | React.ReactElement => {
    if (headObject.index >= 0 && index === headObject.index) {
      return <Circle state={ElementStates.Changing} letter={input} isSmall={true} />
    }
    return (list[index].char?.length && index === 0) ? "head" : null
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
          onClick={() => directAdd('head')}
          isLoader={loaders.addHeadLoader}
          disabled={disabled} />
        <Button
          text={"Добавить в tail"}
          onClick={() => directAdd('tail')}
          isLoader={loaders.addTailLoader}
          disabled={disabled} />
        <Button
          text={"Удалить из head"}
          onClick={() => directRemove('head')}
          isLoader={loaders.removeHeadLoader}
          disabled={disabled} />
        <Button
          text={"Удалить из tail"}
          extraClass={''}
          onClick={() => directRemove('tail')}
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
          max={list.length - 1} />
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
        {list && list.map((el, index) =>
          <div key={index} className='d-flex align-items-center'>
            <Circle
              letter={el.char}
              state={el.style}
              index={index}
              extraClass={"p-6 mr-auto"}
              head={isHead(index)}
              tail={isTail(index)}
            />
            {(index !== list.length - 1) && <ArrowIcon fill={index < movingIndex ? color : DEFAULT_COLOR} />}
          </div>)
        }
      </div>
    </SolutionLayout>
  );
};
