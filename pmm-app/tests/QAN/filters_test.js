Feature('Test QAN filters');

Before((I, qanPage) => {
  I.Authorize();
  I.amOnPage(qanPage.url);
});

Scenario('Open the QAN Dashboard and check existence of filters @new-qan', async (I, qanPage) => {
  await qanPage.verifyFiltersSectionIsPresent();
});

xScenario(
  'Open the QAN Dashboard switch between show all/selected correct',
  async (I, adminPage, qanPage) => {}
);

xScenario(
  'T-123 Verify User is able to search for filter value @new-qan ',
  async (I, adminPage, qanPage) => {}
);
xScenario(
  'T-124 Verify User is able to show all and show top 5 values for filter section @new-qan ',
  async (I, adminPage, qanPage) => {}
);
xScenario(
  'T-125 Verify user is able to Show only selected filter values and Show All filter values @new-qan ',
  async (I, adminPage, qanPage) => {}
);
Scenario('T-126 Open the QAN Dashboard and check work of button "reset all" @new-qan', async (I, qanPage) => {
  qanPage.selectFilter(qanPage.fields.filterCheckboxSelector);
  qanPage.resetAllFilters();
  I.dontSeeCheckboxIsChecked(qanPage.fields.filterCheckboxSelector);
});
xScenario(
  'T-172 Verify that selecting a filter updates the table data and URL @new-qan ',
  async (I, adminPage, qanPage) => {}
);
xScenario(
  "T-175 Verify user is able to apply filter that has dots ('.') in label @new-qan ",
  async (I, adminPage, qanPage) => {}
);
xScenario('T-190 Verify user is able to see n/a filter @new-qan ', async (I, adminPage, qanPage) => {});
xScenario(
  'T-191 Verify Reset all points the user to the default filters view @new-qan ',
  async (I, adminPage, qanPage) => {}
);
xScenario(
  'T-192 Verify `show selected` and `reset all` disabled if nothing was selected @new-qan ',
  async (I, adminPage, qanPage) => {}
);
xScenario('T-211 Verify filters headers style @visual @new-qan ', async (I, adminPage, qanPage) => {});
xScenario('T-217 Verify filter by Service Name works @new-qan ', async (I, adminPage, qanPage) => {});
xScenario(
  'T-221 Verify that all filter options are always visible (but some disabled) after selecting an item and % value is changed @new-qan ',
  async (I, adminPage, qanPage) => {}
);
