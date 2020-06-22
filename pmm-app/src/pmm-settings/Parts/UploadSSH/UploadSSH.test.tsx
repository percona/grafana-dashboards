import React from 'react';
import { mount } from 'enzyme';
import UploadSSH from './UploadSSH';

jest.mock('shared/components/helpers/notification-manager');

describe('UploadSSH', () => {
  it('Upload SSH key renders without props', () => {
    const root = mount(
      <UploadSSH
        settings={{
          ssh_key: 'test_ssh_key',
        }}
      />,
    );

    expect(root).toMatchSnapshot();
    root.unmount();
  });
});
