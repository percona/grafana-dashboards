import React from 'react';
import { mount } from 'enzyme';
import { DBaaSPanel } from './DBaaS';

jest.mock('shared/components/helpers/notification-manager');

describe('DBaaSPanel::', () => {
  it('renders tabs correctly', () => {
    const root = mount(<DBaaSPanel />);
    const tabs = root.find('ul');

    expect(tabs.children().length).toBe(1);
  });
});
