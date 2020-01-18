import OverviewTable from './QueryAnalyticsOverview/OverviewTable/OverviewTable';
import QueryDetails from './QueryDetails/QueryDetails';
import React, { useContext } from 'react';
import Split from 'react-split';
import { StateContext } from '../StateContext';
import './DataOutput.scss';
import { Pagination } from 'antd';
import AddColumn from './QueryAnalyticsOverview/AddColumn';

const DataOutput = props => {
  const context = useContext(StateContext);

  return (
    <div>
      <div className={'filters-header'} style={{ padding: '5px 0px', height: '50px' }}>
        <h5 style={{ marginRight: '15px' }}>Filters</h5>
        <a href="#" className={'filter-switchers'} style={{ marginLeft: '20px' }}>
          All Queries
        </a>{' '}
        <a href="#" className={'filter-switchers'} style={{ marginLeft: '20px' }}>
          First Seen
        </a>
        <div style={{ marginLeft: 'auto' }}>
          <Pagination defaultCurrent={1} total={30} />
        </div>
        <div style={{ marginLeft: '10px' }}>
          <AddColumn onlyAdd={true}/>
        </div>
      </div>
      <Split
        sizes={[25, 75]}
        minSize={100}
        direction="vertical"
        cursor="row-resize"
        className={'splitter-wrapper'}
        elementStyle={(dimension, size, gutterSize) => ({ height: `calc(${size}% - ${gutterSize}px)`, 'overflow-y': `scroll` })}
      >
        <OverviewTable columns={context.columns} />
        {context.filterBy && <QueryDetails filterBy={context.filterBy} />}
      </Split>
    </div>
  );
};

export default DataOutput;
