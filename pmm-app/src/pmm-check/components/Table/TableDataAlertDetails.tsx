import React, { FC } from 'react';
import { SEVERITY } from 'pmm-check/CheckPanel.constants';
import { SilenceAlertButton } from 'pmm-check/components';

export const TableDataAlertDetails: FC<{detailsItem: any}> = ({ detailsItem }) => (
  <>
    <td>
      {SEVERITY[detailsItem.labels.severity]}
    </td>
    <td>
      {detailsItem.description}
    </td>
    <td>
      <SilenceAlertButton labels={detailsItem.labels} />
    </td>
  </>
);
