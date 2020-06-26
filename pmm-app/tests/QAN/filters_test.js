Feature('Test QAN filters');

Before((I, qanPage) => {
  I.Authorize();
  I.amOnPage(qanPage.url);
});

Scenario(
  'PMM-T175 - Verify user is able to apply filter that has dots in label @not-pr-pipeline',
  async (I, qanPage) => {
    const serviceName = 'ps_5.7';

    qanPage.waitForNewQANPageLoaded();
    const countBefore = await qanPage.getCountOfItems();

    qanPage.applyFilterNewQAN(serviceName);
    I.seeInCurrentUrl(`service_name=${serviceName}`);
    const countAfter = await qanPage.getCountOfItems();

    qanPage.verifyChangedCount(countBefore, countAfter);
  }
);

Scenario(
  'PMM-T172 - Verify that selecting a filter updates the table data and URL  @not-pr-pipeline',
  async (I, qanPage) => {
    const environmentName = 'ps-dev';

    qanPage.waitForNewQANPageLoaded();
    const countBefore = await qanPage.getCountOfItems();

    qanPage.applyFilterNewQAN(environmentName);
    I.seeInCurrentUrl(`environment=${environmentName}`);
    const countAfter = await qanPage.getCountOfItems();

    qanPage.verifyChangedCount(countBefore, countAfter);
  }
);

Scenario('PMM-T126 - Verify user is able to Reset All filters @not-pr-pipeline', async (I, qanPage) => {
  const environmentName1 = 'ps-dev';
  const environmentName2 = 'pgsql-dev';

  qanPage.waitForNewQANPageLoaded();
  const countBefore = await qanPage.getCountOfItems();

  qanPage.applyFilterNewQAN(environmentName1);
  qanPage.applyFilterNewQAN(environmentName2);
  const countAfter = await qanPage.getCountOfItems();

  await qanPage.verifyChangedCount(countBefore, countAfter);
  I.click(qanPage.fields.resetAll);
  I.waitForVisible(qanPage.fields.disabledResetAll, 30);
  const countAfterReset = await qanPage.getCountOfItems();

  assert.equal(countAfterReset >= countBefore, true, 'Count Should be Same or greater then');
});

Scenario(
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

Scenario(
  'PMM-T125 - Verify user is able to Show only selected filter values and Show All filter values @not-pr-pipeline',
  async (I, qanPage) => {
    const environmentName1 = 'ps-dev';
    const environmentName2 = 'pgsql-dev';

    qanPage.waitForNewQANPageLoaded();
    qanPage.applyFilterNewQAN(environmentName1);
    qanPage.applyFilterNewQAN(environmentName2);
    I.waitForVisible(qanPage.fields.showSelected, 30);
    I.click(qanPage.fields.showSelected);
    await qanPage.verifyCountOfFilterLinks(2, false);
    I.click(qanPage.fields.showSelected);
    await qanPage.verifyCountOfFilterLinks(2, true);
  }
);

Scenario('PMM-T123 - Verify User is able to search for filter value @not-pr-pipeline', async (I, qanPage) => {
  const filters = [
    'ps-dev',
    'ps-dev-cluster',
    'pgsql-repl1',
    'postgres',
    'local',
    'mysql',
    'pmm-server',
    'postgresql',
    'pmm-server-postgresql',
    'generic',
  ];

  qanPage.waitForNewQANPageLoaded();
  I.waitForElement(qanPage.fields.filterBy, 30);
  const countBefore = await qanPage.getCountOfItems();

  for (i = 0; i < filters.length; i++) {
    qanPage.applyFilterNewQAN(filters[i]);
    const countAfter = await qanPage.getCountOfItems();

    await qanPage.verifyChangedCount(countBefore, countAfter);
    qanPage.applyFilterNewQAN(filters[i]);
  }
});

Scenario('Check All Filter Groups Exists in the Filter Section @not-pr-pipeline', async (I, qanPage) => {
  qanPage.waitForNewQANPageLoaded();
  for (i = 0; i < qanPage.filterGroups.length; i++) {
    I.fillField(qanPage.fields.filterBy, qanPage.filterGroups[i]);
    I.waitForVisible(qanPage.filterSectionLocator(qanPage.filterGroups[i]), 30);
    I.seeElement(qanPage.filterSectionLocator(qanPage.filterGroups[i]));
    I.clearField(qanPage.fields.filterBy);
  }
});
