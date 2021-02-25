const { I } = inject();
const rulesNameCell = (ruleName) => `//td[1][div[text()="${ruleName}"]]`;

module.exports = {
  url: 'graph/integrated-alerting',
  columnHeaders: ['Name', 'Threshold', 'Duration', 'Severity', 'Filters', 'Created', 'Actions'],
  rules: [{
    template: 'PostgreSQL connections in use',
    templateType: 'BUILT_IN',
    ruleName: 'Rule with BUILT_IN template (activated, without channels)',
    threshold: '200',
    duration: '1',
    severity: 'Warning',
    filters: 'service_name=pmm-server-postgresql',
    channels: [],
    activate: true,
  }, {
    template: 'PostgreSQL connections in use',
    templateType: 'BUILT_IN',
    ruleName: 'Rule with BUILT_IN template (not activated, without channels)',
    threshold: '200',
    duration: '1',
    severity: 'Critical',
    filters: 'service_name=pmm-server-postgresql',
    channels: [],
    activate: false,
  }, {
    template: 'PostgreSQL connections in use',
    templateType: 'BUILT_IN',
    ruleName: 'Rule with BUILT_IN template (activated, with channels)',
    threshold: '200',
    duration: '1',
    severity: 'High',
    filters: 'service_name=pmm-server-postgresql',
    channels: ['EmailChannelForRules'],
    activate: true,
  }, {
    template: 'PostgreSQL connections in use',
    templateType: 'BUILT_IN',
    ruleName: 'Rule with BUILT_IN template (not activated, with channels)',
    threshold: '200',
    duration: '1',
    severity: 'Notice',
    filters: 'service_name=pmm-server-postgresql',
    channels: ['EmailChannelForRules'],
    activate: false,
  }, {
    template: 'E2E TemplateForRules YAML',
    templateType: 'User-defined (UI)',
    ruleName: 'Rule with User-defined (UI) template (activated, without channels)',
    threshold: '200',
    duration: '1',
    severity: 'Warning',
    filters: 'service_name=pmm-server-postgresql',
    channels: [],
    activate: true,
  }, {
    template: 'E2E TemplateForRules YAML',
    templateType: 'User-defined (UI)',
    ruleName: 'Rule with User-defined (UI) template (not activated, without channels)',
    threshold: '200',
    duration: '1',
    severity: 'Critical',
    filters: 'service_name=pmm-server-postgresql',
    channels: [],
    activate: false,
  }, {
    template: 'E2E TemplateForRules YAML',
    templateType: 'User-defined (UI)',
    ruleName: 'Rule with User-defined (UI) template (activated, with channels)',
    threshold: '200',
    duration: '1',
    severity: 'High',
    filters: 'service_name=pmm-server-postgresql',
    channels: ['EmailChannelForRules'],
    activate: true,
  }, {
    template: 'E2E TemplateForRules YAML',
    templateType: 'User-defined (UI)',
    ruleName: 'Rule with User-defined (UI) template (not activated, with channels)',
    threshold: '200',
    duration: '1',
    severity: 'Notice',
    filters: 'service_name=pmm-server-postgresql',
    channels: ['EmailChannelForRules'],
    activate: false,
  }, {
    template: 'E2E TemplateForRules YAML',
    templateType: 'User-defined (UI)',
    ruleName: 'Rule with User-defined (UI) template with default params',
    threshold: '',
    duration: '600',
    severity: 'Notice',
    filters: 'service_name=pmm-server-postgresql',
    channels: ['EmailChannelForRules'],
    activate: true,
  }],
  elements: {
    rulesTab: '//li[@aria-label="Tab Alert Rules"]',
    noRules: '[data-qa=alert-rules-table-no-data] > h1',
    rulesTableHeader: '$alert-rules-table-thead',
    rulesTable: '$alert-rules-table-tbody',
    rulesNameCell: (ruleName) => rulesNameCell(ruleName),
    // activateSwitch returns enable/disabled rule switch locator which holds the state (enabled or disabled)
    // Note: not clickable one
    activateSwitch: (ruleName) => `${rulesNameCell(ruleName)}/following-sibling::td//input[@data-qa='toggle-alert-rule']`,
    thresholdCell: (ruleName) => `${rulesNameCell(ruleName)}/following-sibling::td[1]`,
    durationCell: (ruleName) => `${rulesNameCell(ruleName)}/following-sibling::td[2]`,
    severityCell: (ruleName) => `${rulesNameCell(ruleName)}/following-sibling::td[3]`,
    filtersCell: (ruleName) => `${rulesNameCell(ruleName)}/following-sibling::td[4]//span`,
    modalHeader: '$modal-header',
    modalContent: '$modal-content',
    columnHeaderLocator: (columnHeaderText) => `//th[text()="${columnHeaderText}"]`,
    ruleDetails: '$alert-rules-details',
  },
  buttons: {
    openAddRuleModal: '$alert-rule-template-add-modal-button',
    editRule: '$edit-alert-rule-button',
    closeModal: '$modal-close-button',
    addRule: '$add-alert-rule-modal-add-button',
    cancelAdding: '$add-alert-rule-modal-cancel-button',
    cancelDelete: '$cancel-delete-modal-button',
    delete: '$confirm-delete-modal-button',
    // showDetails returns Show rule details button locator for a given rule name
    showDetails: (ruleName) => `${rulesNameCell(ruleName)}//button[@data-qa="show-alert-rule-details"]`,
    // hideDetails returns Hide rule details button locator for a given rule name
    hideDetails: (ruleName) => `${rulesNameCell(ruleName)}//button[@data-qa="hide-alert-rule-details"]`,
    // editAlertRule returns Edit rule button locator for a given rule name
    editAlertRule: (ruleName) => `${rulesNameCell(ruleName)}/following-sibling::td//button[@data-qa='edit-alert-rule-button']`,
    // duplicateAlertRule returns Copy rule button locator for a given rule name
    duplicateAlertRule: (ruleName) => `${rulesNameCell(ruleName)}/following-sibling::td//button[@data-qa='copy-alert-rule-button']`,
    // deleteAlertRule returns Delete rule button locator for a given rule name
    deleteAlertRule: (ruleName) => `${rulesNameCell(ruleName)}/following-sibling::td//button[@data-qa='delete-alert-rule-button']`,
    // toggleAlertRule returns Enable/Disable rule switch locator in alert rules list
    toggleAlertRule: (ruleName) => `${rulesNameCell(ruleName)}/following-sibling::td//input[@data-qa='toggle-alert-rule']/following-sibling::label`,
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
    addRuleModalHeader: 'Add Alert Rule',
    deleteRuleModalHeader: 'Delete Alert Rule',
    confirmDelete: (name) => `Are you sure you want to delete the alert rule "${name}"?`,
    successfullyAdded: 'Alert rule created',
    successfullyCreated: (name) => `Alert rule ${name} successfully created`,
    successfullyEdited: 'Alert rule updated',
    successfullyDeleted: (name) => `Alert rule ${name} successfully deleted`,
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
      I.clearField(this.fields.ruleName);
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

  verifyRowValues(ruleObj) {
    const {
      ruleName, threshold, duration,
      severity, filters, activate,
    } = ruleObj;

    I.seeElement(this.elements.rulesNameCell(ruleName));
    I.see(`${threshold} %`, this.elements.thresholdCell(ruleName));
    I.see(`${duration} seconds`, this.elements.durationCell(ruleName));
    I.see(severity, this.elements.severityCell(ruleName));
    I.see(filters, this.elements.filtersCell(ruleName));
    this.verifyRuleState(activate, ruleName);
  },

  verifyRuleState(activate, ruleName) {
    let checked = activate;

    if (!activate) checked = null;

    I.seeAttributesOnElements(this.elements.activateSwitch(ruleName), { checked });
  },
};
