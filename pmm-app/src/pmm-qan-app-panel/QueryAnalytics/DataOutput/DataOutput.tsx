import OverviewTable from './QueryAnalyticsOverview/OverviewTable/OverviewTable';
import QueryDetails from './QueryDetails/QueryDetails';
import React, { useContext, useState } from 'react';
import Split from 'react-split';
import { StateContext } from '../StateContext';
import './DataOutput.scss';
import { Pagination } from 'antd';
import AddColumn from './AddColumn';

const FirstSeen = () => {
  const context = useContext(StateContext);

  return (
    <>
      {context.state.firstSeen ? (
        <a
          href="#"
          className={'filter-switchers'}
          style={{ marginLeft: '20px' }}
          onClick={() => {
            context.dispatch({
              type: 'CHANGE_FIRST_SEEN',
              payload: {
                firstSeen: false,
              },
            });
          }}
        >
          Show all Queries
        </a>
      ) : (
        <a
          href="#"
          className={'filter-switchers'}
          style={{ marginLeft: '20px' }}
          onClick={() => {
            context.dispatch({
              type: 'CHANGE_FIRST_SEEN',
              payload: {
                firstSeen: true,
              },
            });
          }}
        >
          Show first Seen
        </a>
      )}
    </>
  );
};

const DataOutput = () => {
  const context = useContext(StateContext);
  const [total, setTotal] = useState(30);
  return (
    <div>
      <div className={'filters-header'} style={{ padding: '5px 0px', height: '50px' }}>
        <h5 style={{ margin: '3px', marginRight: '15px' }}>Queries overview</h5>
        <FirstSeen />
        <div style={{ marginLeft: 'auto' }}>
          <Pagination
            showSizeChanger={true}
            pageSizeOptions={['10', '50', '100']}
            defaultCurrent={1}
            defaultPageSize={10}
            current={context.state.pageNumber}
            pageSize={context.state.pageSize}
            total={total}
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
        <OverviewTable setTotal={setTotal} />
        <QueryDetails />
      </Split>
    </div>
  );
};

export default DataOutput;
