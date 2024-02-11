// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const relativePath = '/posts';
    const baseUrl = 'https://jsonplaceholder.typicode.com';
    const axiosCreate = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(relativePath);
    expect(axiosCreate).toHaveBeenCalledTimes(1);
    expect(axiosCreate).toHaveBeenCalledWith({ baseURL: baseUrl });
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = '/posts';
    const axiosCreate = jest.spyOn(axios, 'create');
    const axiosClient = axios.create({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
    axiosCreate.mockReturnValue(axiosClient);
    const axiosClientGet = jest.spyOn(axiosClient, 'get');
    await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();
    expect(axiosClientGet).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const responseData = { title: 'Hello' };
    const relativePath = '/posts';
    axios.Axios.prototype.get = jest
      .fn()
      .mockResolvedValue({ data: responseData });
    const result = await throttledGetDataFromApi(relativePath);
    expect(result).toEqual(responseData);
  });
});
