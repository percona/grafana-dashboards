const assert = require('assert');

const { I } = inject();

module.exports = {

  async getAlerts(serviceName) {
    let filter = '';

    if (serviceName) filter = `filter=service_name="${serviceName}"&`;

    const headers = { Authorization: `Basic ${await I.getAuth()}` };

    const alerts = await I.sendGetRequest(`alertmanager/api/v2/alerts/groups?${filter}silenced=false&inhibited=false&active=true`, headers);

    return alerts.data;
  },

  async getSilenced() {
    const headers = { Authorization: `Basic ${await I.getAuth()}` };

    const silences = await I.sendGetRequest('alertmanager/api/v2/silences?silenced=false&inhibited=false&active=true', headers);

    return silences.data.filter(({ status }) => status.state === 'active');
  },

  async verifyAlert(alertAttributes, silenced = false) {
    const { ruleId, serviceName } = alertAttributes;
    const alerts = await this.getAlerts(serviceName);
    const silences = await this.getSilenced();

    if (silenced) {
      assert.ok(
        JSON.stringify(silences).includes(ruleId),
        'Alert should be silenced in alertmanager',
      );

      assert.ok(
        !JSON.stringify(alerts).includes(ruleId),
        'Silenced alert should not be active in alertmanager',
      );
    } else {
      assert.ok(
        JSON.stringify(alerts).includes(ruleId),
        'Alert should be active in alertmanager',
      );

      assert.ok(
        !JSON.stringify(silences).includes(ruleId),
        'Alert should not be be silenced in alertmanager',
      );
    }
  },
};
