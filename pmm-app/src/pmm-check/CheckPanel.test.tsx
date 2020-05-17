import React, { FC } from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { mount, ReactWrapper } from 'enzyme';
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

  it('should accept a title parameter and display it as a table caption', async () => {
    const props = {
      width: 1200,
      height: 450,
      options: {
        title: 'DB CHECKS',
      },
    } as CheckPanelProps;

    const wrapper: ReactWrapper<CheckPanelProps, {}, any> = mount(<CheckPanelRouter {...props} />);

    const root = wrapper.find(CheckPanel) as ReactWrapper<CheckPanelProps, CheckPanelState, CheckPanel>;
    root.setState({ isSttEnabled: true });
    root.update();

    // Check for the panel title passed as component prop
    expect(
      root
        .find('[data-qa="db-check-panel"] [data-qa="db-check-panel-table-caption"]')
        .at(0)
        .text()
    ).toEqual('DB CHECKS');

    await root.instance().fetchAlerts();
    root.update();

    expect(root.state('dataSource')).toEqual(activeCheckStub);
    expect(root.state().loading).toEqual(false);
    expect(root.state().isSttEnabled).toEqual(true);

    const table = root.find('[data-qa="db-check-panel"]').find(Table);
    // Check the table is rendered
    expect(table.length).toEqual(1);
  });
});
