Feature('Test QAN timerange changes');

Before((I, qanPage) => {
  I.Authorize();
  I.amOnPage(qanPage.url);
});

Scenario(
  'Open the QAN Dashboard and check that changing the time range resets current page to the first. @new-qan',
  async (I, qanPage, adminPage) => {
    qanPage.waitForNewQANPageLoaded();
    qanPage.paginationGoTo(2);
    qanPage.waitForNewQANPageLoaded();
    await qanPage.verifySelectedPageIs(2);
  }
);

Scenario(
  'Open the QAN Dashboard and check that changing the time range updates the overview table and URL. @new-qan',
  async (I, qanPage, adminPage) => {
    const TIME_RANGE_QUERY_PARAMS_BEFORE = 'from=now-5m&to=now';
    const TIME_RANGE_QUERY_PARAMS_AFTER = 'from=now-3h&to=now';
    qanPage.waitForNewQANPageLoaded();
    I.seeInCurrentUrl(TIME_RANGE_QUERY_PARAMS_BEFORE);
    adminPage.applyTimeRange('Last 3 hours');
    qanPage.waitForResponsePath(qanPage.requests.getReportPath);
    qanPage.waitForNewQANPageLoaded();
    I.seeInCurrentUrl(TIME_RANGE_QUERY_PARAMS_AFTER);
  }
);

Scenario(
  'Open the QAN Dashboard and check that changing the time range doesn\'t clear "Group by". @new-qan',
  async (I, qanPage, adminPage) => {
    qanPage.changeGroupBy('Client Host');
    adminPage.applyTimeRange('Last 24 hours');
    qanPage.verifyGroupByIs('Client Host');
  }
);

Scenario(
  "Open the QAN Dashboard and check that changing the time range doesn't reset sorting. @new-qan",
  async (I, qanPage, adminPage) => {
    qanPage.changeSorting(3, 'up');
    adminPage.applyTimeRange('Last 24 hours');
    qanPage.verifySortingIs(3, 'up');
  }
);
