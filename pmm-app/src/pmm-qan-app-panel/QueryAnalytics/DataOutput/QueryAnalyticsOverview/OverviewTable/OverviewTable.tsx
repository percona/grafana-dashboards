import { Table, Select } from 'antd';
import React, { useContext } from 'react';
import { tableData } from '../mock-data/table-data';
import './OverviewTable.scss';
import { StateContext } from '../../../StateContext';
import { getColumnName } from './Column';

const { Option } = Select;

const CurrentGroupBy = 'queryid';
const TOTAL = tableData.rows[0];
//
const getDefaultColumns = selectQuery => {
  return [
    {
      title: '#',
      dataIndex: 'rowNumber',
      key: 'rowNumber',
      width: '20px',
      // fixed: 'left',
      render: (text, record, index) => {
        if (index === 0) {
          return '';
        }
        return index;
      },
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
        return <span onClick={selectQuery}>{record.fingerprint}</span>;
      },
    },
  ];
};
const OverviewTable = props => {
  const context = useContext(StateContext);
  const columns = getDefaultColumns(context.selectQuery).concat(context.columns.map((key, index) => getColumnName(key, index, TOTAL)));

  // // @ts-ignore
  return (
    <div >
      <Table dataSource={tableData.rows} columns={columns} size={'small'} bordered={true} scroll={{ x: 1300 }} />
    </div>
  );
  // return '123';
};
//
export default OverviewTable;
