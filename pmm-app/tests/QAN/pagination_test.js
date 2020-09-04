Feature('QAN pagination');

Before((I, qanPage, qanOverview) => {
  I.Authorize();
  I.amOnPage(qanPage.url);
  qanOverview.waitForOverviewLoaded();
});

Scenario(
  'PMM-T128 - Verify pagination works correctly @not-pr-pipeline @qan',
  async (I, qanPage, qanActions) => {
    qanActions.verifySelectedCountPerPage('25 / page');
    const countOfItems = await qanActions.getCountOfItems();

    if (countOfItems <= 50) {
      I.seeAttributesOnElements(qanPage.fields.previousPage, { 'aria-disabled': 'true' });
      I.click(qanPage.fields.nextPage);
      qanActions.verifyActiveItem(2);
      await qanActions.verifyCount(`26-${countOfItems}`);
    } else if (countOfItems <= 100 && countOfItems > 50) {
      I.seeAttributesOnElements(qanPage.fields.previousPage, { 'aria-disabled': 'true' });
      I.click(qanPage.fields.nextPage);
      qanActions.verifyActiveItem(2);
      await qanActions.verifyCount('26-50');
      qanActions.verifyActiveItem(1);
      await qanActions.verifyCount('1-25');
    } else {
      I.seeAttributesOnElements(qanPage.fields.previousPage, { 'aria-disabled': 'true' });
      I.click(qanPage.fields.nextPage);
      qanActions.verifyActiveItem(2);
      await qanActions.verifyCount('26-50');
      I.click(qanPage.fields.previousPage);
      qanActions.verifyActiveItem(1);
      await qanActions.verifyCount('1-25');
      I.seeAttributesOnElements(qanPage.fields.previousPage, { 'aria-disabled': 'true' });
      I.click(qanPage.fields.ellipsisButton);
      qanActions.verifyActiveItem(6);
      await qanActions.verifyCount('126-150');
      I.click(qanPage.fields.ellipsisButton);
      qanActions.verifyActiveItem(1);
      await qanActions.verifyCount('1-25');
      qanActions.selectPage(3);
      qanActions.verifyActiveItem(3);
      await qanActions.verifyCount('51-75');
    }
  },
);

Scenario(
  'PMM-T193 - Verify user is able to change per page elements display and pagination is updated according to this value, PMM-T256 - Verify that switching view from 25 to 50/100 pages works correctly @not-pr-pipeline @qan',
  async (qanActions) => {
    const countOfItems = await qanActions.getCountOfItems();

    await qanActions.verifyRowCount(27);
    if (countOfItems <= 50) {
      await qanActions.verifyCount('1-25');
      await qanActions.verifyPagesAndCount(25);
    } else if (countOfItems <= 100 && countOfItems > 50) {
      await qanActions.verifyCount('1-25');
      await qanActions.verifyPagesAndCount(25);
      await qanActions.selectPagination('50 / page');
      await qanActions.verifyRowCount(52);
      await qanActions.verifyPagesAndCount(50);
      await qanActions.verifyCount('1-50');
      await qanActions.selectPagination('100 / page');
      await qanActions.verifyCount('1-100');
    } else {
      await qanActions.verifyCount('1-25');
      await qanActions.verifyPagesAndCount(25);
      await qanActions.selectPagination('50 / page');
      await qanActions.verifyRowCount(52);
      await qanActions.verifyPagesAndCount(50);
      await qanActions.verifyCount('1-50');
      await qanActions.selectPagination('100 / page');
      await qanActions.verifyRowCount(102);
      await qanActions.verifyPagesAndCount(100);
      await qanActions.verifyCount('1-100');
      await qanActions.selectPagination('25 / page');
      await qanActions.verifyRowCount(27);
      await qanActions.verifyCount('1-25');
      await qanActions.verifyPagesAndCount(25);
    }
  },
);
