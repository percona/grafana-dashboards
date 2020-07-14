import React from 'react';
import { shallow } from 'enzyme';
import { Button, Spinner } from '@grafana/ui';
import { ButtonWithSpinner } from './ButtonWithSpinner';

describe('CheckPanel::', () => {
  it('should hide the spinner by default', () => {
    const wrapper = shallow(<ButtonWithSpinner />);

    expect(
      wrapper
        .find(Button)
        .find(Spinner)
        .length
    ).toEqual(0);

    wrapper.unmount();
  });

  it('should show a spinner if isLoading is set', () => {
    const wrapper = shallow(<ButtonWithSpinner isLoading />);

    expect(
      wrapper
        .find(Button)
        .find(Spinner)
        .length
    ).toEqual(1);

    wrapper.unmount();
  });
});
