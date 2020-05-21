import OverviewTable from './components/Overview/OverviewTable';
import Details from './components/Details/Details';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { PanelProvider } from '../../panel/panel.provider';
import { Pagination } from 'antd';
import ManageColumns from './components/ManageColumns/ManageColumns';
import { Styling } from './DataOutput.styles';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from './DataOutput.constants';
import SplitPane from 'react-split-pane';
import './DataOutput.scss';

const DataOutput = () => {
  const {
    contextActions,
    panelState: { pageNumber, pageSize, querySelected },
  } = useContext(PanelProvider);
  const [total, setTotal] = useState(30);
  const [showTotal, setShowTotal] = useState('');
  const changePageNumber = useCallback(pageNumber => {
    contextActions.changePage(pageNumber);
  }, []);

  const changePageSize = useCallback((current, pageSize) => {
    contextActions.changePageSize(pageSize);
  }, []);

  const renderShowTotal = useCallback((total, range) => {
    setShowTotal(`${range[0]}-${range[1]} of ${total} items`);
    return null;
  }, []);

  // TODO: replace with something more elegant & fast
  const container = document.querySelector('#antd');
  const size = container && container.clientWidth;

  const [reload, setReload] = useState<object>({});

  useEffect(() => {
    setReload({});
  }, [querySelected]);

  return (
    <div className={Styling.getContainerWrapper(size)}>
      <div className={Styling.overviewHeader}>
        <div className={Styling.manageColumnsWrapper}>
          <ManageColumns onlyAdd />
        </div>
      </div>
      <div style={{ position: 'relative' }} className={Styling.splitterWrapper}>
        <SplitPane
          split="horizontal"
          onDragFinished={() => setReload({})}
          className={Styling.splitterWrapper}
          resizerStyle={{ display: querySelected ? '' : 'none' }}
          pane1Style={{
            minHeight: querySelected ? '30%' : '100%',
            maxHeight: querySelected ? '60%' : '100%',
          }}
          pane2Style={{ minHeight: '20%', overflowY: 'scroll', zIndex: 999 }}
        >
          <div className="table-wrapper" style={{ width: '100%' }}>
            <OverviewTable setTotal={setTotal} reload={reload} />
            <div className={Styling.overviewHeader}>
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
                <span className={Styling.showTotal}>{showTotal}</span>
              </div>
            </div>
          </div>
          <div>{querySelected ? <Details /> : null}</div>
        </SplitPane>
      </div>
    </div>
  );
};

export default DataOutput;
