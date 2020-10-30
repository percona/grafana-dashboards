import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { AddXtraDBModal } from './AddXtraDBModal';
import { kubernetesOptionsStub, setVisibleStub, onXtraDBAddedStub } from './__mocks__/addXtraDBModalStubs';

jest.mock('shared/components/helpers/notification-manager');

describe('AddXtraDBModal::', () => {
  const openStep = (root: ReactWrapper, step: string) => {
    root.find(`[data-qa="${step}"]`)
      .find('[data-qa="step-header"]')
      .simulate('click');
  };

  const isStepActive = (root: ReactWrapper, step: string) => (
    root.find(`[data-qa="${step}"]`)
      .find('[data-qa="step-content"]')
      .find('div')
      .at(1)
      .prop('className')
      ?.includes('current')
  );

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
    expect(root.find('[data-qa="xtradb-basic-options-step"]')).toBeTruthy();
    expect(root.find('[data-qa="xtradb-advanced-options-step"]')).toBeTruthy();
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

    openStep(root, 'xtradb-advanced-options-step');

    const button = root.find('[data-qa="xtradb-create-cluster-button"]').find('button');

    expect(button.prop('disabled')).toBeTruthy();
  });

  it('should change step correctly', () => {
    const root = mount(
      <AddXtraDBModal
        kubernetesOptions={kubernetesOptionsStub}
        isVisible
        setVisible={setVisibleStub}
        onXtraDBAdded={onXtraDBAddedStub}
      />,
    );

    expect(isStepActive(root, 'xtradb-basic-options-step')).toBeTruthy();
    openStep(root, 'xtradb-advanced-options-step');
    expect(isStepActive(root, 'xtradb-advanced-options-step')).toBeTruthy();
    expect(isStepActive(root, 'xtradb-basic-options-step')).toBeFalsy();
  });
});
