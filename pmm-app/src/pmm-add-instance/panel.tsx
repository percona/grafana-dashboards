import React, { useEffect, useMemo, useState } from 'react';
import { createBrowserHistory } from 'history';
import { Route, Router, useLocation } from 'react-router-dom';
import { Button } from '@grafana/ui';
import { cx } from 'emotion';
import AddRemoteInstance from './components/AddRemoteInstance/AddRemoteInstance';
import Discovery from './components/Discovery/Discovery';
import { AddInstance } from './components/AddInstance/AddInstance';
import { getStyles } from './panel.styles';
import { Messages } from './components/AddRemoteInstance/AddRemoteInstance.messages';

const availableInstanceTypes = ['rds', 'postgresql', 'mysql', 'proxysql', 'mongodb', 'proxysql'];
const history = createBrowserHistory();

const AddInstancePanel = () => {
  const styles = getStyles();
  const location = useLocation();
  const urlParams = new URLSearchParams(window.location.search);
  const instanceType = urlParams.get('instance_type') || '';
  const [selectedInstance, selectInstance] = useState({
    type: availableInstanceTypes.includes(instanceType) ? instanceType : '',
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    searchParams.set('instance_type', selectedInstance.type);
    history.push({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  }, [selectedInstance]);

  const InstanceForm = useMemo(
    () => () => (
      <>
        <div className={styles.content}>
          <Button variant="link" onClick={() => selectInstance({ type: '' })}>
            {Messages.form.buttons.toMenu}
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
