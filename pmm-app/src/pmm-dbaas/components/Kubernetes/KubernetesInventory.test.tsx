import React from 'react';
import { mount } from 'enzyme';
import { KubernetesInventory } from './KubernetesInventory';
import { kubernetesStub, deleteActionStub } from './__mocks__/kubernetesStubs'

jest.mock('shared/components/helpers/notification-manager');
jest.mock('./Kubernetes.hooks');

describe('KubernetesInventory::', () => {
  it('renders table correctly', () => {
    const root = mount(<KubernetesInventory />);
    const rows = root.find('tr');

    expect(rows.length).toBe(kubernetesStub.length + 1);
  });
  it('disables delete button if no cluster selected', () => {
    const root = mount(<KubernetesInventory />);
    const openDeleteModalButton = root.find('[data-qa="open-delete-modal-button"]').find('button');

    openDeleteModalButton.simulate('click');

    expect(openDeleteModalButton.prop('disabled')).toBeTruthy();
    expect(deleteActionStub).toHaveBeenCalledTimes(0);
  });
  xit('deletes cluster correctly', () => {
    const root = mount(<KubernetesInventory />);
    const clusterCheckbox = root.find('[data-qa="select-row"]').at(0);
    const openDeleteModalButton = root.find('[data-qa="open-delete-modal-button"]').find('button');

    clusterCheckbox.simulate('click');
    openDeleteModalButton.simulate('click');

    const deleteButton = root.find('[data-qa="delete-kubernetes-button"]').find('button');

    deleteButton.simulate('click');

    expect(deleteActionStub).toHaveBeenCalled();
  });
});
