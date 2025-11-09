import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: '+', expected: 3 },
  { a: 2, b: 2, action: '+', expected: 4 },
  { a: 3, b: 2, action: '+', expected: 5 },
  { a: 4, b: 2, action: '+', expected: 6 },
  { a: 10, b: 15, action: '+', expected: 25 },
  { a: 3, b: 2, action: '-', expected: 1 },
  { a: 5, b: 2, action: '-', expected: 3 },
  { a: 7, b: 2, action: '-', expected: 5 },
  { a: 100, b: 2, action: '-', expected: 98 },
  { a: 1000, b: 2, action: '-', expected: 998 },
  { a: 3, b: 2, action: '*', expected: 6 },
  { a: 3, b: 3, action: '*', expected: 9 },
  { a: 5, b: 2, action: '*', expected: 10 },
  { a: 5, b: 3, action: '*', expected: 15 },
  { a: 7, b: 2, action: '*', expected: 14 },
  { a: 3, b: 2, action: '/', expected: 1.5 },
  { a: 5, b: 2, action: '/', expected: 2.5 },
  { a: 7, b: 2, action: '/', expected: 3.5 },
  { a: 12, b: 2, action: '/', expected: 6 },
  { a: 1000, b: 2, action: '/', expected: 500 },
  {
    a: 3,
    b: 2,
    action: '^',
    expected: 9,
  },
  { a: 3, b: 3, action: '^', expected: 27 },
  { a: 5, b: 2, action: '^', expected: 25 },
  { a: 5, b: 3, action: '^', expected: 125 },
  { a: 7, b: 2, action: '^', expected: 49 },
  {
    a: 3,
    b: 2,
    action: 'Action.Exponentiate',
    expected: null,
  },
  {
    a: 3,
    b: 2,
    action: '+-',
    expected: null,
  },
  {
    a: 3,
    b: 2,
    action: '-/',
    expected: null,
  },
  {
    a: 3,
    b: 2,
    action: '*-',
    expected: null,
  },
  {
    a: 3,
    b: 2,
    action: '**',
    expected: null,
  },
  { a: '', b: '', action: Action.Divide, expected: null },
  { a: 1, b: '', action: Action.Divide, expected: null },
  { a: '', b: 1, action: Action.Divide, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should perform arithmetic operations correctly',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
