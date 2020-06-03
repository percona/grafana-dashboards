Feature('QAN Dashboard');

Before(async (I, qanPage, adminPage) => {
  I.Authorize();

  I.amOnPage(`${qanPage.url}?from=now-5m&to=now`);
  // TODO: these two elements should be changed once new QAN is merged
  await I.waitForElement(qanPage.fields.iframe, 60);
  await I.switchTo(qanPage.fields.iframe);
});
/*
Scenario('Verify QAN Filter groups exist  @not-pr-pipeline', async (I, adminPage, qanPage) => {
  qanPage.waitForQANPageLoaded();
  await qanPage.changeResultsPerPage(50);
  qanPage.checkFilterGroups();
});

Scenario(
  'Verify QAN Query Details section opened when user selects Query @not-pr-pipeline',
  async (I, adminPage, qanPage) => {
    qanPage.waitForQANPageLoaded();
    qanPage._selectDetails(2);
  }
);

xScenario('Verify data in Table and Query Details', async (I, adminPage, qanPage) => {
  I.amOnPage(qanPage.url);
  await I.waitForElement(qanPage.fields.iframe, 60);
  adminPage.applyTimer('5m');
  await I.switchTo(qanPage.fields.iframe); // switch to first iframe
  I.wait(10);
  qanPage.applyFilter('ps');
  await qanPage.verifyDataSet(1);
  await qanPage.verifyDataSet(2);
  await qanPage.clearFilters();
});

Scenario('Verify QAN pagination @not-pr-pipeline', async (I, adminPage, qanPage) => {
  qanPage.waitForQANPageLoaded();
  qanPage.checkPagination();
  await qanPage.checkSparkLines();
  qanPage.checkTableHeaders();
  //qanPage.checkServerList();
  // I.switchTo();
});

xScenario(
  'Verify Tables tab in Query Details for Database=postgres filter',
  async (I, adminPage, qanPage) => {
    const filterToApply = 'postgres';
    qanPage.waitForQANPageLoaded();
    qanPage.applyFilter(filterToApply);
    qanPage._selectDetails(2);
    qanPage.selectSectionInDetails(qanPage.fields.tablesTabInDetails);
    await qanPage.verifyDetailsSectionDataExists(qanPage.tabs.tablesTab);
  }
);

xScenario(
  'Verify Tables tab in Query Details for Environment=pgsql-dev filter @not-pr-pipeline',
  async (I, adminPage, qanPage) => {
    const filterToApply = 'pgsql-dev';
    qanPage.waitForQANPageLoaded();
    await qanPage.expandAllFilter();
    qanPage.applyFilter(filterToApply);
    qanPage.waitForQANPageLoaded();
    await qanPage._selectDetails(2);
    qanPage.selectSectionInDetails(qanPage.fields.tablesTabInDetails);
    await qanPage.verifyDetailsSectionDataExists(qanPage.tabs.tablesTab);
  }
);

xScenario(
  'Verify Explain tab in Query Details for Database=postgres filter @not-pr-pipeline',
  async (I, adminPage, qanPage) => {
    const filterToApply = 'postgres';
    qanPage.waitForQANPageLoaded();
    qanPage.applyFilter(filterToApply);
    qanPage._selectDetails(2);
    qanPage.selectSectionInDetails(qanPage.fields.explainTabInDetails);
    await qanPage.verifyDetailsSectionDataExists(qanPage.tabs.explainTab);
  }
);

Scenario(
  'Verify Explain tab in Query Details for Environment=pgsql-dev filter @not-pr-pipeline',
  async (I, adminPage, qanPage) => {
    const filterToApply = 'pgsql-dev';
    qanPage.waitForQANPageLoaded();
    await qanPage.expandAllFilter();
    qanPage.applyFilter(filterToApply);
    qanPage.waitForQANPageLoaded();
    await qanPage._selectDetails(2);
    qanPage.selectSectionInDetails(qanPage.fields.explainTabInDetails);
    await qanPage.verifyDetailsSectionDataExists(qanPage.tabs.explainTab);
  }
);

xScenario('Verify adding new Column reflects in URL @not-pr-pipeline', async (I, adminPage, qanPage) => {
  const columnName = 'Query Count with errors';
  qanPage.waitForQANPageLoaded();
  qanPage.addColumnToQAN(columnName);
  qanPage.verifyURLContains(qanPage.urlParts.queryCountWithoutErrors);
});

xScenario(
  'Verify adding new Database Filter reflects in URL @not-pr-pipeline',
  async (I, adminPage, qanPage) => {
    const filterToApply = 'local';
    qanPage.waitForQANPageLoaded();
    await qanPage.expandAllFilter();
    I.wait(2);
    qanPage.applyFilter(filterToApply);
    qanPage.verifyURLContains(qanPage.urlParts.pmmManaged);
  }
);

Scenario('Verify Main Metric change reflects in URL @not-pr-pipeline', async (I, adminPage, qanPage) => {
  const metricToReplace = 'Load';
  const newMetricName = 'Lock Time';
  qanPage.waitForQANPageLoaded();
  qanPage.changeMetricTo(metricToReplace, newMetricName);
  qanPage.verifyURLContains(qanPage.urlParts.lockTime);
});

// TODO: Uncomment after new QAN will be merged
xScenario(
  'PMM-T175 - Verify user is able to apply filter that has dots in label @not-pr-pipeline',
  async (I, qanPage) => {
    const serviceName = 'ps_5.7_0.0.0.0_1';
    qanPage.waitForNewQANPageLoaded();
    const countBefore = await qanPage.getCountOfItems();
    qanPage.applyFilterNewQAN(serviceName);
    I.seeInCurrentUrl('service_name=' + serviceName);
    I.waitForInvisible(qanPage.fields.newQANSpinnerLocator, 30);
    const countAfter = await qanPage.getCountOfItems();
    qanPage.verifyChangedCount(countBefore, countAfter);
  }
);

// TODO: Uncomment after new QAN will be merged
xScenario(
  'PMM-T172 - Verify that selecting a filter updates the table data and URL  @not-pr-pipeline',
  async (I, qanPage) => {
    const environmentName = 'ps-prod';
    qanPage.waitForNewQANPageLoaded();
    const countBefore = await qanPage.getCountOfItems();
    qanPage.applyFilterNewQAN(environmentName);
    I.seeInCurrentUrl('environment=' + environmentName);
    I.waitForInvisible(qanPage.fields.newQANSpinnerLocator, 30);
    const countAfter = await qanPage.getCountOfItems();
    qanPage.verifyChangedCount(countBefore, countAfter);
  }
);

// TODO: Uncomment after new QAN will be merged
xScenario('PMM-T126 - Verify user is able to Reset All filters @not-pr-pipeline', async (I, qanPage) => {
  const environmentName1 = 'ps-dev';
  const environmentName2 = 'ps-prod';
  qanPage.waitForNewQANPageLoaded();
  const countBefore = await qanPage.getCountOfItems();
  qanPage.applyFilterNewQAN(environmentName1);
  I.waitForInvisible(qanPage.fields.newQANSpinnerLocator, 30);
  qanPage.applyFilterNewQAN(environmentName2);
  const countAfter = await qanPage.getCountOfItems();
  await qanPage.verifyChangedCount(countBefore, countAfter);
  I.click(qanPage.fields.resetAll);
  I.waitForVisible(qanPage.fields.resetAll + ':disabled', 20);
});

// TODO: Uncomment after new QAN will be merged
xScenario(
  'PMM-T124 - Verify User is able to show all and show top 5 values for filter section @not-pr-pipeline',
  async (I, qanPage) => {
    const filterSection = 'Database';
    qanPage.waitForNewQANPageLoaded();
    await qanPage.verifyFiltersSection(filterSection, 5);
    const countToShow = await qanPage.getCountOfFilters(filterSection);
    qanPage.applyShowAllLink(filterSection);
    await qanPage.verifyFiltersSection(filterSection, countToShow);
    await qanPage.applyShowTop5Link(filterSection);
    await qanPage.verifyFiltersSection(filterSection, 5);
  }
);

// TODO: Uncomment after new QAN will be merged
xScenario(
  'PMM-T125 - Verify user is able to Show only selected filter values and Show All filter values',
  async (I, qanPage) => {
    const environmentName1 = 'ps-dev';
    const environmentName2 = 'ps-prod';
    qanPage.waitForNewQANPageLoaded();
    qanPage.applyFilterNewQAN(environmentName1);
    I.waitForInvisible(qanPage.fields.newQANSpinnerLocator, 30);
    qanPage.applyFilterNewQAN(environmentName2);
    I.waitForVisible(qanPage.fields.showSelected, 30);
    I.click(qanPage.fields.showSelected);
    await qanPage.verifyCountOfFilterLinks(2, false);
    I.click(qanPage.fields.showSelected);
    await qanPage.verifyCountOfFilterLinks(2, true);
  }
);

// TODO: Uncomment after new QAN will be merged
xScenario('PMM-T123 - Verify User is able to search for filter value', async (I, qanPage) => {
  const filters = [
    'ps-prod',
    'ps-dev-cluster',
    'pgsql-repl1',
    'local',
    'pmm-server',
    'postgresql',
    'generic',
  ];
  qanPage.waitForNewQANPageLoaded();
  I.waitForElement(qanPage.fields.filterBy, 30);
  const countBefore = await qanPage.getCountOfItems();
  for (i = 0; i < filters.length; i++) {
    await I.fillField(qanPage.fields.filterBy, filters[i]);
    qanPage.applyFilterNewQAN(filters[i]);
    I.waitForInvisible(qanPage.fields.newQANSpinnerLocator, 30);
    const countAfter = await qanPage.getCountOfItems();
    await qanPage.verifyChangedCount(countBefore, countAfter);
    qanPage.applyFilterNewQAN(filters[i]);
    I.waitForInvisible(qanPage.fields.newQANSpinnerLocator, 30);
    await I.clearField(qanPage.fields.filterBy);
  }
});

// TODO: Uncomment after new QAN will be merged
xScenario('PMM-T100 Check Changing Main Metric, PMM-T203 Verify user is able to search for columns by typing, PMM-T133, PMM-T132', async (I, qanPage, dashboardPage) => {
    const metricName = 'Query Count with errors';
    const urlString = 'num_queries_with_errors';
    I.waitForElement(qanPage.fields.newQANAddColumn, 30);
    I.waitForElement(qanPage.tableHeaderColumnLocator("Load"), 30);
    I.click(qanPage.tableHeaderColumnLocator("Load"));
    I.waitForElement(qanPage.fields.newQANMetricDropDown, 30);
    I.fillField(qanPage.fields.newQANColumnSearchField, metricName);
    I.click(dashboardPage.fields.metricTitle);
    I.waitForElement(qanPage.tableHeaderColumnLocator(metricName), 30);
    I.seeElement(qanPage.tableHeaderColumnLocator(metricName));
    I.dontSeeElement(qanPage.tableHeaderColumnLocator('Load'));
    I.seeInCurrentUrl(urlString);
    const url = await I.grabCurrentUrl();
    I.amOnPage(url);
    I.waitForElement(qanPage.fields.newQANAddColumn, 30);
    I.waitForElement(qanPage.tableHeaderColumnLocator(metricName), 30);
    I.dontSeeElement(qanPage.tableHeaderColumnLocator("Load"));
});

// TODO: Uncomment after new QAN will be merged
xScenario('PMM-T99 Verify User is able to add new metric, PMM-T222 Verify `Add column` dropdown works', async (I, qanPage, dashboardPage) => {
    const metricName = 'Query Count with errors';
    const urlString = 'num_queries_with_errors';
    I.waitForElement(qanPage.fields.newQANAddColumn, 30);
    I.waitForElement(qanPage.tableHeaderColumnLocator("Load"), 30);
    I.click(qanPage.fields.newQANAddColumn);
    I.waitForElement(qanPage.fields.newQANMetricDropDown, 30);
    I.fillField(qanPage.fields.newQANColumnSearchField, metricName);
    I.click(dashboardPage.fields.metricTitle);
    I.waitForElement(qanPage.tableHeaderColumnLocator(metricName), 30);
    I.seeElement(qanPage.tableHeaderColumnLocator(metricName));
    I.seeElement(qanPage.tableHeaderColumnLocator('Load'));
    I.seeInCurrentUrl(urlString);
    const url = await I.grabCurrentUrl();
    I.amOnPage(url);
    I.waitForElement(qanPage.fields.newQANAddColumn, 30);
    I.waitForElement(qanPage.tableHeaderColumnLocator(metricName), 30);
    I.seeElement(qanPage.tableHeaderColumnLocator("Load"));
    I.seeElement(qanPage.tableHeaderColumnLocator(metricName));
});

// TODO: Uncomment after new QAN will be merged
xScenario('PMM-T13 - Verify QAN has MongoDB, MySQL, PostgreSQl all three Service Types', async (I, qanPage) => {
    const filters = ['mongodb', 'mysql', 'postgres'];
    qanPage.waitForNewQANPageLoaded();
    I.waitForElement(qanPage.fields.filterBy, 30);
    const countBefore = await qanPage.getCountOfItems();
    for (i = 0; i < filters.length; i++) {
        await I.fillField(qanPage.fields.filterBy, filters[i]);
        qanPage.applyFilterNewQAN(filters[i]);
        I.waitForInvisible(qanPage.fields.newQANSpinnerLocator, 30);
        const countAfter = await qanPage.getCountOfItems();
        await qanPage.verifyChangedCount(countBefore, countAfter);
        qanPage.applyFilterNewQAN(filters[i]);
        I.waitForInvisible(qanPage.fields.newQANSpinnerLocator, 30);
        await I.clearField(qanPage.fields.filterBy);
    }
*/

