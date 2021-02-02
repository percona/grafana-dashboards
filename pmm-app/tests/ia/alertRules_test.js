const assert = require('assert');
const page = require('./pages/alertRulesPage');

const rules = new DataTable(['template', 'templateType', 'ruleName', 'threshold', 'duration',
  'severity', 'filters', 'channels', 'activate']);

Object.values(page.rules).forEach((rule) => {
  rules.add([rule.template, rule.templateType, rule.ruleName, rule.threshold, rule.duration,
    rule.severity, rule.filters, rule.channels, rule.activate]);
});

Feature('IA: Alert rules');

Before(async (I, alertRulesPage, settingsAPI) => {
  I.Authorize();
  await settingsAPI.apiEnableIA();
});

BeforeSuite(async (I, alertRulesPage, settingsAPI, rulesAPI, templatesAPI, channelsAPI, ncPage) => {
  await settingsAPI.apiEnableIA();
  await rulesAPI.clearAllRules();
  await templatesAPI.clearAllTemplates();
  await channelsAPI.clearAllNotificationChannels();
  await templatesAPI.createRuleTemplate('tests/ia/templates/templateForRules.yaml');
  await channelsAPI.createNotificationChannel('EmailChannelForRules', ncPage.types.email.type);
});

AfterSuite(async (I, alertRulesPage, settingsAPI, rulesAPI, templatesAPI, channelsAPI) => {
  await settingsAPI.apiEnableIA();
  await rulesAPI.clearAllRules();
  await templatesAPI.clearAllTemplates();
  await channelsAPI.clearAllNotificationChannels();
});

Scenario(
  'Verify No data shown and alert rules list elements @ia @not-pr-pipeline',
  async (I, alertRulesPage, rulesAPI) => {
    alertRulesPage.openAlertRulesTab();
    I.see(alertRulesPage.messages.noRulesFound, alertRulesPage.elements.noRules);
    const ruleName = 'QAA PSQL rules List test';
    const ruleId = await rulesAPI.createAlertRule(ruleName);

    alertRulesPage.openAlertRulesTab();
    alertRulesPage.columnHeaders.forEach((header) => {
      const columnHeader = alertRulesPage.elements.columnHeaderLocator(header);

      I.waitForVisible(columnHeader, 30);
    });
    await rulesAPI.removeAlertRule(ruleId);
  },
);

Scenario(
  'Add alert rule modal elements @ia @not-pr-pipeline',
  async (I, alertRulesPage, rulesAPI) => {
    const ruleName = 'QAA PSQL Modal elements test';
    const ruleId = await rulesAPI.createAlertRule(ruleName);

    alertRulesPage.openAlertRulesTab();
    I.click(alertRulesPage.buttons.openAddRuleModal);
    I.see(alertRulesPage.messages.addRuleModalHeader, alertRulesPage.elements.modalHeader);
    I.seeElement(alertRulesPage.buttons.closeModal);
    I.seeElement(alertRulesPage.fields.searchDropdown('Template'));
    I.seeElement(alertRulesPage.fields.ruleName);
    I.seeElement(alertRulesPage.fields.threshold);
    I.seeElement(alertRulesPage.fields.duration);
    I.seeElement(alertRulesPage.fields.searchDropdown('Severity'));
    I.seeElement(alertRulesPage.fields.filters);
    I.seeElement(alertRulesPage.fields.searchDropdown('Channels'));
    I.seeElement(alertRulesPage.buttons.toogleInModal);
    I.seeElement(alertRulesPage.buttons.addRule);
    I.seeElement(alertRulesPage.buttons.cancelAdding);

    await rulesAPI.removeAlertRule(ruleId);
  },
);

Scenario(
  'PMM-T538 Verify user is able to disable/enable a rule from the rules list @ia @not-pr-pipeline',
  async (I, alertRulesPage, rulesAPI) => {
    const ruleName = 'QAA PSQL Enable/Disable test';
    const ruleId = await rulesAPI.createAlertRule(ruleName);

    alertRulesPage.openAlertRulesTab();
    I.waitForVisible(alertRulesPage.buttons.toggleAlertRule(ruleName), 30);
    const color = await I.grabCssPropertyFrom(alertRulesPage.elements.rulesNameCell(ruleName), 'background-color');

    I.click(alertRulesPage.buttons.toggleAlertRule(ruleName));
    alertRulesPage.verifyPopUpMessage(alertRulesPage.messages.successfullyDisabled(ruleName));
    const newColor = await I.grabCssPropertyFrom(alertRulesPage.elements.rulesNameCell(ruleName), 'background-color');

    assert.ok(color !== newColor, 'Background color should change after toggle');

    I.click(alertRulesPage.buttons.toggleAlertRule(ruleName));
    alertRulesPage.verifyPopUpMessage(alertRulesPage.messages.successfullyEnabled(ruleName));
    I.seeCssPropertiesOnElements(alertRulesPage.elements.rulesNameCell(ruleName), { 'background-color': color });
    await rulesAPI.removeAlertRule(ruleId);
  },
);

