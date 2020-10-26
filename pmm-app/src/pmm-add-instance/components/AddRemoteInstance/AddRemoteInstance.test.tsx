import { mount } from 'enzyme';
import React from 'react';
import AddRemoteInstance from './AddRemoteInstance';

jest.mock('shared/components/helpers/notification-manager');

describe('Add remote instance:: ', () => {
  it('should render correct', () => {
    const type = 'mysql';

    const root = mount(<AddRemoteInstance instance={{ type, credentials: {} }} />);

    root.find('form[data-qa="add-remote-instance-form"]').simulate('submit');
  });
});
