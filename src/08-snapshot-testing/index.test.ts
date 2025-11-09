import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const values = [5, 10, 15];
    const resultList = generateLinkedList(values);
    console.log(values);
    const neededLinkedList = {
      value: 5,
      next: {
        value: 10,
        next: {
          value: 15,
          next: {
            value: null,
            next: null,
          },
        },
      },
    };
    expect(resultList).toStrictEqual(neededLinkedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const values = [10, 15, 20];
    const resultList = generateLinkedList(values);
    expect(resultList).toMatchSnapshot();
  });
});
