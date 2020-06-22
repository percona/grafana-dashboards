// Just a stub test
import React from 'react';
import { shallow } from 'enzyme';
import { Latency } from './Latency';

describe('Latency chart test', () => {
  it('Renders correct with empty props', () => {
    const component = shallow(<Latency data={{}} />);

    expect(component).toMatchSnapshot();
  });
});
