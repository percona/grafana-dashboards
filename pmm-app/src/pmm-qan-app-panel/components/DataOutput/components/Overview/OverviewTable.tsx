import { Table } from 'antd';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import './OverviewTable.scss';
import { PanelProvider } from '../../../../panel/panel.provider';
import '../../../../../react-plugins-deps/components/Elements/Spinner/Spinner';
import { useOverviewTable } from './OverviewTable.hooks';
import { TABLE_X_SCROLL } from './OverviewTable.constants';

const OverviewTable = props => {
  const [data, loading] = useOverviewTable(props.setTotal);
  const [height, setHeight] = useState(400);
  const {
    contextActions,
    panelState: { queryId, querySelected },
  } = useContext(PanelProvider);

  useEffect(() => {
    // @ts-ignore
    const container = document.querySelector('.table-wrapper');
    setHeight(+((container && container.clientHeight) || 0));
    console.log('reload');
  }, [props.reload]);

  const onTableChange = useCallback((pagination, filters, sorter) => {
    contextActions.changeSort(sorter.columnKey);
  }, []);

  return (
    <Table
      dataSource={data.rows}
      onChange={onTableChange}
      columns={data.columns}
      size="small"
      bordered
      pagination={false}
      scroll={{ y: height - 50, x: TABLE_X_SCROLL }}
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
