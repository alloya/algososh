import { TCircle } from "../types/circle";
import { ElementStates } from "../types/element-states";

export const getRndInteger = (min:number, max:number) => {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

export const delay = (delay: number) => {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export const switchFunc = <T>(array: T[], firstIndex: number, secondIndex: number): T[] => {
  const temp = array[firstIndex];
  array[firstIndex] = array[secondIndex];
  array[secondIndex] = temp;
  return [...array]
}

export const getRandomCircleArray = () => {
  const array: TCircle[] = [];
  for (let i = 0; i < 5; i++) {
    array.push({ char: getRndInteger(0, 100).toString(), style: ElementStates.Default })
  }
  return array;
}

export const getCircle = (char: string, style: ElementStates): TCircle => {
  return { char: char, style: style };
}