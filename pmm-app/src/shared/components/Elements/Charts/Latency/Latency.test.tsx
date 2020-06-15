// Just a stub test
import React from 'react';
import renderer from 'react-test-renderer';
import { Latency } from './Latency';

describe('Latency chart test', () => {
  it('Renders correct with empty props', () => {
    const component = renderer.create(<Latency data={{}} />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
