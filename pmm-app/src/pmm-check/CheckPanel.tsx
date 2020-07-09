import React, { PureComponent, FC } from 'react';
import { createBrowserHistory } from 'history';
import { PanelProps } from '@grafana/data';
import { Spinner } from '@grafana/ui';
import { Router, Route } from 'react-router-dom';
import { Table, ButtonWithSpinner } from 'pmm-check/components';
import { CheckPanelOptions, ActiveCheck, Settings } from './types';
import { CheckService } from './Check.service';
import { COLUMNS } from './CheckPanel.constants';
import * as styles from './CheckPanel.styles';
import { Messages } from './CheckPanel.messages';

export interface CheckPanelProps extends PanelProps<CheckPanelOptions> {}

export interface CheckPanelState {
  dataSource?: ActiveCheck[];
  hasNoAccess: boolean;
  isLoading: boolean;
  isSttEnabled: boolean;
  isRerunChecksLoading: boolean;
}

const history = createBrowserHistory();

export class CheckPanel extends PureComponent<CheckPanelProps, CheckPanelState> {
  constructor(props: CheckPanelProps) {
    super(props);
    this.fetchAlerts = this.fetchAlerts.bind(this);
    this.getSettings = this.getSettings.bind(this);
    this.handleRerunChecksClick = this.handleRerunChecksClick.bind(this);
    this.state = {
      dataSource: undefined,
      hasNoAccess: false,
      isLoading: true,
      isSttEnabled: false,
      isRerunChecksLoading: false,
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
    } catch (err) {
      this.setState({ isLoading: false });
      if (err.response?.status === 401) {
        this.setState({ hasNoAccess: true });
      }

      console.error(err);
    }
  }

  async handleRerunChecksClick() {
    this.setState({ isRerunChecksLoading: true });
    try {
      await CheckService.rerunDbChecks();
    } catch (e) {
      console.error(e);
    }
    setTimeout(() => {
      this.setState({ isRerunChecksLoading: false });
      this.fetchAlerts();
    }, 10000);
  }

  async fetchAlerts() {
    try {
      const dataSource = await CheckService.getActiveAlerts();

      this.setState({ dataSource });
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const {
      options: { title },
    } = this.props;
    const {
      dataSource, isSttEnabled, isLoading, hasNoAccess, isRerunChecksLoading
    } = this.state;

    return (
      <div className={styles.panel} data-qa="db-check-panel">
        {isLoading ? (
          <div className={styles.spinner}>
            <Spinner />
          </div>
        ) : (
          <>
            <div className={styles.header}>
              {title && (
                <div className={styles.title} data-qa="db-check-panel-title">
                  {title}
                </div>
              )}
              <ButtonWithSpinner
                onClick={this.handleRerunChecksClick}
                isLoading={isRerunChecksLoading}
                disabled={hasNoAccess}
              >
                {Messages.rerunDbChecks}
              </ButtonWithSpinner>
            </div>
            <Table
              data={dataSource}
              columns={COLUMNS}
              isSttEnabled={isSttEnabled}
              hasNoAccess={hasNoAccess}
              fetchAlerts={this.fetchAlerts}
            />
          </>
        )}
      </div>
    );
  }
}

export const CheckPanelRouter: FC<CheckPanelProps> = (props) => (
  <Router history={history}>
    <Route>
      <CheckPanel {...props} />
    </Route>
  </Router>
);
