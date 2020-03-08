Feature('PMM Settings Page Functionality');

Before((I, loginPage, pmmSettingsPage) => {
    I.amOnPage(loginPage.url);
    loginPage.login("admin", "admin");
    I.wait(3)
    I.amOnPage(pmmSettingsPage.url);
});

Scenario('Open PMM Settings page and verify changing Metrics Resolution and Data Retention', async (I, pmmSettingsPage) =>{
    let resolutionToApply = "Medium";
    let dataRetentionValue = "1";
    pmmSettingsPage.waitForPmmSettingsPageLoaded();
    pmmSettingsPage.changeDataRetentionValue(dataRetentionValue);
    await pmmSettingsPage.selectMetricsResolution(resolutionToApply);
    await pmmSettingsPage.verifySuccessfulPopUp(pmmSettingsPage.messages.successPopUpMessage);
    await pmmSettingsPage.verifyResolutionAndDataRetentionApplied(resolutionToApply, dataRetentionValue);
});

xScenario('Open PMM Settings page and verify changing Data Retention', async (I, pmmSettingsPage) =>{
    let dataRetentionValue = "1";
    pmmSettingsPage.waitForPmmSettingsPageLoaded();
    pmmSettingsPage.changeDataRetentionValueTo(dataRetentionValue);
    await pmmSettingsPage.verifySuccessfulPopUp(pmmSettingsPage.messages.successPopUpMessage);
    await pmmSettingsPage.verifyDataRetentionValueApplied(dataRetentionValue);
});

Scenario('Open PMM Settings page and verify adding Alertmanager Rule', async (I, pmmSettingsPage) =>{
    let scheme = "http://";
    let sectionNameToExpand = "Alertmanager integration";
    pmmSettingsPage.waitForPmmSettingsPageLoaded();
    pmmSettingsPage.collapseDefaultSection();
    await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.sectionButtonText.addAlert);
    pmmSettingsPage.addAlertmanagerRule(scheme + pmmSettingsPage.alertManager.ip + pmmSettingsPage.alertManager.service, pmmSettingsPage.alertManager.rule);
    await pmmSettingsPage.verifySuccessfulPopUp(pmmSettingsPage.messages.successAlertmanagerMessage);
    pmmSettingsPage.openAlertsManagerUi();
    await pmmSettingsPage.verifyAlertmanagerRuleAdded();
});
