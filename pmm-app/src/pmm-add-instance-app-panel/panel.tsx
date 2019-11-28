import React, { useState } from 'react';
import AddRemoteInstance from './AddInstance/AddRemoteInstance/AddRemoteInstance';
import DiscoveryPanel from './DiscoveryPanel/DiscoveryPanel';
import '../react-plugins-deps/styles.scss';
import '../react-plugins-deps/style.less';
import AddInstance from './AddInstance/AddInstance';
import { Button } from 'antd';
import './panel.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory({});
const AddInstancePanel = props => {
  // @ts-ignore
  const urlParams = new URLSearchParams(window.location.search);

  const [selectedInstance, selectInstance] = useState({
    type: urlParams.get('instance_type'),
  });

  const setSelectedInstance = instance => {
    const url = new URL((window.location as unknown) as string);
    url.searchParams.set('instance_type', instance.type);
    selectInstance(instance);
    history.push(url.pathname + url.search);
  };
  return (
    <div className={'app-theme-dark content-wrapper antd'} id={'antd'}>
      {!selectedInstance.type ? <AddInstance selectInstanceType={setSelectedInstance} /> : null}
      {selectedInstance.type === 'rds' ? (
        <>
          <Button type={'link'} onClick={setSelectedInstance.bind(null, { type: '' })}>
            Return to instance select menu
          </Button>
          <DiscoveryPanel
            selectInstance={instanceData => {
              setSelectedInstance(instanceData);
            }}
          />
        </>
      ) : null}
      {selectedInstance.type && selectedInstance.type !== 'rds' ? (
        <>
          <Button type={'link'} onClick={setSelectedInstance.bind(null, { type: '' })}>
            Return to instance select menu
          </Button>
          <AddRemoteInstance instance={selectedInstance} />{' '}
        </>
      ) : null}
    </div>
  );
};

const Wrapper = () => {
  return (
    <Router history={history}>
      <Route path="*" component={AddInstancePanel} />
    </Router>
  );
};

const AddPanel2 = () => {
  return Wrapper();
};
export default AddPanel2;
