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
        const result = await OverviewService.getReport({
          labels: context.state.labels,
          columns: context.state.columns,
          pageNumber: context.state.pageNumber,
          pageSize: context.state.pageSize,
          order_by: context.state.orderBy,
          period_start_from: context.state.from,
          period_start_to: context.state.to,
        });
        setRows(result.rows);
        const columns = getDefaultColumns(context.dispatch).concat(
          context.state.columns.map((key, index) => getColumnName(key, index, result.rows[0], context.state.orderBy))
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
  }, [context.state.columns, context.state.pageNumber, context.state.pageSize]);
  // // @ts-ignore
  return (
    <Table
      dataSource={rows}
      onChange={(pagination, filters, sorter) => {
        let orderBy = '';
        if (sorter.order === 'ascend') {
          orderBy = sorter.columnKey;
        } else if (sorter.order === 'descend') {
          orderBy = `-${sorter.columnKey}`;
        }
        context.dispatch({
          type: 'CHANGE_SORT',
          payload: {
            orderBy: orderBy,
          },
        });
      }}
      columns={columns}
      size={'small'}
      bordered={true}
      pagination={false}
      scroll={{ x: 1300 }}
    />
  );
};

export default OverviewTable;
