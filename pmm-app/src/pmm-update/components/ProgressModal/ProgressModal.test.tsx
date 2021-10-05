import React from 'react';
import { shallow } from 'enzyme';
import { Button, ClipboardButton, Modal } from '@grafana/ui';

import { ProgressModal } from 'pmm-update/components';

jest.mock('shared/components/helpers/notification-manager');

describe('ProgressModal::', () => {
  const version = 'x.y.z';

  it('should be closed by default', () => {
    const wrapper = shallow(<ProgressModal version={version} />);

    expect(wrapper.find(Modal).props()).toHaveProperty('isOpen', false);

    wrapper.unmount();
  });

  it('should show the upgrade in progress if isUpdated is false', () => {
    const wrapper = shallow(<ProgressModal version={version} />);

    expect(wrapper.find(ClipboardButton).length).toEqual(1);
    expect(wrapper.find('[data-testid="modal-chevron-icon"]').length).toEqual(1);
    expect(wrapper.find('[data-testid="modal-output-pre"]').length).toEqual(1);

    expect(wrapper.find('[data-testid="modal-update-success-text"]').length).toEqual(0);
    expect(wrapper.find(Button).length).toEqual(0);

    wrapper.unmount();
  });

  it('should show a close button when isUpdated is true', () => {
    const wrapper = shallow(<ProgressModal isUpdated version={version} />);

    expect(wrapper.find('[data-testid="modal-update-success-text"]').length).toEqual(1);
    expect(wrapper.find(Button).length).toEqual(1);

    expect(wrapper.find(ClipboardButton).length).toEqual(0);
    expect(wrapper.find('[data-testid="modal-chevron-icon"]').length).toEqual(0);
    expect(wrapper.find('[data-testid="modal-output-pre"]').length).toEqual(0);

    wrapper.unmount();
  });

  it('should toggle the upgrade output on click on the chevron icon', () => {
    const wrapper = shallow(<ProgressModal version={version} />);
    const chevron = wrapper.find('[data-testid="modal-chevron-icon"]');
    const chevronIconOpen = chevron.prop('name');

    chevron.simulate('click');

    expect(wrapper.find('[data-testid="modal-output-pre"]').length).toEqual(0);
    expect(wrapper.find('[data-testid="modal-chevron-icon"]').prop('name')).not.toEqual(chevronIconOpen);

    chevron.simulate('click');

    expect(wrapper.find('[data-testid="modal-chevron-icon"]').prop('name')).toEqual(chevronIconOpen);
  });

  it('should reload the page when the close button is clicked', () => {
    const mockedReload = jest.fn();

    Object.defineProperty(window, 'location', {
      writable: true,
      value: { reload: mockedReload },
    });

    const wrapper = shallow(<ProgressModal isUpdated version={version} />);

    wrapper.find('[data-testid="modal-close"]').simulate('click');

    expect(mockedReload).toBeCalledTimes(1);
  });
});
