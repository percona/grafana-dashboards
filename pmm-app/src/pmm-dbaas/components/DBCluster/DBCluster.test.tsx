import React from 'react';
import { mount } from 'enzyme';
import { DATABASE_LABELS } from 'shared/core';
import { DBCluster } from './DBCluster';
import { kubernetesStub } from '../Kubernetes/__mocks__/kubernetesStubs';
import { dbClustersStub } from './__mocks__/dbClustersStubs';

jest.mock('shared/components/helpers/notification-manager');
jest.mock('./DBCluster.hooks');

describe('DBCluster::', () => {
  it('renders correctly without clusters', () => {
    const root = mount(
      <DBCluster kubernetes={[]} />,
    );

    expect(root.find('[data-qa="dbcluster-add-cluster-button"]').find('button').length).toBe(2);
    expect(root.contains('table')).toBeFalsy();
  });
  it('renders correctly with clusters', () => {
    const root = mount(
      <DBCluster kubernetes={kubernetesStub} />,
    );

    expect(root.find('[data-qa="dbcluster-add-cluster-button"]').find('button').length).toBe(1);
    expect(root.find('tr').length).toBe(6);
  });
  it('renders correctly with failed status', () => {
    const root = mount(
      <DBCluster kubernetes={kubernetesStub} />,
    );

    expect(root.find('[data-qa="cluster-status-failed"]').at(0).prop('className')).toContain('failed');
  });
  it('renders database types correctly', () => {
    const root = mount(
      <DBCluster kubernetes={kubernetesStub} />,
    );

    expect(root.find('td').at(1).text()).toEqual(DATABASE_LABELS[dbClustersStub[0].databaseType]);
    expect(root.find('td').at(7).text()).toEqual(DATABASE_LABELS[dbClustersStub[1].databaseType]);
    expect(root.find('td').at(13).text()).toEqual(DATABASE_LABELS[dbClustersStub[2].databaseType]);
  });
});
