import React, { FC, useState } from 'react';
import { IconButton, useStyles } from '@grafana/ui';
import { ButtonWithSpinner } from 'shared/components/Form';
import { CheckService } from 'pmm-check/Check.service';
import { Messages } from './AllChecksTab.messages';
import { CheckTableRowProps } from './types';
import { Interval } from 'pmm-check/types';
import { ChangeCheckIntervalModal } from './ChangeCheckIntervalModal';
import { getStyles } from './CheckTableRow.styles';

const formatInterval = (interval: Interval): typeof Interval => Interval[interval];

export const CheckTableRow: FC<CheckTableRowProps> = ({ check, onSuccess }) => {
  const styles = useStyles(getStyles)
  const [changeCheckPending, setChangeCheckPending] = useState(false);
  const [checkIntervalModalVisible, setCheckIntervalModalVisible] = useState(false);
  const {
    name, summary, description, disabled, interval,
  } = check;

  const handleChangeCheckInterval = () => {
    setCheckIntervalModalVisible(true);
  }

  const changeCheck = async () => {
    setChangeCheckPending(true);
    const action = disabled ? 'enable' : 'disable';

    try {
      await CheckService.changeCheck({ params: [{ name, [action]: true }] });

      onSuccess({ ...check, disabled: !disabled });
    } catch (e) {
      console.error(e);
    } finally {
      setChangeCheckPending(false);
    }
  };

  return (
    <>
      <tr key={name}>
        <td>{summary}</td>
        <td>{description}</td>
        <td>{disabled ? Messages.disabled : Messages.enabled}</td>
        <td>{formatInterval(interval)}</td>
        <td>
          <div className={styles.actionsWrapper}>
            <ButtonWithSpinner
              variant={disabled ? 'primary' : 'destructive'}
              size="sm"
              isLoading={changeCheckPending}
              onClick={changeCheck}
            >
              {disabled ? Messages.enable : Messages.disable}
            </ButtonWithSpinner>
            <IconButton title={Messages.changeIntervalButtonTitle} name="history" onClick={handleChangeCheckInterval} />
          </div>
        </td>
      </tr>
      <ChangeCheckIntervalModal isVisible={checkIntervalModalVisible} setVisible={setCheckIntervalModalVisible} checkName={name} />
    </>
  );
};
