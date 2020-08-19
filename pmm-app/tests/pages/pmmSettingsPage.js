const { I } = inject();
const assert = require('assert');

const locateLabel = (dataQA) => locate(`[data-qa="${dataQA}"]`).find('span');

module.exports = {
  url: 'graph/d/pmm-settings/pmm-settings',
  prometheusAlertUrl: '/prometheus/alerts',
  diagnosticsText:
    'You can download server logs to make the problem detection simpler. '
    + 'Please include this file if you are submitting a bug report.',
  alertManager: {
    ip: process.env.VM_IP,
    service: ':9093/#/alerts',
    rule:
      'groups:\n'
      + '  - name: AutoTestAlerts\n'
      + '    rules:\n'
      + '    - alert: InstanceDown\n'
      + '      expr: up == 0\n'
      + '      for: 20s\n'
      + '      labels:\n'
      + '        severity: critical\n'
      + '      annotations:\n'
      + '        summary: "Instance {{ $labels.instance }} down"\n'
      + '        description: "{{ $labels.instance }} of job {{ $labels.job }} has been down for more than 20 seconds."',
    editRule:
      'groups:\n'
      + '  - name: AutoTestAlertsEdited\n'
      + '    rules:\n'
      + '    - alert: InstanceDown\n'
      + '      expr: up == 0\n'
      + '      for: 60s\n'
      + '      labels:\n'
      + '        severity: critical\n'
      + '      annotations:\n'
      + '        summary: "Instance {{ $labels.instance }} down"\n'
      + '        description: "{{ $labels.instance }} of job {{ $labels.job }} has been down for more than {{ sec }} seconds."',
    ruleName: 'AutoTestAlerts',
    editRuleName: 'AutoTestAlertsEdited',
  },
  messages: {
    successPopUpMessage: 'Settings updated',
    invalidDataDurationMessage: 'Value should be in range from 1 to 3650',
    invalidDataDurationPopUpMessage: 'data_retention: should be a natural number of days',
    requiredFieldMessage: 'Required field',
    invalidSSHKeyMessage: 'Invalid SSH key.',
    successAlertmanagerMessage: 'Alertmanager settings updated',
    invalidAlertmanagerMissingSchemeMessage:
      'Invalid alert_manager_url: invalid_url - missing protocol scheme.',
    invalidAlertmanagerMissingHostMessage: 'Invalid alert_manager_url: http:// - missing host.',
    invalidAlertmanagerRulesMessage: 'Invalid alerting rules.',
  },
  sectionTabsList: [
    'Metrics resolution',
    'Advanced settings',
    'SSH key',
    'Alertmanager integration'
  ],
  sectionButtonText: {
    applyChanges: 'Apply changes',
    applySSHKey: 'Apply SSH key',
    applyAlertmanager: 'Apply Alertmanager settings',
  },

  tooltips: {
    stt: {
      text: 'Enable Security Threat Tool and get updated checks from Percona.',
      link:
        'https://www.percona.com/doc/percona-monitoring-and-management/2.x/manage/server-admin-gui.html#security-threat-tool',
    },
  },

  fields: {
    advancedLabel: '[data-qa="advanced-label"]',
    advancedButton: '[data-qa="advanced-button"]',
    addAlertRuleButton: '//span[text()="Apply Alertmanager settings"]/parent::button',
    alertRulesInput: '[data-qa="alertmanager-rules"]',
    alertURLInput: '[data-qa="alertmanager-url"]',
    alertingRules: locateLabel('form-field-alerting-rules'),
    alertmanagerUrlLabel: '[data-qa="alertmanager-url-label"]',
    alertmanagerRulesLabel: '[data-qa="alertmanager-rules-label"]',
    alertmanagerButton: '[data-qa="alertmanager-button"]',
    amUrlLabel: locateLabel('form-field-am-url'),
    applyButton: '//button[@type="submit"]',
    callHomeSwitch: '//button[@class="toggle-field ant-switch ant-switch-checked"]',
    checkForUpdatesLabel: '//div[@data-qa="settings-tab-content"]//tr[3]//td[1]//span',
    checkForUpdatesSwitch: '//div[@data-qa="settings-tab-content"]//tr[3]//td[2]//input',
    dataRetentionInput: '[data-qa="advanced-retention-input"]',
    dataRetentionLabel: locateLabel('form-field-data-retention'),
    diagnosticsButton: '[data-qa="diagnostics-button"]',
    diagnosticsLabel: '[data-qa="diagnostics-label"]',
    downloadLogsButton: '//a[@class="ant-btn" and @href="/logs.zip"]',
    iframe: '//div[@class="panel-content"]//iframe',
    metricsResolutionButton: '[data-qa="metrics-resolution-button"]',
    metricsResolution: '//div[@data-qa="metrics-resolution-radio-button-group"]/label[text()="',
    metricsResolutionLabel: '[data-qa="metrics-resolution-label"]',
    metricsResolutionRadio: '[data-qa="metrics-resolution-radio-button-group"]',
    lowInput: '[data-qa="metrics-resolution-lr-input"]',
    mediumInput: '[data-qa="metrics-resolution-mr-input"]',
    highInput: '[data-qa="metrics-resolution-hr-input"]',
    popUpTitle: '//div[@class="alert-title"]',
    sectionHeader: '//div[@class="ant-collapse-header"]',
    selectedResolution: 'span.ant-slider-mark-text-active',
    sshKeyInput: '[data-qa="ssh-key"]',
    sshKeyLabel: locateLabel('ssh-key-label'),
    sshKeyButton: '[data-qa="ssh-key-button"]',
    sttLabel: '//div[@data-qa="settings-tab-content"]//tr[4]//td[1]//span',
    sttLabelTooltipSelector: '//div[@data-qa="settings-tab-content"]//tr[4]//td[1]//i',
    sttSwitchSelector: '//div[@data-qa="settings-tab-content"]//tr[4]//td[2]//input',
    sttSwitchSelectorLabel: '//div[@data-qa="settings-tab-content"]//tr[4]//td[2]//label',
    sttSwitchClickable: '//div[@data-qa="settings-tab-content"]//tr[4]//td[2]//span',
    subSectionHeader: '//following-sibling::div//div[@class="ant-collapse-header"]',
    telemetrySwitchSelector: '//div[@data-qa="settings-tab-content"]//tr[2]//td[2]//input',
    telemetrySwitchSelectorLabel: '//div[@data-qa="settings-tab-content"]//tr[2]//td[2]//label',
    telemetrySwitchClickable: '//div[@data-qa="settings-tab-content"]//tr[2]//td[2]//span',
    telemetryLabel: '//div[@data-qa="settings-tab-content"]//tr[2]//td[1]//span',
    tooltipSelector: '.popper__background',
    validationMessage: 'span.error-message',
    tabsSection: '[data-qa="settings-tabs"]',
    tabContent: '[data-qa="settings-tab-content"]'
  },

  async waitForPmmSettingsPageLoaded() {
    I.waitForVisible(this.fields.tabsSection, 30);
    I.waitForVisible(this.fields.tabContent, 30);
    I.waitForVisible(this.fields.diagnosticsLabel, 30);
    I.waitForVisible(this.fields.diagnosticsButton, 30);
  },
  async expandSection(sectionName, expectedContentLocator) {
    const sectionExpandLocator = `//ul[@data-qa="settings-tabs"]//li[contains(text(), '${sectionName}')]`;

    I.click(sectionExpandLocator);
    I.waitForVisible(expectedContentLocator, 30);
  },

  async verifyPopUpMessage(successMessage) {
    I.waitForVisible(this.fields.popUpTitle, 30);
    I.see(successMessage, this.fields.popUpTitle);
  },

  async verifyValidationMessage(validationMessage) {
    I.waitForVisible(this.fields.validationMessage, 30);
    I.see(validationMessage, this.fields.validationMessage);
  },

  async selectMetricsResolution(resolution) {
    I.waitForElement(`${this.fields.metricsResolution + resolution}"]`, 30);
    I.click(`${this.fields.metricsResolution + resolution}"]`);
    I.click(this.fields.metricsResolutionButton);
  },

  async verifySelectedResolution(resolution) {
    const selector = `${this.fields.metricsResolution + resolution}"]`;

    I.waitForElement(selector, 30);
    const className = await I.grabAttributeFrom(selector, 'class');

    assert.equal(className.includes('active'), true, 'Metric resolution should be active');
  },

  customClearField(field) {
    I.appendField(field, '');
    I.pressKey(['Control', 'a']);
    I.pressKey('Backspace');
  },

  changeDataRetentionValueTo(days) {
    this.customClearField(this.fields.dataRetentionInput);
    I.fillField(this.fields.dataRetentionInput, days);
    I.moveCursorTo(this.fields.advancedButton);
    I.click(this.fields.advancedButton);
  },

  addSSHKey(keyValue) {
    I.fillField(this.fields.sshKeyInput, keyValue);
    I.click(this.fields.sshKeyButton);
  },

  addAlertmanagerRule(url, rule) {
    this.customClearField(this.fields.alertURLInput);
    I.fillField(this.fields.alertURLInput, url);
    this.customClearField(this.fields.alertRulesInput);
    I.fillField(this.fields.alertRulesInput, rule);
    I.click(this.fields.alertmanagerButton);
  },

  openAlertsManagerUi() {
    I.amOnPage(this.prometheusAlertUrl);
  },

  async verifyAlertmanagerRuleAdded(ruleName) {
    for (let i = 0; i < 10; i++) {
      const notLoaded = await I.grabNumberOfVisibleElements(`//td[contains(text(), '${ruleName}')]`);

      if (notLoaded) {
        break;
      }

      I.refreshPage();
      I.wait(1);
    }

    I.see(ruleName);
  },

  async verifyTooltip(tooltipObj) {
    I.see(tooltipObj.text, this.fields.tooltipSelector);
    I.seeAttributesOnElements(`${this.fields.tooltipSelector} > div > a`, { href: tooltipObj.link });
  },

  verifySwitch(switchSelector, expectedSwitchState = 'on') {
    switch (expectedSwitchState) {
      case 'on':
        I.seeCheckboxIsChecked(switchSelector);
        break;
      case 'off':
        I.dontSeeCheckboxIsChecked(switchSelector);
        break;
      default:
    }
  },

  async verifySwitchStateIs(switchSelector, enabled = true) {
    const className = await I.grabAttributeFrom(switchSelector, 'class');

    if (enabled) {
      assert.equal(className.includes('disabled'), false, 'Switch should be enabled');
    } else {
      assert.equal(className.includes('disabled'), true, 'Switch should be disabled');
    }
  },
};
