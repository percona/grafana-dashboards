import React, { FC } from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route } from 'react-router-dom';
import { mount, ReactWrapper } from 'enzyme';
import { Spinner } from '@grafana/ui';
import { ButtonWithSpinner, Table } from 'pmm-check/components';
import { CheckPanel, CheckPanelProps, CheckPanelState } from './CheckPanel';
import { CheckService } from './Check.service';

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

  it('should call an API to get settings', async () => {
    const props = {
      options: {
        title: 'DB CHECKS',
      },
    } as CheckPanelProps;

    const wrapper: ReactWrapper<CheckPanelProps, {}, any> = mount(<CheckPanelRouter {...props} />);
    const root = wrapper.find(CheckPanel) as ReactWrapper<CheckPanelProps, CheckPanelState, CheckPanel>;

    const spy = jest.spyOn(CheckService, 'getSettings');

    await root.instance().getSettings();
    wrapper.update();

    expect(spy).toBeCalledTimes(1);

    spy.mockClear();

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

    root.setState({ isLoading: false, hasNoAccess: true });
    wrapper.update();

    const buttonWithSpinner = wrapper.find('[data-qa="db-check-panel"]').find(ButtonWithSpinner);

    expect(buttonWithSpinner.props()).toHaveProperty('disabled', true);

    wrapper.unmount();
  });

  it('should call the API to run checks if clicked on the run checks button', async () => {
    const props = {
      options: {
        title: 'DB CHECKS',
      },
    } as CheckPanelProps;

    const wrapper: ReactWrapper<CheckPanelProps, {}, any> = mount(<CheckPanelRouter {...props} />);

    const root = wrapper.find(CheckPanel) as ReactWrapper<CheckPanelProps, CheckPanelState, CheckPanel>;

    const spy = jest.spyOn(CheckService, 'runDbChecks');

    wrapper.update();

    root.setState({ isLoading: false });
    wrapper.update();

    const buttonWithSpinner = wrapper.find('[data-qa="db-check-panel"]').find(ButtonWithSpinner);

    buttonWithSpinner.simulate('click');
    expect(spy).toBeCalledTimes(1);

    spy.mockClear();

    wrapper.unmount();
  });

  it('should log errors if the API call to fetch checks fails', async () => {
    const props = {
      options: {
        title: 'DB CHECKS',
      },
    } as CheckPanelProps;

    const originalConsoleError = console.error;

    console.error = jest.fn();

    jest.useFakeTimers();

    const wrapper: ReactWrapper<CheckPanelProps, {}, any> = mount(<CheckPanelRouter {...props} />);

    const root = wrapper.find(CheckPanel) as ReactWrapper<CheckPanelProps, CheckPanelState, CheckPanel>;

    root.setState({ isLoading: false });
    wrapper.update();

    const buttonWithSpinner = wrapper.find('[data-qa="db-check-panel"]').find(ButtonWithSpinner);

    CheckService.getActiveAlerts = jest.fn(() => { throw Error('Test error'); });

    await act(async () => {
      buttonWithSpinner.simulate('click');
    });

    await act(async () => {
      jest.runAllTimers();
    });
    wrapper.update();

    expect(console.error).toBeCalledTimes(1);
    expect(console.error).toBeCalledWith(Error('Test error'));

    console.error = originalConsoleError;

    (CheckService.getActiveAlerts as jest.Mock).mockClear();
    jest.useRealTimers();

    wrapper.unmount();
  });

  it('should log errors if the API call to run checks fails', async () => {
    const props = {
      options: {
        title: 'DB CHECKS',
      },
    } as CheckPanelProps;

    const originalConsoleError = console.error;

    console.error = jest.fn();

    const wrapper: ReactWrapper<CheckPanelProps, {}, any> = mount(<CheckPanelRouter {...props} />);

    const root = wrapper.find(CheckPanel) as ReactWrapper<CheckPanelProps, CheckPanelState, CheckPanel>;

    root.setState({ isLoading: false });
    wrapper.update();

    const buttonWithSpinner = wrapper.find('[data-qa="db-check-panel"]').find(ButtonWithSpinner);

    CheckService.runDbChecks = jest.fn(() => { throw Error('Test error'); });

    buttonWithSpinner.simulate('click');

    expect(console.error).toBeCalledTimes(1);
    expect(console.error).toBeCalledWith(Error('Test error'));

    console.error = originalConsoleError;

    (CheckService.runDbChecks as jest.Mock).mockClear();

    wrapper.unmount();
  });

  it('should call the API to fetch alerts after the one to run checks', async () => {
    const props = {
      options: {
        title: 'DB CHECKS',
      },
    } as CheckPanelProps;

    jest.useFakeTimers();

    const wrapper: ReactWrapper<CheckPanelProps, {}, any> = mount(<CheckPanelRouter {...props} />);

    const root = wrapper.find(CheckPanel) as ReactWrapper<CheckPanelProps, CheckPanelState, CheckPanel>;

    root.setState({ isLoading: false });
    wrapper.update();

    const buttonWithSpinner = wrapper.find('[data-qa="db-check-panel"]').find(ButtonWithSpinner);

    root.instance().fetchAlerts = jest.fn();
    expect((root.instance().fetchAlerts as jest.Mock).mock.calls.length).toEqual(0);

    await act(async () => {
      buttonWithSpinner.simulate('click');
    });

    await act(async () => {
      jest.runAllTimers();
    });
    wrapper.update();
    expect((root.instance().fetchAlerts as jest.Mock).mock.calls.length).toEqual(1);

    jest.useRealTimers();

    wrapper.unmount();
  });

  it('should set the request pending state correctly', async () => {
    const props = {
      options: {
        title: 'DB CHECKS',
      },
    } as CheckPanelProps;

    jest.useFakeTimers();

    const wrapper: ReactWrapper<CheckPanelProps, {}, any> = mount(<CheckPanelRouter {...props} />);

    const root = wrapper.find(CheckPanel) as ReactWrapper<CheckPanelProps, CheckPanelState, CheckPanel>;

    root.setState({ isLoading: false });
    wrapper.update();

    const buttonWithSpinner = wrapper.find('[data-qa="db-check-panel"]').find(ButtonWithSpinner);

    await act(async () => {
      buttonWithSpinner.simulate('click');
    });

    expect(root.state().isRunChecksRequestPending).toBe(true);
    await act(async () => {
      jest.runAllTimers();
    });
    wrapper.update();
    expect(root.state().isRunChecksRequestPending).toBe(false);

    jest.useRealTimers();

    wrapper.unmount();
  });
});
