import React, { useState } from 'react';
import AddRemoteInstance from './AddInstance/AddRemoteInstance/AddRemoteInstance';
import DiscoverySearchPanel from './DIscoveryAWS/DiscoverySearchPanel';
import 'antd/dist/antd.css';
import '../react-plugins-deps/styles.scss';

const SimplePanel = () => {
  const [selectedInstance, setSelectedInstance] = useState({});
  return (
    <>
      {!selectedInstance.type ? (
        <DiscoverySearchPanel
          selectInstance={instanceData => {
            console.log(instanceData);
            setSelectedInstance(instanceData);
          }}
        />
      ) : null}
      {selectedInstance.type ? <AddRemoteInstance instance={selectedInstance} /> : null}
    </>
  );
};

export default SimplePanel;
