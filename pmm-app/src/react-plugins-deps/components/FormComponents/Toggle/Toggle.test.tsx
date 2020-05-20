import React from 'react';
import { mount } from 'enzyme';
import { Form } from 'react-final-form';
import { ToggleField } from './Toggle';

describe('Toggle field', () => {
  it('Toggle renders without props', () => {
    const root = mount(<Form onSubmit={jest.fn()} render={() => <ToggleField name="testField" />} />);

    expect(root.find('button[role="switch"]')).toHaveLength(1);
    expect(root).toMatchSnapshot();

    root.unmount();
  });
});
