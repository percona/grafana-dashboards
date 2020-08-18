import React from 'react';
import { mount } from 'enzyme';
import { PlatformLogin } from './PlatformLogin';
import { LoggedIn } from './LoggedIn/LoggedIn';

jest.mock('shared/components/helpers/notification-manager');

describe('SignUp::', () => {
  it('Should show a sign up form if an undefined email is passed', () => {
    const root = mount(<PlatformLogin userEmail={undefined} />);
    const loggedInEmail = root.find(LoggedIn).at(0);
    const submitFrom = root.find('[data-qa="sign-up-form"]').at(0);

    expect(loggedInEmail).toHaveLength(0);
    expect(submitFrom).toHaveLength(1);
  });

  it('Should have the "Sign up" button disabled when first rendered', () => {
    const root = mount(<PlatformLogin userEmail={undefined} />);
    const submitButton = root.find('[data-qa="sign-up-submit-button"]').at(0);

    expect(submitButton.props()).toHaveProperty('disabled');
  });

  it('Should show a page saying that the user is logged in if a not undefined email is passed', () => {
    const root = mount(<PlatformLogin userEmail="test@example.com" />);
    const loggedInEmail = root.find(LoggedIn).at(0);

    expect(loggedInEmail).toHaveLength(1);
  });
});
