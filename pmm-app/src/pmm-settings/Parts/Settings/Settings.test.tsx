// Just a stub test
import SettingsPart from './Settings';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
// import renderer from 'react-test-renderer';
const renderer = new ShallowRenderer();
jest.mock('../../../react-plugins-deps/components/helpers/notification-manager', () => () => ({
  showErrorNotification: () => {},
}));
// TODO: add correct shallow renderer, we need to have something to render to 2nd level
describe('Settings Part test', () => {
  it('Checkbox renders correct without props', () => {
    const component = renderer.render(
      <SettingsPart
        settings={{
          data_retention: '24h',
          metrics_resolutions: {
            hr: '60s',
            mr: '180s',
            lr: '300s',
          },
        }}
      />
    );
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
