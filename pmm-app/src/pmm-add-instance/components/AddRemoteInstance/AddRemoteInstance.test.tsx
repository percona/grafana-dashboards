import { mount } from 'enzyme';
import React from 'react';
import AddRemoteInstance from './AddRemoteInstance';

jest.mock('shared/components/helpers/notification-manager');

describe('Add remote instance:: ', () => {
  it('should render correct for mysql', () => {
    const type = 'mysql';

    const root = mount(<AddRemoteInstance instance={{ type, credentials: {} }} selectInstance={jest.fn()} />);

    root.find('form[data-qa="add-remote-instance-form"]').simulate('submit');
  });

  it('should render for external', () => {
    const type = 'external';

    const root = mount(<AddRemoteInstance instance={{ type, credentials: {} }} selectInstance={jest.fn()} />);

    root.find('form[data-qa="add-remote-instance-form"]').simulate('submit');
  });
});
