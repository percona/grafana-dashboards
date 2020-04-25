// Just a stub test
import React from 'react';
import renderer from 'react-test-renderer';
import UploadSSH from './UploadSSH';

jest.mock('../../../react-plugins-deps/helpers/notification-manager', () => () => ({}));
describe('Settings Part test', () => {
  it('Upload SSH key renders correct without props', () => {
    const component = renderer.create(
      <UploadSSH
        settings={{
          ssh_key: 'test_ssh_key',
        }}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
