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