Data(rules).Scenario(
  'PMM-T515 PMM-T543 PMM-T544 PMM-T545 PMM-T574 Create Alert rule @ia @not-pr-pipeline',
  async (I, alertRulesPage, rulesAPI, templatesAPI, current) => {
    const rule = {
      template: current.template,
      templateType: current.templateType,
      ruleName: current.ruleName,
      threshold: current.threshold,
      duration: current.duration,
      severity: current.severity,
      filters: current.filters,
      channels: current.channels,
      activate: current.activate,
    };

    alertRulesPage.openAlertRulesTab();
    I.click(alertRulesPage.buttons.openAddRuleModal);
    alertRulesPage.fillRuleFields(rule);
    I.click(alertRulesPage.buttons.addRule);
    alertRulesPage.verifyPopUpMessage(alertRulesPage.messages.successfullyAdded);
    I.seeElement(alertRulesPage.elements.rulesNameCell(rule.ruleName));
    if (rule.threshold.length === 0) { rule.threshold = 80; }

    I.seeTextEquals(`${rule.threshold} %`, alertRulesPage.elements.thresholdCell(rule.ruleName));
    I.seeTextEquals(`${rule.duration} seconds`, alertRulesPage.elements.durationCell(rule.ruleName));
    I.seeTextEquals(rule.severity, alertRulesPage.elements.severityCell(rule.ruleName));
    I.seeTextEquals(rule.filters, alertRulesPage.elements.filtersCell(rule.ruleName));
    alertRulesPage.verifyRuleState(rule.activate, rule.ruleName);
  },
);

Scenario(
  'PMM-T516 Update Alert rule @ia @not-pr-pipeline',
  async (I, alertRulesPage, rulesAPI, channelsAPI, ncPage) => {
    const rule = {
      ruleName: 'QAA PSQL Update test',
      threshold: '2',
      duration: '2',
      severity: 'High',
      filters: 'service_name=pmm-server-postgresql-updated',
      channels: ['EmailChannelForRules', 'EmailChannelForEditRules'],
      activate: false,
    };
    const ruleId = await rulesAPI.createAlertRule(rule.ruleName);

    await channelsAPI.createNotificationChannel('EmailChannelForEditRules', ncPage.types.email.type);
    alertRulesPage.openAlertRulesTab();
    I.click(alertRulesPage.buttons.editAlertRule(rule.ruleName));
    alertRulesPage.fillRuleFields(rule);
    I.click(alertRulesPage.buttons.addRule);
    alertRulesPage.verifyPopUpMessage(alertRulesPage.messages.successfullyEdited);
    alertRulesPage.verifyRowValues(rule);

    await rulesAPI.removeAlertRule(ruleId);
  },
);

Scenario(
  'PMM-T566 Verify user can copy Alert rule @ia @not-pr-pipeline',
  async (I, alertRulesPage, rulesAPI) => {
    const ruleName = 'QAA PSQL duplicate test';
    const ruleId = await rulesAPI.createAlertRule(ruleName);
    const rule = {
      ruleName: `Copy of ${ruleName}`,
      threshold: '1',
      duration: '1',
      severity: 'Critical',
      filters: 'service_name=pmm-server-postgresql',
      channels: [],
      activate: false,
    };

    alertRulesPage.openAlertRulesTab();
    I.click(alertRulesPage.buttons.duplicateAlertRule(ruleName));
    alertRulesPage.verifyPopUpMessage(alertRulesPage.messages.successfullyCreated(rule.ruleName));
    alertRulesPage.verifyRowValues(rule);

    await rulesAPI.removeAlertRule(ruleId);
  },
);

Scenario(
  'PMM-T566 Verify user can delete Alert rule @ia @not-pr-pipeline',
  async (I, alertRulesPage, rulesAPI) => {
    const ruleName = 'QAA PSQL delete test';

    await rulesAPI.createAlertRule(ruleName);
    alertRulesPage.openAlertRulesTab();
    I.click(alertRulesPage.buttons.deleteAlertRule(ruleName));
    I.seeTextEquals(alertRulesPage.messages.deleteRuleModalHeader, alertRulesPage.elements.modalHeader);
    I.seeElement(alertRulesPage.buttons.closeModal, alertRulesPage.elements.modalHeader);
    I.seeTextEquals(alertRulesPage.messages.confirmDelete(ruleName),
      locate(alertRulesPage.elements.modalContent).find('h4'));
    I.seeElement(alertRulesPage.buttons.cancelDelete);
    I.seeElement(alertRulesPage.buttons.delete);
    I.click(alertRulesPage.buttons.delete);
    alertRulesPage.verifyPopUpMessage(alertRulesPage.messages.successfullyDeleted(ruleName));
    I.dontSeeElement(alertRulesPage.elements.rulesNameCell(ruleName));
  },
);

Scenario(
  'PMM-T563 Verify user can see YAML content for the User-defined Alert rule @ia @not-pr-pipeline',
  async (I, ruleTemplatesPage, alertRulesPage, rulesAPI) => {
    const ruleName = 'QAA PSQL yaml content test';
    const [, content, id] = await ruleTemplatesPage.ruleTemplate
      .templateNameAndContent('tests/ia/templates/templateForRules.yaml');

    await rulesAPI.createAlertRule(ruleName, id);
    alertRulesPage.openAlertRulesTab();
    I.click(alertRulesPage.buttons.showDetails(ruleName));
    I.seeTextEquals(content, alertRulesPage.elements.ruleDetails);
    I.click(alertRulesPage.buttons.hideDetails(ruleName));
    I.dontSeeElement(alertRulesPage.elements.ruleDetails);
  },
);
