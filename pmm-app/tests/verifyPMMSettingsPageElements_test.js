const assert = require('assert');

Feature('PMM Settings Page Elements and Validations');

Before(async (I, pmmSettingsPage) => {
  I.Authorize();
  I.amOnPage(pmmSettingsPage.url);
});

Scenario(
  'Open PMM Settings page, verify Section Headers and Settings Section Elements [critical]',
  async (I, pmmSettingsPage) => {
    pmmSettingsPage.waitForPmmSettingsPageLoaded();
    await pmmSettingsPage.verifySectionHeaders();
    await pmmSettingsPage.verifySectionExpanded(
      pmmSettingsPage.fields.applyButton,
      pmmSettingsPage.sectionButtonText.applyChanges
    );
    pmmSettingsPage.verifySettingsSectionElements();
  }
);

Scenario('Open PMM Settings page and verify SSH Key Details Section Elements', async (I, pmmSettingsPage) => {
  const sectionNameToExpand = 'SSH Key Details';
  pmmSettingsPage.waitForPmmSettingsPageLoaded();
  pmmSettingsPage.collapseDefaultSection();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.sectionButtonText.applySSHKey);
  pmmSettingsPage.verifySSHKeyDetailsSectionElements();
});

Scenario(
  'Open PMM Settings page and verify Alertmanager integration Section Elements',
  async (I, pmmSettingsPage) => {
    const sectionNameToExpand = 'Alertmanager integration';
    pmmSettingsPage.waitForPmmSettingsPageLoaded();
    pmmSettingsPage.collapseDefaultSection();
    await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.sectionButtonText.addAlert);
    pmmSettingsPage.verifyAlertmanagerSectionElements();
  }
);

Scenario('Open PMM Settings page and verify Diagnostics Section Elements', async (I, pmmSettingsPage) => {
  const sectionNameToExpand = 'Diagnostics';
  pmmSettingsPage.waitForPmmSettingsPageLoaded();
  pmmSettingsPage.collapseDefaultSection();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.sectionButtonText.downloadLogs);
  pmmSettingsPage.verifyDiagnosticsElements();
});

xScenario(
  'Open PMM Settings page and verify validation for empty Data Retention value',
  async (I, pmmSettingsPage) => {
    const dataRetentionValue = '';
    pmmSettingsPage.waitForPmmSettingsPageLoaded();
    await pmmSettingsPage.changeDataRetentionValueTo(dataRetentionValue);
    await pmmSettingsPage.verifyValidationMessage(pmmSettingsPage.messages.requiredFieldMessage);
  }
);

Scenario(
  'Open PMM Settings page and verify validation for text Data Retention value',
  async (I, pmmSettingsPage) => {
    const dataRetentionValue = 'text ';
    pmmSettingsPage.waitForPmmSettingsPageLoaded();
    await pmmSettingsPage.changeDataRetentionValueTo(dataRetentionValue);
    await pmmSettingsPage.verifyValidationMessage(pmmSettingsPage.messages.invalidDataDurationMessage);
  }
);

xScenario(
  'Open PMM Settings page and verify validation for decimal Data Retention value',
  async (I, pmmSettingsPage) => {
    const dataRetentionValue = '15.5';
    pmmSettingsPage.waitForPmmSettingsPageLoaded();
    await pmmSettingsPage.changeDataRetentionValueTo(dataRetentionValue);
    await pmmSettingsPage.verifyValidationMessage(pmmSettingsPage.messages.invalidDataDurationMessage);
  }
);

Scenario(
  'Open PMM Settings page and verify validation for out of range Data Retention value',
  async (I, pmmSettingsPage) => {
    const dataRetentionValue = '2147483648';
    pmmSettingsPage.waitForPmmSettingsPageLoaded();
    await pmmSettingsPage.changeDataRetentionValueTo(dataRetentionValue);
    await pmmSettingsPage.verifyValidationMessage(pmmSettingsPage.messages.invalidDataDurationMessage);
  }
);

Scenario(
  'Open PMM Settings page and verify validation for XSS Data Retention value',
  async (I, pmmSettingsPage) => {
    const dataRetentionValue = '<script>alert(test);</script>';
    pmmSettingsPage.waitForPmmSettingsPageLoaded();
    await pmmSettingsPage.changeDataRetentionValueTo(dataRetentionValue);
    await pmmSettingsPage.verifyValidationMessage(pmmSettingsPage.messages.invalidDataDurationMessage);
  }
);

Scenario(
  'Open PMM Settings page and verify validation for negative Data Retention value',
  async (I, pmmSettingsPage) => {
    const dataRetentionValue = '-1';
    pmmSettingsPage.waitForPmmSettingsPageLoaded();
    await pmmSettingsPage.changeDataRetentionValueTo(dataRetentionValue);
    await pmmSettingsPage.verifyValidationMessage(pmmSettingsPage.messages.invalidDataDurationMessage);
  }
);

Scenario('Open PMM Settings page and verify validation for invalid SSH Key', async (I, pmmSettingsPage) => {
  const sshKeyForTest = 'ssh-rsa testKey test@key.local';
  const sectionNameToExpand = 'SSH Key Details';
  pmmSettingsPage.waitForPmmSettingsPageLoaded();
  pmmSettingsPage.collapseDefaultSection();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.sectionButtonText.applySSHKey);
  pmmSettingsPage.addSSHKey(sshKeyForTest);
  await pmmSettingsPage.verifyValidationPopUp(pmmSettingsPage.messages.invalidSSHKeyMessage);
});

