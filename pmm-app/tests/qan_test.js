Feature('To verify and test the QAN Dashboard');

Before((I, loginPage, qanPage) => {
  I.amOnPage(loginPage.url);
  loginPage.login('admin', 'admin');
});

xScenario('Open the QAN Dashboard and change groupBy', async (I, adminPage, qanPage) => {
  I.amOnPage(qanPage.url);
  qanPage.changeGroupBy('Database');
  qanPage.groupByIs('Database');
  // TODO: check changes in url
});

xScenario('Open the QAN Dashboard and verify Filter and Table exist', async (I, adminPage, qanPage) => {
  I.wait(5);
  I.see('Queries overview');
});

Feature('To verify and test the QAN Dashboard Group by');

Feature('To verify and test the QAN Dashboard columns');
Before((I, loginPage, qanPage) => {
  I.amOnPage(loginPage.url);
  loginPage.login('admin', 'admin');
});
xScenario('Open the QAN Dashboard and add column', async (I, adminPage, qanPage) => {
  I.amOnPage(qanPage.url);
  // TODO: check if there is no duplicates in columns selects
  qanPage.addColumn('Bytes Sent');
  // TODO: check changes in url
});

xScenario('Open the QAN Dashboard and remove column', async (I, adminPage, qanPage) => {
  I.amOnPage(qanPage.url);
  qanPage.removeColumn('Load');
  // TODO: check if there is no duplicates in columns selects
  // TODO: check changes in url
});

xScenario('Open the QAN Dashboard and change column', async (I, adminPage, qanPage) => {
  I.amOnPage(qanPage.url);
  qanPage.changeColumn('Load', 'Tmp Tables');
  // TODO: check if there is no duplicates in columns selects
  // TODO: check changes in url
});

Feature('To verify and test the QAN Dashboard pagination');
Before((I, loginPage, qanPage) => {
  I.amOnPage(loginPage.url);
  loginPage.login('admin', 'admin');
});
xScenario('Open the QAN Dashboard and change page', async (I, adminPage, qanPage) => {
  I.amOnPage(qanPage.url);
  qanPage.paginationGoNext();
  // qanPage.paginationGoPrevious();
  // TODO: check changes in url
});

xScenario('Open the QAN Dashboard if total number > page size next page is enable', async (I, adminPage, qanPage) => {
  // TODO: check changes in url
});

xScenario('Open the QAN Dashboard check if last page number is incorrect', async (I, adminPage, qanPage) => {
  // TODO: check changes in url
});

Feature('To verify and test the QAN Dashboard filters');

Before((I, loginPage, qanPage) => {
  I.amOnPage(loginPage.url);
  loginPage.login('admin', 'admin');
});
xScenario('Open the QAN Dashboard and select one filter from each group', async (I, adminPage, qanPage) => {
  I.amOnPage(qanPage.url);
  // getGroupsList, for each group select first element
  qanPage.getSelectedFilters();
  // TODO: check changes in url
});

xScenario('Open the QAN Dashboard switch between show all/selected correct', async (I, adminPage, qanPage) => {
  // select some random filters, get list of this filters, switch to "show selected", see that you can see only selected,
  // TODO: check changes in url
});

xScenario('Open the QAN Dashboard reset filters work correct', async (I, adminPage, qanPage) => {
  // select some random filters, push "reset filters button", make sure that there is no selected filters
  // TODO: check changes in url
});
xScenario('Open the QAN Dashboard filters search works correct', async (I, adminPage, qanPage) => {
  I.amOnPage(qanPage.url);
  qanPage.searchFilters('postg');
  qanPage.checkFiltersMatchSearch('postg');
  // TODO: check changes in url
});

Feature('To verify and test the QAN Dashboard details');

Before((I, loginPage, qanPage) => {
  I.amOnPage(loginPage.url);
  loginPage.login('admin', 'admin');
});

xScenario('Open the QAN Dashboard and select row', async (I, adminPage, qanPage) => {
  I.amOnPage(qanPage.url);
  qanPage.selectTableRow(4);
  I.wait(5);
  I.see('Query');
  // TODO: check changes in url
});

xScenario('Open the QAN Dashboard and check Details -> Metrics', async (I, adminPage, qanPage) => {
  I.amOnPage(qanPage.url);
  qanPage.selectTableRow(4);
  I.wait(5);
  I.see('dasdadasd');
  // TODO: check changes in url
});

xScenario('Open the QAN Dashboard and check Details -> Examples', async (I, adminPage, qanPage) => {
  I.amOnPage(qanPage.url);
  qanPage.selectTableRow(4);
  I.wait(5);
  qanPage.selectDetailsTab('Examples');
  I.see('dasdadasd');

  // TODO: check changes in url
});

xScenario('Open the QAN Dashboard and check Details -> Explain', async (I, adminPage, qanPage) => {
  I.amOnPage(qanPage.url);
  qanPage.selectTableRow(4);
  I.wait(5);
  qanPage.selectDetailsTab('Explain');
  I.see('dasdadasd');

  // TODO: check changes in url
});

xScenario('Open the QAN Dashboard and check Details -> Tables', async (I, adminPage, qanPage) => {
  I.amOnPage(qanPage.url);
  qanPage.selectTableRow(4);
  I.wait(5);
  qanPage.selectDetailsTab('Tables');
  I.see('test');
  // TODO: check changes in url
});

Feature('To verify and test the QAN Dashboard query details tooltip');

Before((I, loginPage) => {
  I.amOnPage(loginPage.url);
  loginPage.login('admin', 'admin');
});

xScenario('Open the QAN Dashboard and show tooltip', async (I, adminPage, qanPage) => {
  I.amOnPage(qanPage.url);
  qanPage.showTooltip(4, 1);
  I.wait(5);
  I.see('dasdadadad');
  // TODO: check changes in url
});
