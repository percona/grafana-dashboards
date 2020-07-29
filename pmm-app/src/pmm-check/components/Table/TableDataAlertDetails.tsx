import React, { FC } from 'react';
import { SEVERITY } from 'pmm-check/CheckPanel.constants';
import { SilenceAlertButton } from 'pmm-check/components';
import { TableDataAlertDetailsProps } from 'pmm-check/types';

export const TableDataAlertDetails: FC<TableDataAlertDetailsProps> = ({ detailsItem }) => (
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
