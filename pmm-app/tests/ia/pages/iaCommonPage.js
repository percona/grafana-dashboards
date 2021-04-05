const {
  I, channelsAPI, alertRulesPage, ruleTemplatesPage, rulesAPI, templatesAPI, ncPage,
} = inject();

module.exports = {
  elements: {
    noData: locate('$table-no-data').find('h1'),
    pagination: '$pagination',
    itemsShown: '$pagination-items-inverval',
    rowInTable: locate('$table-tbody').find('tr'),
  },
  buttons: {
    firstPageButton: '$first-page-button',
    prevPageButton: '$previous-page-button',
    pageButton: '$page-button',
    nextPageButton: '$next-page-button',
    lastPageButton: '$last-page-button',
    rowsPerPage: locate('$pagination').find('div[class$="-singleValue"]'),
    rowsPerPageOption: (count) => locate('$pagination').find('[aria-label="Select option"] span').withText(count.toString()),
  },
  messages: {
    itemsShown: (leftNumber, rightNumber, totalItems) => `Showing ${leftNumber}-${rightNumber} of ${totalItems} items`,
  },

  getCreateEntitiesAndPageUrl(page) {
    if (page === 'channels') {
      return {
        createEntities: channelsAPI.createNotificationChannels,
        url: ncPage.url,
        getListOfItems: channelsAPI.getChannelsList,
      };
    }

    if (page === 'rules') {
      return {
        createEntities: rulesAPI.createAlertRules,
        url: alertRulesPage.url,
        getListOfItems: rulesAPI.getAlertRules,
      };
    }

    if (page === 'templates') {
      return {
        createEntities: templatesAPI.createRuleTemplates,
        url: ruleTemplatesPage.url,
        getListOfItems: templatesAPI.getTemplatesList,
      };
    }

    return new Error('Did not met expected page. Expected: "channels", "rules" or "templates" ');
  },

  selectRowsPerPage(count) {
    I.click(this.buttons.rowsPerPage);
    I.waitForElement(this.buttons.rowsPerPageOption(count), 30);
    I.click(this.buttons.rowsPerPageOption(count));
  },

  verifyButtonState(button, disabled) {
    I.seeAttributesOnElements(button, disabled);
  },

  verifyPaginationButtonsState(state) {
    for (const [key, value] of Object.entries(state)) {
      if (this.buttons[key]) {
        this.verifyButtonState(this.buttons[key], this.shouldBeDisabled(value));
      } else {
        throw new Error(`Didn't find ${key} key in ${this.buttons} object`);
      }
    }
  },

  shouldBeDisabled(value) {
    return value === 'disabled' ? { disabled: true } : { disabled: null };
  },
};
