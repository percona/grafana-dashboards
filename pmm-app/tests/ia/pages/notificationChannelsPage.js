const { I } = inject();
const assert = require('assert');

module.exports = {
  url: 'graph/integrated-alerting',
  types: {
    email: {
      name: 'Email Channel',
      type: 'Email',
      addresses: 'some@email.com, other@email.com'
    },
    pagerDutyRouting: {
      name: 'PagerDuty with routingKey Channel',
      type: 'Pager Duty',
      key: 'routingKey',
    },
    pagerDutyService: {
      name: 'PagerDuty serviceKey Channel',
      type: 'Pager Duty',
      key: 'serviceKey',
      },
    slack: {
      name: 'Slack Channel',
      type: 'Slack',
      slackChannel: 'slackChannel',
    },
  },
  elements: {
    notificationChannelsTab: '//li[@aria-label="Tab Notification Channels"]',
    channelInTable: (name, type) => `//td[text()="${name}"]/following-sibling::td[text()="${type}"]`,
    templatesTableHeader: '$alert-rule-templates-table-thead',
    noChannels: '[data-qa=table-no-data] > h1',
    nameFieldLabel: '$name-field-label',
    modalHeader: '$modal-header',
    modalContent: '$modal-content',
    popUpTitle: '.alert-title',
  },
  buttons: {
    openAddChannelModal: '$notification-channel-add-modal-button',
    closeModal: '$modal-close-button',
    addChannel: '$notification-channel-add-button',
    cancelAdding: '$notification-channel-cancel-button',
    confirmDelete: '$confirm-delete-modal-button',
    // removeChannelLocator returns delete channel button locators for a given channel name
    deleteChannelLocator: (name) =>`//td[text()="${name}"]/following-sibling::td//button[@data-qa="delete-notification-channel-button"]`,
    // editChannelLocator returns delete channel button locators for a given channel name
    editChannelLocator: (name) =>`//td[text()="${name}"]/following-sibling::td//button[@data-qa="edit-notification-channel-button"]`,
  },
  fields: {
    nameInput: '$name-text-input',
    typeDropdown: 'div[class$="singleValue"]',
    typeOptionLocator: (type) => `//div[@aria-label="Select option"]//span[text()="${type}"]`,
    emailsInput: '$emails-textarea-input',
    routingKeyInput: '$routing-text-input',
    serviceKeyInput: '$service-text-input',
    slackChannelInput: '$channel-text-input',
  },
  messages: {
    noChannelsFound: 'No notification channels found',
    successfullyAdded: 'Notification channel was successfully added',
    successfullyEdited: 'Alert rule template successfully added',
    deleteConfirmation: (name) => `Are you sure you want to delete the notification channel "${name}"?`,
    successfullyDeleted: (name) => `Notification channel "${name}" successfully deleted.`,
  },

  openNotificationChannelsTab() {
    I.amOnPage(this.url);
    I.waitForVisible(this.elements.notificationChannelsTab, 30);
    I.click(this.elements.notificationChannelsTab);
  },

  selectChannelType(type) {
    I.click(this.fields.typeDropdown);
    I.click(this.fields.typeOptionLocator(type));
    I.see(type, this.fields.typeDropdown);
  },

  createChannel(name, type) {
    I.click(this.buttons.openAddChannelModal);
    I.waitForVisible(this.fields.typeDropdown, 30);
    I.seeElement(this.buttons.closeModal);
    I.seeElement(this.buttons.cancelAdding);
    this.fillFields(name, type);
    I.click(this.buttons.addChannel);
    this.verifyPopUpMessage(this.messages.successfullyAdded);
  },

  fillFields(name, type) {
    I.fillField(this.fields.nameInput, name);
    this.selectChannelType(type);

    switch (name) {
      case this.types.email.name:
        I.fillField(this.fields.emailsInput, this.types.email.addresses);
        break;
      case this.types.pagerDutyRouting.name:
        I.fillField(this.fields.routingKeyInput, this.types.pagerDutyRouting.key);
        break;
        case this.types.pagerDutyService.name:
        I.fillField(this.fields.serviceKeyInput, this.types.pagerDutyService.key);
        break;
      case this.types.slack.name:
        I.fillField(this.fields.slackChannelInput, this.types.slack.slackChannel);
        break;
      default:
        assert.ok(false, `Did not found matching notification channel name ${name}`)
    }
  },

  verifyPopUpMessage(message) {
    I.waitForVisible(this.elements.popUpTitle, 30);
    I.see(message, this.elements.popUpTitle);
  },
};
