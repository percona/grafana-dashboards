const assert = require('assert');

const { I } = inject();

module.exports = {

  async apiRegisterCluster(clusterConfiguration, clusterName) {
    const body = {
      kubernetes_cluster_name: clusterName,
      kube_auth: { kubeconfig: clusterConfiguration },
    };
    const headers = { Authorization: `Basic ${await I.getAuth()}` };

    const response = await I.sendPostRequest('v1/management/DBaaS/Kubernetes/Register', body, headers);

    assert.ok(
      response.status === 200,
      `Failed to register cluster with name "${clusterName}". Response message is "${response.data.message}"`,
    );
  },

  async apiUnregisterCluster(clusterName, forceBoolean = false) {
    const body = { kubernetes_cluster_name: clusterName, force: forceBoolean };
    const headers = { Authorization: `Basic ${await I.getAuth()}` };

    const response = await I.sendPostRequest('v1/management/DBaaS/Kubernetes/Unregister', body, headers);

    assert.ok(
      response.status === 200,
      `Failed to unregister cluster with name "${clusterName}". Response message is "${response.data.message}"`,
    );
  },

  async apiDeleteXtraDBCluster(dbClusterName, clusterName) {
    const body = { kubernetes_cluster_name: `${clusterName}`, name: dbClusterName };
    const headers = { Authorization: `Basic ${await I.getAuth()}` };

    const response = await I.sendPostRequest('v1/management/DBaaS/XtraDBCluster/Delete', body, headers);

    assert.ok(
      response.status === 200,
      `Failed to delete pxc cluster with name "${dbClusterName}". Response message is "${response.data.message}"`,
    );
  },

  async apiDeletePSMDBCluster(dbClusterName, clusterName) {
    const body = { kubernetes_cluster_name: clusterName, name: dbClusterName };
    const headers = { Authorization: `Basic ${await I.getAuth()}` };

    const response = await I.sendPostRequest('v1/management/DBaaS/PSMDBCluster/Delete', body, headers);

    assert.ok(
      response.status === 200,
      `Failed to delete MongoDB cluster with name "${dbClusterName}". Response message is "${response.data.message}"`,
    );
  },

  async apiCheckRegisteredClusterExist(clusterName) {
    const body = {};
    const headers = { Authorization: `Basic ${await I.getAuth()}` };

    const response = await I.sendPostRequest('v1/management/DBaaS/Kubernetes/List', body, headers);

    if (response.data.kubernetes_clusters) {
      const cluster = response.data.kubernetes_clusters.find(
        (o) => o.kubernetes_cluster_name === clusterName,
      );

      return cluster !== undefined;
    }

    return false;
  },

  async apiCheckDbClusterExist(dbClusterName, k8sClusterName, dbType = 'MySQL') {
    const body = {
      kubernetesClusterName: k8sClusterName,
      operators: { xtradb: { status: 'OPERATORS_STATUS_OK' }, psmdb: { status: 'OPERATORS_STATUS_OK' } },
      status: 'KUBERNETES_CLUSTER_STATUS_OK',
    };
    const headers = { Authorization: `Basic ${await I.getAuth()}` };
    let response;

    if (dbType === 'MySQL') {
      response = await I.sendPostRequest('v1/management/DBaaS/XtraDBClusters/List', body, headers);
    } else {
      response = await I.sendPostRequest('v1/management/DBaaS/PSMDBClusters/List', body, headers);
    }

    if (response.data.clusters) {
      const cluster = response.data.clusters.find(
        (o) => o.name === dbClusterName,
      );

      return !!cluster;
    }

    return false;
  },

  async waitForXtraDbClusterReady(dbClusterName, clusterName) {
    const body = {
      kubernetesClusterName: clusterName,
      operators: { xtradb: { status: 'OPERATORS_STATUS_OK' }, psmdb: { status: 'OPERATORS_STATUS_OK' } },
      status: 'KUBERNETES_CLUSTER_STATUS_OK',
    };
    const headers = { Authorization: `Basic ${await I.getAuth()}` };

    for (let i = 0; i < 30; i++) {
      const response = await I.sendPostRequest('v1/management/DBaaS/XtraDBClusters/List', body, headers);

      if (response.data.clusters) {
        const cluster = response.data.clusters.find(
          (o) => o.name === dbClusterName,
        );

        if (cluster && cluster.state === 'XTRA_DB_CLUSTER_STATE_READY') {
          break;
        }
      }

      await new Promise((r) => setTimeout(r, 10000));
    }
  },

  async waitForXtraDbClusterPaused(dbClusterName, clusterName) {
    const body = {
      kubernetesClusterName: clusterName,
      operators: { xtradb: { status: 'OPERATORS_STATUS_OK' }, psmdb: { status: 'OPERATORS_STATUS_OK' } },
      status: 'KUBERNETES_CLUSTER_STATUS_OK',
    };
    const headers = { Authorization: `Basic ${await I.getAuth()}` };

    for (let i = 0; i < 30; i++) {
      const response = await I.sendPostRequest('v1/management/DBaaS/XtraDBClusters/List', body, headers);

      if (response.data.clusters) {
        const cluster = response.data.clusters.find(
          (o) => o.name === dbClusterName,
        );

        if (cluster && cluster.state === 'XTRA_DB_CLUSTER_STATE_PAUSED') {
          break;
        }
      }

      await new Promise((r) => setTimeout(r, 10000));
    }
  },

  async waitForPSMDBClusterPaused(dbClusterName, clusterName) {
    const body = {
      kubernetesClusterName: clusterName,
      operators: { xtradb: { status: 'OPERATORS_STATUS_OK' }, psmdb: { status: 'OPERATORS_STATUS_OK' } },
      status: 'KUBERNETES_CLUSTER_STATUS_OK',
    };
    const headers = { Authorization: `Basic ${await I.getAuth()}` };

    for (let i = 0; i < 30; i++) {
      const response = await I.sendPostRequest('v1/management/DBaaS/PSMDBClusters/List', body, headers);

      if (response.data.clusters) {
        const cluster = response.data.clusters.find(
          (o) => o.name === dbClusterName,
        );

        if (cluster && cluster.state === 'PSMDB_CLUSTER_STATE_PAUSED') {
          break;
        }
      }

      await new Promise((r) => setTimeout(r, 10000));
    }
  },


  async waitForPSMDBClusterReady(dbClusterName, clusterName) {
    const body = {
      kubernetesClusterName: clusterName,
      operators: { xtradb: { status: 'OPERATORS_STATUS_OK' }, psmdb: { status: 'OPERATORS_STATUS_OK' } },
      status: 'KUBERNETES_CLUSTER_STATUS_OK',
    };
    const headers = { Authorization: `Basic ${await I.getAuth()}` };

    for (let i = 0; i < 60; i++) {
      const response = await I.sendPostRequest('v1/management/DBaaS/PSMDBClusters/List', body, headers);

      if (response.data.clusters) {
        const cluster = response.data.clusters.find(
          (o) => o.name === dbClusterName,
        );

        if (cluster && cluster.state === 'PSMDB_CLUSTER_STATE_READY') {
          break;
        }
      }

      await new Promise((r) => setTimeout(r, 10000));
    }
  },

  async waitForDbClusterDeleted(dbClusterName, clusterName, dbType = 'MySQL') {
    const body = {
      kubernetesClusterName: clusterName,
      operators: { xtradb: { status: 'OPERATORS_STATUS_OK' }, psmdb: { status: 'OPERATORS_STATUS_OK' } },
      status: 'KUBERNETES_CLUSTER_STATUS_OK',
    };
    const headers = { Authorization: `Basic ${await I.getAuth()}` };

    for (let i = 0; i < 30; i++) {
      let response;

      if (dbType === 'MySQL') {
        response = await I.sendPostRequest('v1/management/DBaaS/XtraDBClusters/List', body, headers);
      } else {
        response = await I.sendPostRequest('v1/management/DBaaS/PSMDBClusters/List', body, headers);
      }

      if (response.data.clusters) {
        const cluster = response.data.clusters.find(
          (o) => o.name === dbClusterName,
        );

        if (cluster === undefined) {
          break;
        }
      } else break;

      await new Promise((r) => setTimeout(r, 10000));
    }
  },

  async deleteAllDBCluster(clusterName) {
    const body = {
      kubernetesClusterName: clusterName,
      operators: { xtradb: { status: 'OPERATORS_STATUS_OK' }, psmdb: { status: 'OPERATORS_STATUS_OK' } },
      status: 'KUBERNETES_CLUSTER_STATUS_OK',
    };
    const headers = { Authorization: `Basic ${await I.getAuth()}` };

    let response = await I.sendPostRequest('v1/management/DBaaS/XtraDBClusters/List', body, headers);

    if (response.data.clusters) {
      for (const db of response.data.clusters) {
        await this.apiDeleteXtraDBCluster(db.name, clusterName);
        await this.waitForDbClusterDeleted(db.name, clusterName);
      }
    }

    response = await I.sendPostRequest('v1/management/DBaaS/PSMDBClusters/List', body, headers);

    if (response.data.clusters) {
      for (const db of response.data.clusters) {
        await this.apiDeletePSMDBCluster(db.name, clusterName);
        await this.waitForDbClusterDeleted(db.name, clusterName, 'MongoDB');
      }
    }
  },
};
