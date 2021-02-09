Feature('PMM Settings Page Functionality');

Before(async (I, pmmSettingsPage, settingsAPI) => {
  I.Authorize();
  await settingsAPI.restoreSettingsDefaults();
  I.amOnPage(pmmSettingsPage.url);
});

Scenario('PMM-T93 - Open PMM Settings page and verify changing Metrics Resolution [critical]', async (I, pmmSettingsPage) => {
  const resolutionToApply = 'Rare';

  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  await pmmSettingsPage.selectMetricsResolution(resolutionToApply);
  await pmmSettingsPage.verifyPopUpMessage(pmmSettingsPage.messages.successPopUpMessage);
  I.refreshPage();
  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  await pmmSettingsPage.verifySelectedResolution(resolutionToApply);
});

Scenario('PMM-T94 - Open PMM Settings page and verify changing Data Retention [critical]', async (I, pmmSettingsPage) => {
  const dataRetentionValue = '1';
  const sectionNameToExpand = pmmSettingsPage.sectionTabsList.advanced;

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

Scenario(
  'PMM-T108 - Open PMM Settings page and verify adding Alertmanager Rule [critical] PMM-T109 - Verify adding and clearing Alertmanager rules',
  async (I, pmmSettingsPage) => {
    const scheme = 'http://';
    const sectionNameToExpand = pmmSettingsPage.sectionTabsList.alertmanager;

    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.alertmanagerButton);
    pmmSettingsPage.addAlertmanagerRule(
      scheme + pmmSettingsPage.alertManager.ip + pmmSettingsPage.alertManager.service,
      pmmSettingsPage.alertManager.editRule.replace('{{ sec }}', Math.floor(Math.random() * 10) + 1),
    );
    await pmmSettingsPage.verifyPopUpMessage(pmmSettingsPage.messages.successPopUpMessage);
    pmmSettingsPage.openAlertsManagerUi();
    await pmmSettingsPage.verifyAlertmanagerRuleAdded(pmmSettingsPage.alertManager.ruleName);
    // PMM-T109 starting here
    I.amOnPage(pmmSettingsPage.url);
    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.alertmanagerButton);
    pmmSettingsPage.addAlertmanagerRule('', '');
    pmmSettingsPage.openAlertsManagerUi();
    await pmmSettingsPage.verifyAlertmanagerRuleAdded(
      pmmSettingsPage.alertManager.notAddedRuleName,
      false,
      false,
    );
  },
);


Scenario(
  'PMM-T253 Verify user can see correct tooltip for STT [trivial]',
  async (I, pmmSettingsPage) => {
    const sectionNameToExpand = pmmSettingsPage.sectionTabsList.advanced;

    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.advancedButton);
    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    I.moveCursorTo(pmmSettingsPage.fields.sttLabelTooltipSelector);
    await pmmSettingsPage.verifyTooltip(pmmSettingsPage.tooltips.stt);
  },
);

Scenario(
  'PMM-T253 Verify user can enable STT if Telemetry is enabled',
  async (I, pmmSettingsPage) => {
    const sectionNameToExpand = pmmSettingsPage.sectionTabsList.advanced;

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
