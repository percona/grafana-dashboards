import React, { FC, useEffect, useState } from 'react';
import { Table } from 'pmm-check/components';
import { showSuccessNotification } from 'shared/components/helpers';
import { ButtonWithSpinner } from 'shared/components/Form';
import { ActiveCheck } from 'pmm-check/types';
import { COLUMNS } from 'pmm-check/CheckPanel.constants';
import { AlertsReloadContext } from 'pmm-check/Check.context';
import { CheckService } from 'pmm-check/Check.service';
import { Spinner, Switch, useStyles } from '@grafana/ui';
import { FailedChecksTabProps } from './types';
import { Messages } from './FailedChecksTab.messages';
import { getStyles } from './FailedChecksTab.styles';

export const FailedChecksTab: FC<FailedChecksTabProps> = ({ hasNoAccess }) => {
  const [fetchAlertsPending, setFetchAlertsPending] = useState(false);
  const [runChecksPending, setRunChecksPending] = useState(false);
  const [showSilenced, setShowSilenced] = useState(false);
  const [dataSource, setDataSource] = useState<ActiveCheck[] | undefined>();
  const styles = useStyles(getStyles);

  const fetchAlerts = async (): Promise<void> => {
    setFetchAlertsPending(true);

    try {
      const dataSource = await CheckService.getActiveAlerts(showSilenced);

      setDataSource(dataSource);
    } catch (err) {
      console.error(err);
    } finally {
      setFetchAlertsPending(false);
    }
  };

  const handleRunChecksClick = async () => {
    setRunChecksPending(true);
    try {
      await CheckService.runDbChecks();
    } catch (e) {
      console.error(e);
    }
    // TODO (nicolalamacchia): remove this timeout when the API will become synchronous
    setTimeout(async () => {
      setRunChecksPending(false);
      await fetchAlerts();
      showSuccessNotification({ message: 'Done running DB checks. The latest results are displayed.' });
    }, 10000);
  };

  const toggleShowSilenced = () => {
    setShowSilenced((currentValue) => !currentValue);
    fetchAlerts();
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.actionButtons} data-qa="db-check-panel-actions">
          <span className={styles.showAll}>
            <Switch value={showSilenced} onChange={toggleShowSilenced} data-qa="db-checks-failed-checks-toggle-silenced" />
            <span>Show All</span>
          </span>
          <ButtonWithSpinner
            onClick={handleRunChecksClick}
            isLoading={runChecksPending}
            disabled={hasNoAccess}
            className={styles.runChecksButton}
          >
            {Messages.runDbChecks}
          </ButtonWithSpinner>
        </div>
      </div>
      <AlertsReloadContext.Provider value={{ fetchAlerts }}>
        {fetchAlertsPending ? (
          <div className={styles.spinner} data-qa="db-checks-failed-checks-spinner">
            <Spinner />
          </div>
        ) : (
          <Table
            data={dataSource}
            columns={COLUMNS}
            hasNoAccess={hasNoAccess}
          />
        )}
      </AlertsReloadContext.Provider>
    </>
  );
};
