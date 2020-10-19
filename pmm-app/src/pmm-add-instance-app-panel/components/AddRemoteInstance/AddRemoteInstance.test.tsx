import { mount } from 'enzyme';
import { Form } from 'react-final-form';
import React from 'react';
import AddRemoteInstance from './AddRemoteInstance';

jest.mock('shared/components/helpers/notification-manager');

describe('Add remote instance', () => {
  it('get instance data should return correct one when isRDS is true', () => {
    const type = 'PostgreSQL';

    const root = mount(<AddRemoteInstance instance={{ type: type, credentials: {} }} />);

    // expect(getInstanceData(instanceType, credentials)).toEqual(testInstance);
  });
});
