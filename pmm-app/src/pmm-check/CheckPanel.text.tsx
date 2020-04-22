import React from 'react';
import { CheckPanel } from './CheckPanel';
import { mount } from 'enzyme';
import stub from './stub.json';

jest.mock('axios');

jest.mock('../react-plugins-deps/components/helpers/notification-manager', () => () => ({
  showErrorNotification: () => {},
}));

jest.mock('./Check.service', () => () => ({
  getActiveAlerts: async () => stub,
}));
/**
 * @disabled
 * TODO(atymchuk): implement the mocks
 */
describe('CheckPanel::', () => {
  it('should ', () => {
    const props: any = {
      width: 1200,
      height: 450,
      options: {
        title: 'DB CHECKS',
      },
    };
    const root = mount(<CheckPanel {...props} />);
    expect(
      root
        .find('div.check-panel > div > div > div')
        .at(0)
        .text()
    ).toEqual('DB CHECKS');
  });
});
