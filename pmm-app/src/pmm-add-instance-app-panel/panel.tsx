import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { createBrowserHistory } from 'history';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AddRemoteInstance from './AddInstance/AddRemoteInstance/AddRemoteInstance';
import DiscoveryPanel from './DiscoveryPanel/DiscoveryPanel';
import AddInstance from './AddInstance/AddInstance';
import Styling from '../react-plugins-deps/components/helpers/styling';
import './panel.scss';
import '../react-plugins-deps/style.less';
import '../react-plugins-deps/styles.scss';

const history = createBrowserHistory({});
const AddInstancePanel = props => {
  useEffect(() => Styling.addPluginPanelClass(), []);

  // @ts-ignore
  const urlParams = new URLSearchParams(window.location.search);
  const instanceType = urlParams.get('instance_type') || '';
  const availableInstanceTypes = ['rds', 'postgresql', 'mysql', 'proxysql', 'mongodb', 'proxysql'];
  const [selectedInstance, selectInstance] = useState({
    type: availableInstanceTypes.includes(instanceType) ? instanceType : '',
  });

  const setSelectedInstance = instance => {
    const url = new URL((window.location as unknown) as string);
    url.searchParams.set('instance_type', instance.type);
    selectInstance(instance);
    history.push(url.pathname + url.search);
  };
  return (
    <div className="app-theme-dark content-wrapper antd" id="antd">
      {!selectedInstance.type ? <AddInstance onSelectInstanceType={setSelectedInstance} /> : null}
      {selectedInstance.type && (
        <>
          <Button type="link" onClick={setSelectedInstance.bind(null, { type: '' })}>
            Return to instance select menu
          </Button>
          {selectedInstance.type === 'rds' ? (
            <DiscoveryPanel onSelectInstance={setSelectedInstance} />
          ) : (
            <AddRemoteInstance instance={selectedInstance} />
          )}
        </>
      )}
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

const AddPanel = () => {
  return Wrapper();
};
export default AddPanel;
