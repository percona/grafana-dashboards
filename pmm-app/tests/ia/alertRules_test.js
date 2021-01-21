const assert = require('assert');
const page = require('./pages/alertRulesPage');

const rules = new DataTable(['template', 'templateType', 'ruleName', 'threshold', 'duration',
  'severity', 'filters', 'channels', 'activate']);

for (const i in page.rules) {
  const rule = page.rules[i];
  rules.add([rule.template, rule.templateType, rule.ruleName, rule.threshold, rule.duration,
    rule.severity, rule.filters, rule.channels, rule.activate])
}

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
  await channelsAPI.createNotificationChannel('EmailChannelForRules', ncPage.types.email.type)
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
  }
);

Scenario(
  'Add alert rule modal elements @ia @not-pr-pipeline',
  async (I, alertRulesPage, rulesAPI) => {
    const ruleName = 'QAA PSQL Modal elements test';
    const ruleId = await rulesAPI.createAlertRule(ruleName);

    alertRulesPage.openAlertRulesTab();
    I.click(alertRulesPage.buttons.openAddRuleModal);
    I.see(alertRulesPage.messages.modalHeaderText, alertRulesPage.elements.modalHeader);
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
    I.seeCssPropertiesOnElements(alertRulesPage.elements.rulesNameCell(ruleName), {'background-color': color});
    await rulesAPI.removeAlertRule(ruleId);
  },
);

Data(rules).Scenario(
  'PMM-T515 PMM-T543 PMM-T544 PMM-T545 Create Alert rule @ia @not-pr-pipeline',
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
      activate: current.activate
    };

    alertRulesPage.openAlertRulesTab();
    I.click(alertRulesPage.buttons.openAddRuleModal);
    alertRulesPage.fillRuleFields(rule);
    I.click(alertRulesPage.buttons.addRule);
    alertRulesPage.verifyPopUpMessage(alertRulesPage.messages.successfullyAdded);
    I.seeElement(alertRulesPage.elements.rulesNameCell(rule.ruleName));
    I.see(`${rule.threshold} %`, alertRulesPage.elements.thresholdCell(rule.ruleName));
    I.see(`${rule.duration} seconds`, alertRulesPage.elements.durationCell(rule.ruleName));
    I.see(rule.severity, alertRulesPage.elements.severityCell(rule.ruleName));
    I.see(rule.filters, alertRulesPage.elements.filtersCell(rule.ruleName));
    alertRulesPage.verifyRuleState(rule.activate, rule.ruleName);
  },
);

Scenario(
  'PMM-T516 Update Alert rule @ia @not-pr-pipeline',
  async (I, alertRulesPage, rulesAPI, channelsAPI, ncPage) => {
    const ruleName = 'QAA PSQL Update test';
    const ruleId = await rulesAPI.createAlertRule(ruleName);
    await channelsAPI.createNotificationChannel('EmailChannelForEditRules', ncPage.types.email.type);
    const rule = {
      threshold: '2',
      duration: '2',
      severity: 'High',
      filters: 'service_name=pmm-server-postgresql-updated',
      channels: ['EmailChannelForRules', 'EmailChannelForEditRules'],
      activate: false
    };

    alertRulesPage.openAlertRulesTab();
    I.click(alertRulesPage.buttons.editAlertRule(ruleName));
    alertRulesPage.fillRuleFields(rule);
    I.click(alertRulesPage.buttons.addRule);
    alertRulesPage.verifyPopUpMessage(alertRulesPage.messages.successfullyEdited);
    I.seeElement(alertRulesPage.elements.rulesNameCell(ruleName));
    I.see(`${rule.threshold} %`, alertRulesPage.elements.thresholdCell(ruleName));
    I.see(`${rule.duration} seconds`, alertRulesPage.elements.durationCell(ruleName));
    I.see(rule.severity, alertRulesPage.elements.severityCell(ruleName));
    I.see(rule.filters, alertRulesPage.elements.filtersCell(ruleName));
    alertRulesPage.verifyRuleState(rule.activate, ruleName);

    await rulesAPI.removeAlertRule(ruleId);
  },
);
