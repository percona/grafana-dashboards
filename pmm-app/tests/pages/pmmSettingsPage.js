const { I } = inject();
const assert = require('assert');

const locateLabel = (dataQA) => locate(`[data-qa="${dataQA}"]`).find('span');

module.exports = {
  url: 'graph/d/pmm-settings/pmm-settings',
  prometheusAlertUrl: '/prometheus/rules',
  diagnosticsText:
    'You can download server logs to make the problem detection simpler. '
    + 'Please include this file if you are submitting a bug report.',
  agreementText:
    'Check here to indicate that you have read and agree to the \nTerms of Service\n and \nPrivacy Policy',
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
  sectionTabsList: {
    metrics: 'Metrics Resolution',
    advanced: 'Advanced Settings',
    ssh: 'SSH Key',
    alertmanager: 'Alertmanager Integration',
  },
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
    advancedLabel: '$advanced-label',
    advancedButton: '$advanced-button',
    addAlertRuleButton: '//span[text()="Apply Alertmanager settings"]/parent::button',
    alertRulesInput: '$alertmanager-rules',
    alertURLInput: '$alertmanager-url',
    alertingRules: locateLabel('form-field-alerting-rules'),
    alertmanagerUrlLabel: '$alertmanager-url-label',
    alertmanagerRulesLabel: '$alertmanager-rules-label',
    alertmanagerButton: '$alertmanager-button',
    amUrlLabel: locateLabel('form-field-am-url'),
    applyButton: '//button[@type="submit"]',
    callHomeSwitch: '//button[@class="toggle-field ant-switch ant-switch-checked"]',
    checkForUpdatesLabel: '//div[@data-qa="advanced-updates"]//div//span',
    checkForUpdatesSwitch: '//div[@data-qa="advanced-updates"]//div[2]//input',
    dataRetentionInput: '$advanced-retention-input',
    dataRetentionLabel: locateLabel('form-field-data-retention'),
    diagnosticsButton: '$diagnostics-button',
    diagnosticsLabel: '$diagnostics-label',
    downloadLogsButton: '//a[@class="ant-btn" and @href="/logs.zip"]',
    diagnosticsInfo: '//div[@data-qa="diagnostics-label"]/div/div',
    iframe: '//div[@class="panel-content"]//iframe',
    metricsResolutionButton: '$metrics-resolution-button',
    metricsResolution: '//div[@data-qa="metrics-resolution-radio-button-group"]/label[text()="',
    metricsResolutionLabel: '$metrics-resolution-label',
    metricsResolutionRadio: '$metrics-resolution-radio-button-group',
    loginButton: '$sign-in-submit-button',
    lowInput: '$metrics-resolution-lr-input',
    mediumInput: '$metrics-resolution-mr-input',
    highInput: '$metrics-resolution-hr-input',
    popUpTitle: '//div[@class="alert-title"]',
    perconaPlatformLink: '//li[contains(text(), \'Percona Platform\')]',
    privacyPolicy: '//span[contains(text(), "Privacy Policy")]',
    sectionHeader: '//div[@class="ant-collapse-header"]',
    selectedResolution: 'span.ant-slider-mark-text-active',
    signInEmail: '$sign-in-email-input',
    signInPassword: '$sign-in-password-input',
    sshKeyInput: '$ssh-key',
    sshKeyLabel: locateLabel('ssh-key-label'),
    sshKeyButton: '$ssh-key-button',
    sttLabel: '//div[@data-qa="advanced-stt"]//div//span',
    sttLabelTooltipSelector: '//div[@data-qa="advanced-stt"]//div//div//div//div',
    sttSwitchSelectorInput: '//div[@data-qa="advanced-stt"]//div[2]//input',
    sttSwitchSelector: '//div[@data-qa="advanced-stt"]//div[2]//label',
    subSectionHeader: '//following-sibling::div//div[@class="ant-collapse-header"]',
    signUpEmail: '$sign-up-email-input',
    signUpPassword: '$sign-up-password-input',
    signUpAgreementLabel: '$sign-up-agreement-checkbox-label',
    signUpButton: '$sign-up-submit-button',
    singInToSignUpButton: '$sign-in-to-sign-up-button',
    signUpBackToLogin: '$sign-up-to-sign-in-button',
    telemetrySwitchSelectorInput: '//div[@data-qa="advanced-telemetry"]//div[2]//input',
    telemetrySwitchSelector: '//div[@data-qa="advanced-telemetry"]//div[2]//label',
    telemetryLabel: '//div[@data-qa="advanced-telemetry"]//div//span',
    tooltipSelector: '.popper__background',
    tabsSection: '$settings-tabs',
    tabContent: '$settings-tab-content',
    termsOfService: '//span[contains(text(), "Terms of Service")]',
    validationMessage: 'span.error-message',
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
};
