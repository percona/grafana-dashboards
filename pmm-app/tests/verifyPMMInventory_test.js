Feature('Inventory page');

Before(async (I) => {
  I.Authorize();
});

Scenario(
  'PMM-T371 - Verify sorting in Inventory page(Services tab) @not-pr-pipeline @not-ui-pipeline @nightly',
  async (I, pmmInventoryPage) => {
    I.amOnPage(pmmInventoryPage.url);
    I.waitForVisible(pmmInventoryPage.fields.tableRow, 20);
    const countOfRows = await I.grabNumberOfVisibleElements(pmmInventoryPage.fields.tableRow);
    let serviceNames = new Array(countOfRows);
    let forSort = new Array(countOfRows);

    for (i = 1; i <= serviceNames.length; i++) {
      serviceNames[i - 1] = await pmmInventoryPage.getCellValue(i, 4);
      forSort[i - 1] = serviceNames[i - 1];
    }
    forSort.sort();
    for (i = 0; i <= serviceNames.length - 1; i++) {
      pmmInventoryPage.checkData(serviceNames[i], forSort[i]);
    }
  },
);

Scenario(
  'PMM-T371 - Verify sorting in Inventory page(Agents tab) @not-pr-pipeline @not-ui-pipeline @nightly',
  async (I, pmmInventoryPage) => {
    I.amOnPage(pmmInventoryPage.url);
    I.waitForVisible(pmmInventoryPage.fields.agentsLink, 20);
    I.click(pmmInventoryPage.fields.agentsLink);
    I.waitForVisible(pmmInventoryPage.fields.tableRow, 20);
    const countOfRows = await I.grabNumberOfVisibleElements(pmmInventoryPage.fields.tableRow);
    let agentTypes = new Array(countOfRows);
    let forSort = new Array(countOfRows);

    for (i = 1; i <= agentTypes.length; i++) {
      agentTypes[i - 1] = await pmmInventoryPage.getCellValue(i, 3);
      forSort[i - 1] = agentTypes[i - 1];
    }

    forSort.sort();
    for (i = 0; i <= agentTypes.length - 1; i++) {
      pmmInventoryPage.checkData(agentTypes[i], forSort[i]);
    }
  },
);

Scenario(
  'PMM-T371 - Verify sorting in Inventory page(Nodes tab) @not-pr-pipeline @not-ui-pipeline @nightly',
  async (I, pmmInventoryPage) => {
    I.amOnPage(pmmInventoryPage.url);
    I.waitForVisible(pmmInventoryPage.fields.nodesLink, 20);
    I.click(pmmInventoryPage.fields.nodesLink);
    I.waitForVisible(pmmInventoryPage.fields.tableRow, 20);
    const countOfRows = await I.grabNumberOfVisibleElements(pmmInventoryPage.fields.tableRow);
    let nodeNames = new Array(countOfRows);
    let forSort = new Array(countOfRows);

    for (i = 1; i <= nodeNames.length; i++) {
      nodeNames[i - 1] = await pmmInventoryPage.getCellValue(i, 4);
      forSort[i - 1] = nodeNames[i - 1];
    }

    forSort.sort();
    for (i = 0; i <= nodeNames.length - 1; i++) {
      pmmInventoryPage.checkData(nodeNames[i], forSort[i]);
    }
  },
);

Scenario(
  'PMM-T339 - Verify MySQL service is removed on PMM Inventory page @not-pr-pipeline',
  async (I, addInstanceAPI, pmmInventoryPage) => {
    const serviceType = 'MySQL';
    const serviceName = 'ServiceToDelete';

    await addInstanceAPI.apiAddInstance(serviceType, serviceName);
    I.amOnPage(pmmInventoryPage.url);
    const serviceId = pmmInventoryPage.getServicesId(serviceName);

    pmmInventoryPage.selectService(serviceName);
    I.click(pmmInventoryPage.fields.deleteButton);
    I.click(pmmInventoryPage.fields.proceedButton);
    pmmInventoryPage.serviceExists(serviceName, false);
    pmmInventoryPage.selectService(serviceName);
    pmmInventoryPage.deleteWithForceOpt();
    pmmInventoryPage.serviceExists(serviceName, true);
    I.click(pmmInventoryPage.fields.agentsLink);
    await pmmInventoryPage.getCountOfAgents(serviceId);
    I.click(pmmInventoryPage.fields.nodesLink);
    pmmInventoryPage.checkNodeExists(serviceName);
  },
);

