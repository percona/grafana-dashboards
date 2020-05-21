import React, { FC } from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { mount, ReactWrapper } from 'enzyme';
import { Spinner } from '@grafana/ui';
import { CheckPanel, CheckPanelProps, CheckPanelState } from './CheckPanel';
import { Table } from './components/Table';

import { activeCheckStub } from './__mocks__/stubs';

jest.mock('../react-plugins-deps/components/helpers/notification-manager');

jest.mock('./Check.service');

const CheckPanelRouter: FC<CheckPanelProps> = props => {
  return (
    <MemoryRouter>
      <Route>
        <CheckPanel {...props} />
      </Route>
    </MemoryRouter>
  );
};

xdescribe('CheckPanel::', () => {
  CheckPanel.prototype.componentDidMount = jest.fn();

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

  it('should render a Table once finished loading', async () => {
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
    // Check if the table is rendered, the rest is tested by the Table itself
    expect(table.length).toEqual(1);

    wrapper.unmount();
  });
});
