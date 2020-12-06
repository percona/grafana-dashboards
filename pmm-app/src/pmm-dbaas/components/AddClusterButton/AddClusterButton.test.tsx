import React from 'react';
import { mount } from 'enzyme';
import { dataQa } from '@percona/platform-core';
import { AddClusterButton } from './AddClusterButton';

describe('AddClusterButton::', () => {
  it('renders correctly and calls action', () => {
    const action = jest.fn();
    const root = mount(
      <AddClusterButton
        label="test"
        action={action}
      />,
    );
    const button = root.find('button');

    button.simulate('click');

    expect(button.text()).toEqual('test');
    expect(action).toHaveBeenCalled();
    expect(root.contains(dataQa('add-cluster-button-warning'))).toBeFalsy();
  });
  it('renders correctly with warning', () => {
    const action = jest.fn();
    const root = mount(
      <AddClusterButton
        label="test"
        action={action}
        warningMessage="Test warning"
        showWarning
      />,
    );
    const warning = root.find(dataQa('add-cluster-button-warning'));

    expect(warning).toBeTruthy();
    expect(warning.text()).toContain('Test warning');
  });
  it('disables button correctly', () => {
    const action = jest.fn();
    const root = mount(
      <AddClusterButton
        label="test"
        action={action}
        disabled
      />,
    );
    const button = root.find('button');

    button.simulate('click');

    expect(action).not.toHaveBeenCalled();
    expect(button.prop('disabled')).toBeTruthy();
  });
});
