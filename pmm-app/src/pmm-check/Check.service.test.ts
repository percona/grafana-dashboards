import { processData, makeApiUrl } from './Check.service';
import { Alert } from './types';
import { API } from '../react-plugins-deps/core';
import { activeCheckStub, alertsStub } from './__mocks__/stubs';

jest.mock('axios');
jest.mock('../react-plugins-deps/components/helpers/notification-manager');

describe('CheckService::', () => {
  it('should properly convert Alerts to ActiveChecks', () => {
    const activeChecks = processData(alertsStub as Alert[]);
    expect(activeChecks).toEqual(activeCheckStub);
  });

  it('should create a url for Alertmanager', () => {
    const url = makeApiUrl('status');
    expect(url).toEqual(`${API.ALERTMANAGER}/status`);
  });
});
