const assert = require('assert');
const dbaasPage = require('./pages/dbaasPage');

const clusterName = 'Kubernetes_Testing_Cluster_Minikube';

const inputFields = new DataTable(['field', 'value', 'errorMessageField', 'errorMessage']);


// PMM-T456 based on the test case for field validation and error message on different input values.

inputFields.add([dbaasPage.tabs.dbClusterTab.advancedOptions.fields.nodesNumberField, ['a'], dbaasPage.tabs.dbClusterTab.advancedOptions.fields.nodesFieldErrorMessage, dbaasPage.requiredFieldError]);
inputFields.add([dbaasPage.tabs.dbClusterTab.advancedOptions.fields.memoryField, ['a'], dbaasPage.tabs.dbClusterTab.advancedOptions.fields.memoryFieldErrorMessage, dbaasPage.requiredFieldError]);
inputFields.add([dbaasPage.tabs.dbClusterTab.advancedOptions.fields.cpuNumberFields, ['a'], dbaasPage.tabs.dbClusterTab.advancedOptions.fields.cpuFieldErrorMessage, dbaasPage.requiredFieldError]);
inputFields.add([dbaasPage.tabs.dbClusterTab.advancedOptions.fields.diskSizeInputField, ['a'], dbaasPage.tabs.dbClusterTab.advancedOptions.fields.diskFieldErrorMessage, dbaasPage.requiredFieldError]);
inputFields.add([dbaasPage.tabs.dbClusterTab.advancedOptions.fields.nodesNumberField, ['-1', '0', '0.5'], dbaasPage.tabs.dbClusterTab.advancedOptions.fields.nodesFieldErrorMessage, dbaasPage.requiredFieldError]);
inputFields.add([dbaasPage.tabs.dbClusterTab.advancedOptions.fields.nodesNumberField, ['1', '2'], dbaasPage.tabs.dbClusterTab.advancedOptions.fields.nodesFieldErrorMessage, dbaasPage.valueGreatThanErrorText(3)]);
inputFields.add([dbaasPage.tabs.dbClusterTab.advancedOptions.fields.memoryField, ['0.01', '-0.3', '0.0'], dbaasPage.tabs.dbClusterTab.advancedOptions.fields.memoryFieldErrorMessage, dbaasPage.valueGreatThanErrorText(0.1)]);
inputFields.add([dbaasPage.tabs.dbClusterTab.advancedOptions.fields.cpuNumberFields, ['0.01', '-0.3', '0.0'], dbaasPage.tabs.dbClusterTab.advancedOptions.fields.cpuFieldErrorMessage, dbaasPage.valueGreatThanErrorText(0.1)]);

Feature('Test the functionality for Kubernetes Cluster Registration UI');

Before(async ({ I }) => {
  I.Authorize();
});

Scenario(
  'PMM-T426 - Verify adding new Kubernetes cluster minikube, PMM-T428 - Verify adding new Kubernetes cluster with same name, '
  + 'PMM-T546, PMM-T431 -Verify unregistering Kubernetes cluster @not-pr-pipeline @dbaas',
  async ({ I, dbaasPage }) => {
    I.amOnPage(dbaasPage.url);
    I.waitForVisible(dbaasPage.tabs.kubernetesClusterTab.addKubernetesClusterButtonInTable, 30);
    I.click(dbaasPage.tabs.kubernetesClusterTab.addKubernetesClusterButton);
    I.seeElement(dbaasPage.tabs.kubernetesClusterTab.modalWindow);
    I.click(dbaasPage.tabs.kubernetesClusterTab.closeButton);
    I.dontSeeElement(dbaasPage.tabs.kubernetesClusterTab.modalWindow);
    I.click(dbaasPage.tabs.kubernetesClusterTab.addKubernetesClusterButton);
    I.seeElement(dbaasPage.tabs.kubernetesClusterTab.modalWindow);
    I.pressKey('Escape');
    I.dontSeeElement(dbaasPage.tabs.kubernetesClusterTab.modalContent);
    // cannot automate click outside the form
    dbaasPage.registerKubernetesCluster(clusterName, process.env.kubeconfig_minikube);
    I.waitForText(dbaasPage.addedAlertMessage, 10);
    dbaasPage.checkCluster(clusterName, false);
    // PMM-T428 - starting here
    dbaasPage.registerKubernetesCluster(clusterName, process.env.kubeconfig_minikube);
    dbaasPage.seeErrorForAddedCluster(clusterName);
    // PMM-T431, PMM-T546 - starting here, unregister cluster using unregister option
    dbaasPage.unregisterCluster(clusterName);
    dbaasPage.checkCluster(clusterName, true);
  },
);

