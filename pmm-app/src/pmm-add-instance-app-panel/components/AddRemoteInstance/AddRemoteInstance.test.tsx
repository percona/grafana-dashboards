import { mount } from 'enzyme';
import React from 'react';
import AddRemoteInstance from './AddRemoteInstance';

jest.mock('shared/components/helpers/notification-manager');

describe('Add remote instance', () => {
  it('get instance data should return correct one when isRDS is true', () => {
    const type = 'AddInstance';

    const root = mount(<AddRemoteInstance instance={{ type, credentials: {} }} />);

    root.find('form[data-qa="add-remote-instance-form"]').simulate('submit');

    // expect(updateSettings).toHaveBeenCalled();
  });
});
