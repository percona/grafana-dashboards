Feature('PMM Settings Page Elements and Validations');

Before(async (I, loginPage, pmmSettingsPage) => {
  I.amOnPage(loginPage.url);
  loginPage.login('admin', 'admin');
  I.amOnPage(pmmSettingsPage.url);
});

Scenario(
  'Open PMM Settings page, verify Section Headers and Settings Section Elements',
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
  let sectionNameToExpand = 'SSH Key Details';
  pmmSettingsPage.waitForPmmSettingsPageLoaded();
  pmmSettingsPage.collapseDefaultSection();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.sectionButtonText.applySSHKey);
  pmmSettingsPage.verifySSHKeyDetailsSectionElements();
});

Scenario(
  'Open PMM Settings page and verify Alertmanager integration Section Elements',
  async (I, pmmSettingsPage) => {
    let sectionNameToExpand = 'Alertmanager integration';
    pmmSettingsPage.waitForPmmSettingsPageLoaded();
    pmmSettingsPage.collapseDefaultSection();
    await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.sectionButtonText.addAlert);
    pmmSettingsPage.verifyAlertmanagerSectionElements();
  }
);

Scenario('Open PMM Settings page and verify Diagnostics Section Elements', async (I, pmmSettingsPage) => {
  let sectionNameToExpand = 'Diagnostics';
  pmmSettingsPage.waitForPmmSettingsPageLoaded();
  pmmSettingsPage.collapseDefaultSection();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.sectionButtonText.downloadLogs);
  pmmSettingsPage.verifyDiagnosticsElements();
});

Scenario(
  'Open PMM Settings page and verify validation for empty Data Retention value',
  async (I, pmmSettingsPage) => {
    let dataRetentionValue = '';
    pmmSettingsPage.waitForPmmSettingsPageLoaded();
    await pmmSettingsPage.changeDataRetentionValueTo(dataRetentionValue);
    await pmmSettingsPage.verifyValidationMessage(pmmSettingsPage.messages.requiredFieldMessage);
  }
);

Scenario(
  'Open PMM Settings page and verify validation for text Data Retention value',
  async (I, pmmSettingsPage) => {
    let dataRetentionValue = 'text ';
    pmmSettingsPage.waitForPmmSettingsPageLoaded();
    await pmmSettingsPage.changeDataRetentionValueTo(dataRetentionValue);
    await pmmSettingsPage.verifyValidationMessage(pmmSettingsPage.messages.invalidDataDurationMessage);
  }
);

xScenario(
  'Open PMM Settings page and verify validation for decimal Data Retention value',
  async (I, pmmSettingsPage) => {
    let dataRetentionValue = '15.5';
    pmmSettingsPage.waitForPmmSettingsPageLoaded();
    await pmmSettingsPage.changeDataRetentionValueTo(dataRetentionValue);
    await pmmSettingsPage.verifyValidationMessage(pmmSettingsPage.messages.invalidDataDurationMessage);
  }
);

Scenario(
  'Open PMM Settings page and verify validation for out of range Data Retention value',
  async (I, pmmSettingsPage) => {
    let dataRetentionValue = '2147483648';
    pmmSettingsPage.waitForPmmSettingsPageLoaded();
    await pmmSettingsPage.changeDataRetentionValueTo(dataRetentionValue);
    await pmmSettingsPage.verifyValidationMessage(pmmSettingsPage.messages.invalidDataDurationMessage);
  }
);

Scenario(
  'Open PMM Settings page and verify validation for XSS Data Retention value',
  async (I, pmmSettingsPage) => {
    let dataRetentionValue = `<script>alert(test);</script>`;
    pmmSettingsPage.waitForPmmSettingsPageLoaded();
    await pmmSettingsPage.changeDataRetentionValueTo(dataRetentionValue);
    await pmmSettingsPage.verifyValidationMessage(pmmSettingsPage.messages.invalidDataDurationMessage);
  }
);

Scenario(
  'Open PMM Settings page and verify validation for negative Data Retention value',
  async (I, pmmSettingsPage) => {
    let dataRetentionValue = '-1';
    pmmSettingsPage.waitForPmmSettingsPageLoaded();
    await pmmSettingsPage.changeDataRetentionValueTo(dataRetentionValue);
    await pmmSettingsPage.verifyValidationMessage(pmmSettingsPage.messages.invalidDataDurationMessage);
  }
);

Scenario('Open PMM Settings page and verify validation for invalid SSH Key', async (I, pmmSettingsPage) => {
  let sshKeyForTest = 'ssh-rsa testKey test@key.local';
  let sectionNameToExpand = 'SSH Key Details';
  pmmSettingsPage.waitForPmmSettingsPageLoaded();
  pmmSettingsPage.collapseDefaultSection();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.sectionButtonText.applySSHKey);
  pmmSettingsPage.addSSHKey(sshKeyForTest);
  await pmmSettingsPage.verifyValidationPopUp(pmmSettingsPage.messages.invalidSSHKeyMessage);
});

xScenario('Open PMM Settings page and verify validation for empty SSH Key', async (I, pmmSettingsPage) => {
  let sshKeyForTest = '';
  let sectionNameToExpand = 'SSH Key Details';
  pmmSettingsPage.waitForPmmSettingsPageLoaded();
  pmmSettingsPage.collapseDefaultSection();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.sectionButtonText.applySSHKey);
  pmmSettingsPage.addSSHKey(sshKeyForTest);
  await pmmSettingsPage.verifyValidationPopUp(pmmSettingsPage.messages.invalidSSHKeyMessage);
});

xScenario(
  'Open PMM Settings page and verify validation for empty Alert Manager fields',
  async (I, pmmSettingsPage) => {
    let urlAndRule = '';
    let sectionNameToExpand = 'Alertmanager integration';
    pmmSettingsPage.waitForPmmSettingsPageLoaded();
    pmmSettingsPage.collapseDefaultSection();
    await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.sectionButtonText.addAlert);
    pmmSettingsPage.addAlertmanagerRule(urlAndRule, urlAndRule);
    // await pmmSettingsPage.verifyValidationPopUp(pmmSettingsPage.popUpMessages.invalidAlertmanagerURLMessage);
  }
);

Scenario(
  'Open PMM Settings page and verify validation for Alertmanager URL without scheme',
  async (I, pmmSettingsPage) => {
    let urlWithoutScheme = 'invalid_url';
    let sectionNameToExpand = 'Alertmanager integration';
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
    let urlWithoutHost = 'http://';
    let sectionNameToExpand = 'Alertmanager integration';
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
    let rule = 'invalid_rule';
    let sectionNameToExpand = 'Alertmanager integration';
    pmmSettingsPage.waitForPmmSettingsPageLoaded();
    pmmSettingsPage.collapseDefaultSection();
    await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.sectionButtonText.addAlert);
    pmmSettingsPage.addAlertmanagerRule('', rule);
    await pmmSettingsPage.verifyValidationPopUp(pmmSettingsPage.messages.invalidAlertmanagerRulesMessage);
  }
);
