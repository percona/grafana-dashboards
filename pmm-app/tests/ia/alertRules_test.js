const assert = require('assert');
const page = require('./pages/alertRulesPage');

const rules = new DataTable(['template', 'templateType', 'ruleName', 'threshold', 'thresholdUnit', 'duration',
  'severity', 'filters', 'channels', 'activate']);

Object.values(page.rules).forEach((rule) => {
  rules.add([rule.template, rule.templateType, rule.ruleName, rule.threshold,
    rule.thresholdUnit, rule.duration, rule.severity, rule.filters, rule.channels, rule.activate]);
});

const rulesStates = new DataTable(['disabled']);

rulesStates.add([true]);
rulesStates.add([false]);

const templates = new DataTable(['template', 'threshold', 'duration', 'severity', 'expression', 'alert']);

Object.values(page.templates).forEach((template) => {
  templates.add([template.template, template.threshold, template.duration, template.severity,
    template.expression, template.alert]);
});

Feature('IA: Alert rules').retry(2);

Before(async ({ I, settingsAPI }) => {
  await I.Authorize();
  await settingsAPI.apiEnableIA();
});

BeforeSuite(async ({
  settingsAPI, rulesAPI, templatesAPI, channelsAPI, ncPage,
}) => {
  await settingsAPI.apiEnableIA();
  await rulesAPI.clearAllRules();
  await templatesAPI.clearAllTemplates();
  await channelsAPI.clearAllNotificationChannels();
  await templatesAPI.createRuleTemplate('tests/ia/templates/templateForRules.yaml');
  await templatesAPI.createRuleTemplate('tests/ia/templates/range-empty.yaml');
  await channelsAPI.createNotificationChannel('EmailChannelForRules', ncPage.types.email.type);
});

AfterSuite(async ({
  settingsAPI, rulesAPI, templatesAPI, channelsAPI,
}) => {
  await settingsAPI.apiEnableIA();
  await rulesAPI.clearAllRules();
  await templatesAPI.clearAllTemplates();
  await channelsAPI.clearAllNotificationChannels();
});

