import { saveShowSilencedValue, loadShowSilencedValue } from './FailedChecksTab.utils';
import { SHOW_SILENCED_VALUE_KEY, SHOW_SILENCED_DEFAULT } from './FailedChecksTab.constants';

let getItemSpy: jest.SpyInstance;
let setItemSpy: jest.SpyInstance;

describe('FailedChecksTab::utils', () => {
  beforeEach(() => {
    getItemSpy = jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => 'true');
    setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('saveShowSilencedValue calls localStorage.setItem', () => {
    saveShowSilencedValue(true);

    expect(setItemSpy).toBeCalledTimes(1);
    expect(setItemSpy).toBeCalledWith(SHOW_SILENCED_VALUE_KEY, 'true');
  });

  test('loadShowSilencedValue calls localStorage.getItem', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => 'true');
    const value = loadShowSilencedValue();

    expect(getItemSpy).toBeCalledTimes(1);
    expect(value).toEqual(true);
  });

  test('loadShowSilencedValue the default value if localStorage is not available', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw Error('test error'); });

    const value = loadShowSilencedValue();

    expect(value).toBe(SHOW_SILENCED_DEFAULT);
  });
});
