Feature('QAN pagination');

Before(async ({ I, qanPage, qanOverview }) => {
  await I.Authorize();
  I.amOnPage(qanPage.url);
  qanOverview.waitForOverviewLoaded();
});

Scenario(
  'PMM-T128 - Verify qanPagination works correctly @not-pr-pipeline @qan',
  async ({ I, qanPagination, qanOverview }) => {
    await qanPagination.verifySelectedCountPerPage('25 / page');
    const countOfItems = await qanOverview.getCountOfItems();

    if (countOfItems <= 50) {
      I.seeAttributesOnElements(qanPagination.buttons.previousPage, { 'aria-disabled': 'true' });
      I.click(qanPagination.buttons.nextPage);
      qanPagination.verifyActivePage(2);
      await qanPagination.verifyRange(`26-${countOfItems}`);
    } else if (countOfItems <= 100 && countOfItems > 50) {
      I.seeAttributesOnElements(qanPagination.buttons.previousPage, { 'aria-disabled': 'true' });
      I.click(qanPagination.buttons.nextPage);
      qanPagination.verifyActivePage(2);
      await qanPagination.verifyRange('26-50');
      qanPagination.verifyActivePage(1);
      await qanPagination.verifyRange('1-25');
    } else {
      I.seeAttributesOnElements(qanPagination.buttons.previousPage, { 'aria-disabled': 'true' });
      I.click(qanPagination.buttons.nextPage);
      qanPagination.verifyActivePage(2);
      await qanPagination.verifyRange('26-50');
      I.click(qanPagination.buttons.previousPage);
      qanPagination.verifyActivePage(1);
      await qanPagination.verifyRange('1-25');
      I.seeAttributesOnElements(qanPagination.buttons.previousPage, { 'aria-disabled': 'true' });
      I.click(qanPagination.buttons.ellipsis);
      qanPagination.verifyActivePage(6);
      await qanPagination.verifyRange('126-150');
      I.click(qanPagination.buttons.ellipsis);
      qanPagination.verifyActivePage(1);
      await qanPagination.verifyRange('1-25');
      qanPagination.selectPage(3);
      qanPagination.verifyActivePage(3);
      await qanPagination.verifyRange('51-75');
    }
  },
);

Scenario(
  'PMM-T193 - Verify user is able to change per page elements display and qanPagination is updated according to this value, PMM-T256 - Verify that switching view from 25 to 50/100 pages works correctly @not-pr-pipeline @qan',
  async ({ qanPagination, qanOverview }) => {
    const countOfItems = await qanOverview.getCountOfItems();

    await qanOverview.verifyRowCount(27);
    if (countOfItems <= 50) {
      await qanPagination.verifyRange('1-25');
      await qanPagination.verifyPagesAndCount(25);
    } else if (countOfItems <= 100 && countOfItems > 50) {
      await qanPagination.verifyRange('1-25');
      await qanPagination.verifyPagesAndCount(25);
      await qanPagination.selectResultsPerPage('50 / page');
      await qanOverview.verifyRowCount(52);
      await qanPagination.verifyPagesAndCount(50);
      await qanPagination.verifyRange('1-50');
      await qanPagination.selectResultsPerPage('100 / page');
      await qanPagination.verifyRange('1-100');
    } else {
      await qanPagination.verifyRange('1-25');
      await qanPagination.verifyPagesAndCount(25);
      await qanPagination.selectResultsPerPage('50 / page');
      await qanOverview.verifyRowCount(52);
      await qanPagination.verifyPagesAndCount(50);
      await qanPagination.verifyRange('1-50');
      await qanPagination.selectResultsPerPage('100 / page');
      await qanOverview.verifyRowCount(102);
      await qanPagination.verifyPagesAndCount(100);
      await qanPagination.verifyRange('1-100');
      await qanPagination.selectResultsPerPage('25 / page');
      await qanOverview.verifyRowCount(27);
      await qanPagination.verifyRange('1-25');
      await qanPagination.verifyPagesAndCount(25);
    }
  },
);
