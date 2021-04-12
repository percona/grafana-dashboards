const assert = require('assert');

Feature('QAN filters');

Before(async ({ I, qanPage, qanOverview }) => {
  await I.Authorize();
  I.amOnPage(qanPage.url);
  qanOverview.waitForOverviewLoaded();
});

Scenario(
  'PMM-T175 - Verify user is able to apply filter that has dots in label @not-pr-pipeline @qan',
  async ({ I, qanOverview, qanFilters }) => {
    const serviceName = 'ps_8.0';

    const countBefore = await qanOverview.getCountOfItems();

    qanFilters.applyFilter(serviceName);
    I.seeInCurrentUrl(`service_name=${serviceName}`);
    const countAfter = await qanOverview.getCountOfItems();

    assert.ok(countBefore !== countAfter, 'Query count was expected to change');
  },
);

Scenario(
  'PMM-T172 - Verify that selecting a filter updates the table data and URL  @not-pr-pipeline @qan',
  async ({ I, qanOverview, qanFilters }) => {
    const environmentName = 'ps-dev';

    const countBefore = await qanOverview.getCountOfItems();

    qanFilters.applyFilter(environmentName);
    I.seeInCurrentUrl(`environment=${environmentName}`);
    const countAfter = await qanOverview.getCountOfItems();

    assert.ok(countBefore !== countAfter, 'Query count was expected to change');
  },
);

Scenario(
  'PMM-T126 - Verify user is able to Reset All filters @not-pr-pipeline @qan',
  async ({ I, qanOverview, qanFilters }) => {
    const environmentName1 = 'ps-dev';
    const environmentName2 = 'pgsql-dev';

    const countBefore = await qanOverview.getCountOfItems();

    qanFilters.applyFilter(environmentName1);
    qanFilters.applyFilter(environmentName2);
    await qanOverview.waitForNewItemsCount(countBefore);
    const countAfter = await qanOverview.getCountOfItems();

    assert.ok(countAfter !== countBefore, 'Query count was expected to change');

    I.click(qanFilters.buttons.resetAll);
    I.waitForVisible(qanFilters.elements.disabledResetAll, 30);
    const countAfterReset = await qanOverview.getCountOfItems();

    assert.ok(countAfterReset >= countBefore, 'Query count wasn\'t expected to change');
  },
);

Scenario(
  'PMM-T124 - Verify User is able to show all and show top 5 values for filter section @not-pr-pipeline @qan',
  async ({ qanFilters }) => {
    const filterSection = 'Database';

    await qanFilters.verifySectionItemsCount(filterSection, 5);
    const countToShow = await qanFilters.getCountOfFilters(filterSection);

    qanFilters.applyShowAllLink(filterSection);
    await qanFilters.verifySectionItemsCount(filterSection, countToShow);
    await qanFilters.applyShowTop5Link(filterSection);
    await qanFilters.verifySectionItemsCount(filterSection, 5);
  },
);

Scenario(
  'PMM-T125 - Verify user is able to Show only selected filter values and Show All filter values @not-pr-pipeline @qan',
  async ({ I, qanFilters }) => {
    const environmentName1 = 'ps-dev';
    const environmentName2 = 'pgsql-dev';

    qanFilters.applyFilter(environmentName1);
    qanFilters.applyFilter(environmentName2);
    I.waitForVisible(qanFilters.buttons.showSelected, 30);
    I.click(qanFilters.buttons.showSelected);
    await qanFilters.verifyCountOfFilterLinks(2, false);
    I.click(qanFilters.buttons.showSelected);
    await qanFilters.verifyCountOfFilterLinks(2, true);
  },
);

// Skipping because of a random failings
xScenario(
  'PMM-T123 - Verify User is able to search for DB types, Env and Cluster @not-pr-pipeline @qan',
  async ({ I, qanOverview, qanFilters }) => {
    const filters = [
      'postgres',
      'mysql',
      'pmm-server',
      'postgresql',
      'mongodb',
      'ps-dev',
      'ps-dev-cluster',
      'pgsql-repl1',
    ];

    I.waitForElement(qanFilters.fields.filterBy, 30);
    const countBefore = await qanOverview.getCountOfItems();

    for (const i in filters) {
      qanFilters.applyFilter(filters[i]);
      await qanOverview.waitForNewItemsCount(countBefore);
      const countAfter = await qanOverview.getCountOfItems();
      const locator = qanFilters.getFilterLocator(filters[i]);

      assert.ok(countBefore !== countAfter, 'Query count was expected to change');

      I.forceClick(locator);
    }
  },
);

Scenario(
  'Check All Filter Groups Exists in the Filter Section @not-pr-pipeline @qan',
  async ({ I, qanFilters }) => {
    for (const i in qanFilters.filterGroups) {
      I.fillField(qanFilters.fields.filterBy, qanFilters.filterGroups[i]);
      I.waitForVisible(qanFilters.getFilterSectionLocator(qanFilters.filterGroups[i]), 30);
      I.seeElement(qanFilters.getFilterSectionLocator(qanFilters.filterGroups[i]));
      I.clearField(qanFilters.fields.filterBy);
    }
  },
);

Scenario(
  'PMM-T191 - Verify Reset All and Show Selected filters @not-pr-pipeline @qan',
  async ({ I, qanFilters }) => {
    const environmentName1 = 'ps-dev';
    const environmentName2 = 'pgsql-dev';

    qanFilters.applyFilter(environmentName1);
    qanFilters.applyFilter(environmentName2);
    I.click(qanFilters.buttons.showSelected);
    await qanFilters.verifyCountOfFilterLinks(2, false);
    I.click(qanFilters.buttons.resetAll);
    I.waitForInvisible(qanFilters.elements.spinner, 30);
    await qanFilters.verifyCountOfFilterLinks(2, true);

    qanFilters.applyFilter(environmentName1);
    I.click(qanFilters.buttons.showSelected);
    await qanFilters.verifyCountOfFilterLinks(1, false);
    qanFilters.applyFilter(environmentName1);
    I.waitForInvisible(qanFilters.elements.spinner, 30);
    await qanFilters.verifyCountOfFilterLinks(1, true);
  },
);

Scenario('PMM-T190 - Verify user is able to see n/a filter @not-pr-pipeline @qan', async ({ I, qanFilters }) => {
  I.fillField(qanFilters.fields.filterBy, 'n/a');
  await qanFilters.verifyCountOfFilterLinks(0, true);
});

Scenario(
  'PMM-T390 - Verify that we show info message when empty result is returned @not-pr-pipeline @qan',
  async ({
    I, qanOverview, qanFilters, adminPage,
  }) => {
    const serviceName = 'ps_8.0';
    const db1 = 'postgres';
    const db2 = 'n/a';
    const section = 'Database';

    let count = qanOverview.getCountOfItems();

    adminPage.applyTimeRange('Last 3 hour');
    qanOverview.waitForOverviewLoaded();
    qanFilters.applyShowAllLink(section);
    qanFilters.applyFilterInSection(section, db1);
    count = await qanOverview.waitForNewItemsCount(count);
    qanFilters.applyShowAllLink(section);
    qanFilters.applyFilterInSection(section, db2);
    count = await qanOverview.waitForNewItemsCount(count);
    qanFilters.applyFilter(serviceName);
    await qanOverview.waitForNewItemsCount(count);
    qanFilters.applyFilterInSection(section, db2);
    await within(qanOverview.root, () => {
      I.waitForText('No queries available for this combination of filters', 30);
    });
  },
);

Scenario(
  'PMM-T221 - Verify that all filter options are always visible (but some disabled) after selecting an item and % value is changed @not-pr-pipeline @qan',
  async ({
    I, adminPage, qanOverview, qanFilters,
  }) => {
    const serviceType = 'mysql';
    const environment = 'pgsql-dev';
    const serviceName = 'ps_8.0';

    // change to 2 days for apply ps_8.0 value in filter
    adminPage.applyTimeRange('Last 2 days');
    qanOverview.waitForOverviewLoaded();
    const countBefore = await qanOverview.getCountOfItems();
    const percentageBefore = await qanFilters.getPercentage('Service Type', serviceType);

    const countOfFilters = await I.grabNumberOfVisibleElements(qanFilters.fields.filterCheckboxes);

    qanFilters.applyFilter(serviceType);
    const countAfter = await qanOverview.getCountOfItems();

    assert.ok(countAfter !== countBefore, 'Query count was expected to change');

    await qanFilters.verifyCountOfFilterLinks(countOfFilters, false);
    qanFilters.applyShowAllLink('Environment');
    qanFilters.checkDisabledFilter('Environment', environment);
    qanFilters.applyFilter(serviceName);
    const percentageAfter = await qanFilters.getPercentage('Service Type', serviceType);

    assert.ok(
      percentageAfter !== percentageBefore,
      'Percentage for filter Service Type was expected to change',
    );
  },
);

