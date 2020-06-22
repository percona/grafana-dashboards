import { Pagination } from 'antd';
import React, {
  FC, useCallback, useContext, useEffect, useRef, useState
} from 'react';
import scrollIntoView from 'scroll-into-view';
import './Overview.scss';
import { QueryAnalyticsProvider } from 'pmm-qan/panel/provider/provider';
import 'shared/components/Elements/Spinner/Spinner';
import { Table } from 'shared/components/Elements/Table';
import { useOverviewTable } from './Overview.hooks';
import { styles } from '../../qan.styles';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from '../../qan.constants';

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

  // const onTableChange = useCallback((pagination, filters, sorter) => {
  //   contextActions.changeSort(sorter.columnKey);
  // }, []);

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
      <div>
        <Table
          columns={overviewMetricsList.columns}
          data={overviewMetricsList.rows}
          rowClassName={getRowClassName}
          onRowClick={(selected) => {
            contextActions.selectQuery(selected.original.dimension, selected.index === 0);
          }}
          scroll={{ y: height - 100, x: '100%' }}
          noData={<h1>No nodes Available</h1>}
          loading={loading}
        />
      </div>
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
          <span className={styles.showTotal} data-qa="qan-total-items">
            {showTotal}
          </span>
        </div>
      </div>
    </div>
  );
};
