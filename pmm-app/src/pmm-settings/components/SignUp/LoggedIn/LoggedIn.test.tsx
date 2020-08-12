import React from 'react';
import { shallow } from 'enzyme';
import { LoggedIn } from './LoggedIn';

describe('LoggedIn::', () => {
  it('Should show the passed email correctly', () => {
    const testEmail = 'test@email';
    const root = shallow(<LoggedIn email={testEmail} />);

    expect(root.find('[data-qa="logged-in-email"]').text()).toEqual(testEmail);
  });
});
