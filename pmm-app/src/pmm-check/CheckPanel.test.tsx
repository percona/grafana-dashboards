import React from 'react';
import { Table } from 'antd';
import { mount, ReactWrapper } from 'enzyme';
import { CheckPanel, CheckPanelProps, CheckPanelState } from './CheckPanel';
import { activeCheckStub } from './__mocks__/stubs';

jest.mock('../react-plugins-deps/components/helpers/notification-manager');

jest.mock('./Check.service');

describe('CheckPanel::', () => {
  CheckPanel.prototype.componentDidMount = jest.fn();

  it('should accept a title parameter and display it as a panel title', async () => {
    const props: any = {
      width: 1200,
      height: 450,
      options: {
        title: 'DB CHECKS',
      },
    };

    const root: ReactWrapper<CheckPanelProps, CheckPanelState, CheckPanel> = mount(<CheckPanel {...props} />);

    // Check for the panel title passed as component prop
    expect(
      root
        .find('[data-testid="db-check-panel"] > div > div > div')
        .at(0)
        .text()
    ).toEqual('DB CHECKS');

    await root.instance().fetchAlerts();
    root.update();

    expect(root.state('dataSource')).toEqual(activeCheckStub);
    expect(root.state().loading).toEqual(false);

    const table = root.find('[data-testid="db-check-panel"]').find(Table);
    // Check the table is rendered
    expect(table.length).toEqual(1);

    // Check the first column title
    expect(
      table
        .find('thead th span.ant-table-column-title')
        .at(0)
        .text()
    ).toEqual('Service name');

    // Check the value in first row an first column
    expect(
      table
        .find('tbody tr')
        .at(0)
        .find('td')
        .at(0)
        .text()
    ).toEqual('sandbox-mysql.acme.com');
  });
});
