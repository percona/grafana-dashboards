const Helper = codecept_helper;
const assert = require('assert');
const { saveVideo } = require('playwright-video');
const fs = require('fs');

class Grafana extends Helper {
  constructor(config) {
    super(config);
    this.resultFilesFolder = global.output_dir + '/';
  }

  async Authorize(username = 'admin', password = 'admin') {
    const { browserContext } = this.helpers.Playwright;
    const basicAuthEncoded = await this.getAuth(username, password);
    await browserContext.setExtraHTTPHeaders({ Authorization: `Basic ${basicAuthEncoded}` });
    return browserContext;
  }

  async getAuth(username = 'admin', password = 'admin') {
    return Buffer.from(`${this.config.username || username}:${this.config.password || password}`).toString(
      'base64'
    );
  }

  async _before(test) {
    const allure = codeceptjs.container.plugins('allure');

    switch (true) {
      case test.title.includes('[blocker]'):
        allure.severity('blocker');
        break;
      case test.title.includes('[critical]'):
        allure.severity('critical');
        break;
      case test.title.includes('[minor]'):
        allure.severity('minor');
        break;
      default:
        allure.severity('normal');
    }
  }

  async createUser(username, password) {
    const apiContext = this.helpers.REST;
    const body = {
      name: username,
      email: '',
      login: username,
      password: password,
    };
    const headers = { Authorization: `Basic ${await this.getAuth()}` };
    const resp = await apiContext.sendPostRequest('graph/api/admin/users', body, headers);
    assert.equal(resp.status, 200, `${resp.data.message} ${username}`);
    return resp.data.id;
  }

  async setRole(userId, role = 'Viewer') {
    const apiContext = this.helpers.REST;
    const body = {
      role: role,
    };
    const headers = { Authorization: `Basic ${await this.getAuth()}` };
    const resp = await apiContext.sendPatchRequest(`graph/api/orgs/1/users/${userId}`, body, headers);
    assert.equal(resp.status, 200, `${resp.data.message} ${userId}`);
  }

  async deleteUser(userId) {
    const apiContext = this.helpers.REST;
    const headers = { Authorization: `Basic ${await this.getAuth()}` };
    const resp = await apiContext.sendDeleteRequest(`graph/api/admin/users/${userId}`, headers);
    assert.equal(resp.status, 200, `Failed to delete ${userId}`);
  }
}

module.exports = Grafana;
