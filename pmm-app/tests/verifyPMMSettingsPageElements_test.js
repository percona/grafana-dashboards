const page = require('./pages/pmmSettingsPage');

const validationValues = ['text ', '2147483648', '-1', '<script>alert(test);</script>'];

const dataRetentionTable = new DataTable(['value', 'message']);

for (const i in validationValues) {
  dataRetentionTable.add([validationValues[i], page.messages.invalidDataDurationMessage]);
}

dataRetentionTable.add(['', page.messages.requiredFieldMessage]);

Feature('PMM Settings Page Elements and Validations');

Before(async (I, pmmSettingsPage) => {
  I.Authorize();
  I.amOnPage(pmmSettingsPage.url);
});

Scenario(
  'Verify Section Tabs and Metrics Section Elements [critical]',
  async (I, pmmSettingsPage) => {
    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    for (const i in pmmSettingsPage.sectionTabsList) {
      I.see(pmmSettingsPage.sectionTabsList[i], pmmSettingsPage.fields.tabsSection);
    }

    await within(pmmSettingsPage.fields.tabContent, () => {
      I.waitForElement(pmmSettingsPage.fields.metricsResolutionLabel, 30);
      I.see('Metrics resolution, sec', pmmSettingsPage.fields.metricsResolutionLabel);
      I.seeElement(pmmSettingsPage.fields.metricsResolutionRadio);
      I.seeElement(pmmSettingsPage.fields.lowInput);
      I.seeElement(pmmSettingsPage.fields.mediumInput);
      I.seeElement(pmmSettingsPage.fields.highInput);
    });
  }
);

Scenario('Verify SSH Key Section Elements', async (I, pmmSettingsPage) => {
  const sectionNameToExpand = 'SSH key';

  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.sshKeyButton);
  I.see('SSH key', pmmSettingsPage.fields.sshKeyLabel);
  I.seeElement(pmmSettingsPage.fields.sshKeyInput);
});

Scenario(
  'Verify Advanced Section Elements',
  async (I, pmmSettingsPage) => {
    const sectionNameToExpand = 'Advanced settings';

    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.advancedButton);
    I.see('Data retention', pmmSettingsPage.fields.advancedLabel);
    I.see('Telemetry', pmmSettingsPage.fields.telemetryLabel);
    I.see('Check for updates', pmmSettingsPage.fields.checkForUpdatesLabel);
    I.see('Security Threat Tool', pmmSettingsPage.fields.sttLabel);
    I.seeElement(pmmSettingsPage.fields.telemetrySwitchSelector);
    I.seeElement(pmmSettingsPage.fields.telemetryLabel);
    I.seeElement(pmmSettingsPage.fields.checkForUpdatesSwitch);
    I.seeElement(pmmSettingsPage.fields.checkForUpdatesLabel);
    I.seeElement(pmmSettingsPage.fields.sttSwitchSelector);
    I.seeElement(pmmSettingsPage.fields.sttLabel);
  }
);

Scenario(
  'Verify Alertmanager integration Section Elements',
  async (I, pmmSettingsPage) => {
    const sectionNameToExpand = 'Alertmanager integration';

    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.alertmanagerButton);
    I.see('Alertmanager URL', pmmSettingsPage.fields.alertmanagerUrlLabel);
    I.see('Prometheus Alerting rules', pmmSettingsPage.fields.alertmanagerRuleslabel);
    I.seeElement(pmmSettingsPage.fields.alertURLInput);
    I.seeElement(pmmSettingsPage.fields.alertRulesInput);
  }
);

Scenario('Verify validation for invalid SSH Key', async (I, pmmSettingsPage) => {
  const sshKeyForTest = 'ssh-rsa testKey test@key.local';
  const sectionNameToExpand = 'SSH key';

  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.sshKeyButton);
  pmmSettingsPage.addSSHKey(sshKeyForTest);
  await pmmSettingsPage.verifyPopUpMessage(pmmSettingsPage.messages.invalidSSHKeyMessage);
});

