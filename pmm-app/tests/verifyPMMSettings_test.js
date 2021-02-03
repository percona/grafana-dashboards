const assert = require('assert');

const communicationDefaults = new DataTable(['type']);

communicationDefaults.add(['email']);
communicationDefaults.add(['slack']);

Feature('PMM Settings');

Before(async (I, pmmSettingsPage, settingsAPI) => {
  I.Authorize();
  await settingsAPI.restoreSettingsDefaults();
});

// Elements

Scenario('Verify Section Tabs and Metrics Section Elements [critical]', async (I, pmmSettingsPage) => {
  I.amOnPage(pmmSettingsPage.url);
  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  Object.values(pmmSettingsPage.sectionTabsList).forEach((value) => {
    I.see(value, pmmSettingsPage.fields.tabsSection);
  });

  await within(pmmSettingsPage.fields.tabContent, () => {
    I.waitForElement(pmmSettingsPage.fields.metricsResolutionLabel, 30);
    I.see('Metrics resolution, sec', pmmSettingsPage.fields.metricsResolutionLabel);
    I.seeElement(pmmSettingsPage.fields.metricsResolutionRadio);
    I.seeElement(pmmSettingsPage.fields.lowInput);
    I.seeElement(pmmSettingsPage.fields.mediumInput);
    I.seeElement(pmmSettingsPage.fields.highInput);
  });
});

Scenario('Verify SSH Key Section Elements', async (I, pmmSettingsPage) => {
  const sectionNameToExpand = pmmSettingsPage.sectionTabsList.ssh;

  I.amOnPage(pmmSettingsPage.url);
  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.sshKeyButton);
  I.see('SSH key', pmmSettingsPage.fields.sshKeyLabel);
  I.seeElement(pmmSettingsPage.fields.sshKeyInput);
});

Scenario('Verify Advanced Section Elements', async (I, pmmSettingsPage) => {
  const sectionNameToExpand = pmmSettingsPage.sectionTabsList.advanced;

  I.amOnPage(pmmSettingsPage.url);
  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.advancedButton);
  I.see('Data retention', pmmSettingsPage.fields.advancedLabel);
  I.see('Telemetry', pmmSettingsPage.fields.telemetryLabel);
  I.see('Check for updates', pmmSettingsPage.fields.checkForUpdatesLabel);
  I.see('Security Threat Tool', pmmSettingsPage.fields.sttLabel);
  I.seeElement(pmmSettingsPage.fields.telemetrySwitchSelectorInput);
  I.seeElement(pmmSettingsPage.fields.telemetryLabel);
  I.seeElement(pmmSettingsPage.fields.checkForUpdatesSwitch);
  I.seeElement(pmmSettingsPage.fields.checkForUpdatesLabel);
  I.seeElement(pmmSettingsPage.fields.sttSwitchSelectorInput);
  I.seeElement(pmmSettingsPage.fields.sttLabel);
});

Scenario('Verify Alertmanager integration Section Elements', async (I, pmmSettingsPage) => {
  const sectionNameToExpand = pmmSettingsPage.sectionTabsList.alertmanager;

  I.amOnPage(pmmSettingsPage.url);
  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.alertmanagerButton);
  I.see('Alertmanager URL', pmmSettingsPage.fields.alertmanagerUrlLabel);
  I.see('Prometheus Alerting rules', pmmSettingsPage.fields.alertmanagerRuleslabel);
  I.seeElement(pmmSettingsPage.fields.alertURLInput);
  I.seeElement(pmmSettingsPage.fields.alertRulesInput);
});

Scenario('Verify validation for invalid SSH Key', async (I, pmmSettingsPage) => {
  const sshKeyForTest = 'ssh-rsa testKey test@key.local';
  const sectionNameToExpand = pmmSettingsPage.sectionTabsList.ssh;

  I.amOnPage(pmmSettingsPage.url);
  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.sshKeyButton);
  pmmSettingsPage.addSSHKey(sshKeyForTest);
  await pmmSettingsPage.verifyPopUpMessage(pmmSettingsPage.messages.invalidSSHKeyMessage);
});

