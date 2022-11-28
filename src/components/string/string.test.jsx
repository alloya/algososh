import { reverseWord } from './utils';

describe('reverse string works correctly', () => {
  it('for an empty string', () => {
		expect(reverseWord('')).toStrictEqual('');
	});
  it('for a string with one character', () => {
		expect(reverseWord('a')).toStrictEqual('a');
	});
  it('for a string with odd number characters', () => {
		expect(reverseWord('letters')).toStrictEqual('srettel');
	});
  it('for a string with even number characters', () => {
		expect(reverseWord('letter')).toStrictEqual('rettel');
	});
})