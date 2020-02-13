// Just a stub test
import LatencyChart from './LatencyChart';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Latency chart test', () => {
  it('Renders correct with empty props', () => {
    const component = renderer.create(<LatencyChart data={{}} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
