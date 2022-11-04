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