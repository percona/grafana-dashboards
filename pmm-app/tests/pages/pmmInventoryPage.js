const {I, pmmInventoryPage} = inject();
const assert = require('assert');
module.exports = {
  // insert your locators and methods here
  // setting locators
  url: 'graph/d/pmm-inventory/pmm-inventory?orgId=1',
  fields: {
    iframe: '//div[@class="panel-content"]//iframe',
    inventoryTable: '//table',
    inventoryTableRows: '//table//tr',
    inventoryTableColumn: '//table//td',
    agentsLink: '//div[@id="inventory-wrapper"]//li[contains(text(),"Agents")]',
    nodesLink: '//div[@id="inventory-wrapper"]//li[contains(text(),"Nodes")]',
    pmmServicesSelector: '//div[@id="inventory-wrapper"]//li[contains(text(),"Services")]',
    agentsLinkOld: '//a[contains(text(), "Agents")]',
    nodesLinkOld: '//a[contains(text(), "Nodes")]',
    pmmAgentLocator: '//table//td[contains(text(), "PMM Agent")]',
    serviceIdLocatorPrefix: '//table//tr/td[4][contains(text(),"',
  },

  verifyOldMySQLRemoteServiceIsDisplayed(serviceName) {
    I.waitForElement(pmmInventoryPage.fields.iframe, 60);
    I.switchTo(pmmInventoryPage.fields.iframe);
    I.waitForVisible(pmmInventoryPage.fields.inventoryTableColumn, 30);
    I.scrollPageToBottom();
    I.see(serviceName, pmmInventoryPage.fields.inventoryTableColumn);
  },

  verifyRemoteServiceIsDisplayed(serviceName) {
    I.waitForVisible(pmmInventoryPage.fields.inventoryTableColumn, 30);
    I.scrollPageToBottom();
    I.see(serviceName, pmmInventoryPage.fields.inventoryTableColumn);
  },

  async verifyAgentHasStatusRunning(service_name) {
    const serviceId = await this.getServiceId(service_name);
    const agentLinkLocator = this.fields.agentsLink;
    I.click(agentLinkLocator);
    I.waitForElement(this.fields.pmmAgentLocator, 60);
    I.waitForElement(this.fields.inventoryTable, 60);
    I.scrollPageToBottom();
    const numberOfServices = await I.grabNumberOfVisibleElements(
`//tr[td[contains(text(), "${serviceId}")]]//span[contains(text(),"status: RUNNING")]`
    );
    if (/mysql|mongo|postgres|rds/gmi.test(service_name)) {
      I.waitForVisible(`//tr[td[contains(text(), "${serviceId}")]]//span[contains(text(),"status: RUNNING")]`, 30);
      assert.equal(
          numberOfServices,
          2,
          ' Service ID must have only 2 Agents running for different services' + serviceId
      );
    } else {
      assert.equal(numberOfServices, 1, ' Service ID must have only 1 Agent running' + serviceId);
    }
  },

  async verifyMetricsFlags(serviceName) {
    const servicesLink = this.fields.pmmServicesSelector;
    const agentLinkLocator = this.fields.agentsLink;
    I.waitForElement(servicesLink, 20);
    I.click(servicesLink);
    const nodeId = await this.getNodeId(serviceName);
    I.click(agentLinkLocator);
    // eslint-disable-next-line max-len
    let flagExists = `//tr[td[contains(text(), "${nodeId}")]]//span[contains(text(),"enhanced_metrics_disabled: true")]`;
    I.seeElement(flagExists);
    // eslint-disable-next-line max-len
    flagExists = `//tr[td[contains(text(), "${nodeId}")]]//span[contains(text(),"basic_metrics_disabled: true")]`;
    I.seeElement(flagExists);
  },

  async getNodeId(serviceName) {
    const nodeIdLocator = this.fields.serviceIdLocatorPrefix + serviceName + '")]/following-sibling::td[5]';
    return await I.grabTextFrom(nodeIdLocator);
  },

  async getServiceId(serviceName) {
    const serviceIdLocator =
        `${this.fields.serviceIdLocatorPrefix}${serviceName}')]/preceding-sibling::td[2]`;
    I.waitForVisible(serviceIdLocator, 30);
    const matchedServices = await I.grabNumberOfVisibleElements(serviceIdLocator);
    await assert.equal(
        matchedServices,
        1,
        'There must be only one entry for the newly added service with name ' + serviceName
    );
    const serviceId = await I.grabTextFrom(serviceIdLocator);
    return serviceId;
  },
};
