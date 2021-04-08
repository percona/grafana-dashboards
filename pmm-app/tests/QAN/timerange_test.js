Feature('QAN timerange');

Before(async ({ I, qanPage, qanOverview }) => {
  await I.Authorize();
  I.amOnPage(qanPage.url);
  qanOverview.waitForOverviewLoaded();
});

Scenario(
  'Open the QAN Dashboard and check that changing the time range resets current page to the first. @qan @not-pr-pipeline',
  async ({ adminPage, qanPagination, qanOverview }) => {
    qanPagination.selectPage(2);
    adminPage.applyTimeRange('Last 3 hours');
    qanOverview.waitForOverviewLoaded();
    await qanPagination.verifyActivePage(1);
  },
);

Scenario(
  'Open the QAN Dashboard and check that changing the time range updates the overview table and URL. @not-pr-pipeline @qan',
  async ({ I, adminPage, qanOverview }) => {
    const TIME_RANGE_QUERY_PARAMS_BEFORE = 'from=now-5m&to=now';
    const TIME_RANGE_QUERY_PARAMS_AFTER = 'from=now-3h&to=now';

    I.seeInCurrentUrl(TIME_RANGE_QUERY_PARAMS_BEFORE);
    adminPage.applyTimeRange('Last 3 hours');
    qanOverview.waitForOverviewLoaded();
    I.seeInCurrentUrl(TIME_RANGE_QUERY_PARAMS_AFTER);
  },
);

Scenario(
  'Open the QAN Dashboard and check that changing the time range doesn"t clear "Group by". @not-pr-pipeline @qan',
  async ({ adminPage, qanOverview }) => {
    await qanOverview.changeGroupBy('Client Host');
    adminPage.applyTimeRange('Last 24 hours');
    qanOverview.verifyGroupByIs('Client Host');
  },
);

Scenario(
  'Open the QAN Dashboard and check that changing the time range doesn\'t reset sorting. @not-pr-pipeline @qan',
  async ({ adminPage, qanOverview }) => {
    await qanOverview.changeSorting(1);
    adminPage.applyTimeRange('Last 24 hours');
    qanOverview.verifySorting(1, 'desc');
  },
);
