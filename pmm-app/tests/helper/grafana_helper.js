const Helper = codecept_helper;
const { saveVideo } = require('playwright-video');
const fs = require('fs');

class Grafana extends Helper {

  constructor(config) {
    super(config);
    this.resultFilesFolder = global.output_dir + "/";
  }

  async Authorize() {
    const { browserContext } = this.helpers.Playwright;
    const basicAuthEncoded = await this.getAuth();
    await browserContext.setExtraHTTPHeaders({ Authorization: `Basic ${basicAuthEncoded}` });
  }

  async getAuth(username = 'admin', password = 'admin') {
    return Buffer.from(
        `${this.config.username || username}:${this.config.password || password}`
    ).toString('base64');
  }
}

module.exports = Grafana;
