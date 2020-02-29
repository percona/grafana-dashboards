import OverviewTable from './Overview/OverviewTable';
import QueryDetails from './Details/QueryDetails';
import React, { useCallback, useContext, useState } from 'react';
import Split from 'react-split';
import { StateContext } from '../StateContext';
import './QueryAnalyticsContainer.scss';
import { Pagination } from 'antd';
import ManageColumns from './ManageColumns/ManageColumns';
import { GroupByControl } from './GroupByControl/GroupByControl';

const PAGE_SIZE_OPTIONS = ['10', '50', '100'];

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
      <div className={'filters-header'} style={{ padding: '5px 0px', height: '50px' }}>
        <h5 style={{ margin: '3px', marginRight: '40px' }}>Queries overview</h5>
        <GroupByControl />
        <div style={{ marginLeft: 'auto' }}>
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
        <div style={{ marginLeft: '10px' }}>
          <ManageColumns onlyAdd={true} />
        </div>
      </div>
      {!querySelected ? (
        <OverviewTable setTotal={setTotal} />
      ) : (
        <Split
          sizes={[70, 30]}
          minSize={100}
          gutterSize={10}
          direction="vertical"
          cursor="row-resize"
          className={'splitter-wrapper'}
          elementStyle={(dimension, size, gutterSize) => {
            return { height: `calc(${size}% - ${gutterSize}px)`, 'overflow-y': `scroll` };
          }}
        >
          <OverviewTable setTotal={setTotal} />
          <QueryDetails />
        </Split>
      )}
    </div>
  );
};

export default QueryAnalyticsContainer;
