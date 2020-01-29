import { Table, Select } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import './OverviewTable.scss';
import { StateContext } from '../../../StateContext';
import { getColumnName } from './Column';
import OverviewService from './Overview.service';

const { Option } = Select;

const CurrentGroupBy = 'queryid';
// const TOTAL = tableData.rows[0]x;
//
const getDefaultColumns = dispatch => {
  return [
    {
      title: '#',
      dataIndex: 'rowNumber',
      key: 'rowNumber',
      width: '30px',
      // fixed: 'left',
      render: (text, record, index) => <div style={{ wordWrap: 'normal', wordBreak: 'normal' }}>{index === 0 ? '' : index}</div>,
    },
    {
      title: () => {
        return (
          <Select defaultValue={CurrentGroupBy} style={{ width: '120px' }}>
            <Option value="queryid">Query</Option>
            <Option value="service_name">Service Name</Option>
            <Option value="database">Database</Option>
            <Option value="schema">Schema</Option>
            <Option value="username">User Name</Option>
            <Option value="client_host">Client Host</Option>
          </Select>
        );
      },
      width: '200px',
      ellipsis: true,
      className: 'overview-main-column',
      // fixed: 'left',
      // sorter: () => {},
      render: (text, record) => {
        return (
          <span
            onClick={() => {
              dispatch({
                type: 'SELECT_QUERY',
                payload: {
                  queryId: record.dimension,
                },
              });
            }}
          >
            {record.fingerprint}
          </span>
        );
      },
    },
  ];
};
const OverviewTable = props => {
  const context = useContext(StateContext);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const updateInstances = async () => {
      try {
        // @ts-ignore
        const result = await OverviewService.getReport({ labels: context.state.labels, columns: context.state.columns });
        setRows(result.rows);
        const columns = getDefaultColumns(context.dispatch).concat(
          context.state.columns.map((key, index) => getColumnName(key, index, result.rows[0]))
        );
        // @ts-ignore
        setColumns(columns);
        // startLoading(false);
      } catch (e) {
        console.log(e);
        // startLoading(false);
      }
    };
    updateInstances().then(r => {});
  }, [context.state.columns]);
  // // @ts-ignore
  return <Table dataSource={rows} columns={columns} size={'small'} bordered={true} pagination={false} scroll={{ x: 1300 }} />;
};

export default OverviewTable;
