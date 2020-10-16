import React, { FC } from 'react';
import { useTheme } from '@grafana/ui';
import { Database } from 'shared/components/Elements/Icons/Database';
import { getStyles } from './AddInstance.styles';
import { instanceList } from './AddInstance.constants';
import { Messages } from './AddInstance.messages';
import { AddInstanceProps, SelectInstanceProps } from './AddInstance.types';

export const SelectInstance: FC<SelectInstanceProps> = (props) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const { type, selectInstanceType, title } = props;

  return (
    <button
      className={styles.navigationButton}
      data-qa={`${type}-instance`}
      onClick={selectInstanceType(type)}
      type="button"
    >
      <Database />
      <b className={styles.addInstanceTitle}>{title}</b>
      <span className={styles.addInstance}>{Messages.titles.addInstance}</span>
    </button>
  );
};

const AddInstance: FC<AddInstanceProps> = (props) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const { onSelectInstanceType } = props;
  const selectInstanceType = (type) => () => onSelectInstanceType({ type });

  return (
    <section className={styles.content}>
      <h3>Add instance</h3>
      <nav className={styles.navigationPanel}>
        {instanceList.map((item) => (
          <SelectInstance
            selectInstanceType={selectInstanceType}
            type={item.type}
            title={item.title}
            key={item.type}
          />
        ))}
      </nav>
    </section>
  );
};

export default AddInstance;