Scenario(
  'PMM-T436 - Verify short-cut navigation from filters to related dashboards - Cluster @qan @not-pr-pipeline',
  async ({ I, qanFilters, dashboardPage }) => {
    const mongoLink = '/graph/d/mongodb-cluster-summary/mongodb-cluster-summary';
    const header = 'MongoDB Cluster Summary';
    const filterValue = 'mongodb_node_cluster';

    I.fillField(qanFilters.fields.filterBy, filterValue);
    await qanFilters.navigateByShortCut(mongoLink, filterValue);
    // wait for open new tab
    I.wait(2);
    await dashboardPage.waitAndSwitchTabs(2);
    I.waitInUrl(mongoLink, 30);
    await dashboardPage.checkNavigationBar(header);
  },
);

Scenario(
  'PMM-T436 - Verify short-cut navigation from filters to related dashboards - Replication Set @qan @not-pr-pipeline',
  async ({ I, qanFilters, dashboardPage }) => {
    const replicationSetLink = '/graph/d/mysql-replicaset-summary/mysql-replication-summary';
    const header = 'MySQL Replication Summary';
    const filterValue = 'ps-repl1';

    I.fillField(qanFilters.fields.filterBy, 'ps-repl1');
    await qanFilters.navigateByShortCut(replicationSetLink, filterValue);
    // wait for open new tab
    I.wait(2);
    await dashboardPage.waitAndSwitchTabs(2);
    I.waitInUrl(replicationSetLink, 30);
    await dashboardPage.checkNavigationBar(header);
  },
);

Scenario(
  'PMM-T436 - Verify short-cut navigation from filters to related dashboards - Node Name @qan @not-pr-pipeline',
  async ({ I, qanFilters, dashboardPage }) => {
    const shortCut = '/graph/d/node-instance-summary/node-summary?var-node_name=pmm-server';
    const nodeNameLink = 'node_name=pmm-server';
    const link = '/graph/d/node-instance-summary/node-summary';
    const header = 'Node Summary';
    const filterValue = 'pmm-server';

    I.fillField(qanFilters.fields.filterBy, filterValue);
    qanFilters.navigateByShortCut(shortCut, filterValue);
    // wait for open new tab
    I.wait(2);
    await dashboardPage.waitAndSwitchTabs(2);
    I.waitInUrl(link, 30);
    I.waitInUrl(nodeNameLink, 30);
    await dashboardPage.checkNavigationBar(header);
  },
);

Scenario(
  'PMM-T436 - Verify short-cut navigation from filters to related dashboards - Service Name @qan @not-pr-pipeline',
  async ({ I, qanFilters, dashboardPage }) => {
    const serviceNameLink = '/graph/d/mongodb-instance-summary/mongodb-instance-summary';
    const header = 'MongoDB Instance Summary';
    const filterValue = 'mongodb_rs1_2';

    I.fillField(qanFilters.fields.filterBy, 'mongodb_rs1_2');
    await qanFilters.navigateByShortCut(serviceNameLink, filterValue);
    // wait for open new tab
    I.wait(2);
    await dashboardPage.waitAndSwitchTabs(2);
    I.waitInUrl(serviceNameLink, 30);
    await dashboardPage.checkNavigationBar(header);
  },
);

Scenario('PMM-T437 - Verify short-cut navigation for n/a items @qan @not-pr-pipeline', async ({ I, qanFilters }) => {
  qanFilters.applyShowAllLink('Cluster');
  qanFilters.checkLink('Cluster', 'ps-dev-cluster', true);
  I.fillField(qanFilters.fields.filterBy, 'n/a');
  qanFilters.checkLink('Cluster', 'n/a', false);
  qanFilters.checkLink('Replication Set', 'n/a', false);
});
