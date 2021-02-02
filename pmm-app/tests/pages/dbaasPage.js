const { I } = inject();

module.exports = {
  url: 'graph/d/pmm-dbaas/dbaas?orgId=1',
  addedAlertMessage: 'Cluster was successfully registered',
  confirmDeleteText: 'Are you sure that you want to unregister this cluster?',
  deletedAlertMessage: 'Cluster successfully unregistered',
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
    unregisterButton: '//div[@data-qa=\'dropdown-menu-menu\']//span[1]',
    viewClusterConfiguration: '//div[@data-qa=\'dropdown-menu-menu\']//span[2]',
    forceUnreigsterCheckBox: '.checkbox-container__checkmark',
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

  registerKubernetesCluster(clusterName, config) {
    I.click(this.fields.addKubernetesClusterButton);
    I.fillField(this.fields.kubernetesClusterNameInput, clusterName);
    I.fillField(this.fields.kubeconfigFileInput, config);
    I.click(this.fields.kubernetesAddButton);
  },

  unregisterCluster(cluserName) {
    const actionsLocator = `//td[contains(text(), '${cluserName}')]//parent::tr//button[@data-qa='dropdown-menu-toggle']`;

    I.waitForVisible(actionsLocator, 30);
    I.click(actionsLocator);
    I.waitForElement(this.fields.unregisterButton, 30);
    I.click(this.fields.unregisterButton);
    I.waitForText(this.confirmDeleteText, 10);
    I.click(this.fields.proceedButton);
    I.waitForText(this.deletedAlertMessage, 10);
  },
};
