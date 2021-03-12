const Helper = codecept_helper;
const MailosaurClient = require('mailosaur');
const assert = require('assert');
const faker = require('faker');

class Mailosaur extends Helper {
  constructor(config) {
    super(config);

    if (!config.serverId) {
      throw new Error('Mailosaur is not configured! Please provide serverId');
    }

    if (!config.apiKey) {
      throw new Error('Mailosaur is not configured! Please provide API key');
    }

    this.mailosaur = new MailosaurClient(config.apiKey);
    this.timeout = config.timeout || 10000;
    this.serverId = config.serverId;
  }

  async getLastMessage(email) {
    return await this.mailosaur.messages.get(this.serverId, {
      sentTo: email,
    }, {
      timeout: this.timeout,
    });
  }

  seeLinkInMessage(message, link) {
    link
      ? assert.ok(message.text.links[0].href.contains(link))
      : assert.ok(message.text.links.length);
  }

  async grabLinkFromMessage(message) {
    return message.text.links[0].href;
  }

  async deleteMessageById(id) {
    return this.mailosaur.messages.del(id);
  }

  async listMessages() {
    return this.mailosaur.messages.list(this.serverId, {});
  }

  generateNewEmail() {
    return `${faker.name.firstName()}.${faker.name.lastName()}@${this.config.serverId}.mailosaur.net`;
  }

  async followLinkFromMessage(message) {
    const { page } = this.helpers.Playwright;

    const link = await this.grabLinkFromMessage(message);

    await page.goto(link);
  }

  seeTextInMessage(text, message) {
    assert.ok(message.text.body.contains(text));
  }
}

module.exports = Mailosaur;
