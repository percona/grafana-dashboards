Feature('Test QAN details section');

Before((I, qanPage) => {
  I.Authorize();
  I.amOnPage(qanPage.url);
});

Scenario('Open the QAN Dashboard and select row @qan @not-pr-pipeline', async (I, adminPage, qanPage, qanActions) => {
  qanActions.selectTableRow(4);
  I.see('Query');
  I.see('Details', qanPage.fields.detailsSectionTab);
  I.see('Example', qanPage.fields.detailsSectionTab);
  I.see('Explain', qanPage.fields.detailsSectionTab);
});

Scenario(
  'PMM-T223 - Verify time metrics are AVG per query (not per second) @qan @not-pr-pipeline',
  async (I, qanPage, qanActions) => {
    qanActions.waitForNewQANPageLoaded();
    qanActions.applyFilterNewQAN('mysql');
    I.waitForElement(qanPage.fields.querySelector, 30);
    const queryTime = await I.grabTextFrom(qanPage.fields.queryTime);

    I.moveCursorTo(qanPage.fields.querySelector);
    I.click(qanPage.fields.querySelector);
    I.waitForVisible(qanPage.getColumn('Lock Time'), 30);
    await qanActions.verifyAvqQueryCount();
    await qanActions.verifyAvgQueryTime();
  }
);
