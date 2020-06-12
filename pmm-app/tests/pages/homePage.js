const {I, settingsAPI} = inject();
const assert = require('assert');

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
    checkUpdateButton: "#refresh",
    oldLastCheckSelector: "#pmm-update-widget > .last-check-wrapper p",
    lastCheckSelector: ".last-check-wrapper > p",
    triggerUpdate: "button[ng-click='update()']",
    updateProgressModal: ".modal-content",
    reloadButtonAfterUpgrade: "button[ng-click='reloadAfterUpdate()'",
    pmmUpdateWidget: "#pmm-update-widget",
    upToDateLocator: "//section[@class='state']/p[text()='You are up to date']",
    availableVersion: "#available_version > div > p",
    currentVersion: "#current_version > span",
    sttDisabledFailedChecksPanelSelector: "$db-check-panel-settings-link",
    sttFailedChecksPanelSelector: "$db-check-panel-has-checks",
    checksPanelSelector: "$db-check-panel-home",
    newsPanelTitleSelector: "//span[@class='panel-title-text' and text() = 'Percona News']",
    newsPanelContentSelector: "//span[contains(text(), 'Percona News')]/ancestor::div[contains(@class, 'panel-container')]//div[contains(@class, 'view')]",
    noAccessRightsSelector: '$db-check-panel-no-access',
  },

  // introducing methods
  async upgradePMM() {
    I.waitForElement(this.fields.triggerUpdate, 180);
    I.seeElement(this.fields.triggerUpdate);
    const available_version = await I.grabTextFrom(this.fields.availableVersion);
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

  /*
   Refreshing page (30 times refresh timeout) until checks appear
   Alertmanager receives checks results every 30 seconds
   So 30 tries should be enough to get results
   */
  async waitForCheckResultsToAppearInPanel() {
    let results;
    let disabledSTT;
    for (let i = 0; i < 30; i++) {
      I.waitForVisible(this.fields.checksPanelSelector, 30);
      I.wait(1);
      results = await I.grabNumberOfVisibleElements(this.fields.sttFailedChecksPanelSelector);
      disabledSTT = await I.grabNumberOfVisibleElements(this.fields.sttDisabledFailedChecksPanelSelector);
      if (disabledSTT) {
        await settingsAPI.apiEnableSTT();
        I.amOnPage(this.url);
        continue
      }
      if (results > 0) {
        I.waitForVisible(this.fields.sttFailedChecksPanelSelector, 30);
        break
      }
      I.refreshPage();
    }
    assert.equal(true, results > 0, 'Checks have not appeared at Home Page');
  },

  async verifyPreUpdateWidgetIsPresent() {
    I.waitForVisible(this.fields.pmmUpdateWidget, 60);
    I.waitForElement(this.fields.triggerUpdate, 180);
    I.seeElement(this.fields.availableVersion);
    I.seeElement(this.fields.currentVersion);
    I.seeElement(this.fields.triggerUpdate);
    I.dontSeeElement(this.fields.upToDateLocator);
    I.seeElement(this.fields.currentVersion);
    I.seeElement(this.fields.checkUpdateButton);
    I.see('Last check:', this.fields.oldLastCheckSelector);
    assert.notEqual(await I.grabTextFrom(this.fields.availableVersion),
        await I.grabTextFrom(this.fields.currentVersion), 'Available and Current versions match');
  },

  verifyPostUpdateWidgetIsPresent() {
    I.waitForVisible(this.fields.pmmUpdateWidget, 30);
    I.waitForVisible(this.fields.upToDateLocator, 30);
    I.dontSeeElement(this.fields.availableVersion);
    I.dontSeeElement(this.fields.triggerUpdate);
    I.seeElement(this.fields.upToDateLocator);
    I.seeElement(this.fields.currentVersion);
    I.seeElement(this.fields.checkUpdateButton);
    I.see('Last check:', this.fields.lastCheckSelector);
  },

  async verifyVisibleService(serviceName) {
    I.scrollPageToBottom();
    const serviceExists =
        "//div[@class='react-grid-item']/descendant::p[contains(text(),'" + serviceName + "')]";
    I.waitForElement(serviceExists, 30);
    I.seeElement(serviceExists);
  },
};
