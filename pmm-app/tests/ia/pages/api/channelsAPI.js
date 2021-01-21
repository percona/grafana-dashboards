const { I, ncPage } = inject();
const assert = require('assert');

module.exports = {
  types: ncPage.types,

  async createNotificationChannel(name, type) {
    let body = {
      summary: name,
    };

    switch (type) {
      case this.types.email.type:
        body = {
          ...body,
          email_config: {
            to: [this.types.email.addresses],
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

    await I.sendPostRequest('v1/management/ia/Channels/Add', body, headers);
  },

  async clearAllNotificationChannels() {
    const headers = { Authorization: `Basic ${await I.getAuth()}` };
    const resp = await I.sendPostRequest('v1/management/ia/Channels/List', {}, headers);

    if (resp.data === {}) return;

    for (const i in resp.data.channels) {
      const channel = resp.data.channels[i];

      await this.deleteNotificationChannel(channel.channel_id);
    }
  },

  async deleteNotificationChannel(channelId) {
    const headers = { Authorization: `Basic ${await I.getAuth()}` };
    const body = { channel_id: channelId };
    const resp = await I.sendPostRequest('v1/management/ia/Channels/Remove', body, headers);

    assert.ok(resp.status === 200, `Failed to remove channel with channel_id=${channelId}`);
  },
};
