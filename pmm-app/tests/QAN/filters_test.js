Feature('Test QAN filters');
const assert = require('assert');

Before((I, qanPage) => {
  I.Authorize();
  I.amOnPage(qanPage.url);
});

Scenario(
  'PMM-T175 - Verify user is able to apply filter that has dots in label @not-pr-pipeline @qan',
  async (I, qanActions) => {
    const serviceName = 'ps_5.7';

    qanActions.waitForNewQANPageLoaded();
    const countBefore = await qanActions.getCountOfItems();

    qanActions.applyFilterNewQAN(serviceName);
    I.seeInCurrentUrl(`service_name=${serviceName}`);
    const countAfter = await qanActions.getCountOfItems();

    qanActions.verifyChangedCount(countBefore, countAfter);
  },
);

Scenario(
  'PMM-T172 - Verify that selecting a filter updates the table data and URL  @not-pr-pipeline @qan',
  async (I, qanPage, qanActions) => {
    const environmentName = 'ps-dev';

    qanActions.waitForNewQANPageLoaded();
    const countBefore = await qanActions.getCountOfItems();

    qanActions.applyFilterNewQAN(environmentName);
    I.seeInCurrentUrl(`environment=${environmentName}`);
    const countAfter = await qanActions.getCountOfItems();

    qanActions.verifyChangedCount(countBefore, countAfter);
  },
);

Scenario(
  'PMM-T126 - Verify user is able to Reset All filters @not-pr-pipeline @qan',
  async (I, qanPage, qanActions) => {
    const environmentName1 = 'ps-dev';
    const environmentName2 = 'pgsql-dev';

    qanActions.waitForNewQANPageLoaded();
    const countBefore = await qanActions.getCountOfItems();

    qanActions.applyFilterNewQAN(environmentName1);
    qanActions.applyFilterNewQAN(environmentName2);
    const countAfter = await qanActions.getCountOfItems();

    await qanActions.verifyChangedCount(countBefore, countAfter);
    I.click(qanPage.elements.resetAllButton);
    I.waitForVisible(qanPage.fields.disabledResetAll, 30);
    const countAfterReset = await qanActions.getCountOfItems();

    assert.equal(countAfterReset >= countBefore, true, 'Count Should be Same or greater then');
  },
);

Scenario(
  'PMM-T124 - Verify User is able to show all and show top 5 values for filter section @not-pr-pipeline @qan',
  async (qanActions) => {
    const filterSection = 'Database';

    qanActions.waitForNewQANPageLoaded();
    await qanActions.verifyFiltersSection(filterSection, 5);
    const countToShow = await qanActions.getCountOfFilters(filterSection);

    qanActions.applyShowAllLink(filterSection);
    await qanActions.verifyFiltersSection(filterSection, countToShow);
    await qanActions.applyShowTop5Link(filterSection);
    await qanActions.verifyFiltersSection(filterSection, 5);
  },
);

Scenario(
  'PMM-T125 - Verify user is able to Show only selected filter values and Show All filter values @not-pr-pipeline @qan',
  async (I, qanPage, qanActions) => {
    const environmentName1 = 'ps-dev';
    const environmentName2 = 'pgsql-dev';

    qanActions.waitForNewQANPageLoaded();
    qanActions.applyFilterNewQAN(environmentName1);
    qanActions.applyFilterNewQAN(environmentName2);
    I.waitForVisible(qanPage.fields.showSelected, 30);
    I.click(qanPage.fields.showSelected);
    await qanActions.verifyCountOfFilterLinks(2, false);
    I.click(qanPage.fields.showSelected);
    await qanActions.verifyCountOfFilterLinks(2, true);
  },
);

Scenario(
  'PMM-T123 - Verify User is able to search for DB types @not-pr-pipeline @qan',
  async (I, qanPage, qanActions) => {
    const filters = ['postgres', 'mysql', 'pmm-server', 'postgresql', 'mongodb'];

    qanActions.waitForNewQANPageLoaded();
    I.waitForElement(qanPage.fields.filterBy, 30);
    const countBefore = await qanActions.getCountOfItems();

    for (let i = 0; i < filters.length; i++) {
      qanActions.applyFilterNewQAN(filters[i]);
      const countAfter = await qanActions.getCountOfItems();

      await qanActions.verifyChangedCount(countBefore, countAfter);
      qanActions.applyFilterNewQAN(filters[i]);
    }
  },
);

