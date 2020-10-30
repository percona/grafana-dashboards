import React from 'react';
import { mount } from 'enzyme';
import { DATABASE_LABELS } from 'shared/core';
import { XtraDB } from './XtraDB';
import { kubernetesStub } from '../Kubernetes/__mocks__/kubernetesStubs';
import { xtraDBClustersStub } from './__mocks__/xtraDBClustersStubs';

jest.mock('shared/components/helpers/notification-manager');
jest.mock('./XtraDB.hooks');

describe('XtraDB::', () => {
  it('renders correctly without clusters', () => {
    const root = mount(
      <XtraDB kubernetes={[]} />,
    );

    expect(root.find('[data-qa="xtradb-add-cluster-button"]').find('button').length).toBe(2);
    expect(root.contains('table')).toBeFalsy();
  });
  it('renders correctly with clusters', () => {
    const root = mount(
      <XtraDB kubernetes={kubernetesStub} />,
    );

    expect(root.find('[data-qa="xtradb-add-cluster-button"]').find('button').length).toBe(1);
    expect(root.find('tr').length).toBe(4);
  });
  it('renders correctly with failed status', () => {
    const root = mount(
      <XtraDB kubernetes={kubernetesStub} />,
    );

    expect(root.find('[data-qa="cluster-status-failed"]').at(0).prop('className')).toContain('failed');
  });
  it('renders database types correctly', () => {
    const root = mount(
      <XtraDB kubernetes={kubernetesStub} />,
    );

    expect(root.find('td').at(1).text()).toEqual(DATABASE_LABELS[xtraDBClustersStub[0].databaseType]);
    expect(root.find('td').at(6).text()).toEqual(DATABASE_LABELS[xtraDBClustersStub[1].databaseType]);
    expect(root.find('td').at(11).text()).toEqual(DATABASE_LABELS[xtraDBClustersStub[2].databaseType]);
  });
});
