import React, { FC } from 'react';
import { Button } from '@grafana/ui';
import { CheckService } from 'pmm-check/Check.service';
import { AlertsReloadContext } from 'pmm-check/Check.context';
import { DetailsProps, Labels } from 'pmm-check/types';
import { makeSilencePayload } from './Details.utils';

import * as styles from './Details.styles';

export const Details: FC<DetailsProps> = ({ details }) => {
  const alertsReloadContext = React.useContext(AlertsReloadContext);
  const silenceAlert = async (labels: Labels) => {
    const silencePayload = makeSilencePayload(labels);

    try {
      await CheckService.silenceAlert(silencePayload);
      alertsReloadContext.fetchAlerts();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ul className={styles.List}>
      {details.map(({ description, labels }) => (
        <li key={description} className={styles.ListItem}>
          {description}
          <Button className={styles.SilenceButton} variant="secondary" size="sm" onClick={() => silenceAlert(labels)}>
            Silence
          </Button>
        </li>
      ))}
    </ul>
  );
};
