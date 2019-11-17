import { Table } from 'antd';
import React from 'react';
// import { tableData } from '../mock-data/table-data';
// import { getColumnName } from './Column';
import './OverviewTable.scss';
// import { StateContext } from '../../StateContext';

// const { Option } = Select;

// let CurrentGroupBy = 'queryid';
// const TOTAL = tableData.rows[0];
//
// const getDefaultColumns = selectQuery => {
//   return [
//     {
//       title: '#',
//       dataIndex: 'rowNumber',
//       key: 'rowNumber',
//       width: '20px',
//       render: (text, record, index) => {
//         if (index === 0) return '';
//         return index;
//       },
//     },
//     {
//       title: () => {
//         return (
//           <Select defaultValue={CurrentGroupBy} style={{ width: '120px' }}>
//             <Option value="queryid">Query</Option>
//             <Option value="service_name">Service Name</Option>
//             <Option value="database">Database</Option>
//             <Option value="schema">Schema</Option>
//             <Option value="username">User Name</Option>
//             <Option value="client_host">Client Host</Option>
//           </Select>
//         );
//       },
//       width: '200px',
//       ellipsis: true,
//       className: 'overview-main-column',
//       sorter: () => {},
//       render: (text, record, index) => {
//         // TODO: add different keys
//         return record.fingerprint;
//         // return <span onClick={selectQuery}>{record.fingerprint}</span>;
//       },
//     },
//   ];
// };
const OverviewTable = props => {
  // const context = useContext(StateContext);
  // const columns = getDefaultColumns(context.selectQuery).concat(context.columns.map((key, index) => getColumnName(key, index, TOTAL)));
  // // @ts-ignore
  return <Table  size={'small'} bordered={true} />;
  // return '123';
};
//
export default OverviewTable;
