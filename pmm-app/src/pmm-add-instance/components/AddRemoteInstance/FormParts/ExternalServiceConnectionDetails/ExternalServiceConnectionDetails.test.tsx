import { mount } from 'enzyme';
import React from 'react';
import { dataQa } from '@percona/platform-core';
import { Form } from 'react-final-form';
import { act } from 'react-dom/test-utils';
import { ExternalServiceConnectionDetails } from './ExternalServiceConnectionDetails';

jest.mock('shared/components/helpers/notification-manager');

describe('Add remote instance:: ', () => {
  it('should render correct for mysql and highlight empty mandatory fields on submit', async () => {
    const root = mount(
      <Form
        onSubmit={jest.fn()}
        mutators={{
          setValue: ([field, value], state, { changeValue }) => {
            changeValue(state, field, () => value);
          },
        }}
        render={({ form }) => <ExternalServiceConnectionDetails form={form} />}
      />,
    );

    root
      .find(dataQa('url-text-input'))
      .simulate('change', { target: { value: 'https://admin:admin@localhost/metrics' } });

    await act(async () => {
      root.find('button#parseUrl').simulate('click');
    });

    root.update();

    expect(root.find('#https[type="radio"]').length).toBe(1);
    expect(root.find(dataQa('address-text-input')).props().value).toEqual('localhost');
    expect(root.find(dataQa('metrics_path-text-input')).props().value).toEqual('/metrics');
    expect(root.find(dataQa('port-text-input')).props().value).toEqual('443');
    expect(root.find(dataQa('username-text-input')).props().value).toEqual('admin');
    expect(root.find(dataQa('password-password-input')).props().value).toEqual('admin');
  });
});
