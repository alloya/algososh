import { Direction } from "../../types/direction"
import { switchFunc } from "../../utils/utils";

export type TColoring = {
  numArray: number[],
  firstIndex: number,
  secondIndex: number,
  sortedIndex: number | null
}

export const selectSortIteration = ({ numArray, firstIndex: minIndex, secondIndex: comparingIndex, sortedIndex: lastSortedIndex }: TColoring, sortingType: Direction): TColoring => {
  if ((sortingType === Direction.Ascending)
    ? numArray[minIndex] > numArray[comparingIndex]
    : numArray[minIndex] < numArray[comparingIndex]) {
    minIndex = comparingIndex;
  }
  comparingIndex++;
  if (comparingIndex >= numArray.length) {
    numArray = switchFunc(numArray, lastSortedIndex !== null ? lastSortedIndex + 1 : 0, minIndex);
    lastSortedIndex !== null ? lastSortedIndex++ : lastSortedIndex = 0;
    minIndex = lastSortedIndex + 1;
    comparingIndex = minIndex + 1;
  }
  return { numArray, firstIndex: minIndex, secondIndex: comparingIndex, sortedIndex: lastSortedIndex } as TColoring;
}

export const bubbleSortIteration = ({numArray, firstIndex, secondIndex, sortedIndex}: TColoring, sortingType: Direction) => {
  if ((sortingType === Direction.Ascending)
    ? numArray[firstIndex] > numArray[secondIndex]
    : numArray[firstIndex] < numArray[secondIndex]) {
      switchFunc(numArray, firstIndex, secondIndex);
  }
  firstIndex++
  secondIndex++;
  if (secondIndex >= (sortedIndex || numArray.length)) {
    sortedIndex !== null ? sortedIndex-- : sortedIndex = numArray.length - 1;
    firstIndex = 0;
    secondIndex = 1;
  }
  return { numArray, firstIndex, secondIndex, sortedIndex } as TColoring;
}