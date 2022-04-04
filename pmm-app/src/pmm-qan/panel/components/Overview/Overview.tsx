import { Pagination } from 'antd';
import React, {
  FC, useCallback, useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import './Overview.scss';
import { QueryAnalyticsProvider } from 'pmm-qan/panel/provider/provider';
import 'shared/components/Elements/Spinner/Spinner';
import { useTheme } from '@grafana/ui';
import { useOverviewTable } from './Overview.hooks';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from '../../QueryAnalytics.constants';
import { Table } from './components/QanTable';
import { getStyles } from '../../QueryAnalytics.styles';
import { Messages } from './Overview.messages';

export const Overview: FC = () => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const [total, setTotal] = useState(30);
  const [overviewMetricsList, loading] = useOverviewTable(setTotal);
  const [height, setHeight] = useState(400);
  const [showTotal, setShowTotal] = useState('');

  const {
    contextActions,
    panelState: {
      queryId, querySelected, totals, pageNumber, pageSize, orderBy, loadingDetails,
    },
  } = useContext(QueryAnalyticsProvider);
  const tableWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHeight((tableWrapperRef.current && tableWrapperRef.current.clientHeight) || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableWrapperRef.current && tableWrapperRef.current.clientHeight]);

  const changePageNumber = useCallback((page) => {
    contextActions.changePage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changePageSize = useCallback((_, size) => {
    contextActions.changePageSize(size);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderShowTotal = useCallback((totalAmount, range) => {
    setShowTotal(`${range[0]}-${range[1]} of ${totalAmount} items`);

    return null;
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
    [querySelected, totals, queryId],
  );

  const onSortChange = useCallback(
    (data) => {
      if (!data[0]) {
        return;
      }

      contextActions.changeSort(data[0].desc ? data[0].id : `-${data[0].id}`);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [contextActions.changeSort],
  );

  return (
    <div className="table-wrapper overview" ref={tableWrapperRef}>
      {useMemo(
        () => (
          <div>
            <Table
              columns={overviewMetricsList.columns}
              data={overviewMetricsList.rows.length > 1 ? overviewMetricsList.rows : []}
              rowClassName={getRowClassName}
              onRowClick={(selected) => {
                contextActions.selectQuery(
                  {
                    queryId: selected.original.dimension,
                    database: selected.original.database,
                  },
                  selected.index === 0,
                );
              }}
              scroll={{ y: Math.min(height, 550), x: '100%' }}
              onSortChange={onSortChange}
              rowNumber={(index) => <div>{index === 0 ? '' : (pageNumber - 1) * pageSize + index}</div>}
              orderBy={orderBy}
              noData={<h1>{Messages.table.noData}</h1>}
              loading={loading}
              disabled={loadingDetails}
            />
          </div>
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [overviewMetricsList, loading, loadingDetails, height, getRowClassName],
      )}
      {overviewMetricsList.rows.length > 1 ? (
        <div className={styles.overviewFooter}>
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
              data-testid="qan-pagination"
              disabled={loadingDetails}
            />
            <span className={styles.showTotal} data-testid="qan-total-items">
              {showTotal}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
};
