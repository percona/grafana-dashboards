Feature('Test QAN timerange changes');

Before((I, qanPage) => {
  I.Authorize();
  I.amOnPage(qanPage.url);
});

Scenario(
  'Open the QAN Dashboard and check that changing the time range resets current page to the first. @qan @not-pr-pipeline',
  async (adminPage, qanActions) => {
    qanActions.waitForNewQANPageLoaded();
    qanActions.paginationGoTo(2);
    adminPage.applyTimeRange('Last 3 hours');
    qanActions.waitForNewQANPageLoaded();
    await qanActions.verifySelectedPageIs(1);
  },
);

Scenario(
  'Open the QAN Dashboard and check that changing the time range updates the overview table and URL. @not-pr-pipeline @qan',
  async (I, adminPage, qanActions) => {
    const TIME_RANGE_QUERY_PARAMS_BEFORE = 'from=now-5m&to=now';
    const TIME_RANGE_QUERY_PARAMS_AFTER = 'from=now-3h&to=now';

    qanActions.waitForNewQANPageLoaded();
    I.seeInCurrentUrl(TIME_RANGE_QUERY_PARAMS_BEFORE);
    adminPage.applyTimeRange('Last 3 hours');
    qanActions.waitForNewQANPageLoaded();
    I.seeInCurrentUrl(TIME_RANGE_QUERY_PARAMS_AFTER);
  },
);

Scenario(
  'Open the QAN Dashboard and check that changing the time range doesn"t clear "Group by". @not-pr-pipeline @qan',
  async (adminPage, qanActions) => {
    qanActions.changeGroupBy('Client Host');
    adminPage.applyTimeRange('Last 24 hours');
    qanActions.verifyGroupByIs('Client Host');
  },
);

// Need to skip until we fix Sorting Locator and make it easy for Automation
xScenario(
  'Open the QAN Dashboard and check that changing the time range doesn\'t reset sorting. @not-pr-pipeline @qan',
  async (adminPage, qanActions) => {
    await qanActions.changeSorting(3, 'up');
    adminPage.applyTimeRange('Last 24 hours');
    qanActions.verifySortingIs(3, 'up');
  },
);
