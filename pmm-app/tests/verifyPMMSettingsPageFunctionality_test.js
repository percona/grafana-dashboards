Feature('PMM Settings Page Functionality');

Before((I, loginPage, pmmSettingsPage) => {
  I.amOnPage(loginPage.url);
  loginPage.login('admin', 'admin');
  I.amOnPage(pmmSettingsPage.url);
});

Scenario('Open PMM Settings page and verify changing Metrics Resolution', async (I, pmmSettingsPage) => {
  let resolutionToApply = 'Low';
  pmmSettingsPage.waitForPmmSettingsPageLoaded();
  await pmmSettingsPage.selectMetricsResolution(resolutionToApply);
  await pmmSettingsPage.verifySuccessfulPopUp(pmmSettingsPage.messages.successPopUpMessage);
  await pmmSettingsPage.verifyResolutionIsApplied(resolutionToApply);
});

xScenario('Open PMM Settings page and verify changing Data Retention', async (I, pmmSettingsPage) => {
  let dataRetentionValue = '1';
  pmmSettingsPage.waitForPmmSettingsPageLoaded();
  pmmSettingsPage.changeDataRetentionValueTo(dataRetentionValue);
  await pmmSettingsPage.verifySuccessfulPopUp(pmmSettingsPage.messages.successPopUpMessage);
  await pmmSettingsPage.verifyDataRetentionValueApplied(dataRetentionValue);
});

Scenario('Open PMM Settings page and verify adding Alertmanager Rule', async (I, pmmSettingsPage) => {
  let scheme = 'http://';
  let sectionNameToExpand = 'Alertmanager integration';
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

xScenario('Open PMM Settings page and verify Editing Alertmanager Rule', async (I, pmmSettingsPage) => {
  let scheme = 'http://';
  let sectionNameToExpand = 'Alertmanager integration';
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

Scenario('Open PMM Settings page and verify clearing Alertmanager Rule', async (I, pmmSettingsPage) => {
  let sectionNameToExpand = 'Alertmanager integration';
  pmmSettingsPage.waitForPmmSettingsPageLoaded();
  pmmSettingsPage.collapseDefaultSection();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.sectionButtonText.addAlert);
  pmmSettingsPage.addAlertmanagerRule('', '');
  await pmmSettingsPage.verifySuccessfulPopUp(pmmSettingsPage.messages.successAlertmanagerMessage);
});