Scenario('PMM-T128 - Verify pagination works correctly', async (I, qanPage) => {
  qanPage.waitForNewQANPageLoaded();
  qanPage.verifySelectedCountPerPage('10 / page');
  I.seeAttributesOnElements(qanPage.fields.previousPage, { 'aria-disabled': 'true' });
  I.click(qanPage.fields.nextPage);
  qanPage.verifyActiveItem(2);
  await qanPage.verifyCount('11-20');
  I.click(qanPage.fields.previousPage);
  qanPage.verifyActiveItem(1);
  await qanPage.verifyCount('1-10');
  I.seeAttributesOnElements(qanPage.fields.previousPage, { 'aria-disabled': 'true' });
  I.click(qanPage.fields.ellipsisButton);
  qanPage.verifyActiveItem(6);
  await qanPage.verifyCount('51-60');
  I.click(qanPage.fields.ellipsisButton);
  qanPage.verifyActiveItem(1);
  await qanPage.verifyCount('1-10');
  qanPage.selectPage(3);
  qanPage.verifyActiveItem(3);
  await qanPage.verifyCount('21-30');
  qanPage.selectPagination('50 / page');
  I.waitForInvisible(qanPage.fields.newQANSpinnerLocator, 30);
  await qanPage.verifyRowCount(51);
  qanPage.selectPagination('100 / page');
  I.waitForInvisible(qanPage.fields.newQANSpinnerLocator, 30);
  await qanPage.verifyRowCount(101);
});
