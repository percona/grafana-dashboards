import { Select, Table } from 'antd';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import './OverviewTable.scss';
import { StateContext } from '../../../StateContext';
import { getColumnName } from './Column';
import OverviewService from './Overview.service';

const { Option } = Select;
const GROUP_BY_OPTIONS = [
  { value: 'queryid', label: 'Query' },
  { value: 'service_name', label: 'Service Name' },
  { value: 'database', label: 'Database' },
  { value: 'schema', label: 'Schema' },
  { value: 'username', label: 'User Name' },
  { value: 'client_host', label: 'Client Host' },
];
const getDefaultColumns = (groupBy, setGroupBy, pageNumber, pageSize) => {
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
          <Select optionLabelProp="label" defaultValue={groupBy} style={{ width: '120px' }} onChange={setGroupBy}>
            {GROUP_BY_OPTIONS.map(option => (
              <Option value={option.value} label={option.label}>
                {option.label}
              </Option>
            ))}
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
  const {
    dispatch,
    state: { labels, columns, pageNumber, pageSize, orderBy, from, to, groupBy, firstSeen },
  } = useContext(StateContext);
  const [data, setData] = useState({ rows: [], columns: [] });
  const [selectedRow, selectRow] = useState(null);
  const [loading, setLoading] = useState(false);

  const setGroupBy = useCallback(value => {
    dispatch({
      type: 'CHANGE_GROUP_BY',
      payload: {
        groupBy: value,
      },
    });
  }, []);

  const onTableChange = useCallback((pagination, filters, sorter) => {
    let orderBy = '';
    if (sorter.order === 'ascend') {
      orderBy = sorter.columnKey;
    } else if (sorter.order === 'descend') {
      orderBy = `-${sorter.columnKey}`;
    }
    dispatch({
      type: 'CHANGE_SORT',
      payload: {
        orderBy: orderBy,
      },
    });
  }, []);

  const onRowClick = useCallback((record, rowIndex) => {
    return {
      onClick: () => {
        selectRow(rowIndex);
        dispatch({
          type: 'SELECT_QUERY',
          payload: {
            queryId: data.rows[rowIndex].dimension,
          },
        });
      },
    };
  }, [data.rows]);

  useEffect(() => {
    const updateInstances = async () => {
      try {
        setLoading(true);
        // @ts-ignore
        const result = await OverviewService.getReport({
          labels,
          columns,
          pageNumber,
          pageSize,
          orderBy,
          from,
          to,
          groupBy,
          firstSeen,
        });

        props.setTotal(result.total_rows);
        const calculatedColumns = getDefaultColumns(groupBy, setGroupBy, pageNumber, pageSize).concat(
          columns.map((key, index) => getColumnName(key, index, result.rows[0], orderBy))
        );
        // @ts-ignore
        setData({ rows: result.rows, columns: calculatedColumns });
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    };
    updateInstances().then(r => {});
  }, [columns, pageNumber, pageSize, groupBy, labels, firstSeen]);
  // @ts-ignore
  return (
    <Table
      dataSource={data.rows}
      onChange={onTableChange}
      columns={data.columns}
      size={'small'}
      bordered={true}
      pagination={false}
      scroll={{ x: 1300 }}
      onRow={onRowClick}
      rowClassName={(record, index) => (index === selectedRow ? 'selected-overview-row' : '')}
      loading={loading}
    />
  );
};

export default OverviewTable;
