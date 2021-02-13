const { I } = inject();

module.exports = {
  url: 'graph/d/pmm-dbaas/dbaas?orgId=1',
  addedAlertMessage: 'Cluster was successfully registered',
  confirmDeleteText: 'Are you sure that you want to unregister this cluster?',
  deletedAlertMessage: 'Cluster successfully unregistered',
  configurationCopiedMessage: 'Copied',
  monitoringWarningMessage: 'If you want to use monitoring, you need to set your PMM installation public address in',
  requiredFieldError: 'Required field',
  valueGreatThanErrorText: (value) => `Value should be greater or equal to ${value}`,
  tabs: {
    kubernetesClusterTab: {
      addKubernetesClusterButton: '$kubernetes-new-cluster-button',
      addKubernetesClusterButtonInTable: '//div[@data-qa=\'table-no-data\']//span[contains(text(), \'Register new Kubernetes Cluster\')]',
      actionsLocator: (clusterName) => `//td[contains(text(), "${clusterName}")]//parent::tr//button[@data-qa="dropdown-menu-toggle"]`,
      closeButton: '$modal-close-button',
      clusterConfigurationText: '//div[@data-qa=\'pmm-overlay-wrapper\']//pre',
      copyToClipboardButton: '//span[contains(text(), \'Copy to clipboard\')]',
      disabledAddButton: '//button[@data-qa="kubernetes-add-cluster-button" and @disabled]',
      forceUnreigsterCheckBox: '.checkbox-container__checkmark',
      kubeconfigFileInput: '$kubeConfig-textarea-input',
      kubernetesAddButton: '$kubernetes-add-cluster-button',
      kubernetesClusterNameInput: '$name-text-input',
      modalWindow: '$modal-body',
      modalCloseButton: '$modal-close-button',
      modalContent: '$modal-content',
      proceedButton: '$delete-kubernetes-button',
      requiredField: '//div[contains(text(), \'Required field\')]',
      unregisterButton: '//div[@data-qa=\'dropdown-menu-menu\']//span[1]',
      viewClusterConfiguration: '//div[@data-qa=\'dropdown-menu-menu\']//span[2]',
    },
    dbClusterTab: {
      defaultPassword: '***************',
      addDbClusterButton: '$dbcluster-add-cluster-button',
      createClusterButton: '$step-progress-submit-button',
      dbClusterTab: '//li[@aria-label=\'Tab DB Cluster\']',
      monitoringWarningLocator: '$add-cluster-monitoring-warning',
      optionsCountLocator: (step) => `(//div[@data-qa='step-header']//div[1])[${step}]`,
      optionsHeader: '$step-header',
      basicOptions: {
        fields: {
          clusterNameField: '$name-text-input',
          clusterNameFieldErrorMessage: '$name-field-error-message',
          dbClusterDatabaseTypeField: '$dbcluster-database-type-field',
          dbClusterDatabaseTypeFieldSelect: (dbtype) => `//div[@aria-label='Select option']//span[contains(@text, ${dbtype})]`,
          dbClusterDatabaseTypeFieldErrorMessage: '$select-field-error-message',
          kubernetesClusterDropDown: '$dbcluster-kubernetes-cluster-field',
          kubernetesClusterDropDownSelect: (clusterName) => `//div[@aria-label='Select option']//span[contains(@text, ${clusterName})]`,
          kubernetesClusterErrorMessage: '$select-field-error-message',
        },
      },
      advancedOptions: {
        fields: {
          cpuFieldErrorMessage: '$cpu-field-error-message',
          cpuNumberFields: '$cpu-number-input',
          dbClusterResourceField: '$dbcluster-resources-field',
          dbClusterTopologyField: '$dbcluster-topology-field',
          diskFieldErrorMessage: '$disk-field-error-message',
          diskSizeInputField: '$disk-number-input',
          memoryField: '$memory-number-input',
          memoryFieldErrorMessage: '$memory-field-error-message',
          nodesFieldErrorMessage: '$nodes-field-error-message',
          nodesNumberField: '$nodes-number-input',
          resourcesPerNode: (clusterSize) => `//label[@for="${clusterSize}"]`,
        },
      },
      fields: {
        clusterConnection: {
          dbHost: '$cluster-connection-host',
          dbPort: '$cluster-connection-port',
          dbUsername: '$cluster-connection-username',
          dbPassword: '$cluster-connection-password',
          showPasswordButton: '$show-password-button',
          dbPasswordValue: '//div[@data-qa=\'cluster-connection-password\']//span[2]',
        },
        clusterParameters: {
          clusterParametersFailedValue: '$cluster-parameters-failed',
          clusterParametersClusterName: '$cluster-parameters-cluster-name',
          clusterParametersCPU: '$cluster-parameters-cpu',
          clusterParametersMemory: '$cluster-parameters-memory',
          clusterParametersDisk: '$cluster-parameters-disk',
        },
        clusterConnectionColumn: '//tr[@data-qa=\'table-row\']//td[3]',
        clusterConnectionLoading: '$cluster-connection-loading',
        clusterDatabaseType: '//tr[@data-qa=\'table-row\']//td[2]',
        clusterName: '//tr[@data-qa=\'table-row\']//td[1]//span',
        clusterStatusActive: '$cluster-status-active',
        clusterStatusPending: '$cluster-status-pending',
        clusterStatusDeleting: '$cluster-status-deleting',
        clusterTableRow: '$table-row',
        clusterActionsMenu: '$dropdown-menu-container',
        deleteDBClusterButton: '$delete-dbcluster-button',
        cancelDeleteDBCluster: '$cancel-delete-dbcluster-button',
        dashboardRedirectionLink: '//tr[@data-qa=\'table-row\']//td[1]//a',
      },
    },
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
    I.click(this.tabs.kubernetesClusterTab.addKubernetesClusterButton);
    I.fillField(this.tabs.kubernetesClusterTab.kubernetesClusterNameInput, clusterName);
    I.fillField(this.tabs.kubernetesClusterTab.kubeconfigFileInput, config);
    I.click(this.tabs.kubernetesClusterTab.kubernetesAddButton);
  },

  unregisterCluster(clusterName) {
    I.waitForVisible(this.tabs.kubernetesClusterTab.actionsLocator(clusterName), 30);
    I.click(this.tabs.kubernetesClusterTab.actionsLocator(clusterName));
    I.waitForElement(this.tabs.kubernetesClusterTab.unregisterButton, 30);
    I.click(this.tabs.kubernetesClusterTab.unregisterButton);
    I.waitForText(this.confirmDeleteText, 10);
    I.click(this.tabs.kubernetesClusterTab.proceedButton);
    I.waitForText(this.deletedAlertMessage, 10);
  },

  verifyInputValidationMessages(field, value, errorField, message) {
    I.fillField(field, value);
    I.seeTextEquals(message, errorField);
  },

};