Scenario(
  'PMM-T427 - Verify submitting blank Add kubernetes cluster form @not-pr-pipeline @dbaas',
  async ({ I, dbaasPage }) => {
    I.amOnPage(dbaasPage.url);
    I.waitForVisible(dbaasPage.tabs.kubernetesClusterTab.addKubernetesClusterButtonInTable, 30);
    I.click(dbaasPage.tabs.kubernetesClusterTab.addKubernetesClusterButton);
    I.seeElement(dbaasPage.tabs.kubernetesClusterTab.disabledAddButton);
    I.click(dbaasPage.tabs.kubernetesClusterTab.kubernetesClusterNameInput);
    I.click(dbaasPage.tabs.kubernetesClusterTab.kubeconfigFileInput);
    I.click(dbaasPage.tabs.kubernetesClusterTab.kubernetesClusterNameInput);
    const count = await I.grabNumberOfVisibleElements(dbaasPage.tabs.kubernetesClusterTab.requiredField);

    assert.ok(count === 2, `Count of error messages is: ${count} but should be 2`);
    I.fillField(dbaasPage.tabs.kubernetesClusterTab.kubernetesClusterNameInput, clusterName);
    I.fillField(dbaasPage.tabs.kubernetesClusterTab.kubeconfigFileInput, 'Kubernetes_Config_Test');
    I.dontSeeElement(dbaasPage.tabs.kubernetesClusterTab.disabledAddButton);
  },
);

Scenario('PMM-T427 - Verify elements on PMM DBaaS page @not-pr-pipeline @dbaas',
  async ({ I, dbaasPage }) => {
    I.amOnPage(dbaasPage.url);
    I.waitForVisible(dbaasPage.tabs.kubernetesClusterTab.addKubernetesClusterButton, 30);
    I.waitForVisible(dbaasPage.tabs.kubernetesClusterTab.addKubernetesClusterButtonInTable, 30);
  });

Scenario('PMM-T547 PMM-T548  Verify user is able to view config of registered Kubernetes cluster on Kubernetes Cluster Page @not-pr-pipeline @dbaas',
  async ({ I, dbaasPage, dbaasAPI }) => {
    await dbaasAPI.apiRegisterCluster(process.env.kubeconfig_minikube, clusterName);
    I.amOnPage(dbaasPage.url);
    dbaasPage.checkCluster(clusterName, false);
    I.waitForElement(dbaasPage.tabs.kubernetesClusterTab.actionsLocator(clusterName), 30);
    I.click(dbaasPage.tabs.kubernetesClusterTab.actionsLocator(clusterName));
    I.waitForElement(dbaasPage.tabs.kubernetesClusterTab.viewClusterConfiguration, 30);
    I.click(dbaasPage.tabs.kubernetesClusterTab.viewClusterConfiguration);
    I.waitForElement(dbaasPage.tabs.kubernetesClusterTab.modalContent, 30);
    I.seeElement(dbaasPage.tabs.kubernetesClusterTab.copyToClipboardButton);
    I.click(dbaasPage.tabs.kubernetesClusterTab.copyToClipboardButton);
    I.waitForText(dbaasPage.configurationCopiedMessage, 30);
    const configuration = await I.grabTextFrom(dbaasPage.tabs.kubernetesClusterTab.clusterConfigurationText);

    assert.ok(configuration === process.env.kubeconfig_minikube, `The configuration shown is not equal to the expected Cluster configuration, ${configuration}`);
    await dbaasAPI.apiUnregisterCluster(clusterName);
  });

Scenario('Verify user is able to add same cluster config with different Name @not-pr-pipeline @dbaas',
  async ({ I, dbaasPage, dbaasAPI }) => {
    const clusterName1 = 'Kubernetes_Testing_Cluster_1';
    const clusterName2 = 'Kubernetes_Testing_Cluster_2';

    await dbaasAPI.apiRegisterCluster(process.env.kubeconfig_minikube, clusterName1);
    await dbaasAPI.apiRegisterCluster(process.env.kubeconfig_minikube, clusterName2);
    I.amOnPage(dbaasPage.url);
    dbaasPage.checkCluster(clusterName1, false);
    dbaasPage.checkCluster(clusterName2, false);
    await dbaasAPI.apiUnregisterCluster(clusterName1);
    await dbaasAPI.apiUnregisterCluster(clusterName2);
    I.refreshPage();
    dbaasPage.checkCluster(clusterName2, true);
    dbaasPage.checkCluster(clusterName1, true);
  });

Scenario('Verify DB Cluster Tab Page Elements & Steps Background @dbaas @not-pr-pipeline',
  async ({ I, dbaasPage, dbaasAPI }) => {
    if (!await dbaasAPI.apiCheckRegisteredClusterExist(clusterName)) {
      await dbaasAPI.apiRegisterCluster(process.env.kubeconfig_minikube, clusterName);
    }

    I.amOnPage(dbaasPage.url);
    dbaasPage.checkCluster(clusterName, false);
    I.click(dbaasPage.tabs.dbClusterTab.dbClusterTab);
    I.waitForElement(dbaasPage.tabs.dbClusterTab.addDbClusterButton, 30);
    I.click(dbaasPage.tabs.dbClusterTab.addDbClusterButton);
    I.waitForElement(dbaasPage.tabs.dbClusterTab.monitoringWarningLocator, 30);
    I.waitForText(dbaasPage.monitoringWarningMessage, 30);
    I.seeElement(dbaasPage.tabs.dbClusterTab.basicOptions.fields.clusterNameField);
    I.seeElement(dbaasPage.tabs.dbClusterTab.basicOptions.fields.kubernetesClusterDropDown);
    I.seeElement(dbaasPage.tabs.dbClusterTab.basicOptions.fields.dbClusterDatabaseTypeField);
    I.seeElement(dbaasPage.tabs.dbClusterTab.optionsCountLocator(2));
    I.seeElement(dbaasPage.tabs.dbClusterTab.optionsCountLocator(1));
    I.click(dbaasPage.tabs.dbClusterTab.optionsCountLocator(2));
    I.seeElement(dbaasPage.tabs.dbClusterTab.advancedOptions.fields.dbClusterTopologyFieldLabel);
    I.seeElement(dbaasPage.tabs.dbClusterTab.advancedOptions.fields.nodesNumberField);
    I.seeElement(dbaasPage.tabs.dbClusterTab.advancedOptions.fields.dbClusterResourceFieldLabel);
    I.seeElement(dbaasPage.tabs.dbClusterTab.advancedOptions.fields.memoryField);
    I.seeElement(dbaasPage.tabs.dbClusterTab.advancedOptions.fields.cpuNumberFields);
    I.seeElement(dbaasPage.tabs.dbClusterTab.advancedOptions.fields.diskSizeInputField);
    I.seeElement(dbaasPage.tabs.dbClusterTab.createClusterButton);
    await dbaasAPI.apiUnregisterCluster(clusterName);
  });

Scenario('PMM-T456 PMM-T490 Verify DB Cluster Steps Background @dbaas @not-pr-pipeline',
  async ({
    I, dbaasPage, dbaasAPI, adminPage,
  }) => {
    if (!await dbaasAPI.apiCheckRegisteredClusterExist(clusterName)) {
      await dbaasAPI.apiRegisterCluster(process.env.kubeconfig_minikube, clusterName);
    }

    I.amOnPage(dbaasPage.url);
    dbaasPage.checkCluster(clusterName, false);
    I.dontSeeElement(adminPage.fields.timePickerMenu);
    I.click(dbaasPage.tabs.dbClusterTab.dbClusterTab);
    I.waitForElement(dbaasPage.tabs.dbClusterTab.addDbClusterButton, 30);
    I.dontSeeElement(adminPage.fields.timePickerMenu);
    I.click(dbaasPage.tabs.dbClusterTab.addDbClusterButton);
    I.waitForElement(dbaasPage.tabs.dbClusterTab.monitoringWarningLocator, 30);
    I.waitForText(dbaasPage.monitoringWarningMessage, 30);
    await adminPage.verifyBackgroundColor(dbaasPage.tabs.dbClusterTab.optionsCountLocator(1), 'rgb(235, 123, 24)');
    await adminPage.verifyBackgroundColor(dbaasPage.tabs.dbClusterTab.optionsCountLocator(2), 'rgb(142, 142, 142)');
    I.click(dbaasPage.tabs.dbClusterTab.optionsCountLocator(2));
    await adminPage.verifyBackgroundColor(dbaasPage.tabs.dbClusterTab.optionsCountLocator(1), 'rgb(224, 47, 68)');
    await adminPage.verifyBackgroundColor(dbaasPage.tabs.dbClusterTab.optionsCountLocator(2), 'rgb(235, 123, 24)');
    I.click(dbaasPage.tabs.dbClusterTab.optionsCountLocator(1));
    await adminPage.verifyBackgroundColor(dbaasPage.tabs.dbClusterTab.optionsCountLocator(2), 'rgb(41, 156, 70)');
    await adminPage.verifyBackgroundColor(dbaasPage.tabs.dbClusterTab.optionsCountLocator(1), 'rgb(235, 123, 24)');
    I.click(dbaasPage.tabs.dbClusterTab.optionsCountLocator(2));
    await dbaasAPI.apiUnregisterCluster(clusterName);
  });

