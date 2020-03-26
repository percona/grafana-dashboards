import OverviewTable from './Overview/OverviewTable';
import QueryDetails from './Details/QueryDetails';
import React, { useCallback, useContext, useState } from 'react';
import Split from 'react-split';
import { StateContext } from '../StateContext';
import { Pagination } from 'antd';
import ManageColumns from './ManageColumns/ManageColumns';
import { GroupByControl } from './GroupByControl/GroupByControl';
import { css } from 'emotion';

const PAGE_SIZE_OPTIONS = ['10', '50', '100'];

const Styling = {
  overviewWrapper: css`
    display: flex;
    align-items: flex-end;
    padding: 5px 0px;
    height: 50px;
  `,
  overviewHeader: css`
    margin: 3px;
    margin-right: 40px;
  `,
  splitterWrapper: css`
    height: 800px;
  `,
  paginationWrapper: css`
    margin-left: auto;
  `,
  manageColumnsWrapper: css`
    margin-left: 10px;
  `,
};
const QueryAnalyticsContainer = () => {
  const {
    dispatch,
    state: { pageNumber, pageSize, querySelected },
  } = useContext(StateContext);
  const [total, setTotal] = useState(30);
  const changePageNumber = useCallback(pageNumber => {
    dispatch({
      type: 'CHANGE_PAGE',
      payload: {
        pageNumber,
      },
    });
  }, []);

  const changePageSize = useCallback((current, pageSize) => {
    dispatch({
      type: 'CHANGE_PAGE_SIZE',
      payload: {
        pageSize,
      },
    });
  }, []);

  // TODO: replace with something more elegant & fast
  const container = document.querySelector('#antd');
  const size = container && container.clientWidth;

  return (
    <div style={{ width: `${(size || 1500) - 260}px` }}>
      <div className={Styling.overviewWrapper}>
        <h5 className={Styling.overviewHeader}>Queries overview</h5>
        <GroupByControl />
        <div className={Styling.paginationWrapper}>
          <Pagination
            showSizeChanger={true}
            pageSizeOptions={PAGE_SIZE_OPTIONS}
            defaultCurrent={1}
            defaultPageSize={10}
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
            current={pageNumber}
            pageSize={pageSize}
            total={total}
            onShowSizeChange={changePageSize}
            onChange={changePageNumber}
          />
        </div>
        <div className={Styling.manageColumnsWrapper}>
          <ManageColumns onlyAdd={true} />
        </div>
      </div>
      {!querySelected ? (
        <div className={'table-wrapper'}>
          <OverviewTable setTotal={setTotal} />
        </div>
      ) : (
        <Split
          sizes={[70, 30]}
          minSize={100}
          direction="vertical"
          cursor="row-resize"
          className={Styling.splitterWrapper}
          elementStyle={(dimension, size, gutterSize) => {
            return {
              height: `calc(${size}% - ${gutterSize}px)`,
              'overflow-y': 'scroll',
            };
          }}
          gutterStyle={() => ({ backgroundColor: '#626262', cursor: 'ns-resize', height: '10px' })}
        >
          <div className={'table-wrapper'}>
            <OverviewTable setTotal={setTotal} />
          </div>
          <QueryDetails />
        </Split>
      )}
    </div>
  );
};

export default QueryAnalyticsContainer;
