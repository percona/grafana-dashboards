Feature('PMM Settings Page Functionality');

Before(async (I, pmmSettingsPage) => {
  I.Authorize();
  I.amOnPage(pmmSettingsPage.url);
});

Scenario('Open PMM Settings page and verify changing Metrics Resolution [critical]', async (I, pmmSettingsPage) => {
  const resolutionToApply = 'Low';
  pmmSettingsPage.waitForPmmSettingsPageLoaded();
  await pmmSettingsPage.selectMetricsResolution(resolutionToApply);
  await pmmSettingsPage.verifySuccessfulPopUp(pmmSettingsPage.messages.successPopUpMessage);
  await pmmSettingsPage.verifyResolutionIsApplied(resolutionToApply);
});

xScenario('Open PMM Settings page and verify changing Data Retention [critical]', async (I, pmmSettingsPage) => {
  const dataRetentionValue = '1';
  pmmSettingsPage.waitForPmmSettingsPageLoaded();
  pmmSettingsPage.changeDataRetentionValueTo(dataRetentionValue);
  await pmmSettingsPage.verifySuccessfulPopUp(pmmSettingsPage.messages.successPopUpMessage);
  await pmmSettingsPage.verifyDataRetentionValueApplied(dataRetentionValue);
});

Scenario('Open PMM Settings page and verify adding Alertmanager Rule [critical]', async (I, pmmSettingsPage) => {
  const scheme = 'http://';
  const sectionNameToExpand = 'Alertmanager integration';
  pmmSettingsPage.waitForPmmSettingsPageLoaded();
  pmmSettingsPage.collapseDefaultSection();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.sectionButtonText.addAlert);
  pmmSettingsPage.addAlertmanagerRule(
      scheme + pmmSettingsPage.alertManager.ip + pmmSettingsPage.alertManager.service,
      pmmSettingsPage.alertManager.rule
  );
  await pmmSettingsPage.verifySuccessfulPopUp(pmmSettingsPage.messages.successAlertmanagerMessage);
  pmmSettingsPage.openAlertsManagerUi();
  await pmmSettingsPage.verifyAlertmanagerRuleAdded(pmmSettingsPage.alertManager.ruleName);
});

xScenario('Open PMM Settings page and verify Editing Alertmanager Rule [critical]', async (I, pmmSettingsPage) => {
  const scheme = 'http://';
  const sectionNameToExpand = 'Alertmanager integration';
  pmmSettingsPage.waitForPmmSettingsPageLoaded();
  pmmSettingsPage.collapseDefaultSection();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.sectionButtonText.addAlert);
  pmmSettingsPage.addAlertmanagerRule(
      scheme + pmmSettingsPage.alertManager.ip + pmmSettingsPage.alertManager.service,
      pmmSettingsPage.alertManager.editRule
  );
  await pmmSettingsPage.verifySuccessfulPopUp(pmmSettingsPage.messages.successAlertmanagerMessage);
  pmmSettingsPage.openAlertsManagerUi();
  await pmmSettingsPage.verifyAlertmanagerRuleAdded(pmmSettingsPage.alertManager.editRuleName);
});

xScenario('Open PMM Settings page and verify clearing Alertmanager Rule', async (I, pmmSettingsPage) => {
  const sectionNameToExpand = 'Alertmanager integration';
  pmmSettingsPage.waitForPmmSettingsPageLoaded();
  pmmSettingsPage.collapseDefaultSection();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.sectionButtonText.addAlert);
  pmmSettingsPage.addAlertmanagerRule('', '');
  await pmmSettingsPage.verifySuccessfulPopUp(pmmSettingsPage.messages.successAlertmanagerMessage);
});

Scenario(
    'PMM-T253 Verify user can see correct tooltip for STT [trivial]',
    async (I, pmmSettingsPage) => {
      pmmSettingsPage.waitForPmmSettingsPageLoaded();
      I.moveCursorTo(pmmSettingsPage.fields.sttLabelTooltipSelector);
      await pmmSettingsPage.verifyTooltip(pmmSettingsPage.tooltips.stt);
    }
);

Scenario(
    'PMM-T253 Verify user can enable STT if Telemetry is enabled',
    async (I, pmmSettingsPage) => {
      await pmmSettingsPage.enableSTT();
      I.refreshPage();
      pmmSettingsPage.waitForPmmSettingsPageLoaded();
      pmmSettingsPage.verifySwitch(pmmSettingsPage.fields.sttSwitchSelector, 'on');
      I.click(pmmSettingsPage.fields.sttSwitchSelector);
      pmmSettingsPage.verifySwitch(pmmSettingsPage.fields.sttSwitchSelector, 'off');
      I.click(pmmSettingsPage.fields.applyButton);
      await pmmSettingsPage.verifySuccessfulPopUp(pmmSettingsPage.messages.successPopUpMessage);
    }
);
