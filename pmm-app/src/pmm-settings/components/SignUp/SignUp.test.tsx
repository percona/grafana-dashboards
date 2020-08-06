import React from 'react';
import { mount } from 'enzyme';
import { SignUp } from './SignUp';

describe('SignUp::', () => {
  it('Should have the "Sign up" button disabled when first rendered', () => {
    const root = mount(<SignUp />);
    const submitButton = root.find('[data-qa="sign-up-submit-button"]').at(0);

    expect(submitButton.props()).toHaveProperty('disabled');
  });
});
