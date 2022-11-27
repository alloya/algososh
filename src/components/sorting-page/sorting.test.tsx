import { bubbleSort, selectionSort } from './utils';

describe('select sort works correctly', () => {
  it('for empty array', () => {
		expect(selectionSort([])).toStrictEqual([]);
	});
  it('for array with one element', () => {
		expect(selectionSort([9])).toStrictEqual([9]);
	});
  it('for array with several elements', () => {
		expect(selectionSort([3,4,2,6,7])).toStrictEqual([7,6,4,3,2]);
	});
})

describe('bubble sort works correctly', () => {
  it('for empty array', () => {
		expect(bubbleSort([])).toStrictEqual([]);
	});
  it('for array with one element', () => {
		expect(bubbleSort([9])).toStrictEqual([9]);
	});
  it('for array with several elements', () => {
		expect(bubbleSort([3,4,2,6,7])).toStrictEqual([2,3,4,6,7]);
	});
})