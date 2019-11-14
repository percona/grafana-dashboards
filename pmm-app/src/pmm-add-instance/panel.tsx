import React, { useState } from 'react';
import AddRemoteInstance from './AddInstance/AddRemoteInstance/AddRemoteInstance';
import DiscoverySearchPanel from './DiscoveryAWS/DiscoverySearchPanel';
import '../react-plugins-deps/antd.withoutglobal.css';
import '../react-plugins-deps/styles.scss';
import AddInstance from './AddInstance/AddInstance';
import { Button } from 'antd';

const AddInstancePanel = () => {
  // @ts-ignore
  const [selectedInstance, setSelectedInstance] = useState({
    type: undefined,
  });
  return (
    <div className={'app-theme-dark content-wrapper'}>
      {!selectedInstance.type ? <AddInstance selectInstanceType={setSelectedInstance} /> : null}
      {selectedInstance.type === 'rds' ? (
        <DiscoverySearchPanel
          selectInstance={instanceData => {
            setSelectedInstance(instanceData);
          }}
        />
      ) : null}
      {selectedInstance.type && selectedInstance.type !== 'rds' ? (
        <>
          <Button type={'link'} onClick={setSelectedInstance.bind(null, { type: undefined })}>
            Return to instance select menu
          </Button>
          <AddRemoteInstance instance={selectedInstance} />{' '}
        </>
      ) : null}
    </div>
  );
};

export default AddInstancePanel;
