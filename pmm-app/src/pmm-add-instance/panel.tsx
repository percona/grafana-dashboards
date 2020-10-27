import React, { useEffect, useMemo, useState } from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route } from 'react-router-dom';
import { Button } from '@grafana/ui';
import { cx } from 'emotion';
import AddRemoteInstance from './components/AddRemoteInstance/AddRemoteInstance';
import Discovery from './components/Discovery/Discovery';
import { AddInstance } from './components/AddInstance/AddInstance';
import { getStyles } from './panel.styles';

const availableInstanceTypes = ['rds', 'postgresql', 'mysql', 'proxysql', 'mongodb', 'proxysql'];
const history = createBrowserHistory();

const AddInstancePanel = () => {
  const styles = getStyles();

  const urlParams = new URLSearchParams(window.location.search);
  const instanceType = urlParams.get('instance_type') || '';
  const [selectedInstance, selectInstance] = useState({
    type: availableInstanceTypes.includes(instanceType) ? instanceType : '',
  });

  useEffect(() => {
    const url = new URL((window.location as unknown) as string);

    url.searchParams.set('instance_type', selectedInstance.type);
    history.push(url.pathname + url.search);
  }, [selectedInstance]);

  const InstanceForm = useMemo(
    () => () => (
      <>
        <div className={styles.content}>
          <Button variant="link" onClick={() => selectInstance({ type: '' })}>
            Return to menu
          </Button>
        </div>
        {selectedInstance.type === 'rds' ? (
          <Discovery selectInstance={selectInstance} />
        ) : (
          <AddRemoteInstance instance={selectedInstance} selectInstance={selectInstance} />
        )}
      </>
    ),
    [selectedInstance],
  );

  return (
    <div className={cx(styles.content, styles.contentPadding)}>
      {!selectedInstance.type ? <AddInstance onSelectInstanceType={selectInstance} /> : <InstanceForm />}
    </div>
  );
};

const AddPanel = () => (
  <Router history={history}>
    <Route path="*" component={AddInstancePanel} />
  </Router>
);

export default AddPanel;
