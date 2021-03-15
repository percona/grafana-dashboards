const pages = new DataTable(['page']);

pages.add(['channels']);
pages.add(['templates']);
pages.add(['rules']);


Feature('IA: Pagination');


Before(async ({
  I, channelsAPI, settingsAPI, rulesAPI, templatesAPI,
}) => {
  await I.Authorize();
  await settingsAPI.apiEnableIA();
  await rulesAPI.clearAllRules(true);
  await templatesAPI.clearAllTemplates();
  await channelsAPI.clearAllNotificationChannels();
});

After(async ({ channelsAPI, rulesAPI, templatesAPI }) => {
  await rulesAPI.clearAllRules(true);
  await templatesAPI.clearAllTemplates();
  await channelsAPI.clearAllNotificationChannels();
});

Data(pages).Scenario(
  'PMM-T632 PMM-T697 PMM-T701 Verify Pagination navigation @ia @not-pr-pipeline',
  async ({
    I, iaCommon, current,
  }) => {
    const isTemplatesPage = current.page === 'templates';
    const initialButtonsState = {
      firstPageButton: 'disabled',
      prevPageButton: 'disabled',
      pageButton: 'enabled',
      nextPageButton: 'disabled',
      lastPageButton: 'disabled',
    };
    const { createEntities, url } = iaCommon.getCreateEntitiesAndPageUrl(current.page);

    I.amOnPage(url);

    if (!isTemplatesPage) {
      I.waitForElement(iaCommon.elements.noData, 30);
      I.dontSeeElement(iaCommon.elements.pagination);
    }

    await createEntities(1);
    I.refreshPage();

    await iaCommon.verifyPaginationButtonsState(initialButtonsState);

    // Number of elements for Rule Templates is different because there are Built-In templates
    isTemplatesPage
      ? I.seeNumberOfElements(iaCommon.elements.rowInTable, 13)
      : I.seeNumberOfElements(iaCommon.elements.rowInTable, 1);
    I.seeNumberOfElements(iaCommon.buttons.pageButton, 1);

    // Create entities for to have 2 pages (26 entities in sum)
    isTemplatesPage
      ? await createEntities(13)
      : await createEntities(25);

    I.refreshPage();

    iaCommon.verifyPaginationButtonsState({
      ...initialButtonsState,
      nextPageButton: 'enabled',
      lastPageButton: 'enabled',
    });

    // Verify number of rows and number of page buttons
    I.seeNumberOfElements(iaCommon.elements.rowInTable, 25);
    I.seeNumberOfElements(iaCommon.buttons.pageButton, 2);

    // Go to 2 page
    I.click(locate(iaCommon.buttons.pageButton).at(2));

    iaCommon.verifyPaginationButtonsState({
      ...initialButtonsState,
      firstPageButton: 'enabled',
      prevPageButton: 'enabled',
    });
    // Verify only 1 row on 2 page
    I.seeNumberOfElements(iaCommon.elements.rowInTable, 1);
    I.seeNumberOfElements(iaCommon.buttons.pageButton, 2);

    // Create entities for to have 3 pages (51 entities in sum)
    await createEntities(25);
    I.refreshPage();

    // Go to 2nd page
    I.click(locate(iaCommon.buttons.pageButton).at(2));

    iaCommon.verifyPaginationButtonsState({
      ...initialButtonsState,
      firstPageButton: 'enabled',
      prevPageButton: 'enabled',
      nextPageButton: 'enabled',
      lastPageButton: 'enabled',
    });

    // Verify number of rows and number of page buttons
    I.seeNumberOfElements(iaCommon.elements.rowInTable, 25);
    I.seeNumberOfElements(iaCommon.buttons.pageButton, 3);

    // Go to 3d page
    I.click(iaCommon.buttons.nextPageButton);

    iaCommon.verifyPaginationButtonsState({
      ...initialButtonsState,
      firstPageButton: 'enabled',
      prevPageButton: 'enabled',
    });
    // Verify 3d page has 1 row
    I.seeNumberOfElements(iaCommon.elements.rowInTable, 1);

    // Go back to 1st page
    I.click(iaCommon.buttons.firstPageButton);
    I.seeNumberOfElements(iaCommon.elements.rowInTable, 25);

    iaCommon.verifyPaginationButtonsState({
      ...initialButtonsState,
      nextPageButton: 'enabled',
      lastPageButton: 'enabled',
    });

    // Go to the last page
    I.click(iaCommon.buttons.lastPageButton);
    I.seeNumberOfElements(iaCommon.elements.rowInTable, 1);
    iaCommon.verifyPaginationButtonsState({
      ...initialButtonsState,
      firstPageButton: 'enabled',
      prevPageButton: 'enabled',
    });

    // Go to 2nd page
    I.click(iaCommon.buttons.prevPageButton);
    I.seeNumberOfElements(iaCommon.elements.rowInTable, 25);

    iaCommon.verifyPaginationButtonsState({
      ...initialButtonsState,
      firstPageButton: 'enabled',
      prevPageButton: 'enabled',
      nextPageButton: 'enabled',
      lastPageButton: 'enabled',
    });
  },
);

Data(pages).Scenario(
  'PMM-T662 PMM-T698 PMM-T702 Pagination rows per page persistence @ia @not-pr-pipeline',
  async ({
    I, iaCommon, current,
  }) => {
    const isTemplatesPage = current.page === 'templates';
    const { createEntities, url } = iaCommon.getCreateEntitiesAndPageUrl(current.page);

    await createEntities(1);

    I.amOnPage(url);

    // Verify '25' rows per page is selected by default
    I.waitForVisible(iaCommon.elements.pagination, 30);
    I.seeTextEquals('25', iaCommon.buttons.rowsPerPage);

    // Change rows per page to '50'
    iaCommon.selectRowsPerPage(50);
    I.seeTextEquals('50', iaCommon.buttons.rowsPerPage);

    // Create entities for to have 2 pages
    isTemplatesPage
      ? await createEntities(13)
      : await createEntities(25);

    // Rows per page is '50' after refreshing a page
    I.refreshPage();
    I.waitForVisible(iaCommon.elements.pagination, 30);
    I.seeTextEquals('50', iaCommon.buttons.rowsPerPage);

    // Verify that we have 25 rows and only one page
    I.seeNumberOfElements(iaCommon.elements.rowInTable, 26);
    I.seeNumberOfElements(iaCommon.buttons.pageButton, 1);

    // Change rows per page to '25'
    iaCommon.selectRowsPerPage(25);

    // Verify that we have 25 rows and 2 pages
    I.seeNumberOfElements(iaCommon.elements.rowInTable, 25);
    I.seeNumberOfElements(iaCommon.buttons.pageButton, 2);

    // Change rows to 100
    iaCommon.selectRowsPerPage(100);
    I.seeNumberOfElements(iaCommon.elements.rowInTable, 26);
    I.seeNumberOfElements(iaCommon.buttons.pageButton, 1);
    I.refreshPage();

    // Verify 100 rows per page persists after refreshing a page
    I.waitForVisible(iaCommon.elements.pagination, 30);
    I.seeTextEquals('100', iaCommon.buttons.rowsPerPage);
    I.seeNumberOfElements(iaCommon.elements.rowInTable, 26);
    I.seeNumberOfElements(iaCommon.buttons.pageButton, 1);
  },
);
