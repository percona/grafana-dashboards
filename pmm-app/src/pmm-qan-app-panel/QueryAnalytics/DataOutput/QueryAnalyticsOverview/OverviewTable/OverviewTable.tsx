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
const getDefaultColumns = context => {
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
          <Select
            defaultValue={context.state.groupBy}
            style={{ width: '120px' }}
            onChange={value => {
              context.dispatch({
                type: 'CHANGE_GROUP_BY',
                payload: {
                  groupBy: value,
                },
              });
            }}
          >
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
              context.dispatch({
                type: 'SELECT_QUERY',
                payload: {
                  queryId: record.dimension,
                },
              });
            }}
          >
            {record.fingerprint || record.dimension || 'TOTAL'}
          </span>
        );
      },
    },
  ];
};
const OverviewTable = props => {
  const context = useContext(StateContext);
  const [data, setData] = useState({ rows: [], columns: [] });
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
          groupBy: context.state.groupBy,
        });
        const columns = getDefaultColumns(context).concat(
          context.state.columns.map((key, index) => getColumnName(key, index, result.rows[0], context.state.orderBy))
        );
        // @ts-ignore
        setData({ rows: result.rows, columns: columns });
        // startLoading(false);
      } catch (e) {
        console.log(e);
        // startLoading(false);
      }
    };
    updateInstances().then(r => {});
  }, [context.state.columns, context.state.pageNumber, context.state.pageSize, context.state.groupBy, context.state.labels]);
  // // @ts-ignore
  return (
    <Table
      dataSource={data.rows}
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
      columns={data.columns}
      size={'small'}
      bordered={true}
      pagination={false}
      scroll={{ x: 1300 }}
    />
  );
};

export default OverviewTable;
