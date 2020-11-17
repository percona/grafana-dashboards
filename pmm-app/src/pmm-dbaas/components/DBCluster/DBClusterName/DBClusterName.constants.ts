import { Databases } from 'shared/core';

export const DASHBOARD_URL_MAP = {
  [Databases.mysql]: '/graph/d/pxc-cluster-summary/pxc-galera-cluster-summary?var-cluster=',
  [Databases.mongodb]: '/graph/d/mongodb-cluster-summary/mongodb-cluster-summary?var-cluster=',
};
