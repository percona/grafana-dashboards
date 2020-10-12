import React from 'react';
import { shallow } from 'enzyme';
import { Button, Spinner } from '@grafana/ui';
import { ButtonWithSpinner } from './ButtonWithSpinner';

describe('CheckPanel::', () => {
  it('should hide the spinner by default', () => {
    const wrapper = shallow(<ButtonWithSpinner>Test text</ButtonWithSpinner>);

    expect(
      wrapper
        .find(Button)
        .find(Spinner)
        .length,
    ).toEqual(0);
    expect(
      wrapper
        .find(Button)
        .text(),
    ).toEqual('Test text');

    wrapper.unmount();
  });

  it('should show children if not loading', () => {
    const wrapper = shallow(<ButtonWithSpinner isLoading>Test text</ButtonWithSpinner>);

    expect(
      wrapper
        .find(Button)
        .find(Spinner)
        .length,
    ).toEqual(1);
    expect(
      wrapper
        .find(Button)
        .text(),
    ).not.toContain('Test text');

    wrapper.unmount();
  });
});
