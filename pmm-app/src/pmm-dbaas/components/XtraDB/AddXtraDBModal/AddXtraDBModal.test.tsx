import React from 'react';
import { mount } from 'enzyme';
import { AddXtraDBModal } from './AddXtraDBModal';
import { kubernetesOptionsStub, setVisibleStub, onXtraDBAddedStub } from './__mocks__/addXtraDBModalStubs';

jest.mock('shared/components/helpers/notification-manager');

describe('AddXtraDBModal::', () => {
  it('renders correctly', () => {
    const root = mount(
      <AddXtraDBModal
        kubernetesOptions={kubernetesOptionsStub}
        isVisible
        setVisible={setVisibleStub}
        onXtraDBAdded={onXtraDBAddedStub}
      />,
    );

    expect(root.find('form')).toBeTruthy();
    expect(root.find('[data-qa="name-text-input"]')).toBeTruthy();
    expect(root.find('[data-qa="xtradb-kubernetes-cluster-field"]')).toBeTruthy();
    expect(root.find('[data-qa="xtradb-database-type-field"]')).toBeTruthy();
    expect(root.find('[data-qa="xtradb-create-cluster-button"]')).toBeTruthy();
  });

  it('should disable submit button when there is no values', () => {
    const root = mount(
      <AddXtraDBModal
        kubernetesOptions={kubernetesOptionsStub}
        isVisible
        setVisible={setVisibleStub}
        onXtraDBAdded={onXtraDBAddedStub}
      />,
    );
    const button = root.find('[data-qa="xtradb-create-cluster-button"]').find('button');

    expect(button.prop('disabled')).toBeTruthy();
  });
});
