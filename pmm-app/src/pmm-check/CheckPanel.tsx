import React, { PureComponent, FC } from 'react';
import { PanelProps } from '@grafana/data';
import { createBrowserHistory } from 'history';
import { Router, Route } from 'react-router-dom';
import { CheckPanelOptions, ActiveCheck, Settings } from './types';
import { CheckService } from './Check.service';
import { COLUMNS } from './CheckPanel.constants';
import { Table } from './components/Table';
import * as styles from './CheckPanel.styles';

export interface CheckPanelProps extends PanelProps<CheckPanelOptions> {}

export interface CheckPanelState {
  dataSource?: ActiveCheck[];
  loading: boolean;
  isSttEnabled: boolean;
}

const history = createBrowserHistory();

export class CheckPanel extends PureComponent<CheckPanelProps, CheckPanelState> {
  state = {
    dataSource: undefined,
    loading: false,
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
    this.setState({ loading: true });
    try {
      const dataSource = await CheckService.getActiveAlerts();
      this.setState({ dataSource });
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({ loading: false });
    }
  }

  async getSettings() {
    this.setState({ loading: true });
    try {
      const resp = (await CheckService.getSettings()) as Settings;
      this.setState({ isSttEnabled: !!resp.settings?.stt_enabled });
      if (resp.settings?.stt_enabled) {
        this.fetchAlerts();
      }
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const {
      options: { title },
    } = this.props;
    const { dataSource, isSttEnabled } = this.state;

    return (
      <div className={styles.panel} data-qa="db-check-panel">
        <Table caption={title} data={dataSource} columns={COLUMNS} isSttEnabled={isSttEnabled} />
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
