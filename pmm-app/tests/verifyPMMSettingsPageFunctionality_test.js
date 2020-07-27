Feature('PMM Settings Page Functionality');

Before(async (I, pmmSettingsPage, settingsAPI) => {
  I.Authorize();
  await settingsAPI.apiDisableSTT();
  I.amOnPage(pmmSettingsPage.url);
});

Scenario('Open PMM Settings page and verify changing Metrics Resolution [critical]', async (I, pmmSettingsPage) => {
  const resolutionToApply = 'Low';
  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  const currentValue = await I.grabTextFrom(pmmSettingsPage.fields.selectedResolution);
  await pmmSettingsPage.selectMetricsResolution(resolutionToApply);
  await pmmSettingsPage.verifyPopUpMessage(pmmSettingsPage.messages.successPopUpMessage);
  I.refreshPage();
  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  I.waitForText(resolutionToApply, 30, pmmSettingsPage.fields.selectedResolution);
  await pmmSettingsPage.selectMetricsResolution(currentValue);
  await pmmSettingsPage.verifyPopUpMessage(pmmSettingsPage.messages.successPopUpMessage);
});

Scenario('Open PMM Settings page and verify changing Data Retention [critical]', async (I, pmmSettingsPage) => {
  const dataRetentionValue = '1';
  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  const currentValue = await I.grabValueFrom(pmmSettingsPage.fields.dataRetentionCount);
  pmmSettingsPage.changeDataRetentionValueTo(dataRetentionValue);
  await pmmSettingsPage.verifyPopUpMessage(pmmSettingsPage.messages.successPopUpMessage);
  I.refreshPage();
  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  I.waitForValue(pmmSettingsPage.fields.dataRetentionCount, dataRetentionValue, 30);
  pmmSettingsPage.changeDataRetentionValueTo(currentValue);
  await pmmSettingsPage.verifyPopUpMessage(pmmSettingsPage.messages.successPopUpMessage);
});

Scenario('Open PMM Settings page and verify adding Alertmanager Rule [critical]', async (I, pmmSettingsPage) => {
  const scheme = 'http://';
  const sectionNameToExpand = 'Alertmanager integration';
  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  pmmSettingsPage.collapseDefaultSection();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.sectionButtonText.addAlert);
  pmmSettingsPage.addAlertmanagerRule(
    scheme + pmmSettingsPage.alertManager.ip + pmmSettingsPage.alertManager.service,
    pmmSettingsPage.alertManager.rule
  );
  await pmmSettingsPage.verifyPopUpMessage(pmmSettingsPage.messages.successAlertmanagerMessage);
  pmmSettingsPage.openAlertsManagerUi();
  await pmmSettingsPage.verifyAlertmanagerRuleAdded(pmmSettingsPage.alertManager.ruleName);
});

Scenario(
  'PMM-T253 Verify user can see correct tooltip for STT [trivial]',
  async (I, pmmSettingsPage) => {
    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    I.moveCursorTo(pmmSettingsPage.fields.sttLabelTooltipSelector);
    await pmmSettingsPage.verifyTooltip(pmmSettingsPage.tooltips.stt);
  }
);

Scenario(
  'PMM-T253 Verify user can enable STT if Telemetry is enabled',
  async (I, pmmSettingsPage) => {
    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    I.click(pmmSettingsPage.fields.sttSwitchSelector);
    pmmSettingsPage.verifySwitch(pmmSettingsPage.fields.sttSwitchSelector, 'on');
    I.click(pmmSettingsPage.fields.applyButton);
    await pmmSettingsPage.verifyPopUpMessage(pmmSettingsPage.messages.successPopUpMessage);
    I.refreshPage();
    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    pmmSettingsPage.verifySwitch(pmmSettingsPage.fields.sttSwitchSelector, 'on');
    I.click(pmmSettingsPage.fields.sttSwitchSelector);
    pmmSettingsPage.verifySwitch(pmmSettingsPage.fields.sttSwitchSelector, 'off');
    I.click(pmmSettingsPage.fields.applyButton);
    await pmmSettingsPage.verifyPopUpMessage(pmmSettingsPage.messages.successPopUpMessage);
  }
);
