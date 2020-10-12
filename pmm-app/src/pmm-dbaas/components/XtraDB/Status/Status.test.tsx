import React from 'react';
import { shallow } from 'enzyme';
import { Status } from './Status';

describe('Status::', () => {
  it('renders correctly when active', () => {
    const root = shallow(
      <Status active label="Test" />,
    );

    expect(root.prop('className')).toContain('active');
    expect(root.text()).toBe('Test');
  });

  it('renders correctly when not active', () => {
    const root = shallow(
      <Status active={false} label="Test" />,
    );

    expect(root.prop('className')).not.toContain('active');
    expect(root.text()).toBe('Test');
  });
});
