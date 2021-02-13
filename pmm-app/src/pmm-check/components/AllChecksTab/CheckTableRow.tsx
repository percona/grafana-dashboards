import React, { FC, useState } from 'react';
import { ButtonWithSpinner } from 'shared/components/Form';
import { CheckService } from 'pmm-check/Check.service';
import { Messages } from './AllChecksTab.messages';
import { CheckTableRowProps } from './types';

export const CheckTableRow: FC<CheckTableRowProps> = ({ check, onSuccess }) => {
  const [changeCheckPending, setChangeCheckPending] = useState(false);
  const {
    name, summary, description, disabled,
  } = check;

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
    <tr key={name}>
      <td>{summary}</td>
      <td>{description}</td>
      <td>{disabled ? Messages.disabled : Messages.enabled}</td>
      <td>
        <ButtonWithSpinner
          variant={disabled ? 'primary' : 'destructive'}
          size="sm"
          isLoading={changeCheckPending}
          onClick={changeCheck}
        >
          {disabled ? Messages.enable : Messages.disable}
        </ButtonWithSpinner>
      </td>
    </tr>
  );
};
