const { I } = inject();

module.exports = {
  url: 'graph/d/pmm-dbaas/dbaas?orgId=1',
  positiveAlertText: 'Cluster was successfully added',
  fields: {
    addKubernetesClusterButton: "//span[contains(text(), 'Add new Kubernetes Cluster')]",
    modalWindow: '$modal-body',
    closeButton: '$modal-close-button',
    disabledAddButton: '//button[@data-qa="kubernetes-add-cluster-button" and @disabled]',
    kubernetesClusterNameInput: '$kubernetes-cluster-name-field',
    kubeconfigFileInput: '$kubernetes-kubeconfig-field',
    kubernetesAddButton: '$kubernetes-add-cluster-button',
    requiredField: "//div[contains(text(), 'Required field')]",
  },

  checkAddedCluster(cluserName) {
    const clusterLocator = `//td[contains(text(), '${cluserName}')]`;
    I.seeElement(clusterLocator);
  },
};
