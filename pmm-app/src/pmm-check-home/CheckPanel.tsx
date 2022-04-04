import React, { PureComponent } from 'react';
import { PanelProps } from '@grafana/data';
import { Spinner } from '@grafana/ui';
import { CheckPanelOptions, Settings, FailedCheckSummary } from 'pmm-check-home/types';
import { CheckService } from 'pmm-check-home/CheckPanel.service';
import { Failed } from 'pmm-check-home/components';
import * as styles from './CheckPanel.styles';

export interface CheckPanelProps extends PanelProps<CheckPanelOptions> {}

export interface CheckPanelState {
  failedChecks: FailedCheckSummary[];
  hasNoAccess: boolean;
  isSttEnabled: boolean;
  isLoading: boolean;
}

export class CheckPanel extends PureComponent<CheckPanelProps, CheckPanelState> {
  constructor(props: CheckPanelProps) {
    super(props);
    this.fetchAlerts = this.fetchAlerts.bind(this);
    this.getSettings = this.getSettings.bind(this);
    this.state = {
      failedChecks: [],
      hasNoAccess: false,
      isSttEnabled: false,
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getSettings();
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
    } catch (err: any) {
      this.setState({ isLoading: false });
      if (err.response?.status === 401) {
        this.setState({ hasNoAccess: true });
      }

      console.error(err);
    }
  }

  async fetchAlerts() {
    try {
      const failedChecks = await CheckService.getAllFailedChecks();

      this.setState({ failedChecks });
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const {
      isSttEnabled, failedChecks, isLoading, hasNoAccess,
    } = this.state;

    return (
      <div className={styles.panel} data-testid="db-check-panel-home">
        {isLoading && <Spinner />}
        {!isLoading && <Failed failed={failedChecks} isSttEnabled={isSttEnabled} hasNoAccess={hasNoAccess} />}
      </div>
    );
  }
}
