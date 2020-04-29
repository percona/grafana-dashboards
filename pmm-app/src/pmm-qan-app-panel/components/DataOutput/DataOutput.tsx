import OverviewTable from './components/Overview/OverviewTable';
import Details from './components/Details/Details';
import React, { useCallback, useContext, useState } from 'react';
import Split from 'react-split';
import { PanelProvider } from '../../panel/panel.provider';
import { Pagination } from 'antd';
import ManageColumns from './components/ManageColumns/ManageColumns';
import { cx } from 'emotion';
import { Styling } from './DataOutput.styles';
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  MIN_SPLIT_SIZE,
  PAGE_SIZE_OPTIONS,
  SPACE_DISTRIBUTION_DETAILS,
  SPACE_DISTRIBUTION_OVERVIEW,
} from './DataOutput.constants';

const DataOutput = () => {
  const {
    contextActions,
    panelState: { pageNumber, pageSize, querySelected },
  } = useContext(PanelProvider);
  const [total, setTotal] = useState(30);
  const changePageNumber = useCallback(pageNumber => {
    contextActions.changePage(pageNumber);
  }, []);

  const changePageSize = useCallback((current, pageSize) => {
    contextActions.changePageSize(pageSize);
  }, []);

  const renderShowTotal = useCallback((total, range) => `${range[0]}-${range[1]} of ${total} items`, []);

  // TODO: replace with something more elegant & fast
  const container = document.querySelector('#antd');
  const size = container && container.clientWidth;

  const [reload, setReload] = useState<object>({});
  return (
    <div className={Styling.getContainerWrapper(size)}>
      <div className={Styling.overviewHeader}>
        <h5 className={Styling.overviewTitle}>Overview</h5>
        <div className={Styling.paginationWrapper}>
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
        </div>
        <div className={Styling.manageColumnsWrapper}>
          <ManageColumns onlyAdd />
        </div>
      </div>

      {!querySelected ? (
        <div className={cx('table-wrapper', Styling.tableWrapper)}>
          <OverviewTable setTotal={setTotal} />
        </div>
      ) : (
        <Split
          sizes={[SPACE_DISTRIBUTION_OVERVIEW, SPACE_DISTRIBUTION_DETAILS]}
          minSize={MIN_SPLIT_SIZE}
          direction="vertical"
          cursor="row-resize"
          className={Styling.splitterWrapper}
          // TODO: optimize resize behavior
          onDragEnd={() => setReload({})}
          elementStyle={(dimension, size, gutterSize) => {
            return {
              height: `calc(${size}% - ${gutterSize}px)`,
              'overflow-y': 'scroll',
            };
          }}
        >
          <div className="table-wrapper">
            <OverviewTable setTotal={setTotal} reload={reload} />
          </div>
          <Details />
        </Split>
      )}
    </div>
  );
};

export default DataOutput;
