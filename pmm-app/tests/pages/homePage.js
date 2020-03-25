const { I } = inject();
let assert = require('assert');

module.exports = {
  // insert your locators and methods here
  // setting locators
  url: 'graph/d/pmm-home/home-dashboard?orgId=1',
  requestEnd: '/v1/Updates/Check',
  fields: {
    systemsUnderMonitoringCount:
      "//span[@class='panel-title-text' and contains(text(), 'Systems under monitoring')]//../../../..//span[@class='singlestat-panel-value']",
    dbUnderMonitoringCount:
      "//span[@class='panel-title-text' and contains(text(), 'Monitored DB Instances')]//../../../..//span[@class='singlestat-panel-value']",
    dashboardHeaderText: 'Percona Monitoring and Management',
    dashboardHeaderLocator: "//div[contains(@class, 'dashboard-header')]",
    checkUpdateButton: "//button[@class='check-update-button']",
    triggerUpdate: "//button[@ng-click='update()']",
    updateProgressModal: "//div[@class='modal-content']",
    reloadButtonAfterUpgrade: "//button[@ng-click='reloadAfterUpdate()']",
    pmmUpdateWidget: "//div[@id='pmm-update-widget']",
    upToDateLocator: "//section[@class='state']/p[text() = 'You are up to date']",
    availableVersion: "//div[@id='available_version']/div/p",
    currentVersion: "//p[@id='current_version']/span",
  },

  // introducing methods
  getCount(field) {
    return I.grabTextFrom(field);
  },

  async upgradePMM() {
    I.waitForElement(this.fields.triggerUpdate, 180);
    I.seeElement(this.fields.triggerUpdate);
    let available_version = await I.grabTextFrom(this.fields.availableVersion);
    I.click(this.fields.triggerUpdate);
    I.waitForElement(this.fields.updateProgressModal, 30);
    I.waitForText('Update in progress', 30, this.fields.updateProgressModal);
    I.waitForText('Successfully updated', 1200, this.fields.updateProgressModal);
    I.click(this.fields.reloadButtonAfterUpgrade);
    I.waitForVisible(this.fields.upToDateLocator, 30);
    assert.equal(
      await I.grabTextFrom(this.fields.currentVersion),
      available_version,
      'Update operation failed'
    );
  },
};
