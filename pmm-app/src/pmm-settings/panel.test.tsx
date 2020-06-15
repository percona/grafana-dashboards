import React from 'react';
import { shallow } from 'enzyme';
import SettingsPanel from './panel';

jest.mock('shared/components/helpers/notification-manager');

// TODO: add correct shallow renderer, we need to have something to render to 2nd level
describe('Settings panel test', () => {
  it('Settings panel renders correct without props', () => {
    const root = shallow(<SettingsPanel />);

    expect(root).toMatchSnapshot();

    root.unmount();
  });
});
