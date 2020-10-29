import React, { FC, useEffect, useState } from 'react';
import { cx } from 'emotion';
import { ButtonWithSpinner } from 'shared/components/Form';
import { CheckDetails } from 'pmm-check/types';
import { CheckService } from 'pmm-check/Check.service';
import { Spinner, useTheme } from '@grafana/ui';
// TODO: make a table shared style
import { getStyles as getTableStyles } from 'pmm-check/components/Table/Table.styles';
import * as checkPanelStyles from 'pmm-check/CheckPanel.styles';
import { Messages } from './AllChecksTab.messages';
import * as styles from './AllChecksTab.styles';
import { ChangeCheck, FetchChecks } from './types';

export const AllChecksTab: FC = () => {
  const [changeCheckPending, setChangeCheckPending] = useState(false);
  const [fetchChecksPending, setFetchChecksPending] = useState(false);
  const [checks, setChecks] = useState<CheckDetails[] | undefined>();
  const theme = useTheme();
  const tableStyles = getTableStyles(theme);

  const changeCheck: ChangeCheck = async (checkName, enabled) => {
    setChangeCheckPending(true);
    const action = enabled ? 'enable' : 'disable';

    try {
      await CheckService.changeCheck({ name: checkName, [action]: true });

      // update the UI to show the new value
      setChecks(oldChecks => oldChecks?.map(c => {
        if (c.name !== checkName) {
          return c;
        }
        return { ...c, enabled };
      }));
    } catch (e) {
      console.error(e);
    } finally {
      setChangeCheckPending(false);
    }
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
        <table className={cx(tableStyles.table, styles.table)} data-qa="db-checks-all-checks-table">
          <thead data-qa="db-checks-all-checks-thead">
            <tr>
              <th>{Messages.name}</th>
              <th>{Messages.description}</th>
              <th>{Messages.actions}</th>
            </tr>
          </thead>
          <tbody data-qa="db-checks-all-checks-tbody">
            {checks?.map((check) => (
              <tr key={check.name}>
                <td>{check.name}</td>
                <td>{check.description}</td>
                <td>
                  <ButtonWithSpinner
                    variant="secondary"
                    size="sm"
                    isLoading={changeCheckPending}
                    onClick={() => changeCheck(check.name, check.enabled === true)}
                  >
                    {check.enabled ? Messages.disable : Messages.enable}
                  </ButtonWithSpinner>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