Scenario('Verify validation for Alertmanager URL without scheme', async (I, pmmSettingsPage) => {
  const urlWithoutScheme = 'invalid_url';
  const sectionNameToExpand = pmmSettingsPage.sectionTabsList.alertmanager;

  I.amOnPage(pmmSettingsPage.url);
  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.alertmanagerButton);
  pmmSettingsPage.addAlertmanagerRule(urlWithoutScheme, '');
  await pmmSettingsPage.verifyPopUpMessage(pmmSettingsPage.messages.invalidAlertmanagerMissingSchemeMessage);
});

Scenario('Verify validation for Alertmanager URL without host', async (I, pmmSettingsPage) => {
  const urlWithoutHost = 'http://';
  const sectionNameToExpand = pmmSettingsPage.sectionTabsList.alertmanager;

  I.amOnPage(pmmSettingsPage.url);
  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.alertmanagerButton);
  pmmSettingsPage.addAlertmanagerRule(urlWithoutHost, '');
  await pmmSettingsPage.verifyPopUpMessage(pmmSettingsPage.messages.invalidAlertmanagerMissingHostMessage);
});

Scenario('Verify validation for invalid Alertmanager Rule', async (I, pmmSettingsPage) => {
  const rule = 'invalid_rule';
  const sectionNameToExpand = pmmSettingsPage.sectionTabsList.alertmanager;

  I.amOnPage(pmmSettingsPage.url);
  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.alertmanagerButton);
  pmmSettingsPage.addAlertmanagerRule('', rule);
  await pmmSettingsPage.verifyPopUpMessage(pmmSettingsPage.messages.invalidAlertmanagerRulesMessage);
});

Scenario(
  'PMM-T254 Verify validation for STT and Telemetry switches',
  async (I, pmmSettingsPage, settingsAPI) => {
    await settingsAPI.apiDisableSTT();
    I.amOnPage(pmmSettingsPage.url);
    const sectionNameToExpand = pmmSettingsPage.sectionTabsList.advanced;

    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.advancedButton);
    await pmmSettingsPage.disableIA();
    pmmSettingsPage.verifySwitch(pmmSettingsPage.fields.telemetrySwitchSelectorInput, 'on');
    pmmSettingsPage.verifySwitch(pmmSettingsPage.fields.sttSwitchSelectorInput, 'off');
    I.click(pmmSettingsPage.fields.telemetrySwitchSelector);
    pmmSettingsPage.verifySwitch(pmmSettingsPage.fields.telemetrySwitchSelectorInput, 'off');
    I.click(pmmSettingsPage.fields.telemetrySwitchSelector);
    pmmSettingsPage.verifySwitch(pmmSettingsPage.fields.telemetrySwitchSelectorInput, 'on');
    I.click(pmmSettingsPage.fields.sttSwitchSelector);
    pmmSettingsPage.verifySwitch(pmmSettingsPage.fields.sttSwitchSelectorInput, 'on');
    pmmSettingsPage.verifySwitch(pmmSettingsPage.fields.telemetrySwitchSelectorInput, 'on');
  },
).retry(2);

Scenario('PMM-T537 - Verify user is not able to enable IA if Telemetry is disabled @ia @not-pr-pipeline',
  async (I, pmmSettingsPage, settingsAPI) => {
    await settingsAPI.apiDisableIA();
    I.amOnPage(pmmSettingsPage.advancedSettingsUrl);
    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    await pmmSettingsPage.disableIA();
    I.seeAttributesOnElements(pmmSettingsPage.fields.iaSwitchSelectorInput, { disabled: null });
    I.click(pmmSettingsPage.fields.telemetrySwitchSelector);
    I.seeAttributesOnElements(pmmSettingsPage.fields.iaSwitchSelectorInput, { disabled: true });
  }).retry(2);

// To be removed from Skip after https://jira.percona.com/browse/PMM-5791
xScenario(
  'PMM-T227 Open PMM Settings page and verify DATA_RETENTION value is set to 2 days @not-pr-pipeline',
  async (I, pmmSettingsPage) => {
    const dataRetention = '2';

    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    I.waitForValue(pmmSettingsPage.fields.dataRetentionCount, dataRetention, 30);
  },
);

Scenario(
  'PMM-T415 - Verify Percona Platform (Sign up) elements on PMM Settings Page',
  async (I, pmmSettingsPage) => {
    I.amOnPage(pmmSettingsPage.url);
    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    I.waitForElement(pmmSettingsPage.fields.perconaPlatformLink, 30);
    I.click(pmmSettingsPage.fields.perconaPlatformLink);
    I.waitForElement(pmmSettingsPage.fields.singInToSignUpButton, 30);
    I.click(pmmSettingsPage.fields.singInToSignUpButton);
    I.waitForElement(pmmSettingsPage.fields.signUpEmail, 30);
    I.waitForElement(pmmSettingsPage.fields.signUpPassword, 30);
    const agreementLabel = await I.grabTextFrom(pmmSettingsPage.fields.signUpAgreementLabel);

    assert.ok(
      agreementLabel === pmmSettingsPage.agreementText,
      `${agreementLabel}: This is not correct agreement label`,
    );
    I.waitForElement(pmmSettingsPage.fields.signUpButton, 30);
    I.waitForElement(pmmSettingsPage.fields.signUpBackToLogin, 30);
    I.waitForElement(pmmSettingsPage.fields.diagnosticsButton, 30);
    I.waitForVisible(pmmSettingsPage.fields.diagnosticsInfo, 30);
    I.moveCursor(pmmSettingsPage.fields.diagnosticsInfo);
    I.waitForText(pmmSettingsPage.diagnosticsText, 30);
    I.waitForElement(pmmSettingsPage.fields.termsOfService);
    I.waitForElement(pmmSettingsPage.fields.privacyPolicy);
  },
);

Scenario(
  'PMM-T398 - Verify Percona Platform (Login) elements on PMM Settings Page',
  async (I, pmmSettingsPage) => {
    I.amOnPage(pmmSettingsPage.url);
    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    I.waitForElement(pmmSettingsPage.fields.perconaPlatformLink, 30);
    I.click(pmmSettingsPage.fields.perconaPlatformLink);
    I.waitForElement(pmmSettingsPage.fields.signInEmail, 30);
    I.waitForElement(pmmSettingsPage.fields.signInPassword, 30);
    I.waitForElement(pmmSettingsPage.fields.loginButton, 30);
    I.waitForElement(pmmSettingsPage.fields.singInToSignUpButton, 30);
    I.waitForElement(pmmSettingsPage.fields.diagnosticsButton, 30);
    I.waitForVisible(pmmSettingsPage.fields.diagnosticsInfo, 30);
    I.moveCursor(pmmSettingsPage.fields.diagnosticsInfo);
    I.waitForText(pmmSettingsPage.diagnosticsText, 30);
  },
);

// Functionality

Scenario('Open PMM Settings page and verify changing Metrics Resolution [critical]', async (I, pmmSettingsPage) => {
  const resolutionToApply = 'Rare';

  I.amOnPage(pmmSettingsPage.url);
  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  await pmmSettingsPage.selectMetricsResolution(resolutionToApply);
  await pmmSettingsPage.verifyPopUpMessage(pmmSettingsPage.messages.successPopUpMessage);
  I.refreshPage();
  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  await pmmSettingsPage.verifySelectedResolution(resolutionToApply);
});

Scenario('Open PMM Settings page and verify changing Data Retention [critical]', async (I, pmmSettingsPage) => {
  const dataRetentionValue = '1';
  const sectionNameToExpand = pmmSettingsPage.sectionTabsList.advanced;

  I.amOnPage(pmmSettingsPage.url);
  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.advancedButton);
  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  pmmSettingsPage.changeDataRetentionValueTo(dataRetentionValue);
  await pmmSettingsPage.verifyPopUpMessage(pmmSettingsPage.messages.successPopUpMessage);
  I.refreshPage();
  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.advancedButton);
  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  I.waitForValue(pmmSettingsPage.fields.dataRetentionInput, dataRetentionValue, 30);
});

Scenario('Open PMM Settings page and verify adding Alertmanager Rule [critical]', async (I, pmmSettingsPage) => {
  const scheme = 'http://';
  const sectionNameToExpand = pmmSettingsPage.sectionTabsList.alertmanager;

  I.amOnPage(pmmSettingsPage.url);
  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.alertmanagerButton);
  pmmSettingsPage.addAlertmanagerRule(
    scheme + pmmSettingsPage.alertManager.ip + pmmSettingsPage.alertManager.service,
    pmmSettingsPage.alertManager.editRule.replace('{{ sec }}', Math.floor(Math.random() * 10) + 1),
  );
  await pmmSettingsPage.verifyPopUpMessage(pmmSettingsPage.messages.successPopUpMessage);
  pmmSettingsPage.openAlertsManagerUi();
  await pmmSettingsPage.verifyAlertmanagerRuleAdded(pmmSettingsPage.alertManager.ruleName);
});

Scenario(
  'PMM-T253 Verify user can see correct tooltip for STT [trivial]',
  async (I, pmmSettingsPage) => {
    const sectionNameToExpand = pmmSettingsPage.sectionTabsList.advanced;

    I.amOnPage(pmmSettingsPage.url);
    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.advancedButton);
    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    I.moveCursor(pmmSettingsPage.fields.sttLabelTooltipSelector);
    await pmmSettingsPage.verifyTooltip(pmmSettingsPage.tooltips.stt);
  },
);

Scenario(
  'PMM-T253 Verify user can enable STT if Telemetry is enabled',
  async (I, pmmSettingsPage) => {
    const sectionNameToExpand = pmmSettingsPage.sectionTabsList.advanced;

    I.amOnPage(pmmSettingsPage.url);
    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.advancedButton);
    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    I.click(pmmSettingsPage.fields.sttSwitchSelector);
    pmmSettingsPage.verifySwitch(pmmSettingsPage.fields.sttSwitchSelectorInput, 'on');
    I.click(pmmSettingsPage.fields.advancedButton);
    await pmmSettingsPage.verifyPopUpMessage(pmmSettingsPage.messages.successPopUpMessage);
    I.refreshPage();
    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.advancedButton);
    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    pmmSettingsPage.verifySwitch(pmmSettingsPage.fields.sttSwitchSelectorInput, 'on');
  },
);

Scenario('PMM-T520 - Verify that alert is in Firing State - internal alert manager @not-ui-pipeline @nightly @not-pr-pipeline', async (I, pmmSettingsPage) => {
  const scheme = 'http://127.0.0.1';
  const sectionNameToExpand = pmmSettingsPage.sectionTabsList.alertmanager;

  I.amOnPage(pmmSettingsPage.url);
  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.alertmanagerButton);
  pmmSettingsPage.addAlertmanagerRule(
    scheme + pmmSettingsPage.alertManager.service,
    pmmSettingsPage.alertManager.rule2,
  );
  await pmmSettingsPage.verifyPopUpMessage(pmmSettingsPage.messages.successPopUpMessage);
  pmmSettingsPage.openAlertsManagerUi();
  await pmmSettingsPage.verifyAlertmanagerRuleAdded(pmmSettingsPage.alertManager.ruleName2);
  I.amOnPage(pmmSettingsPage.stateOfAlertsUrl);
  await pmmSettingsPage.verifyAlertmanagerRuleAdded(pmmSettingsPage.alertManager.ruleName2, true);
});

