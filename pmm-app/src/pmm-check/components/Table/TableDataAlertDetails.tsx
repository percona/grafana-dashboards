import React, { FC } from 'react';
import { SEVERITY } from 'pmm-check/CheckPanel.constants';
import { SilenceAlertButton } from 'pmm-check/components';
import { TableDataAlertDetailsProps } from 'pmm-check/types';
import { useStyles } from '@grafana/ui';
import { Messages } from '../../CheckPanel.messages';
import { getStyles } from './Table.styles';

export const TableDataAlertDetails: FC<TableDataAlertDetailsProps> = ({ detailsItem }) => {
  const styles = useStyles(getStyles);

  return (
    <>
      <td>
        {SEVERITY[detailsItem.labels.severity]}
      </td>
      <td>
        {detailsItem.description}
        {detailsItem.readMoreUrl ? (
          <span>
            {' '}
            -
            {' '}
            <a target="_blank" rel="noreferrer" className={styles.link} href={detailsItem.readMoreUrl}>{Messages.readMore}</a>
          </span>
        ) : null}
      </td>
      <td>
        {detailsItem.silenced
          ? <div className={styles.silenced}>{Messages.silenced}</div>
          : <SilenceAlertButton labels={detailsItem.labels} />}
      </td>
    </>
  );
};
