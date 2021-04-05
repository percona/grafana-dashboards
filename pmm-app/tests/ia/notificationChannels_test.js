const page = require('./pages/notificationChannelsPage');

const notificationChannels = new DataTable(['name', 'type']);

for (const [, channel] of Object.entries(page.types)) {
  notificationChannels.add([channel.name, channel.type]);
}

Feature('IA: Notification Channels').retry(2);


Before(async ({
  I, channelsAPI, settingsAPI, rulesAPI,
}) => {
  await I.Authorize();
  await settingsAPI.apiEnableIA();
  await rulesAPI.clearAllRules();
  await channelsAPI.clearAllNotificationChannels();
});

After(async ({ channelsAPI, rulesAPI }) => {
  await rulesAPI.clearAllRules();
  await channelsAPI.clearAllNotificationChannels();
});

Scenario(
  'Verify No Channels found message @ia @not-pr-pipeline',
  async ({ I, ncPage }) => {
    ncPage.openNotificationChannelsTab();
    I.waitForVisible(ncPage.elements.noData, 30);
    I.see(ncPage.messages.noChannelsFound, ncPage.elements.noData);
  },
);

Scenario(
  'PMM-T561 Verify that "#" cannot be used in Slack channel name @ia @not-pr-pipeline',
  async ({ I, ncPage }) => {
    ncPage.openNotificationChannelsTab();
    I.waitForVisible(ncPage.buttons.openAddChannelModal, 30);
    I.click(ncPage.buttons.openAddChannelModal);
    await ncPage.selectChannelType(ncPage.types.slack.type);
    I.fillField(ncPage.fields.slackChannelInput, '#');
    I.seeTextEquals(ncPage.messages.invalidCharacter, ncPage.elements.channelFieldValidation);
    I.seeAttributesOnElements(ncPage.buttons.addChannel, { disabled: true });
  },
);

Data(notificationChannels).Scenario(
  'PMM-T513,PMM-T512, PMM-T491 Add a notification channel @ia @not-pr-pipeline',
  async ({ ncPage, current }) => {
    ncPage.openNotificationChannelsTab();
    await ncPage.createChannel(current.name, current.type);
    ncPage.verifyChannelInList(current.name, current.type);
  },
);

Scenario(
  'PMM-T645, PMM-T647 Add a Pager Duty with Service Key @ia @not-pr-pipeline',
  async ({ I, ncPage }) => {
    const channelName = 'Pager Duty with Service key';

    ncPage.openNotificationChannelsTab();
    I.click(ncPage.buttons.openAddChannelModal);
    I.waitForVisible(ncPage.fields.typeDropdown, 30);
    I.fillField(ncPage.fields.nameInput, channelName);
    await ncPage.selectChannelType(ncPage.types.pagerDuty.type);
    I.click(ncPage.buttons.pagerDutyServiceKeyOption);
    I.waitForVisible(ncPage.fields.serviceKeyInput, 10);
    I.fillField(ncPage.fields.serviceKeyInput, 'ServiceKeyValue');
    I.click(ncPage.buttons.addChannel);
    I.verifyPopUpMessage(ncPage.messages.successfullyAdded);
    ncPage.verifyChannelInList(channelName, ncPage.types.pagerDuty.type);
  },
);

Scenario(
  'PMM-T647 Verify toggle for Service/Routing key @ia @not-pr-pipeline',
  async ({ I, ncPage }) => {
    ncPage.openNotificationChannelsTab();
    I.click(ncPage.buttons.openAddChannelModal);
    I.waitForVisible(ncPage.fields.typeDropdown, 30);
    await ncPage.selectChannelType(ncPage.types.pagerDuty.type);
    I.dontSeeElement(ncPage.elements.serviceKeyFieldLabel);
    I.seeElement(ncPage.elements.routingKeyFieldLabel);
    I.fillField(ncPage.fields.routingKeyInput, 'RoutingKeyValue');
    I.click(ncPage.buttons.pagerDutyServiceKeyOption);
    I.waitForVisible(ncPage.fields.serviceKeyInput, 10);
    I.seeElement(ncPage.elements.serviceKeyFieldLabel);
    I.fillField(ncPage.fields.serviceKeyInput, 'ServiceKeyValue');
    I.click(ncPage.buttons.pagerDutyRoutingKeyOption);
    I.seeElement(ncPage.elements.routingKeyFieldLabel);
    I.seeInField(ncPage.fields.routingKeyInput, 'RoutingKeyValue');
    I.click(ncPage.buttons.pagerDutyServiceKeyOption);
    I.seeInField(ncPage.fields.serviceKeyInput, 'ServiceKeyValue');
  },
);

Data(notificationChannels).Scenario(
  'PMM-T492 Edit notification channel @ia @not-pr-pipeline',
  async ({
    I, ncPage, channelsAPI, current,
  }) => {
    await channelsAPI.createNotificationChannel(current.name, current.type);
    ncPage.openNotificationChannelsTab();
    const newName = ncPage.editChannel(current.name, current.type);

    I.seeElement(ncPage.elements.channelInTable(newName, current.type));
    I.seeElement(ncPage.buttons.editChannelLocator(newName));
    I.seeElement(ncPage.buttons.deleteChannelLocator(newName));
    I.click(ncPage.buttons.editChannelLocator(newName));
    I.seeInField(ncPage.fields.nameInput, newName);
  },
);

Data(notificationChannels).Scenario(
  'PMM-T493 Delete a notification channel @ia @not-pr-pipeline',
  async ({
    I, ncPage, channelsAPI, current,
  }) => {
    await channelsAPI.createNotificationChannel(current.name, current.type);
    ncPage.openNotificationChannelsTab();
    I.click(ncPage.buttons.deleteChannelLocator(current.name));
    I.see(ncPage.messages.deleteConfirmation(current.name), ncPage.elements.modalContent);
    I.click(ncPage.buttons.confirmDelete);
    I.verifyPopUpMessage(ncPage.messages.successfullyDeleted(current.name));
    I.dontSeeElement(ncPage.elements.channelInTable(current.name, current.type));
  },
);

Data(notificationChannels).Scenario(
  'PMM-T658 Verify notification channel can not be deleted if it is used by a rule @ia @not-pr-pipeline',
  async ({
    I, ncPage, channelsAPI, rulesAPI, current,
  }) => {
    const channel = {
      name: current.name,
      type: current.type,
    };
    const channelId = await channelsAPI.createNotificationChannel(channel.name, channel.type);
    const ruleId = await rulesAPI.createAlertRule({ channels: [channelId] });

    ncPage.openNotificationChannelsTab();
    ncPage.deleteChannel(channel.name, channel.type);

    I.verifyPopUpMessage(ncPage.messages.channelUsedByRule(channelId));

    await rulesAPI.removeAlertRule(ruleId);
    await channelsAPI.deleteNotificationChannel(channelId);
  },
);
