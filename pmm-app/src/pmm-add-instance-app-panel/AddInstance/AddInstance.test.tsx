import React from 'react';
import { shallow } from 'enzyme';

import AddInstance from './AddInstance';

describe('AddInstance page', () => {
  it('AddInstance renders correct without props', () => {
    const tree = shallow(<AddInstance />);
    expect(tree).toMatchSnapshot();
  });
});
