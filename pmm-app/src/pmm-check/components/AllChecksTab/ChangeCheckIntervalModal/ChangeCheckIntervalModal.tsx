import React, { FC, useState } from 'react';
import { logger, RadioButtonGroupField } from '@percona/platform-core';
import { showSuccessNotification } from 'shared/components/helpers';
import { Messages } from './ChangeCheckIntervalModal.messages';
import { Form } from 'react-final-form';
import { FormApi } from 'final-form';
import { Button, HorizontalGroup, useStyles } from '@grafana/ui';
import { LoaderButton, Modal } from '@percona/platform-core';
import { getStyles } from './ChangeCheckIntervalModal.styles';

export interface ChangeCheckIntervalModalProps {
  checkName: string;
  isVisible: boolean;
  setVisible: (value: boolean) => void;
}

export const checkIntervalOptions = [
  { value: 'Pippo', label: 'pippo' },
  { value: 'Baudo', label: 'baudo' },
  { value: 'Mimmo', label: 'mimmo' },
];

export const ChangeCheckIntervalModal: FC<ChangeCheckIntervalModalProps> = ({
  checkName,
  isVisible,
  setVisible,
}) => {
  const styles = useStyles(getStyles);
  const [pending, setPending] = useState(false);

  const onSave = async () => {
    try {
      setPending(true);
      await //AlertRuleTemplateService.delete({ name });
      setVisible(false);
      showSuccessNotification({ message: Messages.getSuccess(checkName) });
    } catch (e) {
      logger.error(e);
    } finally {
      setPending(false);
    }
  };

  const updateCheckInterval = (form: FormApi<any>) => {
    console.log(form.getFieldState('checkInterval'))
  }

  return (
    <Modal title={Messages.title} isVisible={isVisible} onClose={() => setVisible(false)}>
      <div className={styles.content}>
        <h4 className={styles.title}>{Messages.getDescription(checkName)}</h4>
        <Form
          onSubmit={() => {}}
          render={({ form, handleSubmit, valid, pristine }) => (
            <form className={styles.form} onSubmit={handleSubmit} onChange={() => updateCheckInterval(form)}>
              <RadioButtonGroupField name="checkInterval" options={checkIntervalOptions} />
            </form>
          )}
        />
      </div>
      <HorizontalGroup justify="center" spacing="md">
        <LoaderButton
          loading={pending}
          variant="destructive"
          size="md"
          onClick={onSave}
          data-qa="change-check-interval-modal-save"
        >
          {Messages.save}
        </LoaderButton>
        <Button variant="secondary" size="md" onClick={() => setVisible(false)} data-qa="change-check-interval-modal-cancel">
          {Messages.cancel}
        </Button>
      </HorizontalGroup>
    </Modal>
  );
};
