import React from 'react';
import { shallow } from 'enzyme';
import AlertManager from './AlertManager';

jest.mock('shared/components/helpers/notification-manager');

describe('Settings Part test', () => {
  it('Alert Manager renders correct without props', () => {
    const root = shallow(
      <AlertManager
        settings={{
          alert_manager_url: 'http://localhost',
          alert_manager_rules: 'test rules',
        }}
      />,
    );

    expect(root).toMatchSnapshot();
    root.unmount();
  });
});
