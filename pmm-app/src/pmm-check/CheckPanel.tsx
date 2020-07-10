import React, { PureComponent, FC } from 'react';
import { createBrowserHistory } from 'history';
import { PanelProps } from '@grafana/data';
import { Spinner } from '@grafana/ui';
import { Router, Route } from 'react-router-dom';
import { Table, ButtonWithSpinner } from 'pmm-check/components';
import { showSuccessNotification } from 'shared/components/helpers';
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
  isRunChecksRequestPending: boolean;
}

const history = createBrowserHistory();

export class CheckPanel extends PureComponent<CheckPanelProps, CheckPanelState> {
  constructor(props: CheckPanelProps) {
    super(props);
    this.fetchAlerts = this.fetchAlerts.bind(this);
    this.getSettings = this.getSettings.bind(this);
    this.handleRunChecksClick = this.handleRunChecksClick.bind(this);
    this.state = {
      dataSource: undefined,
      hasNoAccess: false,
      isLoading: true,
      isSttEnabled: false,
      isRunChecksRequestPending: false,
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

  async handleRunChecksClick() {
    this.setState({ isRunChecksRequestPending: true });
    try {
      await CheckService.runDbChecks();
    } catch (e) {
      console.error(e);
    }
    setTimeout(async () => {
      this.setState({ isRunChecksRequestPending: false });
      try {
        await this.fetchAlerts();
        showSuccessNotification({ message: 'Done running DB checks. The latest results are displayed.' });
      } catch (e) {
        console.log(e);
      }
    }, 10000);
  }

  async fetchAlerts() {
    this.setState({ isLoading: true });

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
      dataSource, isSttEnabled, isLoading, hasNoAccess, isRunChecksRequestPending
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
                onClick={this.handleRunChecksClick}
                isLoading={isRunChecksRequestPending}
                disabled={hasNoAccess}
              >
                {Messages.runDbChecks}
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
