import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { DBClusterParameters } from './DBClusterParameters';
import { dbClustersStub } from '../__mocks__/dbClustersStubs';

jest.mock('shared/components/helpers/notification-manager');
jest.mock('../XtraDB.service');
jest.mock('../PSMDB.service');

describe('DBClusterParameters::', () => {
  it('renders parameters items correctly', async () => {
    let root;

    await act(async () => {
      root = mount(<DBClusterParameters dbCluster={dbClustersStub[0]} />);
    });

    expect(root.find('[data-qa="cluster-parameters-cluster-name"]')).toBeTruthy();
    expect(root.find('[data-qa="cluster-parameters-cpu"]')).toBeTruthy();
    expect(root.find('[data-qa="cluster-parameters-memory"]')).toBeTruthy();
    expect(root.find('[data-qa="cluster-parameters-disk"]')).toBeTruthy();
  });

  it('renders connection items correctly with MongoDB cluster', async () => {
    let root;

    await act(async () => {
      root = mount(<DBClusterParameters dbCluster={dbClustersStub[2]} />);
    });

    root.update();

    expect(root.find('[data-qa="cluster-parameters-cluster-name"]')).toBeTruthy();
    expect(root.find('[data-qa="cluster-parameters-cpu"]')).toBeTruthy();
    expect(root.find('[data-qa="cluster-parameters-memory"]')).toBeTruthy();
    expect(root.find('[data-qa="cluster-parameters-disk"]')).toBeTruthy();
  });
});
