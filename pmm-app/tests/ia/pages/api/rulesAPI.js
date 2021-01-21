const { I } = inject();
const assert = require('assert');

module.exports = {
  async createAlertRule(ruleName) {
    const headers = { Authorization: `Basic ${await I.getAuth()}` };
    const body = {
      custom_labels: {},
      disabled: false,
      channel_ids: [],
      filters: [
        {
          key: 'service_name',
          value: 'pmm-server-postgresql',
          type: 'EQUAL',
        }
      ],
      for: '1s',
      severity: 'SEVERITY_CRITICAL',
      template_name: 'pmm_postgresql_too_many_connections',
      summary: ruleName,
      params:[
        {
          name: 'threshold',
          type: 'FLOAT',
          float: 1
        }
      ]
    };
    const resp = await I.sendPostRequest('v1/management/ia/Rules/Create', body, headers);

    assert.ok(resp.status === 200, `Failed to create alert rule with "${ruleName}".
     Response message is "${resp.data.message}"`);

    return resp.data.rule_id;
  },

  async clearAllRules() {
    const headers = { Authorization: `Basic ${await I.getAuth()}` };
    const resp = await I.sendPostRequest('v1/management/ia/Rules/List', {}, headers);

    if (resp.data === {}) return;

    for (const i in resp.data.rules) {
      const rule = resp.data.rules[i];

      await this.removeAlertRule(rule.rule_id);
    }
  },

  async removeAlertRule(ruleId) {
    const headers = { Authorization: `Basic ${await I.getAuth()}` };
    const body = {
      rule_id: ruleId
    };
    const resp = await I.sendPostRequest('v1/management/ia/Rules/Delete', body, headers);

    assert.ok(resp.status === 200, `Failed to remove alert rule with rule_id ${ruleId}.
     Response message is "${resp.data.message}"`);
  },
};
