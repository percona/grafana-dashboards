import React from 'react';
import { Icon, useTheme } from '@grafana/ui';
import { getStyles } from './AddInstance.styles';

const SelectInstance = (props) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <div className={styles.navigationButton} onClick={props.selectInstanceType(props.type)}>
      <Icon name="database" size={'xxxl'} />
      <b className={styles.addInstanceTitle}>{props.title}</b>
      <span className={styles.addInstance}>Add a remote instance</span>
    </div>
  );
};

const AddInstance = (props) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const selectInstanceType = (type) => () => {
    props.onSelectInstanceType({ type });
  };

  const instanceList = [
    { type: 'rds', title: 'AWS RDS MySQL or Aurora MySQL' },
    { type: 'postgresql', title: 'PostgreSQL' },
    { type: 'mysql', title: 'MySQL' },
    { type: 'mongodb', title: 'MongoDB' },
    { type: 'proxysql', title: 'ProxySQL' },
  ];

  return (
    <section className={styles.content}>
      <h3>Add instance</h3>
      <nav className={styles.navigationPanel}>
        {instanceList.map((item) => (
          <SelectInstance selectInstanceType={selectInstanceType} type={item.type} title={item.title} />
        ))}
      </nav>
    </section>
  );
};

export default AddInstance;
