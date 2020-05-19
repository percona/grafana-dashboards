const { I, pmmInventoryPage } = inject();
const assert = require('assert');
module.exports = {
  // insert your locators and methods here
  // setting locators
  url: 'graph/d/pmm-checks/pmm-database-checks',
  messages: {
    homePagePanelMessage:"Security Threat Tool is disabled.\nCheck PMM Settings.",
    disabledSTTMessage: "Security Threat Tool is disabled. You can enable it in",
  },
  fields: {
    dbCheckPanelSelector: "//div[@data-qa='db-check-panel']",
    sttEnabledDBCheckPanelSelector:"//div[@data-qa='db-check-panel-home']",
    disabledSTTMessageSelector:"//div[@data-qa='db-check-panel-settings-link']",
    serviceNameHeaderSelector:"//table[@data-qa='db-check-panel-table']//th[text()='Service name']",
    detailsHeaderSelector:"//table[@data-qa='db-check-panel-table']//th[text()='Details']",
    noOfFailedChecksHeaderSelector:"//table[@data-qa='db-check-panel-table']//th[text()='Failed Checks']",
    serviceNameSelector:"//tbody/tr/td[1]",
    failedChecksRowSelector:"//tbody/tr",
    tooltipSelector: "//div[@class='ant-tooltip-inner']/div/div[1]",
    totalFailedChecksTooltipSelector: "//div[@class='popper']//div[text()='Failed checks: ']",
    failedChecksTooltipSelector: "//div[@class='popper']/div/div/div"
  },

  // introducing methods

  failedChecksInfoLocator(rowNumber = 1){
      return (`//tbody/tr[${rowNumber}]/td[1]/following-sibling::td/div/span[2]`);
  },

  numberOfFailedChecksLocator(rowNumber = 1){
      return (`//tbody/tr[${rowNumber}]/td[1]/following-sibling::td/div/span[1]`);
  },

  verifyDatabaseChecksPageOpened(sttEnabled = false){
    if (sttEnabled) {
      I.waitForVisible(this.fields.dbCheckPanelSelector, 30);
      I.waitForVisible(this.fields.serviceNameHeaderSelector, 30);
      I.seeElement(this.fields.dbCheckPanelSelector);
      I.dontSeeElement(this.fields.disabledSTTMessageSelector);
      I.dontSeeElement(`${this.fields.disabledSTTMessageSelector}/a`);
      I.seeElement(this.fields.serviceNameHeaderSelector);
      I.seeElement(this.fields.noOfFailedChecksHeaderSelector);
      I.seeElement(this.fields.detailsHeaderSelector);
    } else {
      I.waitForVisible(this.fields.dbCheckPanelSelector, 30);
      I.waitForVisible(this.fields.serviceNameHeaderSelector, 30);
      I.seeElement(this.fields.dbCheckPanelSelector);
      I.see(this.messages.disabledSTTMessage ,this.fields.disabledSTTMessageSelector);
      I.seeElement(`${this.fields.disabledSTTMessageSelector}/a`);
      I.dontSeeElement(this.fields.serviceNameHeaderSelector);
      I.dontSeeElement(this.fields.noOfFailedChecksHeaderSelector);
      I.dontSeeElement(this.fields.detailsHeaderSelector);
    }
  },

  async waitForCheckResultsToAppear(){
    let results;
    for (let i = 0; i < 60; i++) {
      results = await I.grabNumberOfVisibleElements(this.fields.serviceNameSelector);
      if (results > 0) {
        break
      }
      I.refreshPage();
      I.waitForVisible(this.fields.dbCheckPanelSelector, 30);
      I.wait(1);
    }
  },

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
