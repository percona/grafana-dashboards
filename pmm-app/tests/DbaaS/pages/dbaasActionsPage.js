const {
  I, dbaasAPI, adminPage, dbaasPage,
} = inject();
const assert = require('assert');

module.exports = {

  async checkActionPossible(actionName, actionPosibilty) {
    const numOfElements = await I.grabNumberOfVisibleElements(
      dbaasPage.tabs.dbClusterTab.fields.clusterAction(actionName),
    );

    if (numOfElements === 0) {
      I.click(dbaasPage.tabs.dbClusterTab.fields.clusterActionsMenu);
    }

    const actionClass = await I.grabAttributeFrom(dbaasPage.tabs.dbClusterTab.fields.clusterAction(actionName), 'class');

    if (actionPosibilty) {
      assert.strictEqual(actionClass, null, `User Should be able to Perform ${actionName} on the DB Cluster`);
    } else {
      assert.notStrictEqual(actionClass, null, `User Should not be able to Perform ${actionName} on the DB Cluster`);
    }
  },

  async createClusterBasicOptions(k8sClusterName, dbClusterName, dbType) {
    I.waitForElement(dbaasPage.tabs.dbClusterTab.dbClusterAddButtonTop, 30);
    I.waitForInvisible(dbaasPage.tabs.kubernetesClusterTab.disabledAddButton, 30);
    I.click(dbaasPage.tabs.dbClusterTab.dbClusterAddButtonTop);
    I.waitForElement(dbaasPage.tabs.dbClusterTab.basicOptions.fields.clusterNameField, 30);
    I.fillField(dbaasPage.tabs.dbClusterTab.basicOptions.fields.clusterNameField, dbClusterName);
    I.click(dbaasPage.tabs.dbClusterTab.basicOptions.fields.kubernetesClusterDropDown);
    I.waitForElement(
      dbaasPage.tabs.dbClusterTab.basicOptions.fields.kubernetesClusterDropDownSelect(k8sClusterName),
      30,
    );
    I.click(dbaasPage.tabs.dbClusterTab.basicOptions.fields.kubernetesClusterDropDownSelect(k8sClusterName));
    I.click(dbaasPage.tabs.dbClusterTab.basicOptions.fields.dbClusterDatabaseTypeField);
    I.fillField(dbaasPage.tabs.dbClusterTab.basicOptions.fields.dbClusterDatabaseTypeInputField, dbType);
    I.waitForElement(
      dbaasPage.tabs.dbClusterTab.basicOptions.fields.dbClusterDatabaseTypeFieldSelect(dbType),
    );
    I.click(dbaasPage.tabs.dbClusterTab.basicOptions.fields.dbClusterDatabaseTypeFieldSelect(dbType));
  },

  async createClusterAdvancedOption(k8sClusterName, dbClusterName, dbType, configuration) {
    this.createClusterBasicOptions(k8sClusterName, dbClusterName, dbType);
    I.click(dbaasPage.tabs.dbClusterTab.optionsCountLocator(2));
    I.waitForElement(
      dbaasPage.tabs.dbClusterTab.advancedOptions.fields.clusterTopology(configuration.topology), 30,
    );
    I.click(dbaasPage.tabs.dbClusterTab.advancedOptions.fields.clusterTopology(configuration.topology));
    if (configuration.resourcePerNode === 'Custom') {
      I.click(
        dbaasPage.tabs.dbClusterTab.advancedOptions.fields.resourcesPerNode(configuration.resourcePerNode),
      );
      adminPage.customClearField(dbaasPage.tabs.dbClusterTab.advancedOptions.fields.memoryField);
      I.fillField(dbaasPage.tabs.dbClusterTab.advancedOptions.fields.memoryField, configuration.memory);
      adminPage.customClearField(dbaasPage.tabs.dbClusterTab.advancedOptions.fields.cpuNumberFields);
      I.fillField(dbaasPage.tabs.dbClusterTab.advancedOptions.fields.cpuNumberFields, configuration.cpu);
      adminPage.customClearField(dbaasPage.tabs.dbClusterTab.advancedOptions.fields.diskSizeInputField);
      I.fillField(dbaasPage.tabs.dbClusterTab.advancedOptions.fields.diskSizeInputField, configuration.disk);
    }
  },

  async deleteXtraDBCluster(dbClusterName, k8sClusterName) {
    I.waitForElement(dbaasPage.tabs.dbClusterTab.fields.clusterTableHeader, 30);
    I.click(dbaasPage.tabs.dbClusterTab.fields.clusterActionsMenu);
    await this.checkActionPossible('Delete', true);
    I.waitForElement(dbaasPage.tabs.dbClusterTab.fields.clusterAction('Delete'), 30);
    I.click(dbaasPage.tabs.dbClusterTab.fields.clusterAction('Delete'));
    I.waitForElement(dbaasPage.tabs.dbClusterTab.fields.deleteDBClusterButton, 30);
    I.seeElement(dbaasPage.tabs.dbClusterTab.fields.cancelDeleteDBCluster, 30);
    I.seeTextEquals(
      dbaasPage.tabs.dbClusterTab.deleteDbClusterConfirmationText(dbClusterName, k8sClusterName, 'MySQL'),
      dbaasPage.tabs.kubernetesClusterTab.modalContentText,
    );
    I.click(dbaasPage.tabs.dbClusterTab.fields.deleteDBClusterButton);
    I.waitForElement(dbaasPage.tabs.dbClusterTab.fields.clusterStatusDeleting, 30);
    await dbaasAPI.waitForDbClusterDeleted(dbClusterName, k8sClusterName);
  },

  async restartCluster(dbClusterName, k8sClusterName, clusterDBType = 'MySQL') {
    I.waitForElement(dbaasPage.tabs.dbClusterTab.fields.clusterTableHeader, 30);
    I.click(dbaasPage.tabs.dbClusterTab.fields.clusterActionsMenu);
    await this.checkActionPossible('Restart', true);
    I.waitForElement(dbaasPage.tabs.dbClusterTab.fields.clusterAction('Restart'), 30);
    I.click(dbaasPage.tabs.dbClusterTab.fields.clusterAction('Restart'));
    I.waitForText('Processing', 30, dbaasPage.tabs.dbClusterTab.fields.progressBarContent);
    if (clusterDBType === 'MySQL') {
      await dbaasAPI.waitForXtraDbClusterReady(dbClusterName, k8sClusterName);
    } else {
      await dbaasAPI.waitForPSMDBClusterReady(dbClusterName, k8sClusterName);
    }
  },

  async editCluster(dbClusterName, k8sClusterName, configuration) {
    I.waitForElement(dbaasPage.tabs.dbClusterTab.fields.clusterTableHeader, 30);
    I.click(dbaasPage.tabs.dbClusterTab.fields.clusterActionsMenu);
    await this.checkActionPossible('Edit', true);
    I.waitForElement(dbaasPage.tabs.dbClusterTab.fields.clusterAction('Edit'), 30);
    I.click(dbaasPage.tabs.dbClusterTab.fields.clusterAction('Edit'));
    I.waitForElement(
      dbaasPage.tabs.dbClusterTab.advancedOptions.fields.clusterTopology(configuration.topology), 30,
    );
    I.click(dbaasPage.tabs.dbClusterTab.advancedOptions.fields.clusterTopology(configuration.topology));
    if (configuration.resourcePerNode === 'Custom') {
      I.click(
        dbaasPage.tabs.dbClusterTab.advancedOptions.fields.resourcesPerNode(configuration.resourcePerNode),
      );
      adminPage.customClearField(dbaasPage.tabs.dbClusterTab.advancedOptions.fields.memoryField);
      I.fillField(dbaasPage.tabs.dbClusterTab.advancedOptions.fields.memoryField, configuration.memory);
      adminPage.customClearField(dbaasPage.tabs.dbClusterTab.advancedOptions.fields.cpuNumberFields);
      I.fillField(dbaasPage.tabs.dbClusterTab.advancedOptions.fields.cpuNumberFields, configuration.cpu);
    }
  },

  async suspendCluster(dbClusterName, k8sClusterName, clusterDBType = 'MySQL') {
    I.waitForElement(dbaasPage.tabs.dbClusterTab.fields.clusterTableHeader, 30);
    I.click(dbaasPage.tabs.dbClusterTab.fields.clusterActionsMenu);
    await this.checkActionPossible('Suspend', true);
    I.waitForElement(dbaasPage.tabs.dbClusterTab.fields.clusterAction('Suspend'), 30);
    I.click(dbaasPage.tabs.dbClusterTab.fields.clusterAction('Suspend'));
    I.waitForText('Processing', 30, dbaasPage.tabs.dbClusterTab.fields.progressBarContent);
    await this.checkActionPossible('Resume', false);
    if (clusterDBType === 'MySQL') {
      await dbaasAPI.waitForXtraDbClusterPaused(dbClusterName, k8sClusterName);
    } else {
      await dbaasAPI.waitForPSMDBClusterPaused(dbClusterName, k8sClusterName);
    }
  },

  async resumeCluster(dbClusterName, k8sClusterName, clusterDBType = 'MySQL') {
    I.waitForElement(dbaasPage.tabs.dbClusterTab.fields.clusterTableHeader, 30);
    I.click(dbaasPage.tabs.dbClusterTab.fields.clusterActionsMenu);
    await this.checkActionPossible('Resume', true);
    I.waitForElement(dbaasPage.tabs.dbClusterTab.fields.clusterAction('Resume'), 30);
    I.click(dbaasPage.tabs.dbClusterTab.fields.clusterAction('Resume'));
    I.waitForText('Processing', 30, dbaasPage.tabs.dbClusterTab.fields.progressBarContent);
    if (clusterDBType === 'MySQL') {
      await dbaasAPI.waitForXtraDbClusterReady(dbClusterName, k8sClusterName);
    } else {
      await dbaasAPI.waitForPSMDBClusterReady(dbClusterName, k8sClusterName);
    }
  },

  async deletePSMDBCluster(dbClusterName, k8sClusterName) {
    I.waitForElement(dbaasPage.tabs.dbClusterTab.fields.clusterTableHeader, 30);
    I.click(dbaasPage.tabs.dbClusterTab.fields.clusterActionsMenu);
    await this.checkActionPossible('Delete', true);
    I.waitForElement(dbaasPage.tabs.dbClusterTab.fields.clusterAction('Delete'), 30);
    I.click(dbaasPage.tabs.dbClusterTab.fields.clusterAction('Delete'));
    I.waitForElement(dbaasPage.tabs.dbClusterTab.fields.deleteDBClusterButton, 30);
    I.seeElement(dbaasPage.tabs.dbClusterTab.fields.cancelDeleteDBCluster, 30);
    I.seeTextEquals(
      dbaasPage.tabs.dbClusterTab.deleteDbClusterConfirmationText(dbClusterName, k8sClusterName, 'MongoDB'),
      dbaasPage.tabs.kubernetesClusterTab.modalContentText,
    );
    I.click(dbaasPage.tabs.dbClusterTab.fields.deleteDBClusterButton);
    I.waitForElement(dbaasPage.tabs.dbClusterTab.fields.clusterStatusDeleting, 30);
    await dbaasAPI.waitForDbClusterDeleted(dbClusterName, k8sClusterName, 'MongoDB');
  },

};
