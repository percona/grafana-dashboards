import React from 'react';
import renderer from 'react-test-renderer';
import { OverflowTooltip } from './OverflowTooptip';

xdescribe('OverflowTooltip test', () => {
  it('OverflowTooltip renders correctly with children', () => {
    const tree = renderer.create(<OverflowTooltip>Test label</OverflowTooltip>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
