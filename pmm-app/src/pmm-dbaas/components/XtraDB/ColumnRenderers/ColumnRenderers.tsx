import React from 'react';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { XtraDBClusterConnection } from '../XtraDBClusterConnection/XtraDBClusterConnection';
import { XtraDBClusterStatus } from '../XtraDBClusterStatus/XtraDBClusterStatus';
import { XtraDBClusterStatus as Status } from '../XtraDB.types';

export const clusterStatusRender = (xtraDBCluster) => {
  const { status, errorMessage } = xtraDBCluster;

  return (
    <XtraDBClusterStatus
      status={status || Status.failed}
      errorMessage={errorMessage || Messages.xtradb.table.status.errorMessage}
    />
  );
};

export const connectionRender = (xtraDBCluster) => (
  <XtraDBClusterConnection xtraDBCluster={xtraDBCluster} />
);
