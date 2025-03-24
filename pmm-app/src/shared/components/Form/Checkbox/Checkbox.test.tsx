import React from 'react';
import { render } from '@testing-library/react';
import { Form } from 'react-final-form';
import { CheckboxField } from './Checkbox';

xdescribe('Checkbox field test', () => {
  it('Checkbox renders correct without props', () => {
    const { asFragment } = render(<Form onSubmit={jest.fn()} render={() => <CheckboxField name="test_field" />} />);

    const firstRender = asFragment();

    expect(firstRender).toMatchSnapshot();
  });
});
