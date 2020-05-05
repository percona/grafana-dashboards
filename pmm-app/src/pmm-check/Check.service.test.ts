import { processData, makeApiUrl } from './Check.service';
import { Alert } from './types';
import { BASER_URL } from './CheckPanel.constants';
import { activeCheckStub, alertsStub } from './__mocks__/stubs';

jest.mock('axios');
jest.mock('../react-plugins-deps/components/helpers/notification-manager');

describe('CheckService::', () => {
  it('should properly convert Alerts to ActiveChecks', () => {
    const activeChecks = processData(alertsStub as Alert[]);
    console.log('stub', activeChecks);
    expect(activeChecks).toEqual(activeCheckStub);
  });

  it('should create a url for Alertmanager', () => {
    const url = makeApiUrl('status');
    expect(url).toEqual(`${BASER_URL}/status`);
  });
});