Scenario('PMM-T456 Verify Create Cluster steps validation fields disabled/enabled @dbaas @not-pr-pipeline',
  async ({
    I, dbaasPage, dbaasAPI, adminPage,
  }) => {
    if (!await dbaasAPI.apiCheckRegisteredClusterExist(clusterName)) {
      await dbaasAPI.apiRegisterCluster(process.env.kubeconfig_minikube, clusterName);
    }

    I.amOnPage(dbaasPage.url);
    dbaasPage.checkCluster(clusterName, false);
    I.click(dbaasPage.tabs.dbClusterTab.dbClusterTab);
    I.waitForElement(dbaasPage.tabs.dbClusterTab.addDbClusterButton, 30);
    I.dontSeeElement(adminPage.fields.timePickerMenu);
    I.click(dbaasPage.tabs.dbClusterTab.addDbClusterButton);
    I.waitForElement(dbaasPage.tabs.dbClusterTab.optionsCountLocator(2), 30);
    assert.ok(
      await I.grabAttributeFrom(dbaasPage.tabs.dbClusterTab.createClusterButton, 'disabled'),
      'Create Cluster Button Should be Disabled',
    );
    I.click(dbaasPage.tabs.dbClusterTab.optionsCountLocator(2));
    assert.ok(
      await I.grabAttributeFrom(dbaasPage.tabs.dbClusterTab.createClusterButton, 'disabled'),
      'Create Cluster Button Should Still be Disabled',
    );
    assert.ok(
      await I.grabAttributeFrom(dbaasPage.tabs.dbClusterTab.advancedOptions.fields.memoryField, 'disabled'),
      'Memory Field Should be Disabled',
    );
    assert.ok(
      await I.grabAttributeFrom(dbaasPage.tabs.dbClusterTab.advancedOptions.fields.cpuNumberFields, 'disabled'),
      'Number of CPU Field Should be disabled',
    );
    assert.ok(
      await I.grabAttributeFrom(dbaasPage.tabs.dbClusterTab.advancedOptions.fields.diskSizeInputField, 'disabled'),
      'Disk Size field must be disabled',
    );
    I.click(dbaasPage.tabs.dbClusterTab.advancedOptions.fields.resourcesPerNode('Custom'));
    I.waitForEnabled(dbaasPage.tabs.dbClusterTab.advancedOptions.fields.memoryField, 3);
    I.waitForEnabled(dbaasPage.tabs.dbClusterTab.advancedOptions.fields.diskSizeInputField, 3);
    I.waitForEnabled(dbaasPage.tabs.dbClusterTab.advancedOptions.fields.cpuNumberFields, 3);
    await dbaasAPI.apiUnregisterCluster(clusterName);
  });

Data(inputFields).Scenario('PMM-T456 Verify Create Cluster steps validation - field input validation @dbaas @not-pr-pipeline',
  async ({
    I, dbaasPage, dbaasAPI, adminPage, current,
  }) => {
    if (!await dbaasAPI.apiCheckRegisteredClusterExist(clusterName)) {
      await dbaasAPI.apiRegisterCluster(process.env.kubeconfig_minikube, clusterName);
    }

    I.amOnPage(dbaasPage.url);
    dbaasPage.checkCluster(clusterName, false);
    I.click(dbaasPage.tabs.dbClusterTab.dbClusterTab);
    I.waitForElement(dbaasPage.tabs.dbClusterTab.addDbClusterButton, 30);
    I.click(dbaasPage.tabs.dbClusterTab.addDbClusterButton);
    I.waitForElement(dbaasPage.tabs.dbClusterTab.optionsCountLocator(2), 30);
    I.click(dbaasPage.tabs.dbClusterTab.optionsCountLocator(2));
    I.click(dbaasPage.tabs.dbClusterTab.advancedOptions.fields.resourcesPerNode('Custom'));
    adminPage.customClearField(current.field);
    current.value.forEach((input) => dbaasPage.verifyInputValidationMessages(
      current.field,
      input,
      current.errorMessageField,
      current.errorMessage,
    ));
    assert.ok(
      await I.grabAttributeFrom(dbaasPage.tabs.dbClusterTab.createClusterButton, 'disabled'),
      'Create Cluster Button Should Still be Disabled',
    );
    await dbaasAPI.apiUnregisterCluster(clusterName);
  });
