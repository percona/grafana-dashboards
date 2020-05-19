import React from 'react';
import SettingsPanel from './panel';
import { shallow } from 'enzyme';

jest.mock('../react-plugins-deps/components/helpers/notification-manager');

// TODO: add correct shallow renderer, we need to have something to render to 2nd level
describe('Settings panel test', () => {
  it('Settings panel renders correct without props', () => {
    const root = shallow(<SettingsPanel />);
    expect(root).toMatchSnapshot();

    root.unmount();
  });
});
