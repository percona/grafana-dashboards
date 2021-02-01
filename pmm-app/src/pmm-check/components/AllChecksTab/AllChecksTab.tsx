import React, { FC, useEffect, useState } from 'react';
import { cx } from 'emotion';
import { CheckDetails } from 'pmm-check/types';
import { CheckService } from 'pmm-check/Check.service';
import { Spinner, useTheme } from '@grafana/ui';
// TODO: make a shared table style
import { getStyles as getTableStyles } from 'pmm-check/components/Table/Table.styles';
import * as checkPanelStyles from 'pmm-check/CheckPanel.styles';
import { Messages } from './AllChecksTab.messages';
import * as styles from './AllChecksTab.styles';
import { FetchChecks } from './types';
import { CheckTableRow } from './CheckTableRow';

export const AllChecksTab: FC = () => {
  const [fetchChecksPending, setFetchChecksPending] = useState(false);
  const [checks, setChecks] = useState<CheckDetails[] | undefined>();
  const theme = useTheme();
  const tableStyles = getTableStyles(theme);

  const updateUI = (check: CheckDetails) => {
    const { name, disabled } = check;

    setChecks((oldChecks) => oldChecks?.map((oldCheck) => {
      if (oldCheck.name !== name) {
        return oldCheck;
      }

      return { ...oldCheck, disabled };
    }));
  };

  const fetchChecks: FetchChecks = async () => {
    setFetchChecksPending(true);

    try {
      const checks = await CheckService.getAllChecks();

      setChecks(checks);
    } catch (err) {
      console.error(err);
    } finally {
      setFetchChecksPending(false);
    }
  };

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
        <table className={tableStyles.table} data-qa="db-checks-all-checks-table">
          <colgroup>
            <col className={styles.nameColumn} />
            <col />
            <col className={styles.statusColumn} />
            <col className={styles.actionsColumn} />
          </colgroup>
          <thead data-qa="db-checks-all-checks-thead">
            <tr>
              <th>{Messages.name}</th>
              <th>{Messages.description}</th>
              <th>{Messages.status}</th>
              <th>{Messages.actions}</th>
            </tr>
          </thead>
          <tbody data-qa="db-checks-all-checks-tbody">
            {checks?.map((check) => (
              <CheckTableRow check={check} onSuccess={updateUI} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
