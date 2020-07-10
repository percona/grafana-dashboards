import React, { FC } from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { mount, ReactWrapper } from 'enzyme';
import { Spinner } from '@grafana/ui';
import { ButtonWithSpinner, Table } from 'pmm-check/components';
import { CheckPanel, CheckPanelProps, CheckPanelState } from './CheckPanel';

import { activeCheckStub } from './__mocks__/stubs';

jest.mock('shared/components/helpers/notification-manager');

jest.mock('./Check.service');

const CheckPanelRouter: FC<CheckPanelProps> = (props) => (
  <MemoryRouter>
    <Route>
      <CheckPanel {...props} />
    </Route>
  </MemoryRouter>
);

describe('CheckPanel::', () => {
  CheckPanel.prototype.componentDidMount = jest.fn();

  it('should render the title passed as a prop', async () => {
    const props = {
      options: {
        title: 'DB CHECKS',
      },
    } as CheckPanelProps;

    const wrapper: ReactWrapper<CheckPanelProps, {}, any> = mount(<CheckPanelRouter {...props} />);

    const root = wrapper.find(CheckPanel) as ReactWrapper<CheckPanelProps, CheckPanelState, CheckPanel>;

    root.setState({ isLoading: false });
    wrapper.update();

    expect(
      wrapper
        .find('[data-qa="db-check-panel-title"]')
        .at(0)
        .text()
    ).toEqual('DB CHECKS');

    wrapper.unmount();
  });

  it('should render a spinner on start', async () => {
    const props = {
      width: 1200,
      height: 450,
      options: {
        title: 'DB CHECKS',
      },
    } as CheckPanelProps;

    const wrapper: ReactWrapper<CheckPanelProps, {}, any> = mount(<CheckPanelRouter {...props} />);

    const root = wrapper.find(CheckPanel) as ReactWrapper<CheckPanelProps, CheckPanelState, CheckPanel>;

    // Check for the spinner that is rendered on start
    expect(root.find('[data-qa="db-check-panel"]').find(Spinner)).toHaveLength(1);

    await root.instance().fetchAlerts();
    wrapper.update();

    expect(root.state().dataSource).toEqual(activeCheckStub);
    expect(root.state().isLoading).toEqual(false);
    expect(root.state().isSttEnabled).toEqual(false);

    wrapper.unmount();
  });

  it('should render a Table and a ButtonWithSpinner once finished loading', async () => {
    const props = {
      options: {
        title: 'DB CHECKS',
      },
    } as CheckPanelProps;

    const wrapper: ReactWrapper<CheckPanelProps, {}, any> = mount(<CheckPanelRouter {...props} />);

    const root = wrapper.find(CheckPanel) as ReactWrapper<CheckPanelProps, CheckPanelState, CheckPanel>;

    root.setState({ isLoading: false });
    wrapper.update();

    expect(root.state().isLoading).toEqual(false);
    expect(root.state().hasNoAccess).toEqual(false);

    const table = wrapper.find('[data-qa="db-check-panel"]').find(Table);
    const buttonWithSpinner = wrapper.find('[data-qa="db-check-panel"]').find(ButtonWithSpinner);

    // Check if the table is rendered, the rest is tested by the Table itself
    expect(table.length).toEqual(1);
    expect(buttonWithSpinner.length).toEqual(1);

    wrapper.unmount();
  });

  it('should show ButtonWithSpinner disabled if hasNoAccess is true', async () => {
    const props = {
      options: {
        title: 'DB CHECKS',
      },
    } as CheckPanelProps;

    const wrapper: ReactWrapper<CheckPanelProps, {}, any> = mount(<CheckPanelRouter {...props} />);

    const root = wrapper.find(CheckPanel) as ReactWrapper<CheckPanelProps, CheckPanelState, CheckPanel>;

    root.setState({ isLoading: false });
    root.setState({ hasNoAccess: true });
    wrapper.update();

    const buttonWithSpinner = wrapper.find('[data-qa="db-check-panel"]').find(ButtonWithSpinner);

    expect(buttonWithSpinner.props()).toHaveProperty('disabled', true);

    wrapper.unmount();
  });
});
