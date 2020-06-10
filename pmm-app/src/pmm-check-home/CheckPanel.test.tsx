import React, { FC } from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { mount, ReactWrapper } from 'enzyme';
import { activeCheckStub } from 'pmm-check/__mocks__/stubs';
import { CheckPanel, CheckPanelProps, CheckPanelState } from './CheckPanel';
import { Failed } from './components';

jest.mock('shared/components/helpers/notification-manager');

jest.mock('../pmm-check/Check.service');

const CheckPanelRouter: FC<CheckPanelProps> = (props) => (
  <MemoryRouter>
    <Route>
      <CheckPanel {...props} />
    </Route>
  </MemoryRouter>
);

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
      root.find('[data-qa="db-check-panel"] [data-qa="db-check-panel-table-caption"]').at(0).text(),
    ).toEqual('DB CHECKS');

    await root.instance().fetchAlerts();
    root.update();

    expect(root.state('dataSource')).toEqual(activeCheckStub);
    expect(root.state().isSttEnabled).toEqual(true);

    const failed = root.find('[data-qa="db-check-panel"]').find(Failed);
    // Check the table is rendered
    expect(failed.length).toEqual(1);
  });
});