Scenario(
  'Verify alert rules list elements @ia @not-pr-pipeline',
  async ({ I, alertRulesPage, rulesAPI }) => {
    const ruleName = 'QAA PSQL rules List test';
    const ruleId = await rulesAPI.createAlertRule({ ruleName });

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
  async ({ I, alertRulesPage }) => {
    alertRulesPage.openAlertRulesTab();
    I.click(alertRulesPage.buttons.openAddRuleModal);
    I.see(alertRulesPage.messages.addRuleModalHeader, alertRulesPage.elements.modalHeader);
    I.seeElement(alertRulesPage.buttons.closeModal);
    I.seeElement(alertRulesPage.fields.searchDropdown('Template'));
    I.seeElement(alertRulesPage.fields.ruleName);
    I.seeElement(alertRulesPage.fields.duration);
    I.seeElement(alertRulesPage.fields.searchDropdown('Severity'));
    I.seeElement(alertRulesPage.fields.filters);
    I.seeElement(alertRulesPage.fields.searchDropdown('Channels'));
    I.seeElement(alertRulesPage.buttons.toogleInModal);
    I.seeElement(alertRulesPage.buttons.addRule);
    I.seeElement(alertRulesPage.buttons.cancelAdding);
  },
);

Scenario(
  'PMM-T538 Verify user is able to disable/enable a rule from the rules list @ia @not-pr-pipeline',
  async ({ I, alertRulesPage, rulesAPI }) => {
    const ruleName = 'QAA PSQL Enable/Disable test';
    const ruleId = await rulesAPI.createAlertRule({ ruleName });

    alertRulesPage.openAlertRulesTab();
    I.waitForVisible(alertRulesPage.buttons.toggleAlertRule(ruleName), 30);
    const color = await I.grabCssPropertyFrom(alertRulesPage.elements.rulesNameCell(ruleName), 'background-color');

    I.click(alertRulesPage.buttons.toggleAlertRule(ruleName));
    I.verifyPopUpMessage(alertRulesPage.messages.successfullyDisabled(ruleName));
    const newColor = await I.grabCssPropertyFrom(alertRulesPage.elements.rulesNameCell(ruleName), 'background-color');

    assert.ok(color !== newColor, 'Background color should change after toggle');

    I.click(alertRulesPage.buttons.toggleAlertRule(ruleName));
    I.verifyPopUpMessage(alertRulesPage.messages.successfullyEnabled(ruleName));
    I.seeCssPropertiesOnElements(alertRulesPage.elements.rulesNameCell(ruleName), { 'background-color': color });
    await rulesAPI.removeAlertRule(ruleId);
  },
);

Data(templates).Scenario(
  'PMM-T750 PMM-T752 Verify parsing a template in Add Alert rule dialog @ia @not-pr-pipeline',
  async ({ I, alertRulesPage, current }) => {
    const rule = {
      template: current.template,
      threshold: current.threshold,
      duration: current.duration,
      severity: current.severity,
      expression: current.expression,
      alert: current.alert,
    };

    alertRulesPage.openAlertRulesTab();
    I.click(alertRulesPage.buttons.openAddRuleModal);

    I.waitForVisible(alertRulesPage.fields.ruleName, 30);
    alertRulesPage.searchAndSelectResult('Template', current.template);
    I.waitForVisible(alertRulesPage.elements.expression, 30);

    alertRulesPage.verifyEditRuleDialogElements(rule);
  },
);

Data(rules).Scenario(
  'PMM-T515 PMM-T543 PMM-T544 PMM-T545 PMM-T574 PMM-T596 PMM-T753 PMM-T624 Create Alert rule @ia @not-pr-pipeline',
  async ({
    I, alertRulesPage, current, rulesAPI,
  }) => {
    const rule = {
      template: current.template,
      templateType: current.templateType,
      ruleName: current.ruleName,
      threshold: current.threshold,
      thresholdUnit: current.thresholdUnit,
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
    I.verifyPopUpMessage(alertRulesPage.messages.successfullyAdded);
    I.seeElement(alertRulesPage.elements.rulesNameCell(rule.ruleName));
    if (rule.threshold.length === 0) { rule.threshold = 80; }

    alertRulesPage.verifyRowValues(rule);

    await rulesAPI.clearAllRules();
  },
);

Scenario(
  'PMM-T516 PMM-T687 Update Alert rule @ia @not-pr-pipeline',
  async ({
    I, alertRulesPage, rulesAPI, channelsAPI, ncPage,
  }) => {
    const rule = {
      ruleName: 'QAA PSQL Update test',
      template: 'PostgreSQL connections in use',
      threshold: '1',
      thresholdUnit: '%',
      duration: '1',
      severity: 'Critical',
      filters: 'service_name=pmm-server-postgresql',
      channels: '',
      activate: true,
      expression: 'sum(pg_stat_activity_count{datname!~"template.*|postgres"})\n'
        + '> pg_settings_max_connections * [[ .threshold ]] / 100',
      alert: 'PostgreSQL too many connections ({{ $labels.service_name }})',
    };
    const ruleAfterUpdate = {
      ruleName: 'QAA PSQL Update test after Update',
      threshold: '2',
      thresholdUnit: '%',
      duration: '2',
      severity: 'High',
      filters: 'service_name=pmm-server-postgresql-updated',
      channels: ['EmailChannelForRules', 'EmailChannelForEditRules'],
      activate: false,
    };
    const { ruleName } = rule;
    const ruleId = await rulesAPI.createAlertRule({ ruleName });

    await channelsAPI.createNotificationChannel('EmailChannelForEditRules', ncPage.types.email.type);
    alertRulesPage.openAlertRulesTab();
    I.click(alertRulesPage.buttons.editAlertRule(rule.ruleName));
    alertRulesPage.verifyEditRuleDialogElements(rule);
    alertRulesPage.fillRuleFields(ruleAfterUpdate);
    I.click(alertRulesPage.buttons.addRule);
    I.verifyPopUpMessage(alertRulesPage.messages.successfullyEdited);
    alertRulesPage.verifyRowValues(ruleAfterUpdate);

    await rulesAPI.removeAlertRule(ruleId);
  },
);

Data(rulesStates).Scenario(
  'PMM-T566 Verify user can copy Alert rule @ia @not-pr-pipeline',
  async ({
    I, alertRulesPage, rulesAPI, current,
  }) => {
    const rule = {
      ruleName: 'QQAA PSQL duplicate test',
      disabled: current.disabled,
    };
    const ruleCopy = {
      ruleName: `Copy of ${rule.ruleName}`,
      threshold: '1',
      thresholdUnit: '%',
      duration: '1',
      severity: 'Critical',
      filters: 'service_name=pmm-server-postgresql',
      channels: [],
      activate: false,
    };

    await rulesAPI.createAlertRule(rule);

    alertRulesPage.openAlertRulesTab();
    alertRulesPage.verifyRuleState(!rule.disabled, rule.ruleName);
    I.click(alertRulesPage.buttons.duplicateAlertRule(rule.ruleName));
    I.verifyPopUpMessage(alertRulesPage.messages.successfullyCreated(ruleCopy.ruleName));
    alertRulesPage.verifyRowValues(ruleCopy);

    await rulesAPI.clearAllRules();
  },
);

Data(rulesStates).Scenario(
  'PMM-T517 Verify user can delete Alert rule @ia @not-pr-pipeline',
  async ({
    I, alertRulesPage, rulesAPI, current,
  }) => {
    const rule = {
      ruleName: 'QAA PSQL delete test',
      disabled: current.disabled,
    };

    await rulesAPI.createAlertRule(rule);

    alertRulesPage.openAlertRulesTab();
    alertRulesPage.verifyRuleState(!rule.disabled, rule.ruleName);
    I.click(alertRulesPage.buttons.deleteAlertRule(rule.ruleName));
    I.seeTextEquals(alertRulesPage.messages.deleteRuleModalHeader, alertRulesPage.elements.modalHeader);
    I.seeElement(alertRulesPage.buttons.closeModal, alertRulesPage.elements.modalHeader);
    I.seeTextEquals(alertRulesPage.messages.confirmDelete(rule.ruleName),
      locate(alertRulesPage.elements.modalContent).find('h4'));
    I.seeElement(alertRulesPage.buttons.cancelDelete);
    I.seeElement(alertRulesPage.buttons.delete);
    I.click(alertRulesPage.buttons.delete);
    I.verifyPopUpMessage(alertRulesPage.messages.successfullyDeleted(rule.ruleName));
    I.dontSeeElement(alertRulesPage.elements.rulesNameCell(rule.ruleName));
  },
);

Scenario(
  'PMM-T639 Verify alert rule details content @ia @not-pr-pipeline',
  async ({
    I, ruleTemplatesPage, alertRulesPage, rulesAPI,
  }) => {
    const ruleName = 'QAA PSQL yaml content test';
    const ruleNameWithBuiltInTemplate = 'Rule with Built-In template';
    const exprForBuiltInTemplate = 'sum(pg_stat_activity_count{datname!~"template.*|postgres"})\n'
      + '> pg_settings_max_connections * [[ .threshold ]] / 100';
    const [,, id, expr] = await ruleTemplatesPage.ruleTemplate
      .templateNameAndContent('tests/ia/templates/templateForRules.yaml');

    await rulesAPI.createAlertRule({ ruleName }, id);
    await rulesAPI.createAlertRule({ ruleName: ruleNameWithBuiltInTemplate });
    alertRulesPage.openAlertRulesTab();
    I.click(alertRulesPage.buttons.showDetails(ruleName));
    I.seeTextEquals(expr.replace('[[ .threshold ]]', '1'),
      alertRulesPage.elements.ruleDetails);
    I.click(alertRulesPage.buttons.hideDetails(ruleName));
    I.dontSeeElement(alertRulesPage.elements.ruleDetails);
    I.click(alertRulesPage.buttons.showDetails(ruleNameWithBuiltInTemplate));
    I.seeTextEquals(exprForBuiltInTemplate.replace('[[ .threshold ]]', '1'),
      alertRulesPage.elements.ruleDetails);
    I.click(alertRulesPage.buttons.hideDetails(ruleNameWithBuiltInTemplate));
    I.dontSeeElement(alertRulesPage.elements.ruleDetails);
  },
);

Scenario(
  'PMM-T646 Verify user can not create Rule with negative duration time @ia @not-pr-pipeline',
  async ({
    I, alertRulesPage,
  }) => {
    alertRulesPage.openAlertRulesTab();
    I.click(alertRulesPage.buttons.openAddRuleModal);

    I.waitForVisible(alertRulesPage.fields.ruleName, 30);
    alertRulesPage.searchAndSelectResult('Template', 'Memory used by MongoDB');
    I.waitForVisible(alertRulesPage.elements.expression, 30);

    I.clearField(alertRulesPage.fields.duration);
    I.fillField(alertRulesPage.fields.duration, '-1');

    I.seeTextEquals('Must be greater than or equal to 1', alertRulesPage.elements.durationError);
    I.seeAttributesOnElements(alertRulesPage.buttons.addRule, { disabled: true });

    I.clearField(alertRulesPage.fields.duration);
    I.fillField(alertRulesPage.fields.duration, '1');

    I.seeTextEquals('', alertRulesPage.elements.durationError);
  },
);
