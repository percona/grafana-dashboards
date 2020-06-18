import { Pagination, Table } from 'antd';
import React, {
  useCallback, useContext, useEffect, useState, useRef, FC, useMemo
} from 'react';
import scrollIntoView from 'scroll-into-view';
import './Overview.scss';
import { QueryAnalyticsProvider } from 'pmm-qan/panel/provider/provider';
import 'shared/components/Elements/Spinner/Spinner';
import { useOverviewTable } from './Overview.hooks';
import { styles } from '../../panel.styles';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from '../../panel.constants';

export const Overview: FC = () => {
  const [total, setTotal] = useState(30);
  const [overviewMetricsList, loading] = useOverviewTable(setTotal);
  const [height, setHeight] = useState(400);
  const [showTotal, setShowTotal] = useState('');

  const {
    contextActions,
    panelState: {
      queryId, querySelected, totals, pageNumber, pageSize
    },
  } = useContext(QueryAnalyticsProvider);
  const tableWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollIntoView(document.querySelector('.selected-overview-row'), {
      align: {
        top: 0,
      },
    });
  }, [queryId]);

  useEffect(() => {
    setHeight((tableWrapperRef.current && tableWrapperRef.current.clientHeight) || 0);
  }, [tableWrapperRef.current && tableWrapperRef.current.clientHeight]);

  const changePageNumber = useCallback((page) => {
    contextActions.changePage(page);
  }, []);

  const changePageSize = useCallback((current, size) => {
    contextActions.changePageSize(size);
  }, []);

  const renderShowTotal = useCallback((totalAmount, range) => {
    setShowTotal(`${range[0]}-${range[1]} of ${totalAmount} items`);

    return null;
  }, []);

  const onTableChange = useCallback((pagination, filters, sorter) => {
    contextActions.changeSort(sorter.columnKey);
  }, []);

  const getRowClassName = useCallback(
    (record, index) => {
      const SELECTED_ROW_CLASSNAME = 'selected-overview-row';

      if (querySelected) {
        if (index === 0) {
          return totals ? SELECTED_ROW_CLASSNAME : '';
        }

        if (totals) {
          return '';
        }

        if (!record.dimension && !queryId) {
          return SELECTED_ROW_CLASSNAME;
        }

        if (record.dimension === queryId) {
          return SELECTED_ROW_CLASSNAME;
        }
      }

      return '';
    },
    [querySelected, totals, queryId]
  );

  return (
    <div className="table-wrapper" ref={tableWrapperRef}>
      {useMemo(() => (
        <div>
          <Table
            dataSource={overviewMetricsList.rows}
            onChange={onTableChange}
            columns={overviewMetricsList.columns}
            size="small"
            bordered
            pagination={false}
            scroll={{ y: height - 100, x: '100%' }}
            rowClassName={getRowClassName}
            loading={loading}
          />
        </div>
      ), [overviewMetricsList, loading, onTableChange, height, getRowClassName])}
      <div className={styles.overviewHeader}>
        <div className={styles.paginationWrapper}>
          <Pagination
            showSizeChanger
            pageSizeOptions={PAGE_SIZE_OPTIONS}
            defaultCurrent={DEFAULT_PAGE_NUMBER}
            defaultPageSize={DEFAULT_PAGE_SIZE}
            showTotal={renderShowTotal}
            current={pageNumber}
            pageSize={pageSize}
            total={total}
            onShowSizeChange={changePageSize}
            onChange={changePageNumber}
          />
          <span className={styles.showTotal}>{showTotal}</span>
        </div>
      </div>
    </div>
  );
};
