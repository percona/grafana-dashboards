import React, { useContext, useEffect, useState } from 'react';
import SplitPane from 'react-split-pane';
import { PanelProvider } from 'pmm-qan-app-panel/panel/panel.provider';
import { Overview } from '../Overview';
import Details from '../Details/Details';
import ManageColumns from '../Overview/components/ManageColumns/ManageColumns';
import { styles } from './Layout.styles';
import './Layout.scss';
import FiltersContainer from '../Filters/Filters';

const Layout = () => {
  const {
    panelState: { querySelected },
  } = useContext(PanelProvider);
  // TODO: replace with something more elegant & fast
  const container = document.querySelector('#antd');
  const size = container && container.clientWidth;

  const [reload, setReload] = useState<object>({});

  useEffect(() => {
    setReload({});
  }, [querySelected]);

  return (
    <div className="query-analytics-grid" id="antd">
      <div className="overview-filters" id="query-analytics-filters">
        <FiltersContainer />
      </div>
      <div id="query-analytics-data">
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
              <Overview reload={reload} />
              <div>{querySelected ? <Details /> : null}</div>
            </SplitPane>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
