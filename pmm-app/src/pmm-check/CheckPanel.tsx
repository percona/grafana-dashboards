import React, { PureComponent } from 'react';
import { Table } from 'antd';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from './types';
import { columns, dataSource } from './CheckPanel.constants';
import Styling from '../react-plugins-deps/components/helpers/styling';
import '../react-plugins-deps/styles.scss';
import '../react-plugins-deps/style.less';
import './CheckPanel.scss';

interface Props extends PanelProps<SimpleOptions> {}

export class CheckPanel extends PureComponent<Props> {
  componentDidMount() {
    Styling.addPluginPanelClass();
    console.log(this.props.data);
    console.log(this.props.options);
  }

  render() {
    const { width, height } = this.props;

    return (
      <div
        id="antd"
        style={{
          position: 'relative',
          width,
          height,
        }}
      >
        <Table dataSource={dataSource} columns={columns} pagination={false} bordered />
      </div>
    );
  }
}
