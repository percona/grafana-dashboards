const page = require('./pages/pmmSettingsPage');

const validationValues = ['text ', '2147483648', '-1', '<script>alert(test);</script>'];

let dataRetentionTable = new DataTable(['value', 'message']);
for (const i in validationValues) {
  dataRetentionTable.add([validationValues[i], page.messages.invalidDataDurationMessage])
}
dataRetentionTable.add(['', page.messages.requiredFieldMessage]);

Feature('PMM Settings Page Elements and Validations');

Before(async (I, pmmSettingsPage) => {
  I.Authorize();
  I.amOnPage(pmmSettingsPage.url);
});

Scenario(
    'Verify Section Headers and Settings Section Elements [critical]',
    async (I, pmmSettingsPage) => {
      await pmmSettingsPage.waitForPmmSettingsPageLoaded();
      for (const i in pmmSettingsPage.sectionHeaderList) {
        I.see(pmmSettingsPage.sectionHeaderList[i], pmmSettingsPage.fields.sectionHeader);
      }
      I.see(pmmSettingsPage.sectionButtonText.applyChanges, pmmSettingsPage.fields.applyButton);

      await within(pmmSettingsPage.fields.expandedSection, () => {
        I.see('Metrics resolution', pmmSettingsPage.fields.metricsResolutionLabel);
        I.seeElement(pmmSettingsPage.fields.metricsResolutionSlider);
        I.see('Data retention', pmmSettingsPage.fields.dataRetentionLabel);
        I.seeElement(pmmSettingsPage.fields.dataRetentionCount);
        I.see('Telemetry', pmmSettingsPage.fields.telemetryLabel);
        I.seeElement(pmmSettingsPage.fields.telemetrySwitchSelector);
        I.see('Check for updates', pmmSettingsPage.fields.checkForUpdatesLabel);
        I.seeElement(pmmSettingsPage.fields.sttSwitchSelector);
      });
    }
);

Scenario('Verify SSH Key Details Section Elements', async (I, pmmSettingsPage) => {
  const sectionNameToExpand = 'SSH Key Details';
  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  pmmSettingsPage.collapseDefaultSection();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.sectionButtonText.applySSHKey);
  I.see('SSH key', pmmSettingsPage.fields.sshKeyLabel);
  I.seeElement(pmmSettingsPage.fields.sshKeyInput);
});

Scenario(
    'Verify Alertmanager integration Section Elements',
    async (I, pmmSettingsPage) => {
      const sectionNameToExpand = 'Alertmanager integration';
      await pmmSettingsPage.waitForPmmSettingsPageLoaded();
      pmmSettingsPage.collapseDefaultSection();
      await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.sectionButtonText.addAlert);
      I.see('Alertmanager URL', pmmSettingsPage.fields.amUrlLabel);
      I.see('Prometheus Alerting rules', pmmSettingsPage.fields.alertingRules);
      I.seeElement(pmmSettingsPage.fields.alertURLInput);
      I.seeElement(pmmSettingsPage.fields.alertRulesInput);
    }
);

Scenario('Verify Diagnostics Section Elements', async (I, pmmSettingsPage) => {
  const sectionNameToExpand = 'Diagnostics';
  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  pmmSettingsPage.collapseDefaultSection();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.sectionButtonText.downloadLogs);
  I.see(pmmSettingsPage.diagnosticsText, `${pmmSettingsPage.fields.expandedSection} div`);
});

Data(dataRetentionTable).Scenario(
    'Verify validation for Data Retention field',
    async (I, pmmSettingsPage, current) => {
      await pmmSettingsPage.waitForPmmSettingsPageLoaded();
      await pmmSettingsPage.changeDataRetentionValueTo(current.value);
      await pmmSettingsPage.verifyValidationMessage(current.message);
    }
);

Scenario(
    'Verify validation for decimal Data Retention value',
    async (I, pmmSettingsPage) => {
      const dataRetentionValue = '15.5';
      await pmmSettingsPage.waitForPmmSettingsPageLoaded();
      await pmmSettingsPage.changeDataRetentionValueTo(dataRetentionValue);
      await pmmSettingsPage.verifyPopUpMessage(pmmSettingsPage.messages.invalidDataDurationPopUpMessage);
    }
);

Scenario('Verify validation for invalid SSH Key', async (I, pmmSettingsPage) => {
  const sshKeyForTest = 'ssh-rsa testKey test@key.local';
  const sectionNameToExpand = 'SSH Key Details';
  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  pmmSettingsPage.collapseDefaultSection();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.sectionButtonText.applySSHKey);
  pmmSettingsPage.addSSHKey(sshKeyForTest);
  await pmmSettingsPage.verifyPopUpMessage(pmmSettingsPage.messages.invalidSSHKeyMessage);
});

Scenario(
    'Verify validation for Alertmanager URL without scheme',
    async (I, pmmSettingsPage) => {
      const urlWithoutScheme = 'invalid_url';
      const sectionNameToExpand = 'Alertmanager integration';
      await pmmSettingsPage.waitForPmmSettingsPageLoaded();
      pmmSettingsPage.collapseDefaultSection();
      await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.sectionButtonText.addAlert);
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
      pmmSettingsPage.collapseDefaultSection();
      await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.sectionButtonText.addAlert);
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
      pmmSettingsPage.collapseDefaultSection();
      await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.sectionButtonText.addAlert);
      pmmSettingsPage.addAlertmanagerRule('', rule);
      await pmmSettingsPage.verifyPopUpMessage(pmmSettingsPage.messages.invalidAlertmanagerRulesMessage);
    }
);

Scenario(
  'PMM-T254 Verify validation for STT and Telemetry switches',
  async (I, pmmSettingsPage, settingsAPI) => {
    await settingsAPI.apiDisableSTT();
    I.amOnPage(pmmSettingsPage.url);
    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
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
    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    I.waitForValue(pmmSettingsPage.fields.dataRetentionCount, dataRetention, 30);
  }
);
