import React, { PureComponent } from 'react';
import { Table, Button } from 'antd';
import { PanelProps } from '@grafana/data';
import { SimpleOptions, ActiveCheck } from './types';
import { CheckService } from './Check.service';
import { COLUMNS } from './CheckPanel.constants';
import * as styles from './CheckPanel.styles';
import '../react-plugins-deps/styles.scss';
import '../react-plugins-deps/style.less';
import './CheckPanel.scss';

interface CheckPanelProps extends PanelProps<SimpleOptions> {}

interface CheckPanelState {
  dataSource?: ActiveCheck[];
  loading: boolean;
}

export class CheckPanel extends PureComponent<CheckPanelProps, CheckPanelState> {
  state = {
    dataSource: undefined,
    loading: false,
  };

  componentDidMount() {
    this.fetchAlerts();
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

  render() {
    const {
      width,
      height,
      options: { title },
    } = this.props;

    return (
      <div
        id="antd"
        className="check-panel"
        style={{
          position: 'relative',
          width,
          height,
        }}
      >
        <div className={styles.PanelWrapper}>
          <div className={styles.TitleBar}>
            <div className={styles.Title}>{title || 'Failed Checks'}</div>
            <div className={styles.LastRun}>
              <Button onClick={() => this.fetchAlerts()}>Refresh</Button>
            </div>
          </div>
          <Table {...this.state} columns={COLUMNS} size="middle" pagination={false} bordered />
        </div>
      </div>
    );
  }
}
