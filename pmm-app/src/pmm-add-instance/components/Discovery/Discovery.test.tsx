import { mount } from 'enzyme';
import React from 'react';
import Discovery from './Discovery';

jest.mock('shared/components/helpers/notification-manager');

describe('Discovery instance:: ', () => {
  it('Should render correct', () => {
    const onSelectInstance = jest.fn();

    const root = mount(<Discovery onSelectInstance={onSelectInstance} />);

    root.find('#input-aws_access_key-id').simulate('change', { target: { value: 'My new value' } });
    root.find('#input-aws_secret_key-id' ).simulate('change', { target: { value: 'My new value' } });

    root.find('button[data-qa="credentials-search-button"]').simulate('click');
  });
});
