import React, { PureComponent, FC } from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route } from 'react-router-dom';
import { PanelProps } from '@grafana/data';
import { Spinner } from '@grafana/ui';
import { CheckPanelOptions, Settings, FailedChecks } from 'pmm-check/types';
import { CheckService } from 'pmm-check/Check.service';
import * as styles from './CheckPanel.styles';
import { Failed } from 'pmm-check-home/components';

export interface CheckPanelProps extends PanelProps<CheckPanelOptions> {}

export interface CheckPanelState {
  failedChecks?: FailedChecks;
  hasNoAccess: boolean;
  isSttEnabled: boolean;
  isLoading: boolean;
}

const history = createBrowserHistory();

export class CheckPanel extends PureComponent<CheckPanelProps, CheckPanelState> {
  state: CheckPanelState = {
    failedChecks: undefined,
    hasNoAccess: false,
    isSttEnabled: false,
    isLoading: true,
  };

  constructor(props: CheckPanelProps) {
    super(props);
    this.fetchAlerts = this.fetchAlerts.bind(this);
    this.getSettings = this.getSettings.bind(this);
  }

  componentDidMount() {
    this.getSettings();
  }

  async fetchAlerts() {
    try {
      const failedChecks = await CheckService.getFailedChecks();
      this.setState({ failedChecks });
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  async getSettings() {
    try {
      const resp = (await CheckService.getSettings()) as Settings;
      this.setState({ isSttEnabled: !!resp.settings?.stt_enabled });
      this.setState({ hasNoAccess: false });
      if (resp.settings?.stt_enabled) {
        this.fetchAlerts();
      } else {
        this.setState({ isLoading: false });
      }
    } catch (err) {
      this.setState({ isLoading: false });
      if (err.response?.status === 401) {
        this.setState({ hasNoAccess: true });
      }
      console.error(err);
    }
  }

  render() {
    const { isSttEnabled, failedChecks, isLoading, hasNoAccess } = this.state;

    return (
      <div className={styles.panel} data-qa="db-check-panel-home">
        {isLoading && <Spinner />}
        {!isLoading && <Failed failed={failedChecks} isSttEnabled={isSttEnabled} hasNoAccess={hasNoAccess} />}
      </div>
    );
  }
}

export const CheckPanelRouter: FC<CheckPanelProps> = props => (
  <Router history={history}>
    <Route>
      <CheckPanel {...props} />
    </Route>
  </Router>
);
