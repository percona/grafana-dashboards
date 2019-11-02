import React, { useState } from 'react';
import AddRemoteInstance from './AddInstance/AddRemoteInstance/AddRemoteInstance';
import DiscoverySearchPanel from './DIscoveryAWS/DiscoverySearchPanel';
import 'antd/dist/antd.css';
import '../react-plugins-deps/styles.scss';
import AddInstance from './AddInstance/AddInstance';

const SimplePanel = () => {
  const [selectedInstance, setSelectedInstance] = useState({});
  return (
    <div className={'app-theme-dark'}>
      {!selectedInstance.type ? <AddInstance selectInstanceType={setSelectedInstance} /> : null}
      {selectedInstance.type === 'rds' ? (
        <DiscoverySearchPanel
          selectInstance={instanceData => {
            setSelectedInstance(instanceData);
          }}
        />
      ) : null}
      {selectedInstance.type && selectedInstance.type !== 'rds' ? <AddRemoteInstance instance={selectedInstance} /> : null}
    </div>
  );
};

export default SimplePanel;
