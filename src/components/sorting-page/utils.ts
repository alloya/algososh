import { Direction } from "../../types/direction"
import { switchElements } from "../../utils/utils";

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
    numArray = switchElements(numArray, lastSortedIndex !== null ? lastSortedIndex + 1 : 0, minIndex);
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
      switchElements(numArray, firstIndex, secondIndex);
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

export const selectionSort = (array: number[]) => {
	const { length } = array;
	for (let i = 0; i < length; i++) {
		let maxInd = i;
		for (let j = i + 1; j < length; j++) {
			if (array[maxInd] < array[j]) {
				maxInd = j;
			}
		}
		if (maxInd !== i) {
			switchElements(array, i, maxInd);
		}
	}
	return array;
};

export const bubbleSort = (array: number[]) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j]> array[j+1]) {
        switchElements(array, j, j + 1);
      }
    }
  }
  return array;
}