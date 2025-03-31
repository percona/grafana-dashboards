import React from 'react';
import { render } from '@testing-library/react';
import { PluginTooltip } from './Helpers';

describe('PluginTooltip', () => {
  it('Renders with right props', () => {
    const { asFragment } = render(
      <PluginTooltip links={[{ url: '/test-url', text: 'Some text' }]} text="test tooltip text" />,
    );

    const firstRender = asFragment();

    expect(firstRender).toMatchSnapshot();
  });
});
