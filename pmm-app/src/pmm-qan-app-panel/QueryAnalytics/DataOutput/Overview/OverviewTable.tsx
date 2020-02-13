import { Select, Table } from 'antd';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import './OverviewTable.scss';
import { StateContext } from '../../StateContext';
import { getOverviewColumn } from './Column';
import OverviewTableService from './OverviewTable.service';

const { Option } = Select;
const GROUP_BY_OPTIONS = [
  { value: 'queryid', label: 'Query' },
  { value: 'service_name', label: 'Service Name' },
  { value: 'database', label: 'Database' },
  { value: 'schema', label: 'Schema' },
  { value: 'username', label: 'User Name' },
  { value: 'client_host', label: 'Client Host' },
];

const MAIN_METRIC_MIN_WIDTH = 470;
const TABLE_X_SCROLL_WIDTH = 1250;
const TABLE_Y_SCROLL_WIDTH = 400;
const COLUMN_WIDTH = 250;
const ROW_NUMBER_COLUMN_WIDTH = 30;
const getDefaultColumns = (groupBy, setGroupBy, pageNumber, pageSize, columns) => {
  const mainMetricColumnWidth = Math.max(TABLE_X_SCROLL_WIDTH - columns * COLUMN_WIDTH - ROW_NUMBER_COLUMN_WIDTH, MAIN_METRIC_MIN_WIDTH);
  return [
    {
      title: '#',
      dataIndex: 'rowNumber',
      key: 'rowNumber',
      fixed: 'left',
      width: ROW_NUMBER_COLUMN_WIDTH,
      render: (text, record, index) => (
        <div style={{ wordWrap: 'normal', wordBreak: 'normal' }}>{index === 0 ? '' : (pageNumber - 1) * pageSize + index}</div>
      ),
    },
    {
      dataIndex: 'mainMetric',
      fixed: 'left',
      width: mainMetricColumnWidth,
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
      ellipsis: true,
      className: 'overview-main-column',
      render: (text, record) => {
        //  overflow: hidden;
        //  text-overflow: ellipsis;
        //  white-space: nowrap;
        return (
          <div
            style={{
              wordWrap: 'break-word',
              wordBreak: 'break-word',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: mainMetricColumnWidth,
            }}
          >
            {record.fingerprint || record.dimension || 'TOTAL'}
          </div>
        );
      },
    },
  ];
};

interface RowInterface {
  dimension?: string;
}
interface DataInterface {
  rows: RowInterface[];
  columns: any;
}
const OverviewTable = props => {
  const {
    dispatch,
    state: { labels, columns, pageNumber, pageSize, orderBy, from, to, groupBy, firstSeen, queryId },
  } = useContext(StateContext);
  const [data, setData] = useState<DataInterface>({ rows: [], columns: [] });
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

  const onRowClick = useCallback(
    (record, rowIndex) => {
      return {
        onClick: () => {
          dispatch({
            type: 'SELECT_QUERY',
            payload: {
              queryId: data.rows[rowIndex].dimension,
            },
          });
        },
      };
    },
    [data.rows]
  );

  useEffect(() => {
    const updateInstances = async () => {
      try {
        setLoading(true);
        // @ts-ignore
        const result = await OverviewTableService.getReport({
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
        const calculatedColumns = getDefaultColumns(groupBy, setGroupBy, pageNumber, pageSize, columns.length).concat(
          columns.map((key, index) => getOverviewColumn(key, index, result.rows[0], orderBy, COLUMN_WIDTH))
        );
        // @ts-ignore
        setData({ rows: result.rows, columns: calculatedColumns });
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    };
    updateInstances().then(() => {});
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
      scroll={{ y: TABLE_Y_SCROLL_WIDTH, x: TABLE_X_SCROLL_WIDTH }}
      onRow={onRowClick}
      rowClassName={record => (record.dimension === queryId ? 'selected-overview-row' : '')}
      loading={loading}
    />
  );
};

export default OverviewTable;
