// Just a stub test
import React from 'react';
import SettingsPanel from './panel';
import ShallowRenderer from 'react-test-renderer/shallow';
// import renderer from 'react-test-renderer';
const renderer = new ShallowRenderer();
jest.mock('../react-plugins-deps/components/helpers/notification-manager', () => () => ({
  showErrorNotification: () => {},
}));
// TODO: add correct shallow renderer, we need to have something to render to 2nd level
describe('Settings panel test', () => {
  it('Settings panel renders correct without props', () => {
    renderer.render(<SettingsPanel />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
