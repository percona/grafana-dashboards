Feature('QAN common');

Before(async (I, qanPage) => {
  await I.Authorize();
  I.amOnPage(qanPage.url);
});

Scenario(
  'PMM-T122 - Verify QAN UI Elements are displayed @not-pr-pipeline @qan',
  async (I, qanPage, qanActions) => {
    qanActions.waitForNewQANPageLoaded();
    qanActions.applyFilterNewQAN('mysql');
    I.waitForVisible(qanPage.fields.filterBy, 30);
    I.waitForVisible(qanPage.fields.addColumnNewQAN, 30);
    await qanActions.verifyRowCount(27);
    await qanActions.verifyPagesAndCount(25);
    I.waitForVisible(qanPage.fields.environmentLabel, 30);
    I.click(qanPage.fields.querySelector);
    I.waitForVisible(qanPage.getColumn('Lock Time'), 30);
  },
);

