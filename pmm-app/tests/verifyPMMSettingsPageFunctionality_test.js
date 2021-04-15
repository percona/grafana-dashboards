const communicationDefaults = new DataTable(['type']);

communicationDefaults.add(['email']);
communicationDefaults.add(['slack']);

Feature('PMM Settings Functionality').retry(2);

Before(async ({ I, settingsAPI }) => {
  await I.Authorize();
  await settingsAPI.restoreSettingsDefaults();
});

Scenario('PMM-T93 - Open PMM Settings page and verify changing Metrics Resolution [critical]', async ({ I, pmmSettingsPage }) => {
  const resolutionToApply = 'Rare';

  I.amOnPage(pmmSettingsPage.url);
  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  await pmmSettingsPage.selectMetricsResolution(resolutionToApply);
  I.verifyPopUpMessage(pmmSettingsPage.messages.successPopUpMessage);
  I.refreshPage();
  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  await pmmSettingsPage.verifySelectedResolution(resolutionToApply);
});

Scenario('PMM-T94 - Open PMM Settings page and verify changing Data Retention [critical]', async ({ I, pmmSettingsPage }) => {
  const dataRetentionValue = '1';
  const sectionNameToExpand = pmmSettingsPage.sectionTabsList.advanced;

  I.amOnPage(pmmSettingsPage.url);
  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.advancedButton);
  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  pmmSettingsPage.changeDataRetentionValueTo(dataRetentionValue);
  I.verifyPopUpMessage(pmmSettingsPage.messages.successPopUpMessage);
  I.refreshPage();
  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.advancedButton);
  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  I.waitForValue(pmmSettingsPage.fields.dataRetentionInput, dataRetentionValue, 30);
});

Scenario(
  'PMM-T108 - Open PMM Settings page and verify adding Alertmanager Rule [critical] PMM-T109 - Verify adding and clearing Alertmanager rules',
  async ({ I, pmmSettingsPage }) => {
    const scheme = 'http://';
    const sectionNameToExpand = pmmSettingsPage.sectionTabsList.alertmanager;

    I.amOnPage(pmmSettingsPage.url);
    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.alertmanagerButton);
    pmmSettingsPage.addAlertmanagerRule(
      scheme + pmmSettingsPage.alertManager.ip + pmmSettingsPage.alertManager.service,
      pmmSettingsPage.alertManager.editRule.replace('{{ sec }}', Math.floor(Math.random() * 10) + 1),
    );
    I.verifyPopUpMessage(pmmSettingsPage.messages.successPopUpMessage);
    pmmSettingsPage.openAlertsManagerUi();
    await pmmSettingsPage.verifyAlertmanagerRuleAdded(pmmSettingsPage.alertManager.editRuleName);
    // PMM-T109 starting here
    I.amOnPage(pmmSettingsPage.url);
    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.alertmanagerButton);
    pmmSettingsPage.addAlertmanagerRule('', '');
    I.wait(5);
    pmmSettingsPage.openAlertsManagerUi();
    I.dontSeeElement(`//pre[contains(text(), '${pmmSettingsPage.alertManager.editRuleName}')]`);
  },
);

Scenario(
  'PMM-T253 Verify user can see correct tooltip for STT [trivial]',
  async ({ I, pmmSettingsPage }) => {
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
  'PMM-T560 Verify IA related tooltips [trivial] @ia @not-pr-pipeline',
  async ({ I, pmmSettingsPage, settingsAPI }) => {
    await settingsAPI.apiEnableIA();

    I.amOnPage(pmmSettingsPage.advancedSettingsUrl);
    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    I.waitForVisible(pmmSettingsPage.fields.iaLabelTooltipSelector, 30);

    // Verify tooltip for Enable/Disable IA toggle
    I.moveCursorTo(pmmSettingsPage.fields.iaLabelTooltipSelector);
    await pmmSettingsPage.verifyTooltip(pmmSettingsPage.tooltips.integratedAlerting);

    I.amOnPage(pmmSettingsPage.communicationSettingsUrl);
    I.waitForVisible(pmmSettingsPage.communication.email.serverAddress.locator, 30);

    // Verify tooltips for Communication > Email fields
    for (const o of Object.keys(pmmSettingsPage.communication.email)) {
      I.moveCursorTo(pmmSettingsPage.communication.submitEmailButton);
      I.moveCursorTo(pmmSettingsPage.communication.email[o].tooltipLocator);

      if (o === 'password' || o === 'username') {
        await pmmSettingsPage.verifyTooltip(pmmSettingsPage.tooltips.auth);
      } else {
        await pmmSettingsPage.verifyTooltip(pmmSettingsPage.tooltips[o]);
      }
    }

    // Verify tooltips for Communication > Slack URL field
    I.click(pmmSettingsPage.communication.slackTab);
    I.moveCursorTo(pmmSettingsPage.communication.slack.url.tooltipLocator);
    await pmmSettingsPage.verifyTooltip(pmmSettingsPage.tooltips.slackUrl);
  },
);

Scenario(
  'PMM-T253 Verify user can enable STT if Telemetry is enabled',
  async ({ I, pmmSettingsPage }) => {
    const sectionNameToExpand = pmmSettingsPage.sectionTabsList.advanced;

    I.amOnPage(pmmSettingsPage.url);
    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.advancedButton);
    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    I.click(pmmSettingsPage.fields.sttSwitchSelector);
    pmmSettingsPage.verifySwitch(pmmSettingsPage.fields.sttSwitchSelectorInput, 'on');
    I.click(pmmSettingsPage.fields.advancedButton);
    I.refreshPage();
    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.advancedButton);
    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    pmmSettingsPage.verifySwitch(pmmSettingsPage.fields.sttSwitchSelectorInput, 'on');
  },
).retry(2);

