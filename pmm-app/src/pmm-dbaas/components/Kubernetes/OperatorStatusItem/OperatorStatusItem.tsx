import React, { FC } from 'react';
import { useStyles } from '@grafana/ui';
import { getStyles } from './OperatorStatusItem.styles';
import { DBClusterConnectionItemProps } from './OperatorStatusItem.types';
import { KubernetesOperatorStatus } from './KubernetesOperatorStatus/KubernetesOperatorStatus';
import { DATABASE_LABELS, Databases } from '../../../../shared/core';

export const OperatorStatusItem: FC<DBClusterConnectionItemProps> = ({
  status,
  databaseType,
  dataQa,
}) => {
  const styles = useStyles(getStyles);

  return (
    <div className={styles.connectionItemWrapper} data-qa={dataQa}>
      <span className={styles.connectionItemLabel}>{DATABASE_LABELS[databaseType]}:</span>
      <span className={styles.connectionItemValue}>
        <KubernetesOperatorStatus status={status} databaseType={databaseType} />
      </span>
    </div>
  );
};
