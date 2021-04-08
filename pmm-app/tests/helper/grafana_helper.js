const Helper = codecept_helper;
const assert = require('assert');
const fs = require('fs');

class Grafana extends Helper {
  constructor(config) {
    super(config);
    this.resultFilesFolder = `${global.output_dir}/`;
  }

  async Authorize(username = 'admin', password = 'admin') {
    const { Playwright } = this.helpers;
    const basicAuthEncoded = await this.getAuth(username, password);

    Playwright.haveRequestHeaders({ Authorization: `Basic ${basicAuthEncoded}` });
  }

  async getAuth(username = 'admin', password = 'admin') {
    return Buffer.from(`${this.config.username || username}:${this.config.password || password}`).toString(
      'base64',
    );
  }

  async readFile(path) {
    try {
      return fs.readFileSync(path, 'utf8');
    } catch (e) {
      assert.ok(false, `Could not read the file ${path}`);
    }

    return null;
  }

  /**
   * Mock Response of a Request from Server
   *
   * example Usage: await I.mockServer(endPoint, responseBody);
   *
   * @param requestToBeMocked       Request end point which needs to be routed and mocked.
   * @param responseBody            Response we want to Mock for the API call.
   * for example: Add Remote Instance, Access Inventory List
   * @returns {Promise<void>}
   */
  async mockServer(requestToBeMocked, responseBody) {
    const { browserContext } = this.helpers.Playwright;
    const existingPages = await browserContext.pages();
    const mainPage = existingPages[0];

    mainPage.route(requestToBeMocked, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          responseBody,
        ]),
      });
    });
  }

  async grabNumberOfTabs() {
    const { browserContext } = this.helpers.Playwright;
    const existingPages = await browserContext.pages();

    return existingPages.length;
  }

  async moveCursor(locator) {
    const { page } = this.helpers.Playwright;

    page.hover(locator);
  }

  // eslint-disable-next-line no-underscore-dangle, class-methods-use-this
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
      password,
    };
    const headers = { Authorization: `Basic ${await this.getAuth()}` };
    const resp = await apiContext.sendPostRequest('graph/api/admin/users', body, headers);

    assert.equal(resp.status, 200, `${resp.data.message} ${username}`);

    return resp.data.id;
  }

  async setRole(userId, role = 'Viewer') {
    const apiContext = this.helpers.REST;
    const body = {
      role,
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
