const page = require('./pages/notificationChannelsPage');

const notificationChannels = new DataTable(['name', 'type']);

for (const [, channel] of Object.entries(page.types)) {
  notificationChannels.add([channel.name, channel.type]);
}

Feature('IA: Notification Channels');


Before(async ({ I, channelsAPI, settingsAPI }) => {
  I.Authorize();
  await settingsAPI.apiEnableIA();
  await channelsAPI.clearAllNotificationChannels();
});

After(async ({ I, channelsAPI }) => {
  await channelsAPI.clearAllNotificationChannels();
});

Scenario(
  'Verify No Channels found message @ia @not-pr-pipeline',
  async ({ I, ncPage }) => {
    ncPage.openNotificationChannelsTab();
    I.waitForVisible(ncPage.elements.noChannels, 30);
    I.see(ncPage.messages.noChannelsFound, ncPage.elements.noChannels);
  },
);

Data(notificationChannels).Scenario(
  'PMM-T513,PMM-T512, PMM-T491 Add a notification channel @ia @not-pr-pipeline',
  async ({ I, ncPage, current }) => {
    ncPage.openNotificationChannelsTab();
    ncPage.createChannel(current.name, current.type);
    I.seeElement(ncPage.elements.channelInTable(current.name, current.type));
    I.seeElement(ncPage.buttons.editChannelLocator(current.name));
    I.seeElement(ncPage.buttons.deleteChannelLocator(current.name));
  },
);

Data(notificationChannels).Scenario(
  'Edit notification channel @ia @not-pr-pipeline',
  async ({ I, ncPage, channelsAPI, current }) => {
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
  async ({ I, ncPage, channelsAPI, current }) => {
    await channelsAPI.createNotificationChannel(current.name, current.type);
    ncPage.openNotificationChannelsTab();
    I.click(ncPage.buttons.deleteChannelLocator(current.name));
    I.see(ncPage.messages.deleteConfirmation(current.name), ncPage.elements.modalContent);
    I.click(ncPage.buttons.confirmDelete);
    ncPage.verifyPopUpMessage(ncPage.messages.successfullyDeleted(current.name));
    I.dontSeeElement(ncPage.elements.channelInTable(current.name, current.type));
  },
);
