import { switchElements } from "../../utils/utils";

export const reverseWord = (str: string) => {
  const arr = str.split('');
  let start = 0;
  let end = arr.length - 1;
  while (start < end) {
    switchElements(arr, start, end)
    start++;
    end--;
  }
  return arr.join('')
}