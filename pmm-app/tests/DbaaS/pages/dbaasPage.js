const { I, dbaasAPI, dbaasActionsPage } = inject();
const assert = require('assert');

module.exports = {
  url: 'graph/dbaas',
  addedAlertMessage: 'Cluster was successfully registered',
  confirmDeleteText: 'Are you sure that you want to unregister this cluster?',
  deletedAlertMessage: 'Cluster successfully unregistered',
  failedUnregisterCluster: (clusterName, dbType) => `Kubernetes cluster ${clusterName} has ${dbType} clusters`,
  configurationCopiedMessage: 'Copied',
  monitoringWarningMessage: 'If you want to use monitoring, you need to set your PMM installation public address in',
  requiredFieldError: 'Required field',
  valueGreatThanErrorText: (value) => `Value should be greater or equal to ${value}`,
  tabs: {
    kubernetesClusterTab: {
      addKubernetesClusterButton: '$kubernetes-new-cluster-button',
      addKubernetesClusterButtonInTable: '//div[@data-qa="table-no-data"]//span[contains(text(), "Register new Kubernetes Cluster")]',
      actionsLocator: (clusterName) => `//td[contains(text(), "${clusterName}")]//parent::tr//button[@data-qa="dropdown-menu-toggle"]`,
      closeButton: '$modal-close-button',
      clusterConfigurationText: locate('$pmm-overlay-wrapper').find('pre'),
      copyToClipboardButton: '//span[contains(text(), "Copy to clipboard")]',
      disabledAddButton: '//button[@data-qa="kubernetes-add-cluster-button" and @disabled]',
      forceUnreigsterCheckBox: locate('$force-field-container').find('span').at(1),
      kubeconfigFileInput: '//textarea[@data-qa="kubeConfig-textarea-input"]',
      kubernetesAddButton: '$kubernetes-add-cluster-button',
      kubernetesClusterNameInput: '$name-text-input',
      modalWindow: '$modal-body',
      modalCloseButton: '$modal-close-button',
      modalContent: '$modal-content',
      modalContentText: locate('$modal-content').find('h4'),
      proceedButton: '$delete-kubernetes-button',
      requiredField: '//div[contains(text(), "Required field")]',
      unregisterButton: locate('$dropdown-menu-menu').find('span').at(1),
      viewClusterConfiguration: locate('$dropdown-menu-menu').find('span').at(2),
    },
    dbClusterTab: {
      defaultPassword: '***************',
      addDbClusterButton: locate('$table-no-data').find('button'),
      createClusterButton: '$step-progress-submit-button',
      updateClusterButton: '$dbcluster-update-cluster-button',
      dbClusterTab: '//li[@aria-label="Tab DB Cluster"]',
      monitoringWarningLocator: '$add-cluster-monitoring-warning',
      optionsCountLocator: (step) => `(//div[@data-qa='step-header']//div[1])[${step}]`,
      optionsHeader: '$step-header',
      deleteDbClusterConfirmationText: (dbClusterName, clusterName, dbType) => `Are you sure that you want to delete ${dbType} cluster ${dbClusterName} from Kubernetes cluster ${clusterName} ?`,
      basicOptions: {
        fields: {
          clusterNameField: '$name-text-input',
          clusterNameFieldErrorMessage: '$name-field-error-message',
          dbClusterDatabaseTypeField: '$dbcluster-database-type-field',
          dbClusterDatabaseTypeInputField: locate('$dbcluster-database-type-field').find('input'),
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
          clusterTopology: (type) => `//input[@data-qa='topology-radio-button']/../label[contains(text(), '${type}')]`,
          dbClusterResourceFieldLabel: '$resources-field-label',
          dbClusterTopologyFieldLabel: '$topology-field-label',
          dbClusterResourcesBarMemory: '$dbcluster-resources-bar-memory',
          dbClusterResourcesBarCpu: '$dbcluster-resources-bar-cpu',
          diskFieldErrorMessage: '$disk-field-error-message',
          diskSizeInputField: '$disk-number-input',
          memoryField: '$memory-number-input',
          memoryFieldErrorMessage: '$memory-field-error-message',
          nodesFieldErrorMessage: '$nodes-field-error-message',
          nodesNumberField: '$nodes-number-input',
          resourcesPerNode: (clusterSize) => `//label[contains(text(), "${clusterSize}")]`,
        },
      },
      fields: {
        clusterDetailHeaders: ['Name', 'Database Type', 'Connection', 'DB Cluster Parameters', 'Cluster Status', 'Actions'],
        clusterAction: (action) => `//div[@data-qa='dropdown-menu-menu']//span[contains(text(), '${action}')]`,
        clusterConnection: {
          dbHost: '$cluster-connection-host',
          dbPort: '$cluster-connection-port',
          dbUsername: '$cluster-connection-username',
          dbPassword: '$cluster-connection-password',
          showPasswordButton: '$show-password-button',
        },
        clusterParameters: {
          clusterParametersClusterName: '$cluster-parameters-cluster-name',
          clusterParametersCPU: '$cluster-parameters-cpu',
          clusterParametersMemory: '$cluster-parameters-memory',
          clusterParametersDisk: '$cluster-parameters-disk',
        },
        clusterDetailProperty: (parameter) => locate(parameter).find('span').at(2),
        clusterParametersFailedValue: '$cluster-parameters-failed',
        clusterConnectionColumn: locate('$table-row').find('td').at(3),
        clusterConnectionLoading: '$cluster-connection-loading',
        clusterDBPasswordValue: locate('$cluster-connection-password').find('span').at(2),
        clusterDatabaseType: locate('$table-row').find('td').at(2),
        clusterName: locate('$table-row').find('td').at(1).find('span'),
        clusterSummaryDashboard: locate('$table-row').find('td').at(1).find('a'),
        clusterStatusActive: '$cluster-status-active',
        clusterStatusPending: '$cluster-status-pending',
        clusterStatusPaused: '$cluster-status-suspended',
        clusterStatusDeleting: '$cluster-status-deleting',
        clusterTableHeader: locate('$table-header').find('th'),
        clusterTableRow: '$table-row',
        clusterActionsMenu: '$dropdown-menu-toggle',
        deleteDBClusterButton: '$delete-dbcluster-button',
        dbClusterLogs: {
          dbClusterLogsAction: '$dbcluster-logs-actions',
          closeButton: '$modal-close-button',
          modalHeader: '$modal-header',

        },
        cancelDeleteDBCluster: '$cancel-delete-dbcluster-button',
        progressBarSteps: '$progress-bar-steps',
        progressBarContent: '$progress-bar-message',
      },
    },
  },
  clusterConfiguration: {
    small: {
      memory: 2,
      cpu: 1,
      disk: 25,
    },
    medium: {
      memory: 8,
      cpu: 4,
      disk: 100,
    },
    large: {
      memory: 32,
      cpu: 8,
      disk: 500,
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

  seeErrorForAddedDBCluster(dbClusterName) {
    const message = `Cluster '${dbClusterName}' already exists`;

    I.waitForText(message, 10);
  },

  registerKubernetesCluster(clusterName, config) {
    I.click(this.tabs.kubernetesClusterTab.addKubernetesClusterButton);
    I.fillField(this.tabs.kubernetesClusterTab.kubernetesClusterNameInput, clusterName);
    I.usePlaywrightTo('Fill config to the input', async ({ page }) => {
      await page.type(this.tabs.kubernetesClusterTab.kubeconfigFileInput, config, { timeout: 120000 });
    });
    I.click(this.tabs.kubernetesClusterTab.kubernetesAddButton);
  },

  unregisterCluster(clusterName, force = false) {
    I.waitForVisible(this.tabs.kubernetesClusterTab.actionsLocator(clusterName), 30);
    I.click(this.tabs.kubernetesClusterTab.actionsLocator(clusterName));
    I.waitForElement(this.tabs.kubernetesClusterTab.unregisterButton, 30);
    I.click(this.tabs.kubernetesClusterTab.unregisterButton);
    I.waitForText(this.confirmDeleteText, 10);
    if (force) {
      I.waitForElement(this.tabs.kubernetesClusterTab.forceUnreigsterCheckBox, 30);
      I.click(this.tabs.kubernetesClusterTab.forceUnreigsterCheckBox);
    }

    I.click(this.tabs.kubernetesClusterTab.proceedButton);
  },

  verifyInputValidationMessages(field, value, errorField, message) {
    I.fillField(field, value);
    I.seeTextEquals(message, errorField);
  },

  async verifyElementInSection(section) {
    for (const element in section) {
      I.waitForElement(section[element], 30);
      I.seeElement(section[element]);
      if (element !== 'showPasswordButton') {
        I.seeElement(this.tabs.dbClusterTab.fields.clusterDetailProperty(section[element]));
      }
    }
  },

  async postClusterCreationValidation(dbClusterName, k8sClusterName, clusterDBType = 'MySQL') {
    const dbaasPage = this;

    I.waitForElement(dbaasPage.tabs.dbClusterTab.fields.clusterActionsMenu, 60);
    I.click(dbaasPage.tabs.dbClusterTab.fields.clusterActionsMenu);
    await dbaasActionsPage.checkActionPossible('Delete', true);
    await dbaasActionsPage.checkActionPossible('Edit', false);
    await dbaasActionsPage.checkActionPossible('Restart', false);
    await dbaasActionsPage.checkActionPossible('Resume', false);
    if (clusterDBType === 'MySQL') {
      await dbaasAPI.waitForXtraDbClusterReady(dbClusterName, k8sClusterName);
    } else {
      await dbaasAPI.waitForPSMDBClusterReady(dbClusterName, k8sClusterName);
      await dbaasPage.waitForDbClusterTab(k8sClusterName);
    }

    I.waitForElement(dbaasPage.tabs.dbClusterTab.fields.clusterStatusActive, 60);
    I.seeElement(dbaasPage.tabs.dbClusterTab.fields.clusterStatusActive);
    I.waitForElement(dbaasPage.tabs.dbClusterTab.fields.clusterConnection.showPasswordButton, 30);
    I.click(dbaasPage.tabs.dbClusterTab.fields.clusterConnection.showPasswordButton);
    I.click(dbaasPage.tabs.dbClusterTab.fields.clusterActionsMenu);
    await dbaasActionsPage.checkActionPossible('Delete', true);
    await dbaasActionsPage.checkActionPossible('Edit', true);
    await dbaasActionsPage.checkActionPossible('Restart', true);
    await dbaasActionsPage.checkActionPossible('Suspend', true);
    I.click(dbaasPage.tabs.dbClusterTab.fields.clusterActionsMenu);
    I.click(dbaasPage.tabs.dbClusterTab.fields.clusterConnection.showPasswordButton);
  },


  async waitForDbClusterTab(clusterName) {
    const dbaasPage = this;

    I.amOnPage(dbaasPage.url);
    dbaasPage.checkCluster(clusterName, false);
    I.click(dbaasPage.tabs.dbClusterTab.dbClusterTab);
    I.waitForElement(dbaasPage.tabs.dbClusterTab.addDbClusterButton, 30);
  },

  async waitForKubernetesClusterTab(k8sClusterName) {
    const dbaasPage = this;

    I.amOnPage(dbaasPage.url);
    dbaasPage.checkCluster(k8sClusterName, false);
    I.waitForElement(dbaasPage.tabs.kubernetesClusterTab.addKubernetesClusterButton, 30);
  },


  async validateClusterDetail(dbsClusterName, k8sClusterName, configuration) {
    const dbaasPage = this;

    I.waitForElement(dbaasPage.tabs.dbClusterTab.fields.clusterTableHeader, 60);
    const dbClusterDetailHeaderCount = await I.grabNumberOfVisibleElements(
      dbaasPage.tabs.dbClusterTab.fields.clusterTableHeader,
    );

    assert.ok(
      dbClusterDetailHeaderCount === 6,
      `Total DB Cluster Details should be 6, but some details missing found only ${dbClusterDetailHeaderCount}`,
    );
    const dbClusterDetailHeaders = await I.grabTextFromAll(
      dbaasPage.tabs.dbClusterTab.fields.clusterTableHeader,
    );

    assert.deepEqual(dbClusterDetailHeaders, dbaasPage.tabs.dbClusterTab.fields.clusterDetailHeaders);

    await dbaasPage.validateClusterParameter(dbaasPage.tabs.dbClusterTab.fields.clusterName, 'DB Cluster Name', dbsClusterName);
    I.seeElement(dbaasPage.tabs.dbClusterTab.fields.clusterSummaryDashboard);
    const dashboardLinkAttribute = await I.grabAttributeFrom(dbaasPage.tabs.dbClusterTab.fields.clusterSummaryDashboard, 'href');

    assert.ok(
      dashboardLinkAttribute.includes(configuration.clusterDashboardRedirectionLink),
      `The Cluster Dashboard Redirection Link is wrong found ${dashboardLinkAttribute}`,
    );
    I.seeElement(dbaasPage.tabs.dbClusterTab.fields.clusterDatabaseType);
    const clusterDBType = await I.grabTextFrom(dbaasPage.tabs.dbClusterTab.fields.clusterDatabaseType);

    assert.ok(
      clusterDBType === configuration.dbType,
      `Expected DB Type was ${configuration.dbType}, but found ${clusterDBType}`,
    );
    await dbaasPage.verifyElementInSection(dbaasPage.tabs.dbClusterTab.fields.clusterParameters);
    await dbaasPage.verifyElementInSection(dbaasPage.tabs.dbClusterTab.fields.clusterConnection);
    I.seeElement(dbaasPage.tabs.dbClusterTab.fields.clusterConnection.showPasswordButton);
    await dbaasPage.validateClusterParameter(dbaasPage.tabs.dbClusterTab.fields.clusterDBPasswordValue, 'Password', dbaasPage.tabs.dbClusterTab.defaultPassword);
    I.click(dbaasPage.tabs.dbClusterTab.fields.clusterConnection.showPasswordButton);
    const passwordValue = await I.grabTextFrom(dbaasPage.tabs.dbClusterTab.fields.clusterDBPasswordValue);

    assert.ok(
      passwordValue !== dbaasPage.tabs.dbClusterTab.defaultPassword,
      `Expected the Show Password to show cluster password but found ${passwordValue}`,
    );
    I.click(dbaasPage.tabs.dbClusterTab.fields.clusterConnection.showPasswordButton);
    await dbaasPage.validateClusterParameter(dbaasPage.tabs.dbClusterTab.fields.clusterDBPasswordValue, 'Password', dbaasPage.tabs.dbClusterTab.defaultPassword);
    await dbaasPage.validateClusterParameter(dbaasPage.tabs.dbClusterTab.fields.clusterDetailProperty(dbaasPage.tabs.dbClusterTab.fields.clusterParameters.clusterParametersClusterName), 'k8s Name', k8sClusterName);
    await dbaasPage.validateClusterParameter(dbaasPage.tabs.dbClusterTab.fields.clusterDetailProperty(dbaasPage.tabs.dbClusterTab.fields.clusterParameters.clusterParametersCPU), 'Cluster CPU', configuration.cpu);
    await dbaasPage.validateClusterParameter(dbaasPage.tabs.dbClusterTab.fields.clusterDetailProperty(dbaasPage.tabs.dbClusterTab.fields.clusterParameters.clusterParametersMemory), 'Memory', configuration.memory);
    await dbaasPage.validateClusterParameter(dbaasPage.tabs.dbClusterTab.fields.clusterDetailProperty(dbaasPage.tabs.dbClusterTab.fields.clusterParameters.clusterParametersDisk), 'Disk', configuration.disk);
  },


  async validateClusterParameter(parameter, type, value) {
    const parameterDisplayed = await I.grabTextFrom(parameter);

    assert.ok(
      parameterDisplayed === value,
      `Expected the k8s Cluster ${type} to show ${value} but found ${parameterDisplayed}`,
    );
  },

};
