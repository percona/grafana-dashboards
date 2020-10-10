import React from 'react';
import { mount } from 'enzyme';
import { XtraDB } from './XtraDB';
import { kubernetesStub } from '../Kubernetes/__mocks__/kubernetesStubs';

jest.mock('shared/components/helpers/notification-manager');
jest.mock('./XtraDB.hooks');

describe('XtraDB::', () => {
  it('renders correctly without clusters', () => {
    const root = mount(
      <XtraDB kubernetes={[]} />
    );

    expect(root.find('[data-qa="xtradb-add-cluster-button"]').find('button').length).toBe(2);
    expect(root.contains('table')).toBeFalsy();
  });
  it('renders correctly with clusters', () => {
    const root = mount(
      <XtraDB kubernetes={kubernetesStub} />
    );

    expect(root.find('[data-qa="xtradb-add-cluster-button"]').find('button').length).toBe(1);
    expect(root.find('tr').length).toBe(3);
  });
  it('renders correctly with active state', () => {
    const root = mount(
      <XtraDB kubernetes={kubernetesStub} />
    );

    expect(root.find('[data-qa="cluster-status-active"]').at(0).prop('className')).toContain('active');
  });
});
