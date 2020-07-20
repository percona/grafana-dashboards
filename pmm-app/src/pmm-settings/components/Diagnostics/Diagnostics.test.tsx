import React from 'react';
import { shallow } from 'enzyme';
import { Diagnostics } from './Diagnostics';

describe('Diagnostics::', () => {
  it('Renders diagnostics correctly', () => {
    const root = shallow(<Diagnostics />);

    expect(root).toMatchSnapshot();
    root.unmount();
  });
});
