const { I } = inject();
const assert = require('assert');

module.exports = {
  async createAlertRule(ruleObj, templateName) {
    const headers = { Authorization: `Basic ${await I.getAuth()}` };
    const {
      ruleName, severity, filters, params, duration,
    } = ruleObj;
    const body = {
      custom_labels: {},
      disabled: false,
      channel_ids: [],
      filters: filters || [
        {
          key: 'service_name',
          value: 'pmm-server-postgresql',
          type: 'EQUAL',
        },
      ],
      for: `${(duration || 1)}s`,
      severity: severity || 'SEVERITY_CRITICAL',
      template_name: templateName || 'pmm_postgresql_too_many_connections',
      summary: ruleName,
      params: params || [
        {
          name: 'threshold',
          type: 'FLOAT',
          float: 1,
        },
      ],
    };
    const resp = await I.sendPostRequest('v1/management/ia/Rules/Create', body, headers);

    assert.ok(
      resp.status === 200,
      `Failed to create alert rule with "${ruleName}". Response message is "${resp.data.message}"`,
    );

    return resp.data.rule_id;
  },

  async updateAlertRule(ruleObj, templateName) {
    const {
      ruleId, ruleName, filters, severity, params, duration,
    } = ruleObj;

    const body = {
      custom_labels: {},
      disabled: false,
      channel_ids: [],
      filters: filters || [
        {
          key: 'service_name',
          value: 'pmm-server-postgresql',
          type: 'EQUAL',
        },
      ],
      for: `${(duration || 1)}s`,
      rule_id: ruleId,
      severity: severity || 'SEVERITY_CRITICAL',
      template_name: templateName || 'pmm_postgresql_too_many_connections',
      summary: ruleName,
      params: params || [
        {
          name: 'threshold',
          type: 'FLOAT',
          float: 1,
        },
      ],
    };
    const headers = { Authorization: `Basic ${await I.getAuth()}` };

    const resp = await I.sendPostRequest('v1/management/ia/Rules/Update', body, headers);

    assert.ok(
      resp.status === 200,
      `Failed to update alert rule with "${ruleName}". Response message is "${resp.data.message}"`,
    );
  },

  async clearAllRules(force = false) {
    const headers = { Authorization: `Basic ${await I.getAuth()}` };
    const resp = await I.sendPostRequest('v1/management/ia/Rules/List', {}, headers);
    let rulesToDelete;

    if (Object.keys(resp.data).length === 0) return;

    if (!force) {
      rulesToDelete = resp.data.rules.filter((rule) => !rule.summary.includes('immortal'));
    } else {
      rulesToDelete = resp.data.rules;
    }

    for (const i in rulesToDelete) {
      const rule = rulesToDelete[i];

      await this.removeAlertRule(rule.rule_id);
    }
  },

  async removeAlertRule(ruleId) {
    const headers = { Authorization: `Basic ${await I.getAuth()}` };
    const body = {
      rule_id: ruleId,
    };
    const resp = await I.sendPostRequest('v1/management/ia/Rules/Delete', body, headers);

    assert.ok(
      resp.status === 200,
      `Failed to remove alert rule with rule_id ${ruleId}. Response message is "${resp.data.message}"`,
    );
  },

  async getAlertNameFromRule(ruleId) {
    const headers = { Authorization: `Basic ${await I.getAuth()}` };
    const resp = await I.sendPostRequest('v1/management/ia/Rules/List', {}, headers);

    assert.ok(resp.data.rules.length !== 0, `No Alert Rules found.\n ${resp.data}`);

    const rule = resp.data.rules.filter((rule) => rule.rule_id === ruleId);

    return rule[0].template.annotations.summary.replace('{{ $labels.service_name }}', rule[0].filters[0].value);
  },


};
