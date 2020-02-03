import { Select, Table } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import './OverviewTable.scss';
import { StateContext } from '../../../StateContext';
import { getColumnName } from './Column';
import OverviewService from './Overview.service';

const { Option } = Select;

const getDefaultColumns = (context, pageNumber, pageSize) => {
  return [
    {
      title: '#',
      dataIndex: 'rowNumber',
      key: 'rowNumber',
      width: '30px',
      render: (text, record, index) => (
        <div style={{ wordWrap: 'normal', wordBreak: 'normal' }}>{index === 0 ? '' : (pageNumber - 1) * pageSize + index}</div>
      ),
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
      render: (text, record) => {
        return <span>{record.fingerprint || record.dimension || 'TOTAL'}</span>;
      },
    },
  ];
};
const OverviewTable = props => {
  const context = useContext(StateContext);
  const [data, setData] = useState({ rows: [], columns: [] });
  const [selectedRow, selectRow] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const updateInstances = async () => {
      try {
        setLoading(true);
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
          firstSeen: context.state.firstSeen,
        });

        props.setTotal(result.total_rows);
        const columns = getDefaultColumns(context, context.state.pageNumber, context.state.pageSize).concat(
          context.state.columns.map((key, index) => getColumnName(key, index, result.rows[0], context.state.orderBy))
        );
        // @ts-ignore
        setData({ rows: result.rows, columns: columns });
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };
    updateInstances().then(r => {});
  }, [context.state.columns, context.state.pageNumber, context.state.pageSize, context.state.groupBy, context.state.labels, context.state.firstSeen]);
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
      onRow={(record, rowIndex) => {
        return {
          onClick: event => {
            selectRow(rowIndex);
            context.dispatch({
              type: 'SELECT_QUERY',
              payload: {
                queryId: data.rows[rowIndex].dimension,
              },
            });
          },
        };
      }}
      rowClassName={(record, index) => {
        if (index === selectedRow) {
          return 'selected-overview-row';
        }
        return '';
      }}
      loading={loading}
    />
  );
};

export default OverviewTable;
