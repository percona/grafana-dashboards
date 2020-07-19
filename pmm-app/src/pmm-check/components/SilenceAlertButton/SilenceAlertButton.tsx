import React, { FC, useState } from 'react';
import { Labels } from 'pmm-check/types';
import { AlertsReloadContext } from 'pmm-check/Check.context';
import { CheckService } from 'pmm-check/Check.service';
import { ButtonWithSpinner } from 'pmm-check/components';
import { makeSilencePayload } from './SilenceAlertButton.utils';

interface SilenceAlertButtonProps {
  labels: Labels
}

export const SilenceAlertButton: FC<SilenceAlertButtonProps> = ({ labels }) => {
  const alertsReloadContext = React.useContext(AlertsReloadContext);
  const [isRequestPending, setRequestPending] = useState(false);

  const handleClick = async () => {
    const silencePayload = makeSilencePayload(labels);

    setRequestPending(true);
    try {
      await CheckService.silenceAlert(silencePayload);
      alertsReloadContext.fetchAlerts();
    } catch (e) {
      console.error(e);
    } finally {
      setRequestPending(false);
    }
  };

  return (
    <ButtonWithSpinner variant="secondary" size="sm" isLoading={isRequestPending} onClick={handleClick}>
      Silence
    </ButtonWithSpinner>
  );
};
