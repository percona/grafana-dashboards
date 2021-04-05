const { I, ncPage } = inject();
const assert = require('assert');
const faker = require('faker');

module.exports = {
  types: ncPage.types,

  async createNotificationChannel(name, type, values) {
    let body = {
      summary: name,
    };

    switch (type) {
      case this.types.email.type:
        body = {
          ...body,
          email_config: {
            to: [values || this.types.email.addresses],
          },
        };
        break;
      case this.types.pagerDuty.type:
        body = {
          ...body,
          pagerduty_config: {
            routing_key: this.types.pagerDuty.key,
          },
        };
        break;
      case this.types.slack.type:
        body = {
          ...body,
          slack_config: {
            channel: this.types.slack.slackChannel,
          },
        };
        break;
      default:
        assert.ok(false, `Unknown channel ${type}`);
    }
    const headers = { Authorization: `Basic ${await I.getAuth()}` };

    const resp = await I.sendPostRequest('v1/management/ia/Channels/Add', body, headers);


    assert.ok(
      resp.status === 200,
      `Failed to create a channel with name "${name}". Response message is "${resp.data.message}"`,
    );

    return resp.data.channel_id;
  },

  async clearAllNotificationChannels() {
    const channels = await this.getChannelsList();

    for (const i in channels) {
      const channel = channels[i];

      await this.deleteNotificationChannel(channel.channel_id);
    }
  },

  async getChannelsList() {
    const headers = { Authorization: `Basic ${await I.getAuth()}` };
    const resp = await I.sendPostRequest('v1/management/ia/Channels/List', {}, headers);

    return resp.data.channels;
  },

  async deleteNotificationChannel(channelId) {
    const headers = { Authorization: `Basic ${await I.getAuth()}` };
    const body = { channel_id: channelId };
    const resp = await I.sendPostRequest('v1/management/ia/Channels/Remove', body, headers);

    assert.ok(
      resp.status === 200,
      `Failed to remove channel with channel_id "${channelId}". Response message is "${resp.data.message}"`,
    );
  },

  async createNotificationChannels(numberOfChannelsToCreate) {
    for (let i = 0; i < numberOfChannelsToCreate; i++) {
      await this.createNotificationChannel(`${faker.lorem.word()}_channel`, ncPage.types.email.type);
    }
  },
};
