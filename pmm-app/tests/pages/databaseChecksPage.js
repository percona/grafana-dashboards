const { I, pmmInventoryPage } = inject();
const assert = require('assert');
module.exports = {
  // insert your locators and methods here
  // setting locators
  url: 'graph/d/pmm-checks/pmm-database-checks',
  fields: {
    refreshBtnSelector: "//button/span[text()='Refresh']",
    serviceNameHeaderSelector:"//span[@class='ant-table-column-title' and text()='Service name']",
    detailsHeaderSelector:"//span[@class='ant-table-column-title' and text()='Details']",
    noOfFailedChecksHeaderSelector:"//span[@class='ant-table-column-title' and text()='No of Failed Checks']",
    serviceNameSelector:"//tbody/tr/td[1]",
    failedChecksRowSelector:"//tbody/tr",
    failedChecksInfoSelector:"//tbody/tr/td[text()='mariadb-10.2']/following-sibling::td/div/span[2]",
    tooltipSelector: "//div[@class='ant-tooltip-inner']/div/div[1]",
    totalFailedChecksTooltipSelector: "//div[@class='ant-tooltip-inner']//div[text()='Failed checks: ']",
    failedChecksTooltipSelector: "//div[@class='ant-tooltip-inner']/div/div/div"
  },

  // introducing methods

  failedChecksInfoLocator(rowNumber = 1){
      return (`//tbody/tr[${rowNumber}]/td[1]/following-sibling::td/div/span[2]`);
  },

  numberOfFailedChecksLocator(rowNumber = 1){
      return (`//tbody/tr[${rowNumber}]/td[1]/following-sibling::td/div/span[1]`);
  },

  verifyDatabaseChecksPageOpened(){
    I.waitForVisible(this.fields.refreshBtnSelector, 30);
    I.seeElement(this.fields.refreshBtnSelector);
    I.seeElement(this.fields.serviceNameHeaderSelector);
    I.seeElement(this.fields.noOfFailedChecksHeaderSelector)
    I.seeElement(this.fields.detailsHeaderSelector)
  },

  async waitForCheckResultsToAppear(){
    let results;
    for (let i = 0; i < 60; i++) {
      results = await I.grabNumberOfVisibleElements(this.fields.serviceNameSelector);
      if (results > 0) {
        break
      }
      I.click(this.fields.refreshBtnSelector);
      I.wait(1);
    }
  },

  async compareTooltipValues(rowNumber = 1) {
    let tableNumbers = await I.grabTextFrom(this.numberOfFailedChecksLocator(rowNumber));
    let tooltipTotalNumber = await I.grabTextFrom(this.fields.totalFailedChecksTooltipSelector);
    let tooltipNumbers = await I.grabTextFrom(this.fields.failedChecksTooltipSelector);
    tableNumbers = tableNumbers.split(/[^0-9]+/g);
    tableNumbers.pop();
    let detailsFromTable = `Critical – ${tableNumbers[1]},Major – ${tableNumbers[2]},Trivial – ${tableNumbers[3]}`;
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