Scenario('PMM-T520 - Verify that alert is being fired to external Alert Manager @not-ui-pipeline @nightly @not-pr-pipeline', async (I, pmmSettingsPage) => {
  const scheme = 'http://';
  const sectionNameToExpand = pmmSettingsPage.sectionTabsList.alertmanager;

  I.amOnPage(pmmSettingsPage.url);
  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.alertmanagerButton);
  pmmSettingsPage.addAlertmanagerRule(
    scheme + pmmSettingsPage.alertManager.ip + pmmSettingsPage.alertManager.externalAlertManagerPort,
    pmmSettingsPage.alertManager.rule2,
  );
  await pmmSettingsPage.verifyPopUpMessage(pmmSettingsPage.messages.successPopUpMessage);
  pmmSettingsPage.openAlertsManagerUi();
  await pmmSettingsPage.verifyAlertmanagerRuleAdded(pmmSettingsPage.alertManager.ruleName2);
  I.amOnPage(pmmSettingsPage.stateOfAlertsUrl);
  await pmmSettingsPage.verifyAlertmanagerRuleAdded(pmmSettingsPage.alertManager.ruleName2, true);
  await pmmSettingsPage.verifyExternalAlertManager(pmmSettingsPage.alertManager.ruleName2);
});

Scenario('PMM-T532 PMM-T533 PMM-T536 - Verify user can enable IA in Settings @ia @not-pr-pipeline',
  async (I, pmmSettingsPage, settingsAPI, adminPage) => {
    await settingsAPI.apiDisableIA();
    I.amOnPage(pmmSettingsPage.advancedSettingsUrl);
    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    await pmmSettingsPage.disableIA();
    I.click(pmmSettingsPage.fields.iaSwitchSelector);
    I.dontSeeElement(pmmSettingsPage.communication.communicationSection);
    pmmSettingsPage.verifySwitch(pmmSettingsPage.fields.iaSwitchSelectorInput, 'on');
    I.click(pmmSettingsPage.fields.advancedButton);
    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    pmmSettingsPage.verifySwitch(pmmSettingsPage.fields.iaSwitchSelectorInput, 'on');
    I.seeElementInDOM(adminPage.sideMenu.integratedAlerting);
    I.seeTextEquals('Integrated Alerting', adminPage.sideMenu.integratedAlerting);
    I.seeTextEquals('Communication', pmmSettingsPage.communication.communicationSection);
    I.click(pmmSettingsPage.fields.iaSwitchSelector);
    pmmSettingsPage.verifySwitch(pmmSettingsPage.fields.iaSwitchSelectorInput, 'off');
    I.click(pmmSettingsPage.fields.advancedButton);
    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    pmmSettingsPage.verifySwitch(pmmSettingsPage.fields.iaSwitchSelectorInput, 'off');
    I.dontSeeElementInDOM(adminPage.sideMenu.integratedAlerting);
    I.dontSeeElement(pmmSettingsPage.communication.communicationSection);
  });


Data(communicationDefaults)
  .Scenario('PMM-T534 PMM-T534 - Verify user is able to set up default Email/Slack communication settings @ia @not-pr-pipeline',
    async (I, pmmSettingsPage, settingsAPI, current) => {
      await settingsAPI.apiEnableIA();
      I.amOnPage(pmmSettingsPage.communicationSettingsUrl);
      await pmmSettingsPage.waitForPmmSettingsPageLoaded();
      pmmSettingsPage.fillCommunicationFields(current.type);
      pmmSettingsPage.verifyPopUpMessage(pmmSettingsPage.messages.successPopUpMessage);
      I.refreshPage();
      await pmmSettingsPage.waitForPmmSettingsPageLoaded();
      await pmmSettingsPage.verifyCommunicationFields(current.type);
    });
