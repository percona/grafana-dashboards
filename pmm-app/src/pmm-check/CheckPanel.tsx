import React, { PureComponent } from 'react';
import { Table } from 'antd';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from './types';
import { CheckService } from './Check.service';
import { COLUMNS, DATA_SOURCE } from './CheckPanel.constants';
import * as styles from './CheckPanel.styles';
import '../react-plugins-deps/styles.scss';
import '../react-plugins-deps/style.less';
import './CheckPanel.scss';

interface Props extends PanelProps<SimpleOptions> {}

export class CheckPanel extends PureComponent<Props> {
  async componentDidMount() {
    const result = await CheckService.getActiveAlerts();
    console.log(result);
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
              <span className={styles.Clickable}>Last run: 2 hours ago</span>
            </div>
          </div>
          <Table dataSource={DATA_SOURCE} columns={COLUMNS} size="middle" pagination={false} bordered />
        </div>
      </div>
    );
  }
}
