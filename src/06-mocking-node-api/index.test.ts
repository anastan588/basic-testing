import path from 'path';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 500;
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, timeout);
    expect(setTimeout).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 500;
    doStuffByTimeout(callback, timeout);
    jest.runAllTimers();
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const interval = 500;
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, interval);
    expect(setInterval).toHaveBeenCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 500;
    const numberOfIntervals = 10;
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, interval);
    jest.advanceTimersByTime(interval * numberOfIntervals);
    expect(setInterval).toHaveBeenCalledWith(callback, interval);
    expect(callback).toHaveBeenCalledTimes(numberOfIntervals);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = './index.ts';
    jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);
    expect(path.join).toHaveBeenCalledWith(expect.any(String), pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = './notindex.ts';
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = './index.ts';
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBeTruthy();
    expect(typeof result).toBe('string');
  });
});
