import React, { FC } from 'react';
import { Icon, useTheme } from '@grafana/ui';
import { getStyles } from './AddInstance.styles';
import { instanceList } from './AddInstance.constants';
import { Messages } from './AddInstance.messages';
import { AddInstanceProps, SelectInstanceProps } from './AddInstance.types';

const SelectInstance: FC<SelectInstanceProps> = (props) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const { type, selectInstanceType, title } = props;

  return (
    <div className={styles.navigationButton} onClick={selectInstanceType(type)}>
      <Icon name="database" size={'xxxl'} />
      <b className={styles.addInstanceTitle}>{title}</b>
      <span className={styles.addInstance}>{Messages.titles.addInstance}</span>
    </div>
  );
};

const AddInstance: FC<AddInstanceProps> = (props) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const selectInstanceType = (type) => () => {
    props.onSelectInstanceType({ type });
  };

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