Scenario(
  'PMM-T123 - Verify User is able to search Env & Cluster @not-pr-pipeline @qan',
  async (I, qanPage, qanActions) => {
    const filters = ['ps-dev', 'ps-dev-cluster', 'pgsql-repl1'];

    qanActions.waitForNewQANPageLoaded();
    I.waitForElement(qanPage.fields.filterBy, 30);
    const countBefore = await qanActions.getCountOfItems();

    for (let i = 0; i < filters.length; i++) {
      qanActions.applyFilterNewQAN(filters[i]);
      const countAfter = await qanActions.getCountOfItems();

      await qanActions.verifyChangedCount(countBefore, countAfter);
      qanActions.applyFilterNewQAN(filters[i]);
    }
  },
);

Scenario(
  'Check All Filter Groups Exists in the Filter Section @not-pr-pipeline @qan',
  async (I, qanPage, qanActions) => {
    qanActions.waitForNewQANPageLoaded();
    for (let i = 0; i < qanPage.filterGroups.length; i++) {
      I.fillField(qanPage.fields.filterBy, qanPage.filterGroups[i]);
      I.waitForVisible(qanPage.filterSectionLocator(qanPage.filterGroups[i]), 30);
      I.seeElement(qanPage.filterSectionLocator(qanPage.filterGroups[i]));
      I.clearField(qanPage.fields.filterBy);
    }
  },
);

Scenario(
  'PMM-T128 - Verify pagination works correctly @not-pr-pipeline @qan',
  async (I, qanPage, qanActions) => {
    qanActions.waitForNewQANPageLoaded();
    qanActions.verifySelectedCountPerPage('25 / page');
    const countOfItems = await qanActions.getCountOfItems();

    if (countOfItems <= 50) {
      I.seeAttributesOnElements(qanPage.fields.previousPage, { 'aria-disabled': 'true' });
      I.click(qanPage.fields.nextPage);
      qanActions.verifyActiveItem(2);
      await qanActions.verifyCount(`26-${countOfItems}`);
    } else if (countOfItems <= 100 && countOfItems > 50) {
      I.seeAttributesOnElements(qanPage.fields.previousPage, { 'aria-disabled': 'true' });
      I.click(qanPage.fields.nextPage);
      qanActions.verifyActiveItem(2);
      await qanActions.verifyCount('26-50');
      qanActions.verifyActiveItem(1);
      await qanActions.verifyCount('1-25');
    } else {
      I.seeAttributesOnElements(qanPage.fields.previousPage, { 'aria-disabled': 'true' });
      I.click(qanPage.fields.nextPage);
      qanActions.verifyActiveItem(2);
      await qanActions.verifyCount('26-50');
      I.click(qanPage.fields.previousPage);
      qanActions.verifyActiveItem(1);
      await qanActions.verifyCount('1-25');
      I.seeAttributesOnElements(qanPage.fields.previousPage, { 'aria-disabled': 'true' });
      I.click(qanPage.fields.ellipsisButton);
      qanActions.verifyActiveItem(6);
      await qanActions.verifyCount('126-150');
      I.click(qanPage.fields.ellipsisButton);
      qanActions.verifyActiveItem(1);
      await qanActions.verifyCount('1-25');
      qanActions.selectPage(3);
      qanActions.verifyActiveItem(3);
      await qanActions.verifyCount('51-75');
    }
  },
);

