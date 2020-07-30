import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { SettingsPanel } from './Settings';

jest.mock('shared/components/helpers/notification-manager');

describe('SettingsPanel::', () => {
  it('Renders correctly', async () => {
    let root;

    await act(async () => {
      root = mount(<SettingsPanel />);
    });

    const tabs = root.find('[data-qa="settings-tabs"]');

    expect(tabs.children().length).toBe(4);
    expect(root.childAt(0).children().length).toBe(3);
  });
});
