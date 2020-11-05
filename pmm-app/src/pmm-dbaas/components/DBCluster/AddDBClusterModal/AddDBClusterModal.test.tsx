import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { AddDBClusterModal } from './AddDBClusterModal';
import { kubernetesOptionsStub, setVisibleStub, onDBClusterAddedStub } from './__mocks__/addDBClusterModalStubs';

jest.mock('shared/components/helpers/notification-manager');

describe('AddDBClusterModal::', () => {
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
      <AddDBClusterModal
        kubernetesOptions={kubernetesOptionsStub}
        isVisible
        setVisible={setVisibleStub}
        onDBClusterAdded={onDBClusterAddedStub}
      />,
    );

    expect(root.find('form')).toBeTruthy();
    expect(root.find('[data-qa="name-text-input"]')).toBeTruthy();
    expect(root.find('[data-qa="dbcluster-kubernetes-cluster-field"]')).toBeTruthy();
    expect(root.find('[data-qa="dbcluster-database-type-field"]')).toBeTruthy();
    expect(root.find('[data-qa="dbcluster-create-cluster-button"]')).toBeTruthy();
    expect(root.find('[data-qa="dbcluster-basic-options-step"]')).toBeTruthy();
    expect(root.find('[data-qa="dbcluster-advanced-options-step"]')).toBeTruthy();
  });

  it('should disable submit button when there is no values', () => {
    const root = mount(
      <AddDBClusterModal
        kubernetesOptions={kubernetesOptionsStub}
        isVisible
        setVisible={setVisibleStub}
        onDBClusterAdded={onDBClusterAddedStub}
      />,
    );

    openStep(root, 'dbcluster-advanced-options-step');

    const button = root.find('[data-qa="dbcluster-create-cluster-button"]').find('button');

    expect(button.prop('disabled')).toBeTruthy();
  });

  it('should change step correctly', () => {
    const root = mount(
      <AddDBClusterModal
        kubernetesOptions={kubernetesOptionsStub}
        isVisible
        setVisible={setVisibleStub}
        onDBClusterAdded={onDBClusterAddedStub}
      />,
    );

    expect(isStepActive(root, 'dbcluster-basic-options-step')).toBeTruthy();
    openStep(root, 'dbcluster-advanced-options-step');
    expect(isStepActive(root, 'dbcluster-advanced-options-step')).toBeTruthy();
    expect(isStepActive(root, 'dbcluster-basic-options-step')).toBeFalsy();
  });
});
