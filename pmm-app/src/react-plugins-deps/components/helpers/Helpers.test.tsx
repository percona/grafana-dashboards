// Just a stub test
import { PluginTooltip, VerticalFormWrapper } from './Helpers';
import React from 'react';
import renderer from 'react-test-renderer';

describe('VerticalFormWrapper component test', () => {
  it('Renders correct with right props', () => {
    const MockElement = () => {
      return null;
    };
    const component = renderer.create(
      <VerticalFormWrapper alignLabel={'top'} label={'test label'} tooltip={'test tooltip'} element={<MockElement />} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('PlsuginTooltip component test', () => {
  it('Renders correct with right props', () => {
    const component = renderer.create(<PluginTooltip links={[{ url: '/test-url', text: 'Some text' }]} text={'test tooltip text'} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
