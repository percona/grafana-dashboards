import React from 'react';
import renderer from 'react-test-renderer';
import { PluginTooltip } from './Helpers';

describe('PluginTooltip', () => {
  it('Renders with right props', () => {
    const tree = renderer.create(
      <PluginTooltip links={[{ url: '/test-url', text: 'Some text' }]} text="test tooltip text" />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
