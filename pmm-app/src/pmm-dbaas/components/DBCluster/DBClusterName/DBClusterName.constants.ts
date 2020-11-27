/* eslint implicit-arrow-linebreak: 0 */
import { Databases } from 'shared/core';

export const DASHBOARD_URL_MAP = {
  [Databases.mysql]: (clusterName: string) =>
    `/graph/d/pxc-cluster-summary/pxc-galera-cluster-summary?var-cluster=${clusterName}-pxc`,
  [Databases.mongodb]: (clusterName: string) =>
    `/graph/d/mongodb-cluster-summary/mongodb-cluster-summary?var-cluster=${clusterName}`,
};
