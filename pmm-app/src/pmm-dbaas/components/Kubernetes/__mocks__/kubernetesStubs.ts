export const kubernetesStub = [
  {
    kubernetesClusterName: 'Cluster 1',
    operators: {
      psmdb: {
        status: 'DB_CLUSTER_STATE_READY',
      },
      xtradb: {
        status: 'DB_CLUSTER_STATE_READY',
      },
    },
    status: 'KUBERNETES_CLUSTER_STATUS_OK',
  },
  {
    kubernetesClusterName: 'Cluster 2',
    operators: {
      psmdb: {
        status: 'DB_CLUSTER_STATE_READY',
      },
      xtradb: {
        status: 'DB_CLUSTER_STATE_READY',
      },
    },
    status: 'KUBERNETES_CLUSTER_STATUS_OK',
  },
];

export const deleteActionStub = jest.fn();
export const addActionStub = jest.fn(() => {
  kubernetesStub.push({
    kubernetesClusterName: 'test',
    operators: {
      psmdb: {
        status: 'DB_CLUSTER_STATE_READY',
      },
      xtradb: {
        status: 'DB_CLUSTER_STATE_READY',
      },
    },
    status: 'KUBERNETES_CLUSTER_STATUS_OK',
  });
});
