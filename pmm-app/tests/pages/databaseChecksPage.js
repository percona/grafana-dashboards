const { I, pmmInventoryPage, pmmSettingsPage } = inject();
const assert = require('assert');
// xpath used here because locate('th').withText('') method does not work correctly
const locateChecksHeader = header => `//th[text()='${header}']`;
module.exports = {
  // insert your locators and methods here
  // setting locators
  url: 'graph/d/pmm-checks/pmm-database-checks',
  messages: {
    homePagePanelMessage:"Security Threat Tool is disabled.\nCheck PMM Settings.",
    disabledSTTMessage: "Security Threat Tool is disabled. You can enable it in",
  },
  fields: {
    dbCheckPanelSelector: "$db-check-panel",
    dbCheckPanelEmptySelector: "$db-check-panel-table-empty",
    sttEnabledDBCheckPanelSelector: "$db-check-panel-home",
    disabledSTTMessageSelector: "$db-check-panel-settings-link",
    serviceNameSelector: "tbody > tr > td:first-child",
    totalFailedChecksTooltipSelector: ".popper > div > div > div:first-of-type",
    failedChecksTooltipSelector: ".popper > div > div > div",
    serviceNameHeaderSelector: locateChecksHeader('Service name'),
    detailsHeaderSelector: locateChecksHeader('Details'),
    noOfFailedChecksHeaderSelector: locateChecksHeader('Failed Checks'),
    disabledSTTMessageLinkSelector: locate('a').inside('$db-check-panel-settings-link'),
    failedChecksRowSelector: "tbody > tr",
    tooltipSelector: locate('.ant-tooltip-inner > div > div').first(),
    noAccessRightsSelector: '$db-check-panel-no-access',
  },
  // introducing methods

  // Info icon locator in Failed Checks column for showing tooltip with additional information
  failedChecksInfoLocator(rowNumber = 1){
      return (`//tbody/tr[${rowNumber}]/td[1]/following-sibling::td/div/span[2]`);
  },
  // Locator for checks results in Failed Checks column
  numberOfFailedChecksLocator(rowNumber = 1){
      return (`//tbody/tr[${rowNumber}]/td[1]/following-sibling::td/div/span[1]`);
  },
  /*
   Method for verifying elements on a page when STT is enabled and disabled
   default state is enabled
   */
  verifyDatabaseChecksPageElements(stt = 'enabled'){
    switch (stt) {
      case 'enabled':
        I.seeElement(this.fields.dbCheckPanelSelector);
        I.dontSeeElement(this.fields.disabledSTTMessageSelector);
        I.dontSeeElement(this.fields.disabledSTTMessageLinkSelector);
        I.seeElement(this.fields.serviceNameHeaderSelector);
        I.seeElement(this.fields.noOfFailedChecksHeaderSelector);
        I.seeElement(this.fields.detailsHeaderSelector);
        break;
      case 'disabled':
        I.waitForVisible(this.fields.disabledSTTMessageSelector, 30);
        I.seeElement(this.fields.dbCheckPanelSelector);
        I.see(this.messages.disabledSTTMessage ,this.fields.disabledSTTMessageSelector);
        I.seeElement(this.fields.disabledSTTMessageLinkSelector);
        I.dontSeeElement(this.fields.serviceNameHeaderSelector);
        I.dontSeeElement(this.fields.noOfFailedChecksHeaderSelector);
        I.dontSeeElement(this.fields.detailsHeaderSelector);
        break;
    }
  },
  /*
   Refreshing page (30 times refresh timeout) until checks appear
   Alertmanager receives checks results every 30 seconds
   So 30 tries should be enough to get results
   */
  async waitForChecksToLoad() {
    let results;
    let disabledSTT;
    for (let i = 0; i < 30; i++) {
      I.waitForVisible(this.fields.dbCheckPanelSelector, 30);
      I.wait(1);
      results = await I.grabNumberOfVisibleElements(this.fields.serviceNameSelector);
      disabledSTT = await I.grabNumberOfVisibleElements(this.fields.disabledSTTMessageSelector);
      if (disabledSTT) {
        I.amOnPage(pmmSettingsPage.url);
        await pmmSettingsPage.enableSTT();
        I.amOnPage(this.url);
        continue
      }
      if (results > 0) {
        I.waitForVisible(this.fields.serviceNameSelector, 30);
        return
      }
      I.refreshPage();
    }
  },

  // Method used to verify elements on a page depending on STT state
  async verifyDatabaseChecksPageOpened(stt = 'enabled'){
    switch (stt) {
      case 'enabled':
        await this.waitForChecksToLoad();
        I.waitForVisible(this.fields.serviceNameHeaderSelector, 30);
        this.verifyDatabaseChecksPageElements(stt);
        break;
      case 'disabled':
        this.verifyDatabaseChecksPageElements(stt);
        break;
    }
  },

  // Compares values in tooltip with values in table
  async compareTooltipValues(rowNumber = 1) {
    let tableNumbers = await I.grabTextFrom(this.numberOfFailedChecksLocator(rowNumber));
    let tooltipTotalNumber = await I.grabTextFrom(this.fields.totalFailedChecksTooltipSelector);
    let tooltipNumbers = await I.grabTextFrom(this.fields.failedChecksTooltipSelector);
    tableNumbers = tableNumbers.split(/[^0-9]+/g);
    tableNumbers.pop();
    tooltipNumbers.shift();
    let detailsFromTable = `Critical – ${tableNumbers[1]}\nMajor – ${tableNumbers[2]}\nTrivial – ${tableNumbers[3]}`;
    assert.equal(`Failed checks: ${tableNumbers[0]}`, tooltipTotalNumber);
    assert.equal(detailsFromTable, tooltipNumbers);
  },

  mouseOverInfoIcon(row) {
    I.moveCursorTo(this.failedChecksInfoLocator(row));
    I.waitForVisible(this.fields.totalFailedChecksTooltipSelector, 30);
    I.seeElement(this.fields.totalFailedChecksTooltipSelector);
  },

  /*
    Method takes service names listed in Database Failed checks
     and compares names with existing Service Names in PMM Inventory
   */
  async verifyServiceNamesExistence() {
    let serviceNames = await I.grabTextFrom(this.fields.serviceNameSelector);
    I.amOnPage(pmmInventoryPage.url);
    I.waitForVisible(pmmInventoryPage.fields.inventoryTableColumn, 30);
    I.scrollPageToBottom();
    if (typeof serviceNames === `string`) {
      serviceNames = [serviceNames];
    }
    serviceNames.forEach(name => {
      I.see(name, pmmInventoryPage.fields.inventoryTableColumn);
    })
  }
};
