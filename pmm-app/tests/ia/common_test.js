Feature('IA: Navigation, breadcrumb').retry(2);


Before(async ({
  I, channelsAPI, settingsAPI, rulesAPI, templatesAPI,
}) => {
  await I.Authorize();
  await settingsAPI.apiEnableIA();
  await rulesAPI.clearAllRules(true);
  await templatesAPI.clearAllTemplates();
  await channelsAPI.clearAllNotificationChannels();
});

Scenario(
  'PMM-T643 Verify message about disabled IA @ia @not-pr-pipeline',
  async ({
    I, settingsAPI, iaCommon, pmmSettingsPage, codeceptjsConfig,
  }) => {
    await settingsAPI.apiDisableIA();
    I.amOnPage(iaCommon.url);

    I.waitForVisible(iaCommon.elements.disabledIa, 30);
    I.seeTextEquals(iaCommon.messages.disabledIa, iaCommon.elements.disabledIa);

    I.seeAttributesOnElements(iaCommon.elements.settingsLink, {
      href: `${codeceptjsConfig.config.helpers.Playwright.url}${pmmSettingsPage.advancedSettingsUrl}`,
    });
  },
);

Scenario(
  'PMM-T481 PMM-T619 PMM-T620 Verify user is able to use tab bar, breadcrumb @ia @not-pr-pipeline',
  async ({
    I, alertRulesPage, ruleTemplatesPage, iaCommon, ncPage,
  }) => {
    const verifyNotificationChannelsPage = async () => {
      I.seeInCurrentUrl(`${iaCommon.url}/notification-channels`);
      I.seeElement(ncPage.buttons.openAddChannelModal);
      await iaCommon.verifyTabIsActive(iaCommon.tabNames.notificationChannels);
      I.seeTextEquals(iaCommon.tabNames.notificationChannels, iaCommon.elements.breadcrumbActive);
    };

    I.amOnPage(iaCommon.url);

    I.waitForVisible(iaCommon.elements.tab(iaCommon.tabNames.alerts));
    I.seeInCurrentUrl(`${iaCommon.url}/alerts`);
    await iaCommon.verifyTabIsActive(iaCommon.tabNames.alerts);
    I.seeTextEquals(iaCommon.tabNames.alerts, iaCommon.elements.breadcrumbActive);

    iaCommon.openTab(iaCommon.tabNames.alertRules);
    I.seeInCurrentUrl(`${iaCommon.url}/alert-rules`);
    I.seeElement(alertRulesPage.buttons.openAddRuleModal);
    await iaCommon.verifyTabIsActive(iaCommon.tabNames.alertRules);
    I.seeTextEquals(iaCommon.tabNames.alertRules, iaCommon.elements.breadcrumbActive);

    iaCommon.openTab(iaCommon.tabNames.ruleTemplates);
    I.seeInCurrentUrl(`${iaCommon.url}/alert-rule-templates`);
    I.seeElement(ruleTemplatesPage.buttons.openAddTemplateModal);
    await iaCommon.verifyTabIsActive(iaCommon.tabNames.ruleTemplates);
    I.seeTextEquals(iaCommon.tabNames.ruleTemplates, iaCommon.elements.breadcrumbActive);

    iaCommon.openTab(iaCommon.tabNames.notificationChannels);
    await verifyNotificationChannelsPage();
    I.refreshPage();
    I.waitForVisible(ncPage.buttons.openAddChannelModal, 30);
    await verifyNotificationChannelsPage();

    iaCommon.openTab(iaCommon.tabNames.alerts);
    I.seeInCurrentUrl(`${iaCommon.url}/alerts`);
    await iaCommon.verifyTabIsActive(iaCommon.tabNames.alerts);
    I.seeTextEquals(iaCommon.tabNames.alerts, iaCommon.elements.breadcrumbActive);
  },
);
