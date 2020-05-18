import React, { PureComponent, FC } from 'react';
import { PanelProps } from '@grafana/data';
import { createBrowserHistory } from 'history';
import { Router, Route } from 'react-router-dom';
import { CheckPanelOptions, Settings, FailedChecks } from 'pmm-check/types';
import { CheckService } from 'pmm-check/Check.service';
import * as styles from './CheckPanel.styles';
import { Failed } from 'pmm-check-home/components';

export interface CheckPanelProps extends PanelProps<CheckPanelOptions> {}

export interface CheckPanelState {
  failedChecks?: FailedChecks;
  isSttEnabled: boolean;
}

const history = createBrowserHistory();

export class CheckPanel extends PureComponent<CheckPanelProps, CheckPanelState> {
  state: CheckPanelState = {
    failedChecks: undefined,
    isSttEnabled: false,
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
    }
  }

  async getSettings() {
    try {
      const resp = (await CheckService.getSettings()) as Settings;
      this.setState({ isSttEnabled: !!resp.settings?.stt_enabled });
      if (resp.settings?.stt_enabled) {
        this.fetchAlerts();
      }
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { isSttEnabled, failedChecks } = this.state;

    return (
      <div className={styles.panel} data-qa="db-check-panel-home">
        <Failed failed={failedChecks} isSttEnabled={isSttEnabled} />
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
