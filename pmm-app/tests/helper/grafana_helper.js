const { Helper } = codeceptjs;

class Grafana extends Helper {
  async Authorize() {
    const { browserContext } = this.helpers.Playwright;
    const basicAuthEncoded = Buffer.from(
      `${this.config.username || 'admin'}:${this.config.password || 'admin'}`
    ).toString('base64');
    await browserContext.setExtraHTTPHeaders({ Authorization: `Basic ${basicAuthEncoded}` });
  }
}

module.exports = Grafana;
