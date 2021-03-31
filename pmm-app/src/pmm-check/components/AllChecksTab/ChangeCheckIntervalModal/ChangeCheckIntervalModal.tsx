import React, { FC, useState } from 'react';
import { logger, RadioButtonGroupField } from '@percona/platform-core';
import { showSuccessNotification } from 'shared/components/helpers';
import { Messages } from './ChangeCheckIntervalModal.messages';
import { Form } from 'react-final-form';
import { FormApi } from 'final-form';
import { Button, HorizontalGroup, useStyles } from '@grafana/ui';
import { LoaderButton, Modal } from '@percona/platform-core';
import { CheckService } from 'pmm-check/Check.service';
import { Interval } from 'pmm-check/types';
import { getStyles } from './ChangeCheckIntervalModal.styles';
import { ChangeCheckIntervalModalProps } from './types';
import { checkIntervalOptions } from './ChangeCheckIntervalModal.constants';

export const ChangeCheckIntervalModal: FC<ChangeCheckIntervalModalProps> = ({
  checkName,
  isVisible,
  setVisible,
}) => {
  const styles = useStyles(getStyles);
  const [pending, setPending] = useState(false);
  const [selectedInterval, setSelectedInterval] = useState(Interval.STANDARD);

  const onSave = async () => {
    try {
      setPending(true);
      await CheckService.changeInterval({
        name: checkName,
        interval: selectedInterval,
      });
      setVisible(false);
      showSuccessNotification({ message: Messages.getSuccess(checkName) });
    } catch (e) {
      logger.error(e);
    } finally {
      setPending(false);
    }
  };

  interface Values {
    interval: Interval;
  }

  const updateCheckInterval = (form: FormApi<Values>) => {
    console.log(form.getFieldState('interval'));
  }

  const initialValues = {
    interval: Interval.STANDARD,
  }

  return (
    <Modal title={Messages.title} isVisible={isVisible} onClose={() => setVisible(false)}>
      <div className={styles.content}>
        <h4 className={styles.title}>{Messages.getDescription(checkName)}</h4>
        <Form
          onSubmit={() => {}}
          initialValues={initialValues}
          render={({ form, handleSubmit, valid, pristine }) => (
            <form className={styles.form} onSubmit={handleSubmit} onChange={() => updateCheckInterval(form)}>
              <RadioButtonGroupField name="interval" options={checkIntervalOptions} />
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
