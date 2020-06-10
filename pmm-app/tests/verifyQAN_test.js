
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
xScenario(
  'PMM-T100 Check Changing Main Metric, PMM-T203 Verify user is able to search for columns by typing, PMM-T133, PMM-T132',
  async (I, qanPage, dashboardPage) => {
    const metricName = 'Query Count with errors';
    const urlString = 'num_queries_with_errors';
    I.waitForElement(qanPage.fields.newQANAddColumn, 30);
    I.waitForElement(qanPage.tableHeaderColumnLocator('Load'), 30);
    I.click(qanPage.tableHeaderColumnLocator('Load'));
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
    I.dontSeeElement(qanPage.tableHeaderColumnLocator('Load'));
  }
);

// TODO: Uncomment after new QAN will be merged
xScenario(
  'PMM-T99 Verify User is able to add new metric, PMM-T222 Verify `Add column` dropdown works',
  async (I, qanPage, dashboardPage) => {
    const metricName = 'Query Count with errors';
    const urlString = 'num_queries_with_errors';
    I.waitForElement(qanPage.fields.newQANAddColumn, 30);
    I.waitForElement(qanPage.tableHeaderColumnLocator('Load'), 30);
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
    I.seeElement(qanPage.tableHeaderColumnLocator('Load'));
    I.seeElement(qanPage.tableHeaderColumnLocator(metricName));
  }
);

// TODO: Uncomment after new QAN will be merged
xScenario(
  'PMM-T13 - Verify QAN has MongoDB, MySQL, PostgreSQl all three Service Types',
  async (I, qanPage) => {
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
  }
);

// TODO: Uncomment after new QAN will be merged
xScenario('PMM-T128 - Verify pagination works correctly', async (I, qanPage) => {
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
});

// TODO: Uncomment after new QAN will be merged
xScenario(
  'PMM-T193 - Verify user is able to change per page elements display and pagination is updated according to this value, PMM-T256 - Verify that switching view from 10 to 50/100 pages works correctly',
  async (I, qanPage) => {
    qanPage.waitForNewQANPageLoaded();
    await qanPage.verifyRowCount(11);
    await qanPage.verifyCount('1-10');
    await qanPage.verifyPagesAndCount(10);
    qanPage.selectPagination('50 / page');
    I.waitForInvisible(qanPage.fields.newQANSpinnerLocator, 30);
    await qanPage.verifyRowCount(51);
    await qanPage.verifyPagesAndCount(50);
    await qanPage.verifyCount('1-50');
    qanPage.selectPagination('100 / page');
    I.waitForInvisible(qanPage.fields.newQANSpinnerLocator, 30);
    await qanPage.verifyRowCount(101);
    await qanPage.verifyPagesAndCount(100);
    await qanPage.verifyCount('1-100');
    qanPage.selectPagination('10 / page');
    await qanPage.verifyRowCount(11);
    await qanPage.verifyCount('1-10');
    await qanPage.verifyPagesAndCount(10);
  }
);
