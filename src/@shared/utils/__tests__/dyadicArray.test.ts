
import dyadicArray from '../dyadicArray';

test('dyadicArray([1,2,3,4], 2) 等于 [[1,2], [3,4]]', () => {
  expect(dyadicArray([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]]);
  expect(dyadicArray([], 2)).toEqual([]);
})