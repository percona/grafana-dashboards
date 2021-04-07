const assert = require('assert');
const page = require('./pages/pmmSettingsPage');

// Value should be in range from 1 to 3650 days, so put a value outside of the range
const validationValues = ['2147483648', '-1', '0'];

const dataRetentionTable = new DataTable(['value', 'message']);

for (const i in validationValues) {
  dataRetentionTable.add([validationValues[i], page.messages.invalidDataDurationMessage]);
}

// TODO: (lunaticusgreen) Investigate these testcases, looks like codeceptjs bug
// dataRetentionTable.add([' ', page.messages.requiredFieldMessage]);
// dataRetentionTable.add(['e', page.messages.requiredFieldMessage]);

Feature('PMM Settings Elements').retry(2);

Before(async ({ I, pmmSettingsPage, settingsAPI }) => {
  await I.Authorize();
  await settingsAPI.restoreSettingsDefaults();
  I.amOnPage(pmmSettingsPage.url);
});

Data(dataRetentionTable).Scenario('PMM-T97 - Verify server diagnostics on PMM Settings Page', async ({ pmmSettingsPage, current }) => {
  const sectionNameToExpand = pmmSettingsPage.sectionTabsList.advanced;

  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.advancedButton);
  pmmSettingsPage.checkDataRetentionInput(current.value, current.message);
});

Scenario('PMM-T87 - Verify server diagnostics on PMM Settings Page', async ({ pmmSettingsPage }) => {
  const diagnostcsButtonLocator = pmmSettingsPage.fields.diagnosticsButton;
  const platform = pmmSettingsPage.sectionTabsList.perconaPlatform;

  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  await pmmSettingsPage.expandSection(pmmSettingsPage.sectionTabsList.metrics, diagnostcsButtonLocator);
  await pmmSettingsPage.expandSection(pmmSettingsPage.sectionTabsList.advanced, diagnostcsButtonLocator);
  await pmmSettingsPage.expandSection(pmmSettingsPage.sectionTabsList.ssh, diagnostcsButtonLocator);
  await pmmSettingsPage.expandSection(pmmSettingsPage.sectionTabsList.alertmanager, diagnostcsButtonLocator);
  await pmmSettingsPage.expandSection(platform, diagnostcsButtonLocator);
});

Scenario('PMM-T84 - Verify Section Tabs and Metrics Section Elements [critical]', async ({ I, pmmSettingsPage }) => {
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

Scenario('PMM-T85 - Verify SSH Key Section Elements', async ({ I, pmmSettingsPage }) => {
  const sectionNameToExpand = pmmSettingsPage.sectionTabsList.ssh;

  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.sshKeyButton);
  I.see('SSH key', pmmSettingsPage.fields.sshKeyLabel);
  I.seeElement(pmmSettingsPage.fields.sshKeyInput);
});

Scenario('Verify Advanced Section Elements', async ({ I, pmmSettingsPage }) => {
  const sectionNameToExpand = pmmSettingsPage.sectionTabsList.advanced;

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

Scenario('PMM-T86 - Verify Alertmanager integration Section Elements', async ({ I, pmmSettingsPage }) => {
  const sectionNameToExpand = pmmSettingsPage.sectionTabsList.alertmanager;

  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.alertmanagerButton);
  I.see('Alertmanager URL', pmmSettingsPage.fields.alertmanagerUrlLabel);
  I.see('Prometheus Alerting rules', pmmSettingsPage.fields.alertmanagerRuleslabel);
  I.seeElement(pmmSettingsPage.fields.alertURLInput);
  I.seeElement(pmmSettingsPage.fields.alertRulesInput);
  I.seeElement(pmmSettingsPage.fields.diagnosticsButton);
});

Scenario('PMM-T89 - Verify validation for invalid SSH Key', async ({ I, pmmSettingsPage }) => {
  const sshKeyForTest = 'ssh-rsa testKey test@key.local';
  const sectionNameToExpand = pmmSettingsPage.sectionTabsList.ssh;

  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.sshKeyButton);
  pmmSettingsPage.addSSHKey(sshKeyForTest);
  I.verifyPopUpMessage(pmmSettingsPage.messages.invalidSSHKeyMessage);
});

Scenario('PMM-T90 - Verify validation for Alertmanager URL without scheme', async ({ I, pmmSettingsPage }) => {
  const urlWithoutScheme = 'invalid_url';
  const sectionNameToExpand = pmmSettingsPage.sectionTabsList.alertmanager;

  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.alertmanagerButton);
  pmmSettingsPage.addAlertmanagerRule(urlWithoutScheme, '');
  I.verifyPopUpMessage(pmmSettingsPage.messages.invalidAlertmanagerMissingSchemeMessage);
});

Scenario('PMM-T91 - Verify validation for Alertmanager URL without host', async ({ I, pmmSettingsPage }) => {
  const urlWithoutHost = 'http://';
  const sectionNameToExpand = pmmSettingsPage.sectionTabsList.alertmanager;

  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.alertmanagerButton);
  pmmSettingsPage.addAlertmanagerRule(urlWithoutHost, '');
  I.verifyPopUpMessage(pmmSettingsPage.messages.invalidAlertmanagerMissingHostMessage);
});

Scenario('PMM-T92 - Verify validation for invalid Alertmanager Rule', async ({ I, pmmSettingsPage }) => {
  const rule = 'invalid_rule';
  const sectionNameToExpand = pmmSettingsPage.sectionTabsList.alertmanager;

  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.alertmanagerButton);
  pmmSettingsPage.addAlertmanagerRule('', rule);
  I.verifyPopUpMessage(pmmSettingsPage.messages.invalidAlertmanagerRulesMessage);
});

Scenario(
  'PMM-T254 Verify validation for STT and Telemetry switches',
  async ({ I, pmmSettingsPage, settingsAPI }) => {
    await settingsAPI.apiDisableSTT();
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

// To be removed from Skip after https://jira.percona.com/browse/PMM-5791
xScenario(
  'PMM-T227 Open PMM Settings page and verify DATA_RETENTION value is set to 2 days @not-pr-pipeline',
  async ({ I, pmmSettingsPage }) => {
    const dataRetention = '2';

    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    I.waitForValue(pmmSettingsPage.fields.dataRetentionCount, dataRetention, 30);
  },
);

// TODO: unskip and fix in scope of https://jira.percona.com/browse/PMM-7733
xScenario(
  'PMM-T415 - Verify Percona Platform (Sign up) elements on PMM Settings Page',
  async ({ I, pmmSettingsPage }) => {
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
  async ({ I, pmmSettingsPage }) => {
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

Scenario('PMM-T537 - Verify user is not able to enable IA if Telemetry is disabled @ia @not-pr-pipeline',
  async ({ I, pmmSettingsPage, settingsAPI }) => {
    await settingsAPI.apiDisableIA();
    I.amOnPage(pmmSettingsPage.advancedSettingsUrl);
    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    I.seeAttributesOnElements(pmmSettingsPage.fields.iaSwitchSelectorInput, { disabled: null });
    I.click(pmmSettingsPage.fields.telemetrySwitchSelector);
    I.seeAttributesOnElements(pmmSettingsPage.fields.iaSwitchSelectorInput, { disabled: true });
    await settingsAPI.apiEnableIA();
  }).retry(2);
