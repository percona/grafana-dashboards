import React from 'react';
import { shallow } from 'enzyme';
import { OverflowTooltip } from './OverflowTooptip';

xdescribe('OverflowTooltip test', () => {
  it('OverflowTooltip renders correctly with children', () => {
    const tree = shallow(<OverflowTooltip>Test label</OverflowTooltip>);

    expect(tree).toMatchSnapshot();
    tree.unmount();
  });
});
