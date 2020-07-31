import React from 'react';
import { shallow } from 'enzyme';
import Diagnostics from './Diagnostics';

describe('Diagnostics part', () => {
  it('Renders diagnostics', () => {
    const root = shallow(<Diagnostics />);

    expect(root).toMatchSnapshot();
    root.unmount();
  });
});