Scenario(
  'Verify validation for Alertmanager URL without scheme',
  async (I, pmmSettingsPage) => {
    const urlWithoutScheme = 'invalid_url';
    const sectionNameToExpand = 'Alertmanager integration';

    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.alertmanagerButton);
    pmmSettingsPage.addAlertmanagerRule(urlWithoutScheme, '');
    await pmmSettingsPage.verifyPopUpMessage(
      pmmSettingsPage.messages.invalidAlertmanagerMissingSchemeMessage
    );
  }
);

Scenario(
  'Verify validation for Alertmanager URL without host',
  async (I, pmmSettingsPage) => {
    const urlWithoutHost = 'http://';
    const sectionNameToExpand = 'Alertmanager integration';

    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.alertmanagerButton);
    pmmSettingsPage.addAlertmanagerRule(urlWithoutHost, '');
    await pmmSettingsPage.verifyPopUpMessage(
      pmmSettingsPage.messages.invalidAlertmanagerMissingHostMessage
    );
  }
);

Scenario(
  'Verify validation for invalid Alertmanager Rule',
  async (I, pmmSettingsPage) => {
    const rule = 'invalid_rule';
    const sectionNameToExpand = 'Alertmanager integration';

    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.alertmanagerButton);
    pmmSettingsPage.addAlertmanagerRule('', rule);
    await pmmSettingsPage.verifyPopUpMessage(pmmSettingsPage.messages.invalidAlertmanagerRulesMessage);
  }
);

// Skip, need to investigate will roll back
xScenario(
  'PMM-T254 Verify validation for STT and Telemetry switches',
  async (I, pmmSettingsPage, settingsAPI) => {
    await settingsAPI.apiDisableSTT();
    I.amOnPage(pmmSettingsPage.url);
    const sectionNameToExpand = 'Advanced settings';

    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.advancedButton);
    pmmSettingsPage.verifySwitch(pmmSettingsPage.fields.telemetrySwitchSelector, 'on');
    pmmSettingsPage.verifySwitch(pmmSettingsPage.fields.sttSwitchSelector, 'off');
    I.click(pmmSettingsPage.fields.telemetrySwitchClickable);
    pmmSettingsPage.verifySwitch(pmmSettingsPage.fields.telemetrySwitchSelector, 'off');
    await pmmSettingsPage.verifySwitchStateIs(pmmSettingsPage.fields.sttSwitchSelectorLabel, false);
    I.click(pmmSettingsPage.fields.telemetrySwitchClickable);
    pmmSettingsPage.verifySwitch(pmmSettingsPage.fields.telemetrySwitchSelector, 'on');
    await pmmSettingsPage.verifySwitchStateIs(pmmSettingsPage.fields.sttSwitchSelectorLabel, true);
    I.click(pmmSettingsPage.fields.sttSwitchClickable);
    pmmSettingsPage.verifySwitch(pmmSettingsPage.fields.sttSwitchSelector, 'on');
    await pmmSettingsPage.verifySwitchStateIs(pmmSettingsPage.fields.sttSwitchSelectorLabel, true);
    pmmSettingsPage.verifySwitch(pmmSettingsPage.fields.telemetrySwitchSelector, 'on');
    await pmmSettingsPage.verifySwitchStateIs(pmmSettingsPage.fields.telemetrySwitchSelectorLabel, false);
  }
).retry(2);

// To be removed from Skip after https://jira.percona.com/browse/PMM-5791
xScenario(
  'PMM-T227 Open PMM Settings page and verify DATA_RETENTION value is set to 2 days @not-pr-pipeline',
  async (I, pmmSettingsPage) => {
    const dataRetention = '2';

    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    I.waitForValue(pmmSettingsPage.fields.dataRetentionCount, dataRetention, 30);
  }
);
