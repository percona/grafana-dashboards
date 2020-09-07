const assert = require('assert');

const { I, qanOverview } = inject();

module.exports = {
  root: '$qan-pagination',
  buttons: {
    lastPage: '//li[@title="Next 5 Pages"]/following-sibling::li[1]',
    previousPage: '.ant-pagination-prev',
    nextPage: '.ant-pagination-next',
    ellipsis: '.ant-pagination-item-ellipsis',
  },
  elements: {
    resultsPerPage: '.ant-pagination-options',
  },

  getActivePageLocator: (number) => `//li[@class='ant-pagination-item ant-pagination-item-${number} ant-pagination-item-active']`,

  getPageLocator: (number) => `//li[@class='ant-pagination-item ant-pagination-item-${number}']`,

  getPerPageOptionLocator: (option) => `//li[contains(@class, 'ant-select-dropdown-menu-item') and contains(text(), '${option}' )]`,

  async getPageCount() {
    return await I.grabAttributeFrom(this.buttons.lastPage, 'title');
  },

  selectPage(page) {
    I.click(this.getPageLocator(page));
  },

  async selectResultsPerPage(option) {
    const optionToSelect = this.getPerPageOptionLocator(option);
    const pageCount = await this.getPageCount();

    I.click(this.elements.resultsPerPage);
    I.click(optionToSelect);

    // 20 sec wait for pages count to change
    for (let i = 0; i < 10; i++) {
      const newPageCount = await this.getPageCount();

      if (newPageCount !== pageCount) {
        return;
      }

      I.wait(2);
    }
  },

  async verifySelectedCountPerPage(expectedResults) {
    I.waitForElement(this.elements.resultsPerPage, 30);
    await within(this.elements.resultsPerPage, () => {
      I.see(expectedResults);
    });
  },

  verifyActivePage(page) {
    const item = this.getActivePageLocator(page);

    I.waitForElement(item, 30);
  },

  async verifyPagesAndCount(itemsPerPage) {
    const count = await qanOverview.getCountOfItems();
    const lastPage = await this.getPageCount();
    const result = count / lastPage;

    assert.ok((Math.ceil(result / 25) * 25) === itemsPerPage, 'Pages do not match with total count');
  },

  async verifyRange(expectedRange) {
    const count = await I.grabTextFrom(qanOverview.elements.countOfItems);

    assert.equal(count.includes(expectedRange), true, `The value ${expectedRange} should include ${count}`);
  },
};
