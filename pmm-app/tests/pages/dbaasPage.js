const { I } = inject();

module.exports = {
  url: 'graph/dbaas',
  addedAlertMessage: 'Cluster was successfully added',
  confirmDeleteText: 'Are you sure that you want to permanently delete this cluster?',
  deletedAlertMessage: 'Cluster successfully deleted',
  fields: {
    addKubernetesClusterButton: '$kubernetes-new-cluster-button',
    addKubernetesClusterButtonInTable:
      '//div[@data-qa=\'table-no-data\']//span[contains(text(), \'Register new Kubernetes Cluster\')]',
    modalWindow: '$modal-body',
    closeButton: '$modal-close-button',
    disabledAddButton: '//button[@data-qa="kubernetes-add-cluster-button" and @disabled]',
    kubernetesClusterNameInput: '$name-text-input',
    kubeconfigFileInput: '$kubeConfig-textarea-input',
    kubernetesAddButton: '$kubernetes-add-cluster-button',
    requiredField: '//div[contains(text(), \'Required field\')]',
    proceedButton: '$delete-kubernetes-button',
  },

  checkCluster(cluserName, deleted) {
    const clusterLocator = `//td[contains(text(), '${cluserName}')]`;

    if (deleted) {
      I.dontSeeElement(clusterLocator);
    } else {
      I.waitForVisible(clusterLocator, 30);
    }
  },

  seeErrorForAddedCluster(clusterName) {
    const message = `Kubernetes Cluster with Name "${clusterName}" already exists.`;

    I.waitForText(message, 10);
  },

  addKubernetesCluster(clusterName, config) {
    I.click(this.fields.addKubernetesClusterButton);
    I.fillField(this.fields.kubernetesClusterNameInput, clusterName);
    I.fillField(this.fields.kubeconfigFileInput, config);
    I.click(this.fields.kubernetesAddButton);
  },

  deleteCluster(cluserName) {
    const deleteLocator = `//td[contains(text(), '${cluserName}')]//parent::tr//button[@data-qa='open-delete-modal-button']`;

    I.waitForVisible(deleteLocator, 30);
    I.click(deleteLocator);
    I.waitForText(this.confirmDeleteText, 10);
    I.click(this.fields.proceedButton);
    I.waitForText(this.deletedAlertMessage, 10);
  },
};
