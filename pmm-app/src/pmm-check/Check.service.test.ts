import { processData, sumFailedChecks, makeApiUrl } from './Check.service';
import { Alert } from './types';
import { API } from '../shared/core';
import { activeCheckStub, alertsStub } from './__mocks__/stubs';

jest.mock('axios');
jest.mock('shared/components/helpers/notification-manager');

describe('CheckService::', () => {
  it('should properly convert Alerts to ActiveChecks', () => {
    const activeChecks = processData(alertsStub as Alert[]);

    expect(activeChecks).toEqual(activeCheckStub);
  });

  it('should properly convert Alerts to a total of FailedChecks', () => {
    const failedChecks = sumFailedChecks(processData(alertsStub as Alert[]));

    expect(failedChecks).toEqual([1, 2, 1]);
  });

  it('should create a url for Alertmanager', () => {
    const url = makeApiUrl('status');

    expect(url).toEqual(`${API.ALERTMANAGER}/status`);
  });
});
