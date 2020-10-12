import React from 'react';
import { mount } from 'enzyme';
import { PluginTooltip } from './Helpers';

describe('PluginTooltip', () => {
  it('Renders with right props', () => {
    const root = mount(
      <PluginTooltip links={[{ url: '/test-url', text: 'Some text' }]} text="test tooltip text" />,
    );

    expect(root).toMatchSnapshot();
    root.unmount();
  });
});
