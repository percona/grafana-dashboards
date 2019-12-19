// Just a stub test
import React from 'react';
import renderer from 'react-test-renderer';
import AlertManager from './AlertManager';
jest.mock('../../../react-plugins-deps/components/helpers/notification-manager', () => () => ({}));
describe('Settings Part test', () => {
  it('Alert Manager renders correct without props', () => {
    const component = renderer.create(
      <AlertManager
        settings={{
          alert_manager_ip: '192.168.0.1',
          alert_manager_rules: 'test rules',
        }}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
