Feature('Test QAN filters');

Before((I, qanPage) => {
  I.Authorize();
  I.amOnPage(qanPage.url);
});

Scenario('Open the QAN Dashboard and check existence of filters @new-qan', async (I, qanPage) => {
  await qanPage.verifyFiltersSectionIsPresent();
});

Scenario('Open the QAN Dashboard and check work of button "reset all" @new-qan', async (I, qanPage) => {
  qanPage.selectFilter(qanPage.fields.filterCheckboxSelector);
  qanPage.resetAllFilters();
  I.dontSeeCheckboxIsChecked(qanPage.fields.filterCheckboxSelector);
});

xScenario(
  'Open the QAN Dashboard switch between show all/selected correct',
  async (I, adminPage, qanPage) => {}
);

xScenario('Open the QAN Dashboard filters search works correct', async (I, adminPage, qanPage) => {
  // TODO: check changes in url
});
