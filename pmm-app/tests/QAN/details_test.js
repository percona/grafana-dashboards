Feature('Test QAN details section');

Before((I, qanPage) => {
  I.Authorize();
  I.amOnPage(qanPage.url);
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

xScenario(
  'PMM-T144 Verify metrics tab is the only one available when total row is selected @new-qan ',
  async (I, adminPage, qanPage) => {}
);
xScenario(
  'PMM-T148 Verify details section works correct for mongodb @new-qan ',
  async (I, adminPage, qanPage) => {}
);
xScenario(
  'PMM-T149 Verify details section works correct for MySQL @new-qan ',
  async (I, adminPage, qanPage) => {}
);
xScenario(
  'PMM-T150 Verify details section works correct for PostgreSQL @new-qan ',
  async (I, adminPage, qanPage) => {}
);
xScenario(
  'PMM-T174 Verify that the data in the query time distribution graph is shown and arranged correctly @new-qan ',
  async (I, adminPage, qanPage) => {}
);
xScenario(
  'PMM-T180 Verify fingerprint in details section match fingerprint in selected row @new-qan ',
  async (I, adminPage, qanPage) => {}
);
xScenario(
  'PMM-T181 Verify user is able to resize Detail Section @new-qan ',
  async (I, adminPage, qanPage) => {}
);
xScenario(
  'PMM-T182 Verify user is able to hover on metric and see its tooltip @new-qan ',
  async (I, adminPage, qanPage) => {}
);
xScenario(
  'PMM-T185 Verify user is able to see colored Query Example in Details tab for all supported DBs @new-qan ',
  async (I, adminPage, qanPage) => {}
);
xScenario(
  'PMM-T186 Verify Query values in Overview table and in Detail section are the same @new-qan ',
  async (I, adminPage, qanPage) => {}
);
xScenario(
  'PMM-T189 Verify user is able to copy to clipboard JSON in Explain section @new-qan ',
  async (I, adminPage, qanPage) => {}
);
xScenario(
  'PMM-T195 Verify Metrics tab in details section has no empty values @new-qan ',
  async (I, adminPage, qanPage) => {}
);
xScenario(
  'PMM-T199 Verify that loader exists when details section is loading @new-qan ',
  async (I, adminPage, qanPage) => {}
);
xScenario('PMM-T206 Verify that columns names are trimmed @new-qan ', async (I, adminPage, qanPage) => {});
xScenario(
  'PMM-T210 Verify QAN Add column Drop Down, Color Schema should be visible enough to Differentiate from Background @new-qan ',
  async (I, adminPage, qanPage) => {}
);
xScenario(
  'PMM-T212 Verify details section is closed after refreshing dashboard @new-qan ',
  async (I, adminPage, qanPage) => {}
);
xScenario(
  'PMM-T213 Verify 4 types of values in details section @new-qan ',
  async (I, adminPage, qanPage) => {}
);
xScenario(
  'PMM-T216 Verify visible Explain section in details of PostgreSQL Query @new-qan ',
  async (I, adminPage, qanPage) => {}
);
