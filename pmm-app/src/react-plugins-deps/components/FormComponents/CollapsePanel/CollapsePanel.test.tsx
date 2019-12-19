// Just a stub test
import { CollapsePanelField } from './CollapsePanel';
import React from 'react';
import renderer from 'react-test-renderer';

xdescribe('CollapsePanel field test', () => {
  it('CollapsePanel renders correct without props', () => {
    const component = renderer.create(<CollapsePanelField />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
