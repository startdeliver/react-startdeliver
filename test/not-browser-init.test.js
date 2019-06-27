/**
 * @jest-environment node
 */
import loader from '../src/utils/loader';
import { init } from '../src/utils/init';

jest.mock('../src/utils/loader', () => {
  return {
    __esModule: true,
    default: () => {
      global.startdeliver = jest.fn();
    } 
  }
});

describe('Startdeliver script in node environment', () => {
  test('Do not load script if not a browser', () => {
    const testKey = 'testKey';

    init(testKey);

    expect(global.startdeliver).toBe(undefined);
  });
});
