import React, { FC } from 'react';
import { useTheme } from '@grafana/ui';
import { ActiveCheck, Column } from 'pmm-check/types';
import { getStyles } from './Table.styles';
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';

interface TableProps {
  columns: Column[];
  data?: ActiveCheck[];
  hasNoAccess?: boolean;
}

export const Table: FC<TableProps> = ({
  columns, data = [], hasNoAccess = false,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const isEmpty = !data.length;

  if (hasNoAccess) {
    return (
      <>
        <div className={styles.wrapper}>
          <div className={styles.empty} data-qa="db-check-panel-no-access">
            Insufficient access rights.
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.wrapper}>
        {isEmpty ? (
          <div className={styles.empty} data-qa="db-check-panel-table-empty">
            No failed checks. Checks run every 24 hours.
          </div>
        ) : (
          <table className={styles.table} data-qa="db-check-panel-table">
            <TableHeader columns={columns} />
            <TableBody data={data} />
          </table>
        )}
      </div>
    </>
  );
};
