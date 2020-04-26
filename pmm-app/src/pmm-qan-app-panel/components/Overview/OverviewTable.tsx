import { Table } from 'antd';
import React, { useCallback, useContext } from 'react';
import './OverviewTable.scss';
import { PanelProvider } from '../../panel/panel.provider';
import '../../../react-plugins-deps/components/Elements/Spinner/Spinner';
import { useOverviewTable } from './OverviewTable.hooks';
import { TABLE_X_SCROLL, TABLE_Y_SCROLL } from './OverviewTable.constants';

const OverviewTable = props => {
  const [data, loading] = useOverviewTable(props.setTotal);
  const {
    contextActions,
    panelState: { queryId, querySelected },
  } = useContext(PanelProvider);

  const onTableChange = useCallback((pagination, filters, sorter) => {
    contextActions.changeSort(sorter.columnKey);
  }, []);

  // @ts-ignore
  const container = document.querySelector('.table-wrapper');
  const height = +((container && container.clientHeight) || 0);
  return (
    <Table
      dataSource={data.rows}
      onChange={onTableChange}
      columns={data.columns}
      size="small"
      bordered={true}
      pagination={false}
      scroll={{ y: Math.max(height - 30, TABLE_Y_SCROLL), x: TABLE_X_SCROLL }}
      rowClassName={record => {
        if (querySelected) {
          const isTotalSelected = !record.dimension && queryId === 'TOTAL';
          if (isTotalSelected || record.dimension === queryId) {
            return 'selected-overview-row';
          }
        }
        return '';
      }}
      loading={loading}
    />
  );
};

export default OverviewTable;
