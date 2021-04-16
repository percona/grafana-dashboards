const { I } = inject();
const { rules, templates } = require('./testData');

const rulesNameCell = (ruleName) => `//td[1][div/span[text()="${ruleName}"]]`;

module.exports = {
  url: 'graph/integrated-alerting/alert-rules',
  columnHeaders: ['Name', 'Parameters', 'Duration', 'Severity', 'Filters', 'Created', 'Actions'],
  rules,
  templates,
  elements: {
    rulesTab: '//li[@aria-label="Tab Alert Rules"]',
    noRules: '[data-qa=alert-rules-table-no-data] > h1',
    rulesTableHeader: '$alert-rules-table-thead',
    rulesTable: '$alert-rules-table-tbody',
    rulesNameCell: (ruleName) => rulesNameCell(ruleName),
    // activateSwitch returns enable/disabled rule switch locator which holds the state (enabled or disabled)
    // Note: not clickable one
    activateSwitch: (ruleName) => `${rulesNameCell(ruleName)}/following-sibling::td//input[@data-qa='toggle-alert-rule']`,
    parametersCell: (ruleName) => locate('td').after(rulesNameCell(ruleName)).find('$alert-rule-param'),
    durationCell: (ruleName) => `${rulesNameCell(ruleName)}/following-sibling::td[2]`,
    severityCell: (ruleName) => `${rulesNameCell(ruleName)}/following-sibling::td[3]`,
    filtersCell: (ruleName) => `${rulesNameCell(ruleName)}/following-sibling::td[4]//span`,
    modalHeader: '$modal-header',
    modalContent: '$modal-content',
    columnHeaderLocator: (columnHeaderText) => `//th[text()="${columnHeaderText}"]`,
    ruleDetails: '$alert-rules-details',
    expression: locate('$template-expression').find('pre'),
    templateAlert: locate('$template-alert').find('pre'),
    durationError: '$duration-field-error-message',
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
    threshold: '$threshold-number-input',
    duration: '$duration-number-input',
    filters: '$filters-textarea-input',
    template: locate('$add-alert-rule-modal-form').find('div').first().find('div[class$="-singleValue"]'),
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

    // skipping this step while editing an Alert rule
    if (template) {
      this.searchAndSelectResult('Template', template);
    }

    I.clearField(this.fields.ruleName);
    I.fillField(this.fields.ruleName, ruleName);
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

  verifyEditRuleDialogElements(rule) {
    const {
      template, ruleName = '', threshold, duration,
      filters = '', expression, alert,
    } = rule;

    I.waitForVisible(this.fields.template, 30);
    I.seeTextEquals(template, this.fields.template);
    I.waitForValue(this.fields.ruleName, ruleName, 10);
    if (threshold) {
      I.waitForValue(this.fields.threshold, threshold, 10);
    } else {
      I.dontSeeElement(this.fields.threshold);
    }

    I.waitForValue(this.fields.duration, duration, 10);
    I.waitForValue(this.fields.filters, filters, 10);
    I.seeTextEquals(expression, this.elements.expression);
    I.seeTextEquals(alert, this.elements.templateAlert);
  },

  openAlertRulesTab() {
    I.amOnPage(this.url);
    I.waitForVisible(this.buttons.openAddRuleModal, 30);
  },

  searchAndSelectResult(dropdownLabel, option) {
    I.fillField(this.fields.searchDropdown(dropdownLabel), option);
    I.click(this.fields.resultsLocator(option));
  },

  verifyRowValues(ruleObj) {
    const {
      ruleName, threshold, duration,
      severity, filters, activate, thresholdUnit = '%',
    } = ruleObj;

    I.seeElement(this.elements.rulesNameCell(ruleName));
    I.see(`Threshold:\n${threshold} ${thresholdUnit}`, this.elements.parametersCell(ruleName));
    I.see(`${duration} seconds`, this.elements.durationCell(ruleName));
    I.see(severity, this.elements.severityCell(ruleName));
    // for cases when there are few filters
    filters.split(',').forEach((filter) => {
      I.see(filter.trim(), this.elements.filtersCell(ruleName));
    });
    this.verifyRuleState(activate, ruleName);
    I.seeAttributesOnElements(this.buttons.showDetails(ruleName), { disabled: null });
    I.seeAttributesOnElements(this.buttons.deleteAlertRule(ruleName), { disabled: null });
    I.seeAttributesOnElements(this.buttons.editAlertRule(ruleName), { disabled: null });
    I.seeAttributesOnElements(this.buttons.duplicateAlertRule(ruleName), { disabled: null });
  },

  verifyRuleState(activate, ruleName) {
    let checked = activate;

    if (!activate) checked = null;

    I.waitForVisible(this.elements.activateSwitch(ruleName), 30);
    I.seeAttributesOnElements(this.elements.activateSwitch(ruleName), { checked });
  },
};
