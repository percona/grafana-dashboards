const { I, ruleTemplatesPage } = inject();
const assert = require('assert');
const faker = require('faker');

module.exports = {
  async createRuleTemplate(path = ruleTemplatesPage.ruleTemplate.inputFilePath) {
    const [, content, id] = await ruleTemplatesPage.ruleTemplate.templateNameAndContent(path);
    const headers = { Authorization: `Basic ${await I.getAuth()}` };
    // Ternary is used to generate different ids for templates
    const templateText = path === ruleTemplatesPage.ruleTemplate.inputFilePath
      ? content.replace('name: input_template_yml', `name: ${faker.internet.userName()}_template`)
      : content;
    const body = {
      yaml: templateText,
    };
    const resp = await I.sendPostRequest('v1/management/ia/Templates/Create', body, headers);

    assert.ok(
      resp.status === 200,
      `Failed to create a template with id "${id}". Response message is "${resp.data.message}"`,
    );

    return id;
  },

  async clearAllTemplates() {
    const templates = await this.getTemplatesList();

    for (const i in templates) {
      const template = templates[i];

      if (template.source !== 'BUILT_IN') { await this.removeTemplate(template.name); }
    }
  },

  async getTemplatesList() {
    const headers = { Authorization: `Basic ${await I.getAuth()}` };
    const resp = await I.sendPostRequest('v1/management/ia/Templates/List', {}, headers);

    return resp.data.templates;
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

  async createRuleTemplates(numberOfTemplatesToCreate) {
    for (let i = 0; i < numberOfTemplatesToCreate; i++) {
      await this.createRuleTemplate();
    }
  },
};
