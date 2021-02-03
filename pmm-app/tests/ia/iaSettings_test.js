const communicationDefaults = new DataTable(['type']);

communicationDefaults.add(['email']);
communicationDefaults.add(['slack']);

Feature('IA: Settings');

Before(async (I, pmmSettingsPage, settingsAPI) => {
  I.Authorize();
  await settingsAPI.restoreSettingsDefaults();
});

Scenario('PMM-T537 - Verify user is not able to enable IA if Telemetry is disabled @ia @not-pr-pipeline',
  async (I, pmmSettingsPage, settingsAPI) => {
    await settingsAPI.apiDisableIA();
    I.amOnPage(pmmSettingsPage.advancedSettingsUrl);
    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    I.seeAttributesOnElements(pmmSettingsPage.fields.iaSwitchSelectorInput, { disabled: null });
    I.click(pmmSettingsPage.fields.telemetrySwitchSelector);
    I.seeAttributesOnElements(pmmSettingsPage.fields.iaSwitchSelectorInput, { disabled: true });
  }).retry(2);

Scenario('PMM-T532 PMM-T533 PMM-T536 - Verify user can enable/disable IA in Settings @ia @not-pr-pipeline',
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
  .Scenario('PMM-T534 PMM-T535 - Verify user is able to set up default Email/Slack communication settings @ia @not-pr-pipeline',
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
