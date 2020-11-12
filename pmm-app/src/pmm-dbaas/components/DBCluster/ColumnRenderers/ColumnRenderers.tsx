import React from 'react';
import { DATABASE_LABELS } from 'shared/core';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { DBClusterConnection } from '../DBClusterConnection/DBClusterConnection';
import { DBClusterStatus } from '../DBClusterStatus/DBClusterStatus';
import { DBClusterStatus as Status } from '../DBCluster.types';
import { DBClusterParameters } from '../DBClusterParameters/DBClusterParameters';
import { DBClusterName } from '../DBClusterName/DBClusterName';

export const clusterNameRender = (dbCluster) => (
  <DBClusterName dbCluster={dbCluster} />
);

export const databaseTypeRender = (dbCluster) => DATABASE_LABELS[dbCluster.databaseType];

export const clusterStatusRender = (dbCluster) => {
  const { status, errorMessage } = dbCluster;

  return (
    <DBClusterStatus
      status={status || Status.failed}
      errorMessage={errorMessage || Messages.dbcluster.table.status.errorMessage}
    />
  );
};

export const connectionRender = (dbCluster) => <DBClusterConnection dbCluster={dbCluster} />;
export const parametersRender = (dbCluster) => <DBClusterParameters dbCluster={dbCluster} />;
