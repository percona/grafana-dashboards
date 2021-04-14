const { I, pmmInventoryPage, inventoryAPI } = inject();
const assert = require('assert');

module.exports = {
  url: 'graph/inventory?orgId=1',
  fields: {
    iframe: '//div[@class="panel-content"]//iframe',
    inventoryTable: '//table',
    inventoryTableRows: '//table//tr',
    inventoryTableColumn: '//table//td',
    agentsLink: '//li[contains(text(),"Agents")]',
    nodesLink: '//li[contains(text(),"Nodes")]',
    pmmServicesSelector: '//li[contains(text(),"Services")]',
    agentsLinkOld: '//a[contains(text(), "Agents")]',
    nodesLinkOld: '//a[contains(text(), "Nodes")]',
    pmmAgentLocator: '//table//td[contains(text(), "PMM Agent")]',
    serviceIdLocatorPrefix: '//table//tr/td[4][contains(text(),"',
    deleteButton: '//span[contains(text(), "Delete")]',
    proceedButton: '//span[contains(text(), "Proceed")]',
    forceModeCheckbox: 'span[data-qa="force-field-label"]',
    tableCheckbox: 'div[data-qa="select-row"]',
    tableRow: '//tr[@data-qa="table-row"]',
    runningStatus: '//span[contains(text(), "RUNNING")]',
    externalExporter: locate('td').withText('External exporter'),
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

    await inventoryAPI.waitForRunningState(serviceId);
    I.click(agentLinkLocator);
    I.waitForElement(this.fields.pmmAgentLocator, 60);
    I.waitForElement(this.fields.inventoryTable, 60);
    I.scrollPageToBottom();
    const numberOfServices = await I.grabNumberOfVisibleElements(
      `//tr//td//span[contains(text(), "${serviceId}")]/../span[contains(text(), 'status: RUNNING')]`,
    );

    if (/mysql|mongo|postgres|rds/gim.test(service_name)) {
      I.waitForVisible(
        `//tr//td//span[contains(text(), "${serviceId}")]/../span[contains(text(), 'status: RUNNING')]`,
        30,
      );
      assert.equal(
        numberOfServices,
        2,
        ` Service ID must have only 2 Agents running for different services ${serviceId} , Actual Number of Services found is ${numberOfServices} for ${service_name}`,
      );
    } else {
      assert.equal(numberOfServices, 1, ` Service ID must have only 1 Agent running ${serviceId} , Actual Number of Services found is ${numberOfServices} for ${service_name}`);
    }
  },


  async getServiceIdWithStatus(status) {
    const serviceIds = [];
    const locator = locate('span')
      .withText('service_id:')
      .before(locate('span')
        .withText(`status: ${status}`));

    const strings = await I.grabTextFromAll(locator);

    // we need to cut "service_id: " prefix from grabbed strings
    strings.forEach((item) => serviceIds.push(item.split(': ')[1]));

    return serviceIds;
  },

  async getOtherDetails(serviceID, detailsSection, expectedResult) {
    const locator = locate('span').withText(detailsSection).after(locate('span').withText(`service_id: ${serviceID}`));
    const details = await I.grabTextFrom(locator);

    assert.ok(expectedResult === details, `Expected result: ${expectedResult} do not match details section: ${details}`);
  },


  async verifyMetricsFlags(serviceName) {
    const servicesLink = this.fields.pmmServicesSelector;
    const agentLinkLocator = this.fields.agentsLink;

    I.waitForElement(servicesLink, 20);
    I.click(servicesLink);
    const nodeId = await this.getNodeId(serviceName);

    I.click(agentLinkLocator);
    const enhanceMetricsDisabled = `//tr//td//span[contains(text(), "${nodeId}")]/../span[contains(text(),"enhanced_metrics_disabled: true")]`;

    I.waitForElement(enhanceMetricsDisabled, 30);
    I.seeElement(enhanceMetricsDisabled);
    const basicMetricsDisabled = `//tr//td//span[contains(text(), "${nodeId}")]/../span[contains(text(),"basic_metrics_disabled: true")]`;

    I.seeElement(basicMetricsDisabled);
  },

  async getNodeId(serviceName) {
    const nodeIdLocator = `${this.fields.serviceIdLocatorPrefix + serviceName}")]/../td[5]`;

    return await I.grabTextFrom(nodeIdLocator);
  },

  async getServiceId(serviceName) {
    const serviceIdLocator = `${this.fields.serviceIdLocatorPrefix}${serviceName}")]/preceding-sibling::td[2]`;

    I.waitForVisible(serviceIdLocator, 30);
    const matchedServices = await I.grabNumberOfVisibleElements(serviceIdLocator);

    await assert.equal(
      matchedServices,
      1,
      `There must be only one entry for the newly added service with name ${serviceName}`,
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

  async getCountOfRunningAgents() {
    return await I.grabNumberOfVisibleElements(this.fields.runningStatus);
  },

  async getCountOfPMMAgents() {
    return await I.grabNumberOfVisibleElements(this.fields.pmmAgentLocator);
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
    return await I.grabNumberOfVisibleElements('//table//tr/td/div[@data-qa="select-row"]');
  },

  async checkAllNotDeletedAgents(countBefore) {
    const countAfter = await this.getCountOfItems();
    const otherDetails = await I.grabNumberOfVisibleElements(
      '//table//tr/td[4]//span[contains(text(), "pmm-server")]',
    );

    /* we are using count 7 because we have two agents for RDS Instance also,
    hence (pmm-agent, Node exporter, postgres exporter, mysql exporter, QAN RDS, QAN postgres, RDS exporter)
     */
    assert.ok((otherDetails <= 7 && otherDetails >= 4), 'Total Agents running on PMM-Server Instance can not be greater then 7');
    assert.ok(countBefore > countAfter, `Some PMM Agents should have been deleted, Agents running before deleting ${countBefore} and after deleting ${countAfter}`);
  },

  async getCellValue(rowNumber, columnNumber) {
    const value = await I.grabTextFrom(`${this.fields.tableRow}[${rowNumber}]/td[${columnNumber}]`);

    return value.toLowerCase();
  },

  async checkSort(columnNumber) {
    I.waitForVisible(this.fields.tableRow, 20);
    const rowCount = await I.grabNumberOfVisibleElements(this.fields.tableRow);
    let tmp;

    for (let i = 0; i < rowCount; i++) {
      const cellValue = await this.getCellValue(i + 1, columnNumber);

      if (i === 0) {
        // Do nothing for the first run
        tmp = cellValue;
      } else {
        if (tmp.localeCompare(cellValue) === 1) {
          assert.fail(
            `The array is not sorted correctly from a-z: value ${cellValue} should come after ${tmp}, not before`,
          );
          break;
        }

        // Update the tmp value for the next comparison
        tmp = cellValue;
      }
    }
  },
};
