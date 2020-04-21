import { processData, makeApiUrl } from './Check.service';
import { ActiveCheck, Alert } from './types';
import { BASER_URL } from './CheckPanel.constants';
import alerts from './stub.json';

/**
 * @disabled
 * TODO(atymchuk): this test is failing for an unknow reason, needs investigation
 */
describe('CheckService::', () => {
  it('should properly covert Alerts to ActiveChecks', () => {
    const activeChecks = processData(alerts as Alert[]);
    const data: ActiveCheck[] = [
      {
        key: '0',
        name: 'pmm-server',
        failed: [1, 0, 1],
        details: ['The root password is empty', 'MySQL 5.1 is not the latest major version'],
      },
    ];
    expect(activeChecks).toEqual(data);
  });

  it('should create a url for Alertmanager', () => {
    const url = makeApiUrl('status');
    expect(url).toEqual(`${BASER_URL}/status`);
  });
});
