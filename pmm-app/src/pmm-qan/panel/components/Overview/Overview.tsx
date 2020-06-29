import { Pagination } from 'antd';
import React, {
  useCallback, useContext, useEffect, useState, useRef, FC, useMemo
} from 'react';
import scrollIntoView from 'scroll-into-view';
import './Overview.scss';
import { QueryAnalyticsProvider } from 'pmm-qan/panel/provider/provider';
import 'shared/components/Elements/Spinner/Spinner';
import { useOverviewTable } from './Overview.hooks';
import { styles } from '../../QueryAnalytics.styles';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from '../../QueryAnalytics.constants';
import { Table } from './components/QanTable';

export const Overview: FC = () => {
  const [total, setTotal] = useState(30);
  const [overviewMetricsList, loading] = useOverviewTable(setTotal);
  const [height, setHeight] = useState(400);
  const [showTotal, setShowTotal] = useState('');

  const {
    contextActions,
    panelState: {
      queryId, querySelected, totals, pageNumber, pageSize, orderBy
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
            columns={overviewMetricsList.columns}
            data={overviewMetricsList.rows}
            rowClassName={getRowClassName}
            onRowClick={(selected) => {
              contextActions.selectQuery(selected.original.dimension, selected.index === 0);
            }}
            scroll={{ y: Math.min(height, 550), x: '100%' }}
            onSortChange={(data) => {
              if (!data[0]) {
                return;
              }

              contextActions.changeSort(data[0].desc ? data[0].id : `-${data[0].id}`);
            }}
            rowNumber={(index) => <div>{index === 0 ? '' : (pageNumber - 1) * pageSize + index}</div>}
            orderBy={orderBy}
            noData={<h1>No queries Available</h1>}
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
            data-qa="qan-pagination"
          />
          <span className={styles.showTotal} data-qa="qan-total-items">{showTotal}</span>
        </div>
      </div>
    </div>
  );
};
