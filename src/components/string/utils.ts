export const switchFunc = <T>(array: T[], firstIndex: number, secondIndex: number): T[] => {
  const temp = array[firstIndex];
  array[firstIndex] = array[secondIndex];
  array[secondIndex] = temp;
  return [...array]
}