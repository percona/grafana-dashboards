const { I } = inject();
const assert = require('assert');
const faker = require('faker');

module.exports = {
  async createAlertRule(ruleObj, templateName) {
    const headers = { Authorization: `Basic ${await I.getAuth()}` };
    const {
      ruleName, severity, filters, params, duration, channels, disabled,
    } = ruleObj;
    const body = {
      custom_labels: {},
      disabled: disabled || false,
      channel_ids: channels || [],
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
      summary: ruleName || 'Test Rule',
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
    const rules = await this.getAlertRules();
    let rulesToDelete;

    // return if no rules found
    if (!rules) return;

    if (!force) {
      rulesToDelete = rules.filter((rule) => !rule.summary.includes('immortal'));
    } else {
      rulesToDelete = rules;
    }

    for (const i in rulesToDelete) {
      const rule = rulesToDelete[i];

      await this.removeAlertRule(rule.rule_id);
    }
  },

  async getAlertRules() {
    const headers = { Authorization: `Basic ${await I.getAuth()}` };
    const resp = await I.sendPostRequest('v1/management/ia/Rules/List', {}, headers);

    return resp.data.rules;
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
    const rules = await this.getAlertRules();

    const rule = rules.filter((rule) => rule.rule_id === ruleId);

    return rule[0].template.annotations.summary.replace('{{ $labels.service_name }}', rule[0].filters[0].value);
  },

  async createAlertRules(numberOfRulesToCreate) {
    for (let i = 0; i < numberOfRulesToCreate; i++) {
      await this.createAlertRule({ ruleName: `${faker.lorem.word()}_alert_rule` });
    }
  },
};
