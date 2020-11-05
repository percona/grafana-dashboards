import { mount } from 'enzyme';
import React from 'react';
import Discovery from './Discovery';

jest.mock('shared/components/helpers/notification-manager');

describe('Discovery instance:: ', () => {
  it('Should render correct', () => {
    const selectInstance = jest.fn();

    const root = mount(<Discovery selectInstance={selectInstance} />);

    expect(root.find('#input-aws_access_key-id').length).toBe(1);
    expect(root.find('#input-aws_secret_key-id').length).toBe(1);
    expect(root.find('button[data-qa="credentials-search-button"]').length).toBe(1);
  });
});
