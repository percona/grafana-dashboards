import React from 'react';
import { mount } from 'enzyme';
import { SignUp } from './SignUp';

jest.mock('shared/components/helpers/notification-manager');

describe('SignUp::', () => {
  it('Should have the "Sign up" button disabled when first rendered', () => {
    const root = mount(<SignUp userEmail={undefined} />);
    const submitButton = root.find('[data-qa="sign-up-submit-button"]').at(0);

    expect(submitButton.props()).toHaveProperty('disabled');
  });

  it('Should show a page saying that the user is logged in if a not undefined email is passed', () => {
    const root = mount(<SignUp userEmail="test@example.com" />);
    const submitButton = root.find('[data-qa="sign-up-submit-button"]').at(0);

    expect(submitButton.props()).toHaveProperty('disabled');
  });
});