xScenario('Open PMM Settings page and verify validation for empty SSH Key', async (I, pmmSettingsPage) => {
  const sshKeyForTest = '';
  const sectionNameToExpand = 'SSH Key Details';
  pmmSettingsPage.waitForPmmSettingsPageLoaded();
  pmmSettingsPage.collapseDefaultSection();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.sectionButtonText.applySSHKey);
  pmmSettingsPage.addSSHKey(sshKeyForTest);
  await pmmSettingsPage.verifyValidationPopUp(pmmSettingsPage.messages.invalidSSHKeyMessage);
});

xScenario(
  'Open PMM Settings page and verify validation for empty Alert Manager fields',
  async (I, pmmSettingsPage) => {
    const urlAndRule = '';
    const sectionNameToExpand = 'Alertmanager integration';
    pmmSettingsPage.waitForPmmSettingsPageLoaded();
    pmmSettingsPage.collapseDefaultSection();
    await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.sectionButtonText.addAlert);
    pmmSettingsPage.addAlertmanagerRule(urlAndRule, urlAndRule);
    // await pmmSettingsPage.verifyValidationPopUp(pmmSettingsPage.popUpMessages.invalidAlertmanagerURLMessage);
  }
);

xScenario(
  'Open PMM Settings page and verify validation for Alertmanager URL without scheme',
  async (I, pmmSettingsPage) => {
    const urlWithoutScheme = 'invalid_url';
    const sectionNameToExpand = 'Alertmanager integration';
    pmmSettingsPage.waitForPmmSettingsPageLoaded();
    pmmSettingsPage.collapseDefaultSection();
    await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.sectionButtonText.addAlert);
    pmmSettingsPage.addAlertmanagerRule(urlWithoutScheme, '');
    await pmmSettingsPage.verifyValidationPopUp(
      pmmSettingsPage.messages.invalidAlertmanagerMissingSchemeMessage
    );
  }
);

Scenario(
  'Open PMM Settings page and verify validation for Alertmanager URL without host',
  async (I, pmmSettingsPage) => {
    const urlWithoutHost = 'http://';
    const sectionNameToExpand = 'Alertmanager integration';
    pmmSettingsPage.waitForPmmSettingsPageLoaded();
    pmmSettingsPage.collapseDefaultSection();
    await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.sectionButtonText.addAlert);
    pmmSettingsPage.addAlertmanagerRule(urlWithoutHost, '');
    await pmmSettingsPage.verifyValidationPopUp(
      pmmSettingsPage.messages.invalidAlertmanagerMissingHostMessage
    );
  }
);

Scenario(
  'Open PMM Settings page and verify validation for invalid Alertmanager Rule',
  async (I, pmmSettingsPage) => {
    const rule = 'invalid_rule';
    const sectionNameToExpand = 'Alertmanager integration';
    pmmSettingsPage.waitForPmmSettingsPageLoaded();
    pmmSettingsPage.collapseDefaultSection();
    await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.sectionButtonText.addAlert);
    pmmSettingsPage.addAlertmanagerRule('', rule);
    await pmmSettingsPage.verifyValidationPopUp(pmmSettingsPage.messages.invalidAlertmanagerRulesMessage);
  }
);

Scenario(
  'PMM-T254 Verify validation for STT and Telemetry switches',
  async (I, pmmSettingsPage, settingsAPI) => {
    await settingsAPI.apiDisableSTT();
    I.amOnPage(pmmSettingsPage.url);
    pmmSettingsPage.waitForPmmSettingsPageLoaded();
    pmmSettingsPage.verifySwitch(pmmSettingsPage.fields.telemetrySwitchSelector, 'on');
    pmmSettingsPage.verifySwitch(pmmSettingsPage.fields.sttSwitchSelector, 'off');
    I.click(pmmSettingsPage.fields.telemetrySwitchSelector);
    pmmSettingsPage.verifySwitch(pmmSettingsPage.fields.telemetrySwitchSelector, 'off');
    pmmSettingsPage.verifySwitchStateIs(pmmSettingsPage.fields.sttSwitchSelector, false);
    I.click(pmmSettingsPage.fields.telemetrySwitchSelector);
    pmmSettingsPage.verifySwitch(pmmSettingsPage.fields.telemetrySwitchSelector, 'on');
    pmmSettingsPage.verifySwitchStateIs(pmmSettingsPage.fields.sttSwitchSelector, true);
    I.click(pmmSettingsPage.fields.sttSwitchSelector);
    pmmSettingsPage.verifySwitch(pmmSettingsPage.fields.sttSwitchSelector, 'on');
    pmmSettingsPage.verifySwitchStateIs(pmmSettingsPage.fields.sttSwitchSelector, true);
    pmmSettingsPage.verifySwitch(pmmSettingsPage.fields.telemetrySwitchSelector, 'on');
    pmmSettingsPage.verifySwitchStateIs(pmmSettingsPage.fields.telemetrySwitchSelector, false);
  }
);

//To be removed from Skip after https://jira.percona.com/browse/PMM-5791
xScenario(
  'PMM-T227 Open PMM Settings page and verify DATA_RETENTION value is set to 2 days @not-pr-pipeline',
  async (I, pmmSettingsPage) => {
    const dataRetention = '2';
    pmmSettingsPage.waitForPmmSettingsPageLoaded();
    const dataRetentionActualValue = await I.grabValueFrom(pmmSettingsPage.fields.dataRetentionCount);
    assert(
      dataRetention,
      dataRetentionActualValue,
      'The Value for Data Retention is not the same as passed via Docker Environment Variable'
    );
  }
);
