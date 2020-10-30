const assert = require('assert');

const { I } = inject();

module.exports = {
  root: '.overview-filters',
  filterGroups: [
    'Environment',
    'Cluster',
    'Replication Set',
    'Database',
    'Node Name',
    'Service Name',
    'User Name',
    'Node Type',
    'Service Type',
  ],
  fields: {
    filterBy: '$filters-search-field',
    filterCheckboxes: '.checkbox-container__checkmark',
  },
  buttons: {
    resetAll: '$qan-filters-reset-all',
    showSelected: '$qan-filters-show-selected',
  },
  elements: {
    spinner: 'i.fa-spinner',
    disabledResetAll: '//button[@data-qa="qan-filters-reset-all" and @disabled ]',
    environmentLabel: '//span[contains(text(), "Environment")]',
    filterName: 'span.checkbox-container__label-text',
  },
  requests: {
    getReportPath: '/v0/qan/GetReport',
    getFiltersPath: '/v0/qan/Filters/Get',
  },

  getFilterSectionLocator: (filterSectionName) => `//span[contains(text(), '${filterSectionName}')]`,

  getFilterGroupLocator: (filterName) => `//div[@class='filter-group__title']//span[contains(text(), '${filterName}')]`,

  getFilterGroupCountSelector: (groupName) => `//span[contains(text(), '${groupName}')]/following-sibling::span[contains(text(), 'Show all')]`,

  getFilterLocator: (filterValue) => `//span[@class="checkbox-container__label-text" and contains(text(), "${filterValue}")]`
    + '/../span[@class="checkbox-container__checkmark"]',

  async getPercentage(filterType, filter) {
    return await I.grabTextFrom(
      `//span[contains(text(), '${filterType}')]/../../descendant::span[contains(text(), '${filter}')]/../../following-sibling::span/span`,
    );
  },

  checkLink(section, filter, visibility) {
    const locator = `//span[contains(text(), '${section}')]/parent::p/following-sibling::div//span[contains(@class, 'checkbox-container__label-text') and contains(text(), '${filter}')]/ancestor::span/following-sibling::span/a`;

    if (visibility) {
      I.waitForElement(locator, 30);
    } else {
      I.dontSeeElement(locator);
    }
  },

  async getCountOfFilters(groupName) {
    const showAllLink = this.getFilterGroupCountSelector(groupName);

    return (await I.grabTextFrom(showAllLink)).slice(10, 12);
  },

  waitForFiltersToLoad() {
    I.waitForInvisible(this.elements.spinner, 30);
  },

  async expandAllFilters() {
    for (let i = 0; i < 4; i++) {
      const numOfElementsFilterCount = await I.grabNumberOfVisibleElements(
        this.getFilterGroupCountSelector(this.filterGroups[i]),
      );

      if (numOfElementsFilterCount === '1') {
        I.click(this.getFilterGroupCountSelector(this.filterGroups[i]));
        I.waitForVisible(
          `//section[@class='aside__filter-group']//span[contains(text(), '${this.filterGroups[i]}')]/../button[contains(text(), 'Show top 5')]`,
          30,
        );
      }
    }
  },

  applyFilter(filterName) {
    const filterToApply = `//span[contains(@class, 'checkbox-container__label-text') and contains(text(), '${filterName}')]`;

    I.fillField(this.fields.filterBy, filterName);
    I.waitForVisible(filterToApply, 20);
    I.forceClick(filterToApply);
    I.click(this.fields.filterBy);
    I.clearField(this.fields.filterBy);
    // workaround for clearing the field completely
    I.fillField(this.fields.filterBy, ' ');
    I.pressKey('Backspace');
  },

  applyFilterInSection(section, filter) {
    const filterLocator = `//span[contains(text(), '${section}')]/parent::p/following-sibling::div//span[contains(@class, 'checkbox-container__label-text') and contains(text(), '${filter}')]`;

    I.waitForVisible(filterLocator, 20);
    I.click(filterLocator);
  },

  async verifySectionItemsCount(filterSection, expectedCount) {
    const sectionLocator = `//span[contains(text(), '${filterSection}')]/ancestor::p/following-sibling::`
      + 'div//span[contains(@class, "checkbox-container__checkmark")]';

    I.fillField(this.fields.filterBy, filterSection);
    I.waitForVisible(`//span[contains(text(), '${filterSection}')]`, 30);
    const countOfFiltersInSection = await I.grabNumberOfVisibleElements(sectionLocator);

    assert.equal(countOfFiltersInSection, expectedCount, `There should be '${expectedCount}' visible links`);
  },

  async verifyCountOfFilterLinks(expectedCount, before) {
    const count = await I.grabNumberOfVisibleElements(this.fields.filterCheckboxes);

    if (!before) {
      assert.equal(count, expectedCount, `The value ${expectedCount} should be equal to ${count}`);
    }

    if (before) {
      assert.notEqual(count, expectedCount, `The value ${expectedCount} should not be equal to ${count}`);
    }
  },

  applyShowAllLink(groupName) {
    const showAllLink = this.getFilterGroupCountSelector(groupName);

    I.waitForVisible(showAllLink, 30);
    I.click(showAllLink);
  },

  async applyShowTop5Link(groupName) {
    const showTop5Link = `//span[contains(text(), '${groupName}')]/following-sibling::span[contains(text(), 'Show top 5')]`;

    I.waitForVisible(showTop5Link, 30);
    I.click(showTop5Link);
  },

  checkDisabledFilter(groupName, filter) {
    const filterLocator = `//span[contains(text(), '${groupName}')]/parent::p/following-sibling::div//input[contains(@name, '${filter}') and @disabled]`;

    I.waitForVisible(filterLocator, 20);
  },

  async verifySelectedFilters(filters) {
    I.click(this.buttons.showSelected);
    I.waitForVisible(this.elements.filterName, 20);
    const currentFilters = await I.grabTextFrom(this.elements.filterName);

    for (let i = 0; i <= filters.length - 1; i++) {
      assert.ok(currentFilters[i].includes(filters[i]), `The filter '${filters[i]}' has not been found!`);
    }
  },

  navigateByShortCut(href) {
    const shortCutLocator = `//a[contains(@href,'${href}')]`;

    I.waitForVisible(shortCutLocator, 30);
    I.click(shortCutLocator);
  },
};
