Feature('QAN Dashboard');

Before(async (I, qanPage, adminPage) => {
  I.Authorize();

  I.amOnPage(qanPage.url);
  await I.waitForElement(qanPage.fields.iframe, 60);
  adminPage.applyTimeRange('Last 5 minutes');
  await I.switchTo(qanPage.fields.iframe);
});

Scenario('Verify QAN Filter groups exist @not-pr-pipeline', async (I, qanPage) => {
  qanPage.waitForQANPageLoaded();
  await qanPage.changeResultsPerPage(50);
  qanPage.checkFilterGroups();
});

Scenario(
  'Verify QAN Query Details section opened when user selects Query @not-pr-pipeline',
  async (I, qanPage) => {
    qanPage.waitForQANPageLoaded();
    qanPage._selectDetails(2);
  }
);

xScenario('Verify data in Table and Query Details @not-pr-pipeline', async (I, qanPage) => {
  I.amOnPage(qanPage.url);
  await I.waitForElement(qanPage.fields.iframe, 60);
  adminPage.applyTimeRange('Last 5 minutes');
  await I.switchTo(qanPage.fields.iframe); // switch to first iframe
  I.wait(10);
  qanPage.applyFilter('ps');
  await qanPage.verifyDataSet(1);
  await qanPage.verifyDataSet(2);
  await qanPage.clearFilters();
});

Scenario('Verify QAN pagination @not-pr-pipeline', async (I, qanPage) => {
  qanPage.waitForQANPageLoaded();
  qanPage.checkPagination();
  await qanPage.checkSparkLines();
  qanPage.checkTableHeaders();
});

xScenario(
  'Verify Tables tab in Query Details for Database=postgres filter @not-pr-pipeline',
  async (I, qanPage) => {
    const filterToApply = 'postgres';
    qanPage.waitForQANPageLoaded();
    qanPage.applyFilter(filterToApply);
    qanPage._selectDetails(2);
    qanPage.selectSectionInDetails(qanPage.fields.tablesTabInDetails);
    await qanPage.verifyDetailsSectionDataExists(qanPage.tabs.tablesTab);
  }
);

Scenario(
  'Verify Tables tab in Query Details for Environment=pgsql-dev filter @not-pr-pipeline',
  async (I, qanPage) => {
    const filterToApply = 'pgsql-dev';
    qanPage.waitForQANPageLoaded();
    qanPage.applyFilter(filterToApply);
    qanPage._selectDetails(2);
    qanPage.selectSectionInDetails(qanPage.fields.tablesTabInDetails);
    await qanPage.verifyDetailsSectionDataExists(qanPage.tabs.tablesTab);
  }
);

xScenario(
  'Verify Explain tab in Query Details for Database=postgres filter @not-pr-pipeline',
  async (I, qanPage) => {
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
  async (I, qanPage) => {
    const filterToApply = 'pgsql-dev';
    qanPage.waitForQANPageLoaded();
    qanPage.applyFilter(filterToApply);
    qanPage._selectDetails(2);
    qanPage.selectSectionInDetails(qanPage.fields.explainTabInDetails);
    await qanPage.verifyDetailsSectionDataExists(qanPage.tabs.explainTab);
  }
);

Scenario('Verify adding new Column reflects in URL @not-pr-pipeline', async (I, adminPage, qanPage) => {
  const columnName = 'Query Count with errors';
  qanPage.waitForQANPageLoaded();
  qanPage.addColumnToQAN(columnName);
  qanPage.verifyURLContains(qanPage.urlParts.queryCountWithoutErrors);
});

Scenario(
  'Verify adding new Database Filter reflects in URL @not-pr-pipeline',
  async (I, qanPage) => {
    const filterToApply = 'local';
    qanPage.waitForQANPageLoaded();
    I.wait(2);
    qanPage.applyFilter(filterToApply);
    qanPage.verifyURLContains(qanPage.urlParts.pmmManaged);
  }
);

Scenario('Verify Main Metric change reflects in URL @not-pr-pipeline', async (I, qanPage) => {
  const metricToReplace = 'Load';
  const newMetricName = 'Lock Time';
  qanPage.waitForQANPageLoaded();
  qanPage.changeMetricTo(metricToReplace, newMetricName);
  qanPage.verifyURLContains(qanPage.urlParts.lockTime);
});
