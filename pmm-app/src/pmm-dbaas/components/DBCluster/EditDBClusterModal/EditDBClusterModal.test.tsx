import React from 'react';
import { mount } from 'enzyme';
import { EditDBClusterModal } from './EditDBClusterModal';
import { kubernetesOptionsStub, setVisibleStub, onDBClusterAddedStub } from './__mocks__/addDBClusterModalStubs';

jest.mock('shared/components/helpers/notification-manager');

describe('EditDBClusterModal::', () => {
  it('should disable submit button when there are no changes', () => {
    const root = mount(
      <EditDBClusterModal
        kubernetesOptions={kubernetesOptionsStub}
        isVisible
        setVisible={setVisibleStub}
        onDBClusterAdded={onDBClusterAddedStub}
      />,
    );

    const button = root.find('[data-qa="dbcluster-update-cluster-button"]').find('button');

    expect(button.prop('disabled')).toBeTruthy();
  });
});
