import React, { PureComponent } from 'react';
import { Table } from 'antd';
import { PanelProps } from '@grafana/data';
import { css } from 'emotion';
import { SimpleOptions } from './types';
import { columns, dataSource } from './CheckPanel.constants';
import '../react-plugins-deps/styles.scss';
import '../react-plugins-deps/style.less';
import './CheckPanel.scss';

interface Props extends PanelProps<SimpleOptions> {}

const PanelWrapper = css`
  margin-top: 20px;
`;

const TitleBar = css`
  display: flex;
  padding: 0.5em 1em;
  align-items: baseline;
`;

const Title = css`
  font-size: 1.25em;
  flex: 1 1 50%;
`;

const LastRun = css`
  flex: 1 1 50%;
  text-align: right;
`;

const Clicable = css`
  text-decoration: underline;
  cursor: pointer;
`;

export class CheckPanel extends PureComponent<Props> {
  render() {
    const {
      width,
      height,
      options: { title },
    } = this.props;

    return (
      <div
        id="antd"
        style={{
          position: 'relative',
          width,
          height,
        }}
      >
        <div className={PanelWrapper}>
          <div className={TitleBar}>
            <div className={Title}>{title ? title : 'Failed Checks'}</div>
            <div className={LastRun}>
              <span className={Clicable}>Last run: 2 hours ago</span>
            </div>
          </div>
          <Table dataSource={dataSource} columns={columns} size="middle" pagination={false} bordered />
        </div>
      </div>
    );
  }
}
