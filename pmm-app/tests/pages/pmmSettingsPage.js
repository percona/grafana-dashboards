const { I } = inject();

const locateLabel = (dataQA) => locate(`[data-qa="${dataQA}"]`).find('span');

module.exports = {
  url: 'graph/d/pmm-settings/pmm-settings',
  prometheusAlertUrl: '/prometheus/alerts',
  diagnosticsText:
    'You can download server logs to make the problem detection simpler. ' +
    'Please include this file if you are submitting a bug report.',
  alertManager: {
    ip: process.env.VM_IP,
    service: ':9093/#/alerts',
    rule:
      'groups:\n' +
      '  - name: AutoTestAlerts\n' +
      '    rules:\n' +
      '    - alert: InstanceDown\n' +
      '      expr: up == 0\n' +
      '      for: 20s\n' +
      '      labels:\n' +
      '        severity: critical\n' +
      '      annotations:\n' +
      '        summary: "Instance {{ $labels.instance }} down"\n' +
      '        description: "{{ $labels.instance }} of job {{ $labels.job }} has been down for more than 20 seconds."',
    editRule:
      'groups:\n' +
      '  - name: AutoTestAlertsEdited\n' +
      '    rules:\n' +
      '    - alert: InstanceDown\n' +
      '      expr: up == 0\n' +
      '      for: 60s\n' +
      '      labels:\n' +
      '        severity: critical\n' +
      '      annotations:\n' +
      '        summary: "Instance {{ $labels.instance }} down"\n' +
      '        description: "{{ $labels.instance }} of job {{ $labels.job }} has been down for more than 20 seconds."',
    ruleName: 'AutoTestAlerts',
    editRuleName: 'AutoTestAlertsEdited',
  },
  messages: {
    successPopUpMessage: 'Settings updated',
    invalidDataDurationMessage: 'Value should be in range from 1 to 3650',
    invalidDataDurationPopUpMessage: 'data_retention: should be a natural number of days',
    requiredFieldMessage: 'Required field',
    invalidSSHKeyMessage: 'Invalid SSH key.',
    successAlertmanagerMessage: 'Alert manager settings updated',
    invalidAlertmanagerMissingSchemeMessage:
      'Invalid alert_manager_url: invalid_url - missing protocol scheme.',
    invalidAlertmanagerMissingHostMessage: 'Invalid alert_manager_url: http:// - missing host.',
    invalidAlertmanagerRulesMessage: 'Invalid alerting rules.',
  },
  sectionHeaderList: [
    'Settings',
    'Advanced settings',
    'SSH Key Details',
    'Alertmanager integration',
    'Diagnostics',
  ],

  tooltips: {
    stt: {
      text: 'Enable Security Threat Tool and get updated checks from Percona',
      link:
        'https://www.percona.com/doc/percona-monitoring-and-management/2.x/manage/server-admin-gui.html#security-threat-tool',
    },
  },

  sectionButtonText: {
    applyChanges: 'Apply changes',
    applySSHKey: 'Apply SSH key',
    addAlert: 'Apply Alertmanager settings',
    downloadLogs: 'Download PMM Server Logs',
  },
  fields: {
    addAlertRuleButton: '//span[text()="Apply Alertmanager settings"]/parent::button',
    addSSHKeyButton: '//span[text()="Apply SSH key"]/parent::button',
    alertRulesInput: '//textarea[@name="alert_manager_rules" and @placeholder="Alerting rules"]',
    alertURLInput: '//input[@name="alert_manager_url" and @placeholder="Enter URL"]',
    alertingRules: locateLabel('form-field-alerting-rules'),
    amUrlLabel: locateLabel('form-field-am-url'),
    applyButton: '//button[@type="submit"]',
    callHomeSwitch: '//button[@class="toggle-field ant-switch ant-switch-checked"]',
    checkForUpdatesLabel: locateLabel('form-field-check-for-updates'),
    dataRetentionCount: locate('input').withAttr({ name: 'data_retention_count' }),
    dataRetentionLabel: locateLabel('form-field-data-retention'),
    diagnosticsSectionRow: '//div[@class="ant-row"]',
    downloadLogsButton: '//a[@class="ant-btn" and @href="/logs.zip"]',
    iframe: '//div[@class="panel-content"]//iframe',
    metricsResolution: '//div[@class="ant-slider-mark"]/span[text()="',
    metricsResolutionLabel: locateLabel('form-field-metrics'),
    metricsResolutionSlider: '.ant-slider-rail',
    popUpTitle: '//div[@class="alert-title"]',
    sectionHeader: '//div[@class="ant-collapse-header"]',
    selectedResolution: 'span.ant-slider-mark-text-active',
    sshKeyInput: '//textarea[@name="ssh_key" and @placeholder="Enter ssh key"]',
    sshKeyLabel: locateLabel('form-field-ssh-key'),
    sttLabelTooltipSelector: '//span[text()="Security Threat Tool"]/following-sibling::span/i',
    sttSwitchSelector: '//span[text()="Security Threat Tool"]/parent::div/following-sibling::div/button',
    subSectionHeader: '//following-sibling::div//div[@class="ant-collapse-header"]',
    telemetrySwitchSelector: '[data-qa="form-field-telemetry"] button',
    telemetryLabel: locateLabel('form-field-telemetry'),
    tooltipSelector: '.ant-tooltip-inner',
    validationMessage: 'span.error-message',
    expandedSection: '.ant-collapse-content-active',
  },

  async waitForPmmSettingsPageLoaded() {
    I.waitForVisible(this.fields.expandedSection, 30);
    await within(this.fields.expandedSection, () => {
      I.waitForVisible(this.fields.applyButton, 30);
      I.waitForVisible(this.fields.sectionHeader, 30);
      I.waitForVisible(this.fields.telemetrySwitchSelector, 30);
      I.waitForVisible(this.fields.sttSwitchSelector, 30);
    });
  },

  async expandSection(sectionName, expectedContentLocatorText) {
    const sectionExpandLocator = `${this.fields.sectionHeader}[contains(text(), '${sectionName}')]`;
    const contentLocator = `${sectionExpandLocator}/following-sibling::div//span[text()='${expectedContentLocatorText}']`;

    I.click(sectionExpandLocator);
    I.waitForVisible(contentLocator, 30);
  },

  collapseSection(sectionName) {
    const sectionHeaderLocator = `${this.fields.sectionHeader}[contains(text(), '${sectionName}')]`;

    I.click(sectionHeaderLocator);
    I.waitForInvisible(this.fields.applyButton, 30);
  },

  collapseDefaultSection() {
    this.collapseSection('Settings');
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
    I.click(`${this.fields.metricsResolution + resolution}"]`);
    I.click(this.fields.applyButton);
  },

  customClearField(field) {
    I.appendField(field, '');
    I.pressKey(['Control', 'a']);
    I.pressKey('Backspace');
  },

  changeDataRetentionValueTo(days) {
    this.customClearField(this.fields.dataRetentionCount);
    I.fillField(this.fields.dataRetentionCount, days);
    I.moveCursorTo(this.fields.applyButton);
    I.click(this.fields.applyButton);
  },

  addSSHKey(keyValue) {
    I.fillField(this.fields.sshKeyInput, keyValue);
    I.click(this.fields.addSSHKeyButton);
  },

  addAlertmanagerRule(url, rule) {
    this.customClearField(this.fields.alertURLInput);
    I.fillField(this.fields.alertURLInput, url);
    this.customClearField(this.fields.alertRulesInput);
    I.fillField(this.fields.alertRulesInput, rule);
    I.click(this.fields.addAlertRuleButton);
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
    let expectedSwitch;

    switch (expectedSwitchState) {
      case 'on':
        expectedSwitch = { 'aria-checked': 'true' };
        I.seeAttributesOnElements(switchSelector, expectedSwitch);
        break;
      case 'off':
        expectedSwitch = { 'aria-checked': 'false' };
        I.seeAttributesOnElements(switchSelector, expectedSwitch);
        break;
    }
  },

  verifySwitchStateIs(switchSelector, enabled = true) {
    const switchLocator = locate(switchSelector).withAttr({ disabled: '' });

    if (!enabled) {
      I.seeElement(switchLocator);
    } else {
      I.dontSeeElement(switchLocator);
    }
  },
};
