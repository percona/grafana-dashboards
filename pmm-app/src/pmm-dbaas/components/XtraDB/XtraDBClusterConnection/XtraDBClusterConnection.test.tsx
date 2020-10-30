import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { XtraDBClusterConnection } from './XtraDBClusterConnection';
import { xtraDBClustersStub } from '../__mocks__/xtraDBClustersStubs';

jest.mock('../XtraDB.service');

describe('XtraDBClusterConnection::', () => {
  it('renders correctly connection items', async () => {
    let root;

    await act(async () => {
      root = mount(
        <XtraDBClusterConnection xtraDBCluster={xtraDBClustersStub[0]} />,
      );
    });

    expect(root.find('[data-qa="cluster-connection-host"]')).toBeTruthy();
    expect(root.find('[data-qa="cluster-connection-port"]')).toBeTruthy();
    expect(root.find('[data-qa="cluster-connection-username"]')).toBeTruthy();
    expect(root.find('[data-qa="cluster-connection-password"]')).toBeTruthy();
  });
});
