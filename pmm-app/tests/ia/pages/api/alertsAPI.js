const { I } = inject();
const assert = require('assert');

module.exports = {
  /*
  waitForAlerts method is used for waiting for alerts to appear with a timeout.
  expectedAlertsCount parameter is optional and only needed when we need to wait for a
  specific number of alerts to appear
  */
  async waitForAlerts(timeout, expectedAlertsCount = 0) {
    for (let i = 0; i < timeout; i++) {
      const results = await this.getAlertsList();

      // waiting for some exact number of alerts to be active
      if (results && results.length >= expectedAlertsCount) break;

      I.wait(5);
    }

    return await this.getAlertsList();
  },

  // waitForAlertsToDisappear method is used for waiting for alerts to disappear with a timeout
  async waitForAlertsToDisappear(timeout) {
    for (let i = 0; i < timeout; i++) {
      const results = await this.getAlertsList();

      if (!results) break;

      I.wait(5);
    }
  },

  async getAlertsList() {
    const headers = { Authorization: `Basic ${await I.getAuth()}` };

    const resp = await I.sendPostRequest('v1/management/ia/Alerts/List', {}, headers);

    assert.ok(
      resp.status === 200,
      `Failed to get Alerts. Response message is "${resp.data.message}"`,
    );

    return resp.data.alerts;
  },
};
