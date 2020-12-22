const page = require('./pages/notificationChannelsPage');

const notificationChannels = new DataTable(['name', 'type']);
for (const [, channel] of Object.entries(page.types)) {
  notificationChannels.add([channel.name, channel.type]);
}

Feature('IA: Notification Channels');


Before(async (I, ncPage) => {
  I.Authorize();
  ncPage.openNotificationChannelsTab();
});

Scenario(
  'Verify No Channels found message @ia @not-pr-pipeline',
  async (I, ncPage) => {
      I.waitForVisible(ncPage.elements.noChannels, 30);
      I.see(ncPage.messages.noChannelsFound, ncPage.elements.noChannels);
  },
);

Data(notificationChannels).Scenario(
  'Add a notification channel @ia @not-pr-pipeline',
  async (I, ncPage, current) => {
    ncPage.createChannel(current.name, current.type);
    I.seeElement(ncPage.elements.channelInTable(current.name, current.type));
    I.seeElement(ncPage.buttons.editChannelLocator(current.name));
    I.seeElement(ncPage.buttons.deleteChannelLocator(current.name));
  },
);

Data(notificationChannels).Scenario(
  'Remove a notification channel @ia @not-pr-pipeline',
  async (I, ncPage, current) => {
    I.click(ncPage.buttons.deleteChannelLocator(current.name));
    I.see(ncPage.messages.deleteConfirmation(current.name), ncPage.elements.modalContent);
    I.click(ncPage.buttons.confirmDelete);
    ncPage.verifyPopUpMessage(ncPage.messages.successfullyDeleted(current.name));
    I.dontSeeElement(ncPage.elements.channelInTable(current.name, current.type))
  },
);
