import React, { FC, useEffect, useState } from 'react';
import { cx } from 'emotion';
import { Table } from 'pmm-check/components';
import { showSuccessNotification } from 'shared/components/helpers';
import { ButtonWithSpinner } from 'shared/components/Form';
import { CheckDetails } from 'pmm-check/types';
import { COLUMNS } from 'pmm-check/CheckPanel.constants';
import { AlertsReloadContext } from 'pmm-check/Check.context';
import { CheckService } from 'pmm-check/Check.service';
import { Spinner } from '@grafana/ui';
import { Messages } from './AllChecksTab.messages';
// TODO: make a table shared style
import { getStyles as getTableStyles } from 'pmm-check/components/Table/Table.styles';
import * as checkPanelStyles from 'pmm-check/CheckPanel.styles';
import * as styles from './AllChecksTab.styles';
import { useTheme } from '@grafana/ui';

export const AllChecksTab: FC = () => {
  const [fetchChecksPending, setFetchChecksPending] = useState(false);
  const [checks, setChecks] = useState<CheckDetails[] | undefined>();
  const theme = useTheme();
  const tableStyles = getTableStyles(theme);

  const fetchChecks = async (): Promise<void> => {
    setFetchChecksPending(true);

    try {
      const checks = await CheckService.getAllChecks();

      setChecks(checks);
    } catch (err) {
      console.error(err);
    } finally {
      setFetchChecksPending(false);
    }
  }

  useEffect(() => {
    fetchChecks();
  }, []);

  return (
    <div className={cx(tableStyles.wrapper, styles.wrapper)} data-qa="db-checks-all-checks-wrapper">
      {fetchChecksPending ? (
        <div className={checkPanelStyles.spinner} data-qa="db-checks-all-checks-spinner">
          <Spinner />
        </div>
      ) : (
        <table className={cx(tableStyles.table, styles.table)} data-qa="db-checks-all-checks-table">
          <thead data-qa="db-checks-all-checks-thead">
            <tr>
              <th>{Messages.name}</th>
            </tr>
          </thead>
          <tbody data-qa="db-checks-all-checks-tbody">
            {checks?.map(check => (
              <tr>
                <td>{check.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
