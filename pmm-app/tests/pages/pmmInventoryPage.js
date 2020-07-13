const { I, pmmInventoryPage } = inject();
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
    deleteButton: '//span[contains(text(), "Delete")]',
    proceedButton: '//span[contains(text(), "Proceed")]',
    forceModeCheckbox:
      'div[data-qa="form-field-force"] span.checkbox-container__checkmark',
    tableCheckbox: 'div[data-qa="select-row"]',
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
      `//tr//td//span[contains(text(), "${serviceId}")]/../span[contains(text(), 'status: RUNNING')]`
    );
    if (/mysql|mongo|postgres|rds/gim.test(service_name)) {
      I.waitForVisible(
        `//tr//td//span[contains(text(), "${serviceId}")]/../span[contains(text(), 'status: RUNNING')]`,
        30
      );
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
    const enhanceMetricsDisabled = `//tr//td//span[contains(text(), "${nodeId}")]/../span[contains(text(),"enhanced_metrics_disabled: true")]`;
    I.seeElement(enhanceMetricsDisabled);
    // eslint-disable-next-line max-len
    const basicMetricsDisabled = `//tr//td//span[contains(text(), "${nodeId}")]/../span[contains(text(),"basic_metrics_disabled: true")]`;
    I.seeElement(basicMetricsDisabled);
  },

  async getNodeId(serviceName) {
    const nodeIdLocator = this.fields.serviceIdLocatorPrefix + serviceName + '")]/../td[5]';
    return await I.grabTextFrom(nodeIdLocator);
  },

  async getServiceId(serviceName) {
    const serviceIdLocator = `${this.fields.serviceIdLocatorPrefix}${serviceName}")]/preceding-sibling::td[2]`;
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

  selectService(serviceName) {
    const serviceLocator = `${this.fields.serviceIdLocatorPrefix}${serviceName}")]/preceding-sibling::td/div[@data-qa="select-row"]`;
    I.waitForVisible(serviceLocator, 30);
    I.click(serviceLocator);
  },

  serviceExists(serviceName, deleted) {
    const serviceLocator = `${this.fields.serviceIdLocatorPrefix}${serviceName}")]`;
    if (deleted) {
      I.waitForInvisible(serviceLocator, 30);
    } else {
      I.waitForVisible(serviceLocator, 30);
    }
  },

  checkNodeExists(serviceName) {
    const nodeName = `${this.fields.serviceIdLocatorPrefix}${serviceName}")]`;
    I.waitForVisible(nodeName, 20);
  },

  getServicesId(serviceName) {
    const serviceIdLocator = `${this.fields.serviceIdLocatorPrefix}${serviceName}")]/preceding-sibling::td[2]`;
    return serviceIdLocator;
  },

  async getCountOfAgents(serviceId) {
    const countOfAgents = await I.grabNumberOfVisibleElements(serviceId);
    assert.equal(countOfAgents, 0, 'The agents should be removed!');
  },

  selectAgent(agentType) {
    const agentLocator = `//table//tr/td[3][contains(text(),"${agentType}")]/preceding-sibling::td/div[@data-qa="select-row"]`;
    I.waitForVisible(agentLocator, 30);
    I.click(agentLocator);
  },

  async getAgentServiceID(agentType) {
    const serviceIdLocator = `//table//tr/td[3][contains(text(),"${agentType}")]/following-sibling::td//span[contains(text(), 'service_id:')]`;
    I.waitForVisible(serviceIdLocator, 30);
    const serviceIDs = await I.grabTextFrom(serviceIdLocator);
    return serviceIDs[0].slice(12, serviceIDs[0].lenght);
  },

  async getAgentID(agentType) {
    const agentIdLocator = `//table//tr/td[3][contains(text(),"${agentType}")]/preceding-sibling::td`;
    I.waitForVisible(agentIdLocator, 30);
    const agentIDs = await I.grabTextFrom(agentIdLocator);
    return agentIDs[1];
  },

  async getNodeCount() {
    I.waitForVisible(this.fields.tableCheckbox);
    return await I.grabNumberOfVisibleElements(this.fields.tableCheckbox);
  },

  verifyNodesCount(before, after) {
    assert.equal(before, after, 'The count of nodes should be same! Check the data!');
  },

  existsByid(id, deleted) {
    const agentIdLocator = `//table//tr/td[2][contains(text(),"${id}")]`;
    if (deleted) {
      I.waitForInvisible(agentIdLocator, 30);
    } else {
      I.waitForVisible(agentIdLocator, 30);
    }
  },

  selectAgentByID(id) {
    const agentIdLocator = `//table//tr/td[2][contains(text(),"${id}")]/preceding-sibling::td/div[@data-qa="select-row"]`;
    I.waitForVisible(agentIdLocator, 30);
    I.click(agentIdLocator);
  },

  deleteWithForceOpt() {
    I.click(this.fields.deleteButton);
    I.click(this.fields.forceModeCheckbox);
    I.click(this.fields.proceedButton);
  },

  async getCountOfItems() {
    return await I.grabNumberOfVisibleElements(`//table//tr/td/div[@data-qa="select-row"]`);
  },

  async checkAllNotDeletedAgents(text) {
    const count = await this.getCountOfItems();
    const otherDetails = await I.grabNumberOfVisibleElements(
      `//table//tr/td[4]//span[contains(text(), "${text}")]`
    );
    assert.equal(count, otherDetails, 'Check data!');
  },
};
