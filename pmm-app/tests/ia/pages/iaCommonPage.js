const assert = require('assert');

const {
  I, channelsAPI, alertRulesPage, ruleTemplatesPage, rulesAPI, templatesAPI, ncPage,
} = inject();

module.exports = {
  url: 'graph/integrated-alerting',
  tabNames: {
    alerts: 'Alerts',
    alertRules: 'Alert Rules',
    ruleTemplates: 'Alert Rule Templates',
    notificationChannels: 'Notification Channels',
  },
  elements: {
    noData: locate('$table-no-data').find('h1'),
    pagination: '$pagination',
    itemsShown: '$pagination-items-inverval',
    rowInTable: locate('$table-tbody').find('tr'),
    tab: (tabName) => locate('li').withAttr({ 'aria-label': `Tab ${tabName}` }),
    table: '$table-tbody',
    breadcrumbActive: locate('$breadcrumb-section').last(),
    disabledIa: '$empty-block',
    settingsLink: '$settings-link',
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
    disabledIa: 'Integrated Alerting is disabled. You can enable it in  \n'
      + 'PMM Settings.',
  },

  openTab(tabName) {
    I.waitForVisible(this.elements.tab(tabName), 30);
    I.click(this.elements.tab(tabName));
    if (tabName === this.tabNames.ruleTemplates) {
      I.waitForVisible(this.elements.table, 30);
    } else {
      I.waitForVisible(this.elements.noData, 30);
    }
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

  async verifyTabIsActive(tabName) {
    const className = await I.grabAttributeFrom(this.elements.tab(tabName), 'class');

    assert.ok(className.endsWith('activeTabStyle'), `Tab ${tabName} should be active`);
  },
};
