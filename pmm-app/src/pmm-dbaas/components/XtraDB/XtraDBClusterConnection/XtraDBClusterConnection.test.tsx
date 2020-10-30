import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { XtraDBClusterConnection } from './XtraDBClusterConnection';
import {
  xtraDBClustersStub,
  mongoDBClusterConnectionStub,
} from '../__mocks__/xtraDBClustersStubs';

jest.mock('shared/components/helpers/notification-manager');
jest.mock('../XtraDB.service');
jest.mock('../PSMDB.service');

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
  it('renders correctly connection items with MongoDB cluster', async () => {
    let root;

    await act(async () => {
      root = mount(
        <XtraDBClusterConnection xtraDBCluster={xtraDBClustersStub[2]} />,
      );
    });

    root.update();

    const host = root.find('[data-qa="cluster-connection-host"]');

    expect(host).toBeTruthy();
    expect(host.text()).toContain(mongoDBClusterConnectionStub.host);
    expect(root.find('[data-qa="cluster-connection-port"]')).toBeTruthy();
    expect(root.find('[data-qa="cluster-connection-username"]')).toBeTruthy();
    expect(root.find('[data-qa="cluster-connection-password"]')).toBeTruthy();
  });
});
