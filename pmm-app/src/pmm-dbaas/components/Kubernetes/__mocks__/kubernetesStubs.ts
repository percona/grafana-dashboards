export const kubernetesStub = [
  {
    kubernetesClusterName: 'Cluster 1'
  },
  {
    kubernetesClusterName: 'Cluster 2'
  }
];

export const deleteActionStub = jest.fn();
export const addActionStub = jest.fn(() => {
  kubernetesStub.push({ kubernetesClusterName: 'test' });
});
