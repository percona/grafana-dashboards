import React, { useState } from 'react';
import AddRemoteInstance from './AddInstance/AddRemoteInstance/AddRemoteInstance';
import DiscoveryPanel from './DiscoveryAWS/DiscoveryPanel';
import '../react-plugins-deps/styles.scss';
import '../react-plugins-deps/style.less';
import AddInstance from './AddInstance/AddInstance';
import { Button } from 'antd';

const AddInstancePanel = () => {
  // @ts-ignore
  const [selectedInstance, setSelectedInstance] = useState({
    type: undefined,
  });
  return (
    <div className={'app-theme-dark content-wrapper'} id={'antd'}>
      {!selectedInstance.type ? <AddInstance selectInstanceType={setSelectedInstance} /> : null}
      {selectedInstance.type === 'rds' ? (
        <DiscoveryPanel
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
