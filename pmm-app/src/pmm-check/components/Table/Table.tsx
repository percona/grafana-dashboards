import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@grafana/ui';
import { Column, ActiveCheck } from 'pmm-check/types';
import { PMM_SETTINGS_URL } from 'pmm-check/CheckPanel.constants';
import { getStyles } from './Table.styles';
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { Messages } from './Table.messages';
import { CheckService } from 'pmm-check/Check.service';
import { ButtonWithSpinner } from 'pmm-check/components';

interface TableProps {
  caption?: string;
  columns: Column[];
  data?: ActiveCheck[];
  hasNoAccess?: boolean;
  isSttEnabled: boolean;
  fetchAlerts?: () => void;
}

export const Table: FC<TableProps> = ({
  caption,
  columns,
  data = [],
  isSttEnabled,
  hasNoAccess = false,
  fetchAlerts = () => {},
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const isEmpty = !data.length;

  const [isRerunChecksLoading, setIsRerunChecksLoading] = useState(false);

  const handleRerunChecksClick = async () => {
    setIsRerunChecksLoading(true);
    try {
      await CheckService.rerunDbChecks();
    } catch (e) {
      console.error(e);
    }
    setTimeout(() => {
      setIsRerunChecksLoading(false);
      fetchAlerts();
    }, 10000);
  };

  if (hasNoAccess) {
    return (
      <>
        <div className={styles.caption} data-qa="db-check-panel-table-caption">
          {caption}
          <ButtonWithSpinner disabled>{Messages.rerunDbChecks}</ButtonWithSpinner>
        </div>
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
      {caption && (
        <div className={styles.caption} data-qa="db-check-panel-table-caption">
          {caption}
          <ButtonWithSpinner onClick={handleRerunChecksClick} isLoading={isRerunChecksLoading}>
            {Messages.rerunDbChecks}
          </ButtonWithSpinner>
        </div>
      )}
      <div className={styles.wrapper}>
        {!isSttEnabled && (
          <div className={styles.empty} data-qa="db-check-panel-settings-link">
            Security Threat Tool is disabled. You can enable it in&nbsp;
            <Link className={styles.link} to={PMM_SETTINGS_URL}>
              PMM Settings.
            </Link>
          </div>
        )}
        {isSttEnabled && isEmpty && (
          <div className={styles.empty} data-qa="db-check-panel-table-empty">
            No failed checks. Checks run every 24 hours.
          </div>
        )}
        {isSttEnabled && !isEmpty && (
          <table className={styles.table} data-qa="db-check-panel-table">
            <TableHeader columns={columns} />
            <TableBody data={data} />
          </table>
        )}
      </div>
    </>
  );
};