Scenario(
  'PMM-T340 - Verify node with agents, services can be removed on PMM Inventory page @not-pr-pipeline',
  async (I, addInstanceAPI, pmmInventoryPage) => {
    const serviceType = 'MySQL';
    const serviceName = 'NodeToDelete';

    await addInstanceAPI.apiAddInstance(serviceType, serviceName);
    I.amOnPage(pmmInventoryPage.url);
    const serviceId = pmmInventoryPage.getServicesId(serviceName);

    I.waitForVisible(pmmInventoryPage.fields.nodesLink, 30);
    I.click(pmmInventoryPage.fields.nodesLink);
    pmmInventoryPage.selectService(serviceName);
    pmmInventoryPage.deleteWithForceOpt();
    I.click(pmmInventoryPage.fields.pmmServicesSelector);
    pmmInventoryPage.serviceExists(serviceName, true);
    I.click(pmmInventoryPage.fields.agentsLink);
    await pmmInventoryPage.getCountOfAgents(serviceId);
  },
);

Scenario(
  'PMM-T342 - Verify pmm-server node cannot be removed from PMM Inventory page @not-pr-pipeline',
  async (I, pmmInventoryPage) => {
    const node = 'pmm-server';

    I.amOnPage(pmmInventoryPage.url);
    I.waitForVisible(pmmInventoryPage.fields.nodesLink, 30);
    I.click(pmmInventoryPage.fields.nodesLink);
    pmmInventoryPage.selectService(node);
    pmmInventoryPage.deleteWithForceOpt();
    pmmInventoryPage.checkNodeExists(node);
  },
);

Scenario(
  'PMM-T343 - Verify agent can be removed on PMM Inventory page @not-pr-pipeline',
  async (I, pmmInventoryPage) => {
    const agentType = 'MySQL exporter';

    I.amOnPage(pmmInventoryPage.url);
    I.waitForVisible(pmmInventoryPage.fields.nodesLink, 20);
    I.click(pmmInventoryPage.fields.nodesLink);
    const countOfNodesBefore = await pmmInventoryPage.getNodeCount();

    I.waitForVisible(pmmInventoryPage.fields.agentsLink, 20);
    I.click(pmmInventoryPage.fields.agentsLink);
    const serviceId = await pmmInventoryPage.getAgentServiceID(agentType);
    const agentId = await pmmInventoryPage.getAgentID(agentType);

    pmmInventoryPage.selectAgent(agentType);
    I.click(pmmInventoryPage.fields.deleteButton);
    I.click(pmmInventoryPage.fields.proceedButton);
    pmmInventoryPage.existsByid(agentId, true);
    I.click(pmmInventoryPage.fields.nodesLink);
    const countOfNodesAfter = await pmmInventoryPage.getNodeCount();

    pmmInventoryPage.verifyNodesCount(countOfNodesBefore, countOfNodesAfter);
    I.click(pmmInventoryPage.fields.pmmServicesSelector);
    pmmInventoryPage.existsByid(serviceId, false);
  },
);

Scenario(
  'PMM-T345 - Verify removing pmm-agent on PMM Inventory page removes all associated agents @not-pr-pipeline',
  async (I, pmmInventoryPage) => {
    const agentID = 'pmm-server';
    const agentType = 'PMM Agent';

    I.amOnPage(pmmInventoryPage.url);
    I.waitForVisible(pmmInventoryPage.fields.agentsLink, 20);
    I.click(pmmInventoryPage.fields.agentsLink);
    pmmInventoryPage.selectAgentByID(agentID);
    pmmInventoryPage.deleteWithForceOpt();
    pmmInventoryPage.existsByid(agentID, false);
    pmmInventoryPage.selectAgent(agentType);
    const agentIDToDelete = await pmmInventoryPage.getAgentID(agentType);

    pmmInventoryPage.deleteWithForceOpt();
    pmmInventoryPage.existsByid(agentIDToDelete, true);
    await pmmInventoryPage.checkAllNotDeletedAgents(agentID);
  },
);
