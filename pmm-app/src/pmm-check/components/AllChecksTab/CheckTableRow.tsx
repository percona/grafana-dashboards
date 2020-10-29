import React, { FC, useState } from 'react';
import { ButtonWithSpinner } from 'shared/components/Form';
import { CheckService } from 'pmm-check/Check.service';
import { Messages } from './AllChecksTab.messages';
import { CheckTableRowProps } from './types';

export const CheckTableRow: FC<CheckTableRowProps> = ({ check, onSuccess }) => {
  const [changeCheckPending, setChangeCheckPending] = useState(false);
  const { name, description, enabled } = check;

  const changeCheck = async () => {
    setChangeCheckPending(true);
    const action = enabled ? 'disable' : 'enable';

    try {
      await CheckService.changeCheck({ name, [action]: true });

      onSuccess({ ...check, enabled: !enabled });
    } catch (e) {
      console.error(e);
    } finally {
      setChangeCheckPending(false);
    }
  };

  return (
    <tr key={name}>
      <td>{name}</td>
      <td>{description}</td>
      <td>{enabled ? Messages.enabled : Messages.disabled}</td>
      <td>
        <ButtonWithSpinner
          variant={enabled ? 'destructive' : 'primary'}
          size="sm"
          isLoading={changeCheckPending}
          onClick={changeCheck}
        >
          {enabled ? Messages.disable : Messages.enable}
        </ButtonWithSpinner>
      </td>
    </tr>
  );
};