Scenario(
  'PMM-T193 - Verify user is able to change per page elements display and pagination is updated according to this value, PMM-T256 - Verify that switching view from 25 to 50/100 pages works correctly @not-pr-pipeline @qan',
  async (qanActions) => {
    qanActions.waitForNewQANPageLoaded();
    const countOfItems = await qanActions.getCountOfItems();

    await qanActions.verifyRowCount(27);
    if (countOfItems <= 50) {
      await qanActions.verifyCount('1-25');
      await qanActions.verifyPagesAndCount(25);
    } else if (countOfItems <= 100 && countOfItems > 50) {
      await qanActions.verifyCount('1-25');
      await qanActions.verifyPagesAndCount(25);
      await qanActions.selectPagination('50 / page');
      await qanActions.verifyRowCount(52);
      await qanActions.verifyPagesAndCount(50);
      await qanActions.verifyCount('1-50');
      await qanActions.selectPagination('100 / page');
      await qanActions.verifyCount('1-100');
    } else {
      await qanActions.verifyCount('1-25');
      await qanActions.verifyPagesAndCount(25);
      await qanActions.selectPagination('50 / page');
      await qanActions.verifyRowCount(52);
      await qanActions.verifyPagesAndCount(50);
      await qanActions.verifyCount('1-50');
      await qanActions.selectPagination('100 / page');
      await qanActions.verifyRowCount(102);
      await qanActions.verifyPagesAndCount(100);
      await qanActions.verifyCount('1-100');
      await qanActions.selectPagination('25 / page');
      await qanActions.verifyRowCount(27);
      await qanActions.verifyCount('1-25');
      await qanActions.verifyPagesAndCount(25);
    }
  },
);

Scenario(
  'PMM-T191 - Verify Reset All and Show Selected filters @not-pr-pipeline @qan',
  async (I, qanPage, qanActions) => {
    const environmentName1 = 'ps-dev';
    const environmentName2 = 'pgsql-dev';

    qanActions.waitForNewQANPageLoaded();
    qanActions.applyFilterNewQAN(environmentName1);
    qanActions.applyFilterNewQAN(environmentName2);
    I.click(qanPage.fields.showSelected);
    await qanActions.verifyCountOfFilterLinks(2, false);
    I.click(qanPage.fields.resetAllButton);
    await qanActions.verifyCountOfFilterLinks(2, true);

    qanActions.applyFilterNewQAN(environmentName1);
    I.click(qanPage.fields.showSelected);
    await qanActions.verifyCountOfFilterLinks(1, false);
    qanActions.applyFilterNewQAN(environmentName1);
    await qanActions.verifyCountOfFilterLinks(1, true);
  },
);

Scenario(
  'PMM-T190 - Verify user is able to see n/a filter @not-pr-pipeline @qan',
  async (I, qanPage, qanActions) => {
    qanActions.waitForNewQANPageLoaded();
    I.fillField(qanPage.fields.filterBy, 'n/a');
    await qanActions.verifyCountOfFilterLinks(0, true);
  },
);

Scenario(
  'PMM-T390 - Verify that we show info message when empty result is returned @not-pr-pipeline @qan',
  async (I, qanPage, qanActions) => {
    const serviceName = 'ps_5.7';
    const db1 = 'postgres';
    const db2 = 'n/a';
    const section = 'Database';

    qanActions.waitForNewQANPageLoaded();
    qanActions.applyFilterInSection(section, db1);
    qanActions.applyFilterInSection(section, db2);
    qanActions.applyFilterNewQAN(serviceName);
    qanActions.applyFilterInSection(section, db2);
    I.waitForElement(qanPage.fields.noQueries, 20);
  },
);

Scenario(
  'PMM-T221 - Verify that all filter options are always visible (but some disabled) after selecting an item and % value is changed @not-pr-pipeline @qan',
  async (I, qanPage, qanActions, pmmSettingsPage) => {
    const serviceType = 'mysql';
    const environment = 'pgsql-dev';
    const serviceName = 'ps_5.7';

    qanActions.waitForNewQANPageLoaded();
    const countOfFilters = await I.grabNumberOfVisibleElements(qanPage.fields.filterCheckboxes);
    const countBefore = await qanActions.getCountOfItems();
    const percentageBefore = await qanActions.getPercentage('Service Type', serviceType);

    qanActions.applyFilterNewQAN(serviceType);
    const countAfter = await qanActions.getCountOfItems();

    pmmSettingsPage.customClearField(qanPage.fields.filterBy);

    await qanActions.verifyChangedCount(countBefore, countAfter);
    await qanActions.verifyCountOfFilterLinks(countOfFilters, false);
    qanActions.checkDisabledFilter('Environment', environment);
    qanActions.applyFilterNewQAN(serviceName);
    pmmSettingsPage.customClearField(qanPage.fields.filterBy);
    const percentageAfter = await qanActions.getPercentage('Service Type', serviceType);

    qanActions.verifyChangedCount(percentageBefore, percentageAfter);
  },
);
