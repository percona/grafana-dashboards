import { processData, makeApiUrl } from './Check.service';
import { ActiveCheck, Alert } from './types';
import { BASER_URL } from './CheckPanel.constants';
import alerts from './stub.json';

jest.mock('axios');
jest.mock('../react-plugins-deps/components/helpers/notification-manager', () => () => ({
  showErrorNotification: () => {},
}));

describe('CheckService::', () => {
  it('should properly convert Alerts to ActiveChecks', () => {
    const activeChecks = processData(alerts as Alert[]);
    const data: ActiveCheck[] = [
      {
        details: ['The root password is empty', 'MySQL 5.1 is not the latest major version'],
        failed: [1, 0, 1],
        key: '0',
        name: 'sandbox-mysql.acme.com',
      },
      {
        details: ['PMM Server is not the latest major version'],
        failed: [0, 1, 0],
        key: '1',
        name: 'pmm-server-postgresql',
      },
      {
        details: ['MongoDB admin password does not meet the complexity requirement'],
        failed: [0, 1, 0],
        key: '2',
        name: 'mongodb-inst-rpl-1',
      },
    ];
    expect(activeChecks).toEqual(data);
  });

  it('should create a url for Alertmanager', () => {
    const url = makeApiUrl('status');
    expect(url).toEqual(`${BASER_URL}/status`);
  });
});
