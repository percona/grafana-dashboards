import React from 'react';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { DBCluster, DBClusterStatus, DBClusterStatusMap } from './DBCluster.types';
import { ADVANCED_SETTINGS_URL } from './DBCluster.constants';

export const isClusterChanging = ({ status }: DBCluster) => {
  const isChanging = status === DBClusterStatus.changing || status === DBClusterStatus.deleting;

  return isChanging;
};

export const getClusterStatus = (
  status: string | undefined,
  statusMap: DBClusterStatusMap,
): DBClusterStatus => {
  const key = Object.keys(statusMap).find((key) => statusMap[key] === status) as DBClusterStatus;

  return key || DBClusterStatus.changing;
};

export const buildWarningMessage = (className: string) => (
  <>
    {Messages.dbcluster.publicAddressWarningBegin}
    &nbsp;
    <a href={ADVANCED_SETTINGS_URL} className={className}>
      {Messages.dbcluster.publicAddressWarningLink}
    </a>
    &nbsp;
    {Messages.dbcluster.publicAddressWarningEnd}
  </>
);
