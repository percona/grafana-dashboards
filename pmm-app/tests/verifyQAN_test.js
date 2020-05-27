Feature('QAN Dashboard');

Before(async (I, qanPage, adminPage) => {
  I.Authorize();

  I.amOnPage(`${qanPage.url}?from=now-5m&to=now`);
  //this two elements should be changed after new QAN
  await I.waitForElement(qanPage.fields.iframe, 60);
  await I.switchTo(qanPage.fields.iframe);
});

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

xScenario(
  'PMM-T175 - Verify user is able to apply filter that has dots in label @not-pr-pipeline',
  async (I, qanPage) => {
    const serviceName = 'ps_5.7_0.0.0.0_1';
    qanPage.waitForNewQANPageLoaded();
    let countBefore = await qanPage.getCountOfItems();
    qanPage.applyFilterNewQAN(serviceName);
    I.seeInCurrentUrl('service_name=' + serviceName);
    let countAfter = await qanPage.getCountOfItems();
    qanPage.verifyChangedCount(countBefore, countAfter);
  }
);

xScenario(
  'PMM-T172 - Verify that selecting a filter updates the table data and URL  @not-pr-pipeline',
  async (I, qanPage) => {
    const environmentName = 'ps-dev';
    qanPage.waitForNewQANPageLoaded();
    let countBefore = await qanPage.getCountOfItems();
    qanPage.applyFilterNewQAN(environmentName);
    I.seeInCurrentUrl('environment=' + environmentName);
    countAfter = await qanPage.getCountOfItems();
    qanPage.verifyChangedCount(countBefore, countAfter);
  }
);

xScenario('PMM-T126 - Verify user is able to Reset All filters @not-pr-pipeline', async (I, qanPage) => {
  const service_name = 'ps_5.7_0.0.0.0_1';
  const environmentName = 'ps-dev';
  qanPage.waitForNewQANPageLoaded();
  let countBefore = await qanPage.getCountOfItems();
  qanPage.applyFilterNewQAN(service_name);
  qanPage.applyFilterNewQAN(environmentName);
  let countAfter = await qanPage.getCountOfItems();
  await qanPage.verifyChangedCount(countBefore, countAfter);
  I.click(qanPage.fields.resetAll);
  I.waitForVisible(qanPage.fields.resetAll + ':disabled', 20);
});

xScenario(
  'PMM-T124 - Verify User is able to show all and show top 5 values for filter section @not-pr-pipeline',
  async (I, qanPage) => {
    const filterSection = 'Database';
    qanPage.waitForNewQANPageLoaded();
    await qanPage.verifyFiltersSection(filterSection, 5);
    let countToShow = await qanPage.getCountOfFilters(filterSection);
    qanPage.applyShowAllLink(filterSection);
    await qanPage.verifyFiltersSection(filterSection, countToShow);
    await qanPage.applyShowTop5Link(filterSection);
    await qanPage.verifyFiltersSection(filterSection, 5);
  }
);

xScenario(
  'PMM-T125 - Verify user is able to Show only selected filter values and Show All filter values',
  async (I, qanPage) => {
    const service_name = 'ps_5.7_0.0.0.0_1';
    const environmentName = 'ps-dev';
    qanPage.waitForNewQANPageLoaded();
    qanPage.applyFilterNewQAN(service_name);
    qanPage.applyFilterNewQAN(environmentName);
    I.waitForVisible(qanPage.fields.showSelected, 20);
    I.click(qanPage.fields.showSelected);
    await qanPage.verifyCountOfFilterLinks(2, false);
    I.click(qanPage.fields.showSelected);
    await qanPage.verifyCountOfFilterLinks(2, true);
  }
);

xScenario('PMM-T123 - Verify User is able to search for filter value', async (I, qanPage) => {
  let filters = [
    'ps-prod',
    'ps-dev-cluster',
    'pgsql-repl1',
    'local',
    'ip-10-178-2-34',
    'postgresql',
    'generic',
  ];
  qanPage.waitForNewQANPageLoaded();
  I.waitForElement(qanPage.fields.filterBy, 30);
  let countBefore = await qanPage.getCountOfItems();
  for (i = 0; i < filters.length; i++) {
    await I.fillField(qanPage.fields.filterBy, filters[i]);
    qanPage.applyFilterNewQAN(filters[i]);
    I.waitForInvisible(qanPage.fields.newQANSpinnerLocator, 30);
    let countAfter = await qanPage.getCountOfItems();
    await qanPage.verifyChangedCount(countBefore, countAfter);
    qanPage.applyFilterNewQAN(filters[i]);
    I.waitForInvisible(qanPage.fields.newQANSpinnerLocator, 30);
    await I.clearField(qanPage.fields.filterBy);
  }
});
