import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { activeCheckStub } from 'pmm-check-home/__mocks__/stubs';
import { CheckPanel, CheckPanelProps, CheckPanelState } from './CheckPanel';
import { Failed } from './components';

jest.mock('shared/components/helpers/notification-manager');

jest.mock('pmm-check-home/CheckPanel.service');

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

    const wrapper: ReactWrapper<CheckPanelProps, {}, any> = mount(<CheckPanel {...props} />);

    const root = wrapper.find(CheckPanel) as ReactWrapper<CheckPanelProps, CheckPanelState, CheckPanel>;

    root.setState({ isSttEnabled: true });
    root.update();

    // Check for the panel title passed as component prop
    expect(
      root.find('[data-testid="db-check-panel"] [data-testid="db-check-panel-table-caption"]').at(0).text(),
    ).toEqual('DB CHECKS');

    await root.instance().fetchAlerts();
    root.update();

    expect(root.state('dataSource')).toEqual(activeCheckStub);
    expect(root.state().isSttEnabled).toEqual(true);

    const failed = root.find('[data-testid="db-check-panel"]').find(Failed);

    // Check the table is rendered
    expect(failed.length).toEqual(1);
  });
});
