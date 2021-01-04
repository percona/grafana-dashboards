import React from 'react';
import { mount } from 'enzyme';
import { KubernetesInventory } from './KubernetesInventory';
import { kubernetesStub, addActionStub, deleteActionStub } from './__mocks__/kubernetesStubs';

jest.mock('shared/components/helpers/notification-manager');
jest.mock('./Kubernetes.hooks');

describe('KubernetesInventory::', () => {
  it('renders table correctly', () => {
    const root = mount(
      <KubernetesInventory
        kubernetes={kubernetesStub}
        addKubernetes={addActionStub}
        deleteKubernetes={deleteActionStub}
        loading={false}
      />,
    );
    const rows = root.find('tr');

    expect(rows.length).toBe(kubernetesStub.length + 1);
  });
});
