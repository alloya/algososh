import { Direction } from "../../types/direction"
import { switchFunc } from "../../utils/utils";

export type sorting = {
  numArray: number[],
  minIndex: number,
  comparedIndex: number,
  lastSortedIndex: number | null
}

export const selectSortIteration = ({ numArray, minIndex, comparedIndex, lastSortedIndex }: sorting, sortingType: Direction): sorting => {
  if ((sortingType === Direction.Ascending)
    ? numArray[minIndex] > numArray[comparedIndex]
    : numArray[minIndex] < numArray[comparedIndex]) {
    minIndex = comparedIndex;
  }
  comparedIndex++;
  if (comparedIndex >= numArray.length) {
    numArray = switchFunc(numArray, lastSortedIndex !== null ? lastSortedIndex + 1 : 0, minIndex);
    lastSortedIndex !== null ? lastSortedIndex++ : lastSortedIndex = 0;
    minIndex = lastSortedIndex + 1;
    comparedIndex = minIndex + 1;
  }
  return { numArray, minIndex, comparedIndex, lastSortedIndex } as sorting;
}