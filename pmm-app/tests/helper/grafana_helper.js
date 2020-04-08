const { Helper } = codeceptjs;

class Grafana extends Helper {
  // before/after hooks
  /**
   * @protected
   */
  _before() {
    // remove if not used
  }

  /**
   * @protected
   */
  _after() {
    // remove if not used
  }

  // add custom methods here
  // If you need to access other helpers
  // use: this.helpers['helperName']

  async Authorize() {
    const { browserContext } = this.helpers.Playwright;
    browserContext.setExtraHTTPHeaders({ Authorization: 'Basic YWRtaW46YWRtaW4=' });
  }
}

module.exports = Grafana;