Scenario('PMM-T520 - Verify that alert is in Firing State - internal alert manager @not-ui-pipeline @nightly @not-pr-pipeline', async ({ I, pmmSettingsPage }) => {
  const scheme = 'http://127.0.0.1';
  const sectionNameToExpand = pmmSettingsPage.sectionTabsList.alertmanager;

  I.amOnPage(pmmSettingsPage.url);
  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.alertmanagerButton);
  pmmSettingsPage.addAlertmanagerRule(
    scheme + pmmSettingsPage.alertManager.service,
    pmmSettingsPage.alertManager.rule2,
  );
  I.verifyPopUpMessage(pmmSettingsPage.messages.successPopUpMessage);
  pmmSettingsPage.openAlertsManagerUi();
  await pmmSettingsPage.verifyAlertmanagerRuleAdded(pmmSettingsPage.alertManager.ruleName2);
  I.amOnPage(pmmSettingsPage.stateOfAlertsUrl);
  await pmmSettingsPage.verifyAlertmanagerRuleAdded(pmmSettingsPage.alertManager.ruleName2, true);
});

Scenario('PMM-T520 - Verify that alert is being fired to external Alert Manager @not-ui-pipeline @nightly @not-pr-pipeline', async ({ I, pmmSettingsPage }) => {
  const scheme = 'http://';
  const sectionNameToExpand = pmmSettingsPage.sectionTabsList.alertmanager;

  I.amOnPage(pmmSettingsPage.url);
  await pmmSettingsPage.waitForPmmSettingsPageLoaded();
  await pmmSettingsPage.expandSection(sectionNameToExpand, pmmSettingsPage.fields.alertmanagerButton);
  pmmSettingsPage.addAlertmanagerRule(
    scheme + pmmSettingsPage.alertManager.ip + pmmSettingsPage.alertManager.externalAlertManagerPort,
    pmmSettingsPage.alertManager.rule,
  );
  I.verifyPopUpMessage(pmmSettingsPage.messages.successPopUpMessage);
  pmmSettingsPage.openAlertsManagerUi();
  await pmmSettingsPage.verifyAlertmanagerRuleAdded(pmmSettingsPage.alertManager.ruleName);
  I.amOnPage(pmmSettingsPage.stateOfAlertsUrl);
  await pmmSettingsPage.verifyAlertmanagerRuleAdded(pmmSettingsPage.alertManager.ruleName, true);
  await pmmSettingsPage.verifyExternalAlertManager(pmmSettingsPage.alertManager.ruleName);
});

Scenario('PMM-T532 PMM-T533 PMM-T536 - Verify user can enable/disable IA in Settings @ia @not-pr-pipeline',
  async ({
    I, pmmSettingsPage, settingsAPI, adminPage,
  }) => {
    await settingsAPI.apiDisableIA();
    I.amOnPage(pmmSettingsPage.advancedSettingsUrl);
    I.waitForVisible(pmmSettingsPage.fields.iaSwitchSelector, 30);
    I.click(pmmSettingsPage.fields.iaSwitchSelector);
    I.dontSeeElement(pmmSettingsPage.communication.communicationSection);
    pmmSettingsPage.verifySwitch(pmmSettingsPage.fields.iaSwitchSelectorInput, 'on');
    I.click(pmmSettingsPage.fields.advancedButton);
    I.waitForVisible(pmmSettingsPage.fields.iaSwitchSelectorInput, 30);
    pmmSettingsPage.verifySwitch(pmmSettingsPage.fields.iaSwitchSelectorInput, 'on');
    I.seeElementInDOM(adminPage.sideMenu.integratedAlerting);
    I.seeTextEquals('Integrated Alerting', adminPage.sideMenu.integratedAlerting);
    I.seeTextEquals('Communication', pmmSettingsPage.communication.communicationSection);
    I.click(pmmSettingsPage.fields.iaSwitchSelector);
    pmmSettingsPage.verifySwitch(pmmSettingsPage.fields.iaSwitchSelectorInput, 'off');
    I.click(pmmSettingsPage.fields.advancedButton);
    I.waitForVisible(pmmSettingsPage.fields.iaSwitchSelector, 30);
    pmmSettingsPage.verifySwitch(pmmSettingsPage.fields.iaSwitchSelectorInput, 'off');
    I.dontSeeElementInDOM(adminPage.sideMenu.integratedAlerting);
    I.dontSeeElement(pmmSettingsPage.communication.communicationSection);
    await settingsAPI.apiEnableIA();
  }).retry(2);


// TODO: unskip and fix in scope of https://jira.percona.com/browse/PMM-7830
Scenario.skip('PMM-T534 PMM-T535 - Verify user is able to set up default Email/Slack communication settings @ia @not-pr-pipeline',
  async ({
    I, pmmSettingsPage, settingsAPI, current,
  }) => {
    await settingsAPI.apiEnableIA();
    I.amOnPage(pmmSettingsPage.communicationSettingsUrl);
    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    pmmSettingsPage.fillCommunicationFields(current.type);
    I.verifyPopUpMessage(pmmSettingsPage.messages.successPopUpMessage);
    I.refreshPage();
    await pmmSettingsPage.waitForPmmSettingsPageLoaded();
    await pmmSettingsPage.verifyCommunicationFields(current.type);
  }).retry(2);
