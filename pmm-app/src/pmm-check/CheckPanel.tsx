import React, { PureComponent, FC } from 'react';
import { createBrowserHistory } from 'history';
import { PanelProps } from '@grafana/data';
import { Spinner } from '@grafana/ui';
import { Router, Route } from 'react-router-dom';
import { CheckPanelOptions, ActiveCheck, Settings } from './types';
import { CheckService } from './Check.service';
import { COLUMNS } from './CheckPanel.constants';
import { Table } from './components/Table';
import * as styles from './CheckPanel.styles';

export interface CheckPanelProps extends PanelProps<CheckPanelOptions> {}

export interface CheckPanelState {
  dataSource?: ActiveCheck[];
  hasNoAccess: boolean;
  isLoading: boolean;
  isSttEnabled: boolean;
}

const history = createBrowserHistory();

export class CheckPanel extends PureComponent<CheckPanelProps, CheckPanelState> {
  constructor(props: CheckPanelProps) {
    super(props);
    this.fetchAlerts = this.fetchAlerts.bind(this);
    this.getSettings = this.getSettings.bind(this);
    this.state = {
      dataSource: undefined,
      hasNoAccess: false,
      isLoading: true,
      isSttEnabled: false,
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
      dataSource, isSttEnabled, isLoading, hasNoAccess
    } = this.state;

    return (
      <div className={styles.panel} data-qa="db-check-panel">
        {isLoading && (
          <div className={styles.spinner}>
            <Spinner />
          </div>
        )}
        {!isLoading && (
          <Table
            caption={title}
            data={dataSource}
            columns={COLUMNS}
            isSttEnabled={isSttEnabled}
            hasNoAccess={hasNoAccess}
          />
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
