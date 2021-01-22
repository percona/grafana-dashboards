const { I } = inject();

module.exports = {
  url: 'graph/integrated-alerting',
  columnHeaders: ['Name', 'Threshold', 'Duration', 'Severity', 'Filters', 'Created', 'Actions'],
  rules: [{
    template: 'PostgreSQL connections in use',
    templateType: 'BUILT_IN',
    ruleName: 'Rule with BUILT_IN template (activated, without channels)',
    threshold: '1',
    duration: '1',
    severity: 'Warning',
    filters: 'service_name=pmm-server-postgresql',
    channels: [],
    activate: true,
  }, {
    template: 'PostgreSQL connections in use',
    templateType: 'BUILT_IN',
    ruleName: 'Rule with BUILT_IN template (not activated, without channels)',
    threshold: '1',
    duration: '1',
    severity: 'Critical',
    filters: 'service_name=pmm-server-postgresql',
    channels: [],
    activate: false,
  }, {
    template: 'PostgreSQL connections in use',
    templateType: 'BUILT_IN',
    ruleName: 'Rule with BUILT_IN template (activated, with channels)',
    threshold: '1',
    duration: '1',
    severity: 'High',
    filters: 'service_name=pmm-server-postgresql',
    channels: ['EmailChannelForRules'],
    activate: true,
  }, {
    template: 'PostgreSQL connections in use',
    templateType: 'BUILT_IN',
    ruleName: 'Rule with BUILT_IN template (not activated, with channels)',
    threshold: '1',
    duration: '1',
    severity: 'Notice',
    filters: 'service_name=pmm-server-postgresql',
    channels: ['EmailChannelForRules'],
    activate: false,
  }, {
    template: 'E2E TemplateForRules YAML',
    templateType: 'User-defined (UI)',
    ruleName: 'Rule with User-defined (UI) template (activated, without channels)',
    threshold: '1',
    duration: '1',
    severity: 'Warning',
    filters: 'service_name=pmm-server-postgresql',
    channels: [],
    activate: true,
  }, {
    template: 'E2E TemplateForRules YAML',
    templateType: 'User-defined (UI)',
    ruleName: 'Rule with User-defined (UI) template (not activated, without channels)',
    threshold: '1',
    duration: '1',
    severity: 'Critical',
    filters: 'service_name=pmm-server-postgresql',
    channels: [],
    activate: false,
  }, {
    template: 'E2E TemplateForRules YAML',
    templateType: 'User-defined (UI)',
    ruleName: 'Rule with User-defined (UI) template (activated, with channels)',
    threshold: '1',
    duration: '1',
    severity: 'High',
    filters: 'service_name=pmm-server-postgresql',
    channels: ['EmailChannelForRules'],
    activate: true,
  }, {
    template: 'E2E TemplateForRules YAML',
    templateType: 'User-defined (UI)',
    ruleName: 'Rule with User-defined (UI) template (not activated, with channels)',
    threshold: '1',
    duration: '1',
    severity: 'Notice',
    filters: 'service_name=pmm-server-postgresql',
    channels: ['EmailChannelForRules'],
    activate: false,
  }],
  elements: {
    rulesTab: '//li[@aria-label="Tab Alert Rules"]',
    noRules: '[data-qa=alert-rules-table-no-data] > h1',
    rulesTableHeader: '$alert-rules-table-thead',
    rulesTable: '$alert-rules-table-tbody',
    rulesNameCell: (ruleName) => `//td[1][div[text()="${ruleName}"]]`,
    // activateSwitch returns enable/disabled rule switch locator which holds the state (enabled or disabled)
    // Note: not clickable one
    activateSwitch: (ruleName) => `${module.exports.elements.rulesNameCell(ruleName)}/following-sibling::td//input[@data-qa='toggle-alert-rule']`,
    thresholdCell: (ruleName) => `${module.exports.elements.rulesNameCell(ruleName)}/following-sibling::td[1]`,
    durationCell: (ruleName) => `${module.exports.elements.rulesNameCell(ruleName)}/following-sibling::td[2]`,
    severityCell: (ruleName) => `${module.exports.elements.rulesNameCell(ruleName)}/following-sibling::td[3]`,
    filtersCell: (ruleName) => `${module.exports.elements.rulesNameCell(ruleName)}/following-sibling::td[4]//span`,
    modalHeader: '$modal-header',
    popUpTitle: '.alert-title',
    columnHeaderLocator: (columnHeaderText) => `//th[text()="${columnHeaderText}"]`,
  },
  buttons: {
    closePopUp: '.alert-close',
    openAddRuleModal: '$alert-rule-template-add-modal-button',
    editRule: '$edit-alert-rule-button',
    closeModal: '$modal-close-button',
    addRule: '$add-alert-rule-modal-add-button',
    cancelAdding: '$add-alert-rule-modal-cancel-button',
    // editAlertRule returns Edit template button locators for a given source
    editAlertRule: (ruleName) => `${module.exports.elements.rulesNameCell(ruleName)}/following-sibling::td//button[@data-qa='edit-alert-rule-button']`,
    // toggleAlertRule returns enable/disabled rule switch locator in alert rules list
    toggleAlertRule: (ruleName) => `${module.exports.elements.rulesNameCell(ruleName)}/following-sibling::td//input[@data-qa='toggle-alert-rule']/following-sibling::label`,
    toogleInModal: '//input[@data-qa="enabled-toggle-input"]/following-sibling::label',
  },
  fields: {
    // searchDropdown returns a locator of a search input for a given label
    searchDropdown: (field) => `//label[text()="${field}"]/following-sibling::div[1]//input`,
    // resultsLocator returns item locator in a search dropdown based on a text
    resultsLocator: (name) => `//div[@aria-label="Select option"]//span[text()="${name}"]`,
    ruleName: '$name-text-input',
    threshold: '$threshold-text-input',
    duration: '$duration-number-input',
    filters: '$filters-textarea-input',
  },
  messages: {
    noRulesFound: 'No alert rules found',
    modalHeaderText: 'Add Alert Rule',
    successfullyAdded: 'Alert rule created',
    successfullyEdited: 'Alert rule updated',
    successfullyDisabled: (name) => `Alert rule "${name}" successfully disabled`,
    successfullyEnabled: (name) => `Alert rule "${name}" successfully enabled`,
  },

  fillRuleFields(ruleObj = this.rules[0]) {
    const {
      template, ruleName, threshold, duration,
      severity, filters, channels, activate,
    } = ruleObj;

    // skipping these steps while editing an Alert rule
    if (template && ruleName) {
      this.searchAndSelectResult('Template', template);
      I.fillField(this.fields.ruleName, ruleName);
    }

    I.clearField(this.fields.threshold);
    I.fillField(this.fields.threshold, threshold);
    I.clearField(this.fields.duration);
    I.fillField(this.fields.duration, duration);
    this.searchAndSelectResult('Severity', severity);
    I.clearField(this.fields.filters);
    I.fillField(this.fields.filters, filters);
    if (channels) {
      channels.forEach((channel) => {
        this.searchAndSelectResult('Channels', channel);
      });
    }

    if (!activate) {
      I.click(this.buttons.toogleInModal);
    }
  },

  openAlertRulesTab() {
    I.amOnPage(this.url);
    I.waitForVisible(this.elements.rulesTab, 30);
    I.click(this.elements.rulesTab);
  },

  searchAndSelectResult(dropdownLabel, option) {
    I.fillField(this.fields.searchDropdown(dropdownLabel), option);
    I.click(this.fields.resultsLocator(option));
  },

  verifyRuleState(activate, ruleName) {
    let checked = activate;

    if (!activate) checked = null;

    I.seeAttributesOnElements(this.elements.activateSwitch(ruleName), { checked });
  },

  verifyPopUpMessage(message) {
    I.waitForVisible(this.elements.popUpTitle, 30);
    I.see(message, this.elements.popUpTitle);
    I.click(this.buttons.closePopUp);
  },
};
