const { I } = inject();
const assert = require('assert');
module.exports = {
  // insert your locators and methods here
  // setting locators
  url: 'graph/d/pmm-home/home-dashboard?orgId=1',
  fields: {
    navigation: "//i[contains(@class, 'navbar-page-btn__search')]",
    timePickerMenu: "//button[contains(@aria-label,'TimePicker')]",
    fromTime: '(//input[@input-datetime])[1]',
    applyCustomTimer: '//button[@ng-click="ctrl.applyCustom();"]',
    backToDashboard: "//button[@ng-click='ctrl.close()']",
    discardChanges: "//button[@ng-click='ctrl.discard()']",
    metricTitle: "//div[@class='panel-title']",
    reportTitleWithNA:
      "//span[contains(text(), 'N/A')]//ancestor::div[contains(@class,'panel-container')]//span[contains(@class,'panel-title-text')]",
    pmmDropdownMenuSelector: locate('a[data-toggle="dropdown"] > span').withText('PMM')
  },

  // introducing methods
  dropdownMenuItemLocator(title) {
    return locate('ul > li > a').withText(`${title}`);
  },

  selectItemFromPMMDropdown(title){
    I.click(this.fields.pmmDropdownMenuSelector);
    I.click(this.dropdownMenuItemLocator(title));
  },

  async navigateToDashboard(folderName, dashboardName) {
    I.waitForElement(this.fields.navigation, 30);
    I.click(this.fields.navigation);
    I.waitForElement(this.prepareFolderLocator(folderName), 30);
    I.click(this.prepareFolderLocator(folderName));
    I.waitForElement(this.prepareDashboardLocator(dashboardName), 30);
    I.waitForVisible(this.prepareDashboardLocator(dashboardName), 30);
    I.wait(5);
    I.click(this.prepareDashboardLocator(dashboardName));
    const numOfElements = await I.grabNumberOfVisibleElements(this.fields.discardChanges);
    if (numOfElements > 0) {
      I.click('Discard');
    }
    I.wait(10);
    I.see(dashboardName);
  },

  prepareFolderLocator(folderName) {
    return "//span[contains(text(),'" + folderName + "') and @class='search-section__header__text']";
  },

  prepareDashboardLocator(dashboardName) {
    return "(//div[contains(text(), '" + dashboardName + "')])[1]";
  },

  applyTimer(timeDiff = "Last 5 minutes") {
    I.click(this.fields.timePickerMenu);
    I.waitForVisible("//span[contains(text(), 'Last 5 minutes')]", 30);
    I.click(`//span[contains(text(), '${timeDiff}')]`);
    I.wait(5);
    I.waitForVisible(`//span[contains(text(), '${timeDiff}')]`, 30);
  },

  viewMetric(metricName) {
    I.click("//span[contains(text(), '" + metricName + "')]");
    I.waitForElement("//span[contains(text(), '" + metricName + "')]/../span/ul/li[1]", 30);
    I.click("//span[contains(text(), '" + metricName + "')]/../span/ul/li[1]");
    I.wait(10);
  },

  openPanel(panelName) {
    I.click("//div[contains(@class,'dashboard-row')]//a[contains(text(), '" + panelName + "')]");
    I.wait(2);
  },

  async handleLazyLoading(timesPageDown) {
    I.click(this.fields.metricTitle);
    I.wait(10);
    I.click(this.fields.metricTitle);
    for (let i = 0; i < timesPageDown; i++) {
      I.pressKey('PageDown');
      I.wait(2);
    }
  },

  peformPageDown(timesPagesDown) {
    for (let i = 0; i < timesPagesDown; i++) {
      I.pressKey('PageDown');
      I.wait(1);
    }
  },

  async grabReportNameWithNA(number) {
    const numOfElements = await I.grabNumberOfVisibleElements(this.fields.reportTitleWithNA);
    if (numOfElements > number) {
      const reportTitle = await I.grabTextFrom(this.fields.reportTitleWithNA);
      assert.equal(
        numOfElements > number,
        false,
        numOfElements + ' Reports with N/A found on dashboard ' + reportTitle
      );
    }
  },
};
