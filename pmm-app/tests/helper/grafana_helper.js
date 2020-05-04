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
    const basicAuthEncoded = Buffer.from(
      `${this.config.username || 'admin'}:${this.config.password || 'admin'}`
    ).toString('base64');
    await browserContext.setExtraHTTPHeaders({ Authorization: `Basic ${basicAuthEncoded}` });
  }
}

module.exports = Grafana;
