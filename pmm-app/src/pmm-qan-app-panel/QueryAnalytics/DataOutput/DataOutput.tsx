import OverviewTable from './QueryAnalyticsOverview/OverviewTable/OverviewTable';
import QueryDetails from './QueryDetails/QueryDetails';
import React, { useContext } from 'react';
import Split from 'react-split';
import { StateContext } from '../StateContext';
import './DataOutput.scss';
import { Pagination } from 'antd';
import AddColumn from './QueryAnalyticsOverview/AddColumn';

const DataOutput = () => {
  const context = useContext(StateContext);

  return (
    <div>
      <div className={'filters-header'} style={{ padding: '5px 0px', height: '50px' }}>
        <h5 style={{ margin: '3px', marginRight: '15px' }}>Queries overview</h5>
        <a href="#" className={'filter-switchers'} style={{ marginLeft: '20px' }}>
          All Queries
        </a>{' '}
        <a href="#" className={'filter-switchers'} style={{ marginLeft: '20px' }}>
          First Seen
        </a>
        <div style={{ marginLeft: 'auto' }}>
          <Pagination
            showSizeChanger={true}
            pageSizeOptions={['10', '50', '100']}
            defaultCurrent={1}
            defaultPageSize={10}
            current={context.state.pageNumber}
            pageSize={context.state.pageSize}
            total={30}
            onShowSizeChange={(current, pageSize) => {
              context.dispatch({
                type: 'CHANGE_PAGE_SIZE',
                payload: {
                  pageSize: pageSize,
                },
              });
            }}
            onChange={pageNumber => {
              context.dispatch({
                type: 'CHANGE_PAGE',
                payload: {
                  pageNumber: pageNumber,
                },
              });
            }}
          />
        </div>
        <div style={{ marginLeft: '10px' }}>
          <AddColumn onlyAdd={true} />
        </div>
      </div>
      <Split
        sizes={[25, 75]}
        minSize={100}
        gutterSize={10}
        direction="vertical"
        cursor="row-resize"
        className={'splitter-wrapper'}
        elementStyle={(dimension, size, gutterSize) => {
          return { height: `calc(${size}% - ${gutterSize}px)`, 'overflow-y': `scroll` };
        }}
      >
        <OverviewTable />
        <QueryDetails />
      </Split>
    </div>
  );
};

export default DataOutput;
