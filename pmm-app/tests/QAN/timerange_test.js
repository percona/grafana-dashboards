Feature('Test QAN timerange changes');

Before((I, qanPage) => {
  I.Authorize();
  I.amOnPage(qanPage.url);
});

Scenario(
  'Open the QAN Dashboard and check that changing the time range clears the selected row. @new-qan',
  async (I, qanPage, adminPage) => {
    I.waitForElement(qanPage.elements.tableRowSelector, 30);
    I.forceClick(qanPage.elements.tableRowSelector);
    adminPage.applyTimeRange('Last 3 hours');
    I.dontSeeElement(qanPage.elements.selectedOverviewRow);
    I.dontSeeElement(qanPage.elements.detailsSection);
  }
);

Scenario(
  'Open the QAN Dashboard and check that changing the time range resets current page to the first. @new-qan',
  async (I, qanPage, adminPage) => {
    qanPage.paginationGoTo(2);
    adminPage.applyTimeRange('Last 3 hours');
    qanPage.waitForResponsePath(qanPage.requests.getReportPath);
    await qanPage.verifySelectedPageIs(1);
  }
);

Scenario(
  'Open the QAN Dashboard and check that changing the time range updates the overview table and URL. @new-qan',
  async (I, qanPage, adminPage) => {
    const TIME_RANGE_QUERY_PARAMS_BEFORE = 'from=now-12h&to=now';
    const TIME_RANGE_QUERY_PARAMS_AFTER = 'from=now-3h&to=now';

    I.amOnPage(`${qanPage.url}?${TIME_RANGE_QUERY_PARAMS_BEFORE}`);
    qanPage.waitForQANPageLoaded();
    I.seeInCurrentUrl(TIME_RANGE_QUERY_PARAMS_BEFORE);
    adminPage.applyTimeRange('Last 3 hours');
    qanPage.waitForResponsePath(qanPage.requests.getReportPath);
    qanPage.waitForQANPageLoaded();
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
