const { I, ruleTemplatesPage } = inject();
const assert = require('assert');

module.exports = {
  async createRuleTemplate(path) {
    const [, content, id] = await ruleTemplatesPage.ruleTemplate.templateNameAndContent(path);
    const headers = { Authorization: `Basic ${await I.getAuth()}` };
    const body = {
      yaml: content,
    };
    const resp = await I.sendPostRequest('v1/management/ia/Templates/Create', body, headers);

    assert.ok(
      resp.status === 200,
      `Failed to create a template with id "${id}". Response message is "${resp.data.message}"`,
    );

    return id;
  },

  async clearAllTemplates() {
    const headers = { Authorization: `Basic ${await I.getAuth()}` };
    const resp = await I.sendPostRequest('v1/management/ia/Templates/List', { reload: true }, headers);

    if (Object.keys(resp.data).length === 0) return;

    for (const i in resp.data.templates) {
      const template = resp.data.templates[i];

      if (template.source !== 'BUILT_IN') { await this.removeTemplate(template.name); }
    }
  },

  async removeTemplate(templateId) {
    const headers = { Authorization: `Basic ${await I.getAuth()}` };
    const body = {
      name: templateId,
    };
    const resp = await I.sendPostRequest('v1/management/ia/Templates/Delete', body, headers);

    assert.ok(
      resp.status === 200,
      `Failed to remove template with templateID "${templateId}". Response message is "${resp.data.message}"`,
    );
  },
};
