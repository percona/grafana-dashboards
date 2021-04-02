const assert = require('assert');

const { I } = inject();

module.exports = {
/* Since Enabling STT checks clears existing Checks Results,
 this method is used for waiting for results with a timeout */
  async waitForSecurityChecksResults(timeout) {
    for (let i = 0; i < timeout; i++) {
      const results = await this.getSecurityChecksResults();

      if (results && results.length) {
        break;
      }

      I.wait(1);
    }
  },

  async getSecurityChecksResults() {
    const headers = { Authorization: `Basic ${await I.getAuth()}` };

    const resp = await I.sendPostRequest('v1/management/SecurityChecks/GetCheckResults', {}, headers);

    assert.ok(
      resp.status === 200,
      `Failed to get Security Checks results. Response message is "${resp.data.message}"`,
    );

    return resp.data.results;
  },
};
