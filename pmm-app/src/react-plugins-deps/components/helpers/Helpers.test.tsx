// Just a stub test
import { PluginTooltip } from './Helpers';
import React from 'react';
import renderer from 'react-test-renderer';

describe('PlsuginTooltip component test', () => {
  it('Renders correct with right props', () => {
    const component = renderer.create(<PluginTooltip links={[{ url: '/test-url', text: 'Some text' }]} text="test tooltip text" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
