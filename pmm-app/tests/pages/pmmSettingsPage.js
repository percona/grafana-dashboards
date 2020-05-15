const { I } = inject();
const assert = require('assert');
module.exports = {
  // insert your locators and methods here
  // setting locators
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
    requiredFieldMessage: 'Required field',
    invalidSSHKeyMessage: 'Invalid SSH key.',
    successAlertmanagerMessage: 'Alert manager settings updated',
    invalidAlertmanagerMissingSchemeMessage:
      'Invalid alert_manager_url: invalid_url - missing protocol scheme.',
    invalidAlertmanagerMissingHostMessage: 'Invalid alert_manager_url: http:// - missing host.',
    invalidAlertmanagerRulesMessage: 'Invalid Alert Manager rules.',
  },
  sectionHeaderList: [
    'Settings',
    'Advanced settings',
    'SSH Key Details',
    'Alertmanager integration',
    'Diagnostics',
  ],

  tooltips : {
    stt: {
      text: "Enable Security Threat Tool and get updated checks from Percona",
      link: "https://www.percona.com/doc/percona-monitoring-and-management/2.x/manage/server-admin-gui.html#security-threat-tool"
    },

  },

  sectionButtonText: {
    applyChanges: 'Apply changes',
    applySSHKey: 'Apply SSH key',
    addAlert: 'Apply Alertmanager settings',
    downloadLogs: 'Download PMM Server Logs',
  },
  fields: {
    iframe: "//div[@class='panel-content']//iframe",
    sectionHeader: "//div[@class='ant-collapse-header']",
    sectionRow: '//strong',
    diagnosticsSectionRow: "//div[@class='ant-row']",
    dataRetentionCount: "//input[@name='data_retention_count']",
    callHomeSwitch: "//button[@class='toggle-field ant-switch ant-switch-checked']",
    subSectionHeader: "/following-sibling::div//div[@class='ant-collapse-header']",
    applyButton: "//button[@type='submit']",
    addSSHKeyButton: "//span[text()='Apply SSH key']/parent::button",
    sshKeyInput: "//textarea[@name='ssh_key' and @placeholder='Enter ssh key']",
    alertURLInput: "//input[@name='alert_manager_url' and @placeholder='Enter URL']",
    alertRulesInput: "//textarea[@name='alert_manager_rules' and @placeholder='Alerting rules']",
    addAlertRuleButton: "//span[text()='Apply Alertmanager settings']/parent::button",
    downloadLogsButton: "//a[@class='ant-btn' and @href='/logs.zip']",
    metricsResolution: "//div[@class='ant-slider-mark']/span[text()='",
    metricsResolutionSlider: "//div[@class='ant-slider-rail']",
    popUpTitle: "//div[@class='alert-title']",
    validationMessage: "//span[@class='error-message']",
    selectedResolution: "//span[@class='ant-slider-mark-text ant-slider-mark-text-active']",
    sttSwitchSelector: "//strong[text()='Security Threat Tool']/parent::div/following-sibling::div/button",
    telemetrySwitchSelector: "//strong[text()='Telemetry']/parent::div/following-sibling::div/button",
    sttLabelTooltipSelector: "//strong[text()='Security Threat Tool']/following-sibling::span/i",
    tooltipSelector: ".ant-tooltip-inner"
  },

  waitForPmmSettingsPageLoaded() {
    I.waitForVisible(this.fields.applyButton, 30);
    I.waitForVisible(this.fields.sectionHeader, 30);
    I.waitForVisible(this.fields.callHomeSwitch, 30);
  },

  verifySettingsSectionElements() {
    I.see('Metrics resolution', this.fields.sectionRow);
    I.seeElement(this.fields.metricsResolutionSlider);
    I.see('Data retention', this.fields.sectionRow);
    I.seeElement(this.fields.dataRetentionCount);
    I.see('Telemetry', this.fields.sectionRow);
    I.seeElement(this.fields.callHomeSwitch);
    I.see('Check for updates', this.fields.sectionRow);
    I.seeElement(this.fields.sttSwitchSelector);
  },

  verifySSHKeyDetailsSectionElements() {
    I.see('SSH key', this.fields.sectionRow);
    I.seeElement(this.fields.sshKeyInput);
  },

  verifyAlertmanagerSectionElements() {
    I.see('Alertmanager URL', this.fields.sectionRow);
    I.see('Prometheus Alerting rules', this.fields.sectionRow);
    I.seeElement(this.fields.alertURLInput);
    I.seeElement(this.fields.alertRulesInput);
  },

  verifyDiagnosticsElements() {
    I.see(this.diagnosticsText, this.fields.diagnosticsSectionRow);
  },

  async verifySectionHeaders() {
    for (let i = 0; i < this.sectionHeaderList.length; i++) {
      const elementText = await I.grabTextFrom(this.fields.sectionHeader);
      assert.equal(
        elementText[i],
        this.sectionHeaderList[i],
        `${this.sectionHeaderList[i]} section does not exist"`
      );
    }
  },
  async waitForButton(contentLocator, contentLocatorText) {
    I.waitForVisible(contentLocator, 30);
    I.waitForEnabled(contentLocator, 30);
  },

  async expandSection(sectionName, expectedContentLocatorText) {
    const sectionExpandLocator = this.fields.sectionHeader + `[contains(text(), '${sectionName}')]`;
    const contentLocator =
      sectionExpandLocator + `/following-sibling::div//span[text()='${expectedContentLocatorText}']`;
    I.click(sectionExpandLocator);
    await this.waitForButton(contentLocator, expectedContentLocatorText);
  },

  collapseSection(sectionName) {
    const sectionHeaderLocator = this.fields.sectionHeader + `[contains(text(), '${sectionName}')]`;
    I.click(sectionHeaderLocator);
    I.waitForInvisible(this.fields.applyButton, 30);
  },

  collapseDefaultSection() {
    this.collapseSection('Settings');
  },

  async verifySectionExpanded(contentLocator, contentLocatorText) {
    const textInside = await I.grabTextFrom(contentLocator);
    assert.equal(
      textInside,
      contentLocatorText,
      `there is no ${contentLocatorText} button, we have ${textInside}`
    );
  },

  waitForPopUp() {
    I.waitForVisible(this.fields.popUpTitle, 30);
  },

  waitForValidationMessage() {
    I.waitForVisible(this.fields.validationMessage, 30);
  },

  async verifyPopUpMessage(validationMessage) {
    const alertText = await I.grabTextFrom(this.fields.popUpTitle);
    assert.equal(
      alertText.toString().split(',')[0],
      validationMessage,
      `Unexpected popup message! 
                        Expected to see ${validationMessage} instead of ${alertText}`
    );
  },

  async verifyMessage(validationMessage) {
    const validationText = await I.grabTextFrom(this.fields.validationMessage);
    assert.equal(
      validationText.toString().split(',')[0],
      validationMessage,
      `Unexpected popup message! 
                        Expected to see ${validationMessage} instead of ${validationText}`
    );
  },

  async verifySuccessfulPopUp(successMessage) {
    await this.waitForPopUp();
    await this.verifyPopUpMessage(successMessage);
  },

  async verifyValidationPopUp(validationMessage) {
    await this.waitForPopUp();
    await this.verifyPopUpMessage(validationMessage);
  },

  async verifyValidationMessage(validationMessage) {
    await this.waitForValidationMessage();
    await this.verifyMessage(validationMessage);
  },

  async selectMetricsResolution(resolution) {
    I.click(this.fields.metricsResolution + resolution + "']");
    I.click(this.fields.applyButton);
  },

  async verifyResolutionIsApplied(resolution) {
    I.refreshPage();
    this.waitForPmmSettingsPageLoaded();
    const selectedResolutionText = await I.grabTextFrom(this.fields.selectedResolution);

    assert.equal(
      selectedResolutionText,
      resolution,
      `Resolution ${resolution} was not saved,
                        actual resolution is ${selectedResolutionText}`
    );
  },

  async verifyResolutionAndDataRetentionApplied(resolutionValue, dataRetentionValue) {
    await this.verifyResolutionIsApplied(resolutionValue);
    await this.verifyDataRetentionValueApplied(dataRetentionValue);
  },

  customClearField(field) {
    I.appendField(field, '');
    I.pressKey(['Control', 'a']);
    I.pressKey('Backspace');
  },

  changeDataRetentionValueTo(days) {
    this.customClearField(this.fields.dataRetentionCount);
    I.fillField(this.fields.dataRetentionCount, days);
    I.waitForClickable(this.fields.applyButton, 30);
    I.moveCursorTo(this.fields.applyButton);
    I.click(this.fields.applyButton);
  },

  changeDataRetentionValue(days) {
    this.customClearField(this.fields.dataRetentionCount);
    I.fillField(this.fields.dataRetentionCount, days);
    I.wait(2);
  },

  async verifyDataRetentionValueApplied(seconds) {
    this.waitForPmmSettingsPageLoaded();
    const selectedTimeValue = await I.grabAttributeFrom(this.fields.dataRetentionCount, 'value');
    assert.equal(
      selectedTimeValue,
      seconds,
      `Data Retention value ${seconds} was not saved, 
                        actual value is ${selectedTimeValue}`
    );
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
    I.seeAttributesOnElements(`${this.fields.tooltipSelector} > div > a`, {href: tooltipObj.link});
  },

  verifySwitch(switchSelector, expectedSwitchState= 'on') {
    let expectedSwitch;
    switch (expectedSwitchState){
      case 'on':
        expectedSwitch = {'aria-checked':'true'};
        break;
      case 'off':
        expectedSwitch = {'aria-checked':'false'};
        break;
    }
  },

  verifySwitchStateIs(switchSelector, enabled = true) {
    switchSelector = switchSelector+'[@disabled]';
    if (!enabled) {
      I.seeElement(switchSelector);
    } else {
      I.dontSeeElement(switchSelector)
    }
  },

};
