import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { Pagination } from 'antd';
import SplitPane from 'react-split-pane';
import OverviewTable from '../Overview/OverviewTable';
import Details from '../Details/Details';
import { PanelProvider } from 'pmm-qan-app-panel/panel/panel.provider';
import ManageColumns from '../Overview/components/ManageColumns/ManageColumns';
import { styles } from './Layout.styles';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from './Layout.constants';
import './Layout.scss';

const Layout = () => {
  const {
    contextActions,
    panelState: { pageNumber, pageSize, querySelected },
  } = useContext(PanelProvider);
  const [total, setTotal] = useState(30);
  const [showTotal, setShowTotal] = useState('');
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

  // TODO: replace with something more elegant & fast
  const container = document.querySelector('#antd');
  const size = container && container.clientWidth;

  const [reload, setReload] = useState<object>({});

  useEffect(() => {
    setReload({});
  }, [querySelected]);

  return (
    <div className={styles.getContainerWrapper(size)}>
      <div className={styles.overviewHeader}>
        <div className={styles.manageColumnsWrapper}>
          <ManageColumns onlyAdd />
        </div>
      </div>
      <div style={{ position: 'relative' }} className={styles.splitterWrapper}>
        <SplitPane
          split="horizontal"
          onDragFinished={() => setReload({})}
          className={styles.splitterWrapper}
          resizerStyle={{ display: querySelected ? '' : 'none' }}
          pane1Style={{
            minHeight: querySelected ? '20%' : '100%',
            maxHeight: querySelected ? '60%' : '100%',
          }}
          pane2Style={{ minHeight: '20%', overflowY: 'scroll', zIndex: 999 }}
        >
          <div className="table-wrapper" style={{ width: '100%' }}>
            <OverviewTable setTotal={setTotal} reload={reload} />
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
                />
                <span className={styles.showTotal}>{showTotal}</span>
              </div>
            </div>
          </div>
          <div>{querySelected ? <Details /> : null}</div>
        </SplitPane>
      </div>
    </div>
  );
};

export default Layout;
