import React, { useState } from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route } from 'react-router-dom';
import AddRemoteInstance from './components/AddRemoteInstance/AddRemoteInstance';
import DiscoveryPanel from './components/DiscoveryPanel/DiscoveryPanel';
import AddInstance from './components/AddInstance/AddInstance';
import './panel.scss';

const availableInstanceTypes = ['rds', 'postgresql', 'mysql', 'proxysql', 'mongodb', 'proxysql'];
const history = createBrowserHistory();

const AddInstancePanel = () => {

  const urlParams = new URLSearchParams(window.location.search);
  const instanceType = urlParams.get('instance_type') || '';
  const [selectedInstance, selectInstance] = useState({
    type: availableInstanceTypes.includes(instanceType) ? instanceType : '',
  });

  const setSelectedInstance = (instance) => {
    const url = new URL((window.location as unknown) as string);

    url.searchParams.set('instance_type', instance.type);
    selectInstance(instance);
    history.push(url.pathname + url.search);
  };

  return (
    <div className="flex-column padding">
      {!selectedInstance.type ? <AddInstance onSelectInstanceType={setSelectedInstance} /> : null}
      {selectedInstance.type && (
        <>
          <div className="flex-column">
            <button type="link" onClick={() => setSelectedInstance({ type: '' })}>
              Return to instance select menu
            </button>
          </div>
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

const AddPanel = () => (
  <Router history={history}>
    <Route path="*" component={AddInstancePanel} />
  </Router>
);

export default AddPanel;
