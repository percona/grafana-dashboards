import React from 'react';
import { shallow } from 'enzyme';
import { XtraDBClusterConnectionItem } from './XtraDBClusterConnectionItem';

describe('XtraDBClusterConnectionItem::', () => {
  it('renders correctly', () => {
    const root = shallow(
      <XtraDBClusterConnectionItem label="Test" value="test" />,
    );
    const span = root.find('span');

    expect(span.length).toBe(2);
    expect(root.find('div').children().length).toBe(2);
  });
  it('renders correctly label and value', () => {
    const root = shallow(
      <XtraDBClusterConnectionItem label="test label" value="test value" />,
    );

    expect(root.text()).toContain('test label');
    expect(root.text()).toContain('test value');
  });
});
