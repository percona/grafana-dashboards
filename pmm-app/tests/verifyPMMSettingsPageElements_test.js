const assert = require('assert');
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

Scenario('Verify Section Tabs and Metrics Section Elements [critical]', async (I, pmmSettingsPage) => {
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

  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.sshKeyButton);
  I.see('SSH key', pmmSettingsPage.fields.sshKeyLabel);
  I.seeElement(pmmSettingsPage.fields.sshKeyInput);
});

Scenario('Verify Advanced Section Elements', async (I, pmmSettingsPage) => {
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

Scenario('Verify Alertmanager integration Section Elements', async (I, pmmSettingsPage) => {
  const sectionNameToExpand = pmmSettingsPage.sectionTabsList.alertmanager;

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

  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.sshKeyButton);
  pmmSettingsPage.addSSHKey(sshKeyForTest);
  await pmmSettingsPage.verifyPopUpMessage(pmmSettingsPage.messages.invalidSSHKeyMessage);
});

Scenario('Verify validation for Alertmanager URL without scheme', async (I, pmmSettingsPage) => {
  const urlWithoutScheme = 'invalid_url';
  const sectionNameToExpand = pmmSettingsPage.sectionTabsList.alertmanager;

  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.alertmanagerButton);
  pmmSettingsPage.addAlertmanagerRule(urlWithoutScheme, '');
  await pmmSettingsPage.verifyPopUpMessage(pmmSettingsPage.messages.invalidAlertmanagerMissingSchemeMessage);
});

Scenario('Verify validation for Alertmanager URL without host', async (I, pmmSettingsPage) => {
  const urlWithoutHost = 'http://';
  const sectionNameToExpand = pmmSettingsPage.sectionTabsList.alertmanager;

  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.alertmanagerButton);
  pmmSettingsPage.addAlertmanagerRule(urlWithoutHost, '');
  await pmmSettingsPage.verifyPopUpMessage(pmmSettingsPage.messages.invalidAlertmanagerMissingHostMessage);
});

Scenario('Verify validation for invalid Alertmanager Rule', async (I, pmmSettingsPage) => {
  const rule = 'invalid_rule';
  const sectionNameToExpand = pmmSettingsPage.sectionTabsList.alertmanager;

  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.alertmanagerButton);
  pmmSettingsPage.addAlertmanagerRule('', rule);
  await pmmSettingsPage.verifyPopUpMessage(pmmSettingsPage.messages.invalidAlertmanagerRulesMessage);
});

// Skip, need to investigate will roll back
Scenario(
  'PMM-T254 Verify validation for STT and Telemetry switches',
  async (I, pmmSettingsPage, settingsAPI) => {
    await settingsAPI.apiDisableSTT();
    I.amOnPage(pmmSettingsPage.url);
    const sectionNameToExpand = pmmSettingsPage.sectionTabsList.advanced;

    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.advancedButton);
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
  async (I, pmmSettingsPage) => {
    const dataRetention = '2';

    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    I.waitForValue(pmmSettingsPage.fields.dataRetentionCount, dataRetention, 30);
  },
);

Scenario(
  'PMM-T415 - Verify Percona Platform (Sign up) elements on PMM Settings Page',
  async (I, pmmSettingsPage) => {
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
    I.moveCursorTo(pmmSettingsPage.fields.diagnosticsInfo);
    I.waitForText(pmmSettingsPage.diagnosticsText, 30);
    I.waitForElement(pmmSettingsPage.fields.termsOfService);
    I.waitForElement(pmmSettingsPage.fields.privacyPolicy);
  },
);

Scenario(
  'PMM-T398 - Verify Percona Platform (Login) elements on PMM Settings Page',
  async (I, pmmSettingsPage) => {
    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    I.waitForElement(pmmSettingsPage.fields.perconaPlatformLink, 30);
    I.click(pmmSettingsPage.fields.perconaPlatformLink);
    I.waitForElement(pmmSettingsPage.fields.signInEmail, 30);
    I.waitForElement(pmmSettingsPage.fields.signInPassword, 30);
    I.waitForElement(pmmSettingsPage.fields.loginButton, 30);
    I.waitForElement(pmmSettingsPage.fields.singInToSignUpButton, 30);
    I.waitForElement(pmmSettingsPage.fields.diagnosticsButton, 30);
    I.waitForVisible(pmmSettingsPage.fields.diagnosticsInfo, 30);
    I.moveCursorTo(pmmSettingsPage.fields.diagnosticsInfo);
    I.waitForText(pmmSettingsPage.diagnosticsText, 30);
  },
);
