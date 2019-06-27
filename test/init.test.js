import loader from '../src/utils/loader';
import { init, send } from '../src/utils/init';

jest.mock('../src/utils/loader', () => {
  return {
    __esModule: true,
    default: () => {
      global.startdeliver = jest.fn();
    } 
  }
});

describe('Startdeliver script', () => {
  beforeEach(() => {
    global.console.log = jest.fn();
  });

  afterEach(() => {
    global.startdeliver = undefined;
  });

  test('Init react-startdeliver with key, without any params', () => {
    const testKey = 'testKey';

    init(testKey);

    expect(global.startdeliver).toHaveBeenCalledWith('initialize', testKey);
  });

  test('Return null on initializing react-startdeliver with null key. Log the error', () => {
    const testKey = null;

    init(testKey);

    expect(global.startdeliver).toBe(undefined);  
    expect(global.console.log).toHaveBeenCalledWith('USAGE_ID is required to initialize Startdeliver');      
  });

  test('Return null on initializing react-startdeliver with wrong key type. Log the error', () => {
    const testKey1 = 3453;

    init(testKey1);

    expect(global.startdeliver).toBe(undefined);   
  });

  test('Skip loading the script with skipLoader configuration', () => {
    const testKey = 'testKey';

    init(testKey, {
      skipLoader: true
    });

    expect(global.startdeliver).toBe(undefined);
  });

  test('Initialize the script with debug mode', () => {
    const testKey = 'testKey';

    init(testKey, {
      debug: true
    });

    expect(global.startdeliver).toHaveBeenNthCalledWith(1, 'setDebug', true);    
    expect(global.startdeliver).toHaveBeenNthCalledWith(2, 'initialize', testKey);
  });

  test('Send event with payload and initializing', () => {
    const testKey = 'testKey';

    init(testKey);

    const testPayload = { userId: 'test', usageType: 'test'}

    send(testPayload);

    expect(global.startdeliver).toHaveBeenNthCalledWith(1, 'initialize', testKey);
    expect(global.startdeliver).toHaveBeenNthCalledWith(2, 'sendEvent', testPayload);    
  });
});
