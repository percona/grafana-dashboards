import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { SettingsPanel } from './Settings';

jest.mock('shared/components/helpers/notification-manager');
jest.mock('shared/components/hooks/parameters.hook');

describe('SettingsPanel::', () => {
  it('Renders correctly without rendering hidden tab', async () => {
    let root;

    await act(async () => {
      root = mount(<SettingsPanel />);
    });

    const tabs = root.find('[data-qa="settings-tabs"]');

    expect(tabs.children().length).toBe(5);
    expect(root.childAt(0).children().length).toBe(3);
  });
});
