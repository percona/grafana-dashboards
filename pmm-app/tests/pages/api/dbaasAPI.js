const assert = require('assert');

const { I } = inject();

module.exports = {

  async apiRegisterCluster(clusterConfiguration, clusterName) {
    const body = JSON.stringify({ kubernetes_cluster_name: `${clusterName}`, kube_auth: { kubeconfig: `${clusterConfiguration}` } });
    const headers = { Authorization: `Basic ${await I.getAuth()}` };

    const response = await I.sendPostRequest('v1/management/DBaaS/Kubernetes/Register', body, headers);

    assert.ok(
      response.status === 200,
      `Failed to register cluster with name "${clusterName}". Response message is "${response.data.message}"`,
    );
  },

  async apiUnregisterCluster(clusterName, forceBoolean = false) {
    const body = JSON.stringify({ kubernetes_cluster_name: `${clusterName}`, force: forceBoolean });
    const headers = { Authorization: `Basic ${await I.getAuth()}` };

    const response = await I.sendPostRequest('v1/management/DBaaS/Kubernetes/Unregister', body, headers);

    assert.ok(
      response.status === 200,
      `Failed to unregister cluster with name "${clusterName}". Response message is "${response.data.message}"`,
    );
  },
};
