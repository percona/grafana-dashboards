const { I } = inject();
const YAML = require('yaml');

module.exports = {
  url: 'graph/integrated-alerting',
  columnHeaders: ['Name', 'Source', 'Created', 'Actions'],
  elements: {
    addedTemplate: '//td[text()="TemplateForAutomation"]/following-sibling::td[text()="User-defined (UI)"]',
    ruleTemplateTab: '//li[@aria-label="Tab Alert Rule Templates"]',
    templatesTableHeader: '$alert-rule-templates-table-thead',
    templatesTable: '$alert-rule-templates-table-tbody',
    templateName: '//tr/td[1]',
    modalHeader: '$modal-header',
    popUpTitle: '.alert-title',
    columnHeaderLocator: (columnHeaderText) => `//th[text()="${columnHeaderText}"]`,
  },
  buttons: {
    openAddTemplateModal: '$alert-rule-template-add-modal-button',
    uploadFile: '$alert-rule-template-upload-button',
    closeModal: '$modal-close-button',
    addTemplate: '$alert-rule-template-add-button',
    cancelAdding: '$alert-rule-template-cancel-button',
    // editButtonBySource returns Edit template button locators for a given source
    editButtonBySource: (source) => `//tr[descendant::td[contains(text(), "${source}")]]//button[@data-qa="edit-template-button"]`,
  },
  fields: {
    templateInput: '$yaml-textarea-input',
    fileInput: '//div[@data-qa="modal-content"]//input[@type="file"]',
  },
  messages: {
    modalHeaderText: 'Add Alert Rule Template',
    successfullyAdded: 'Alert rule template successfully added',
    successfullyEdited: 'Alert rule template successfully added',
    failedToParse: 'Failed to parse rule template.',
    duplicateTemplate: (id) => `Template with name "${id}" already exists.`,
  },
  templateSources: {
    ui: 'User-defined (UI)',
    builtin: 'Built-in',
  },
  ruleTemplate: {
    // templateNameAndContent parses yaml file and returns
    // template name, full content as string and template id
    templateNameAndContent: async (ymlPath) => {
      const content = await I.readFile(ymlPath);

      try {
        const name = YAML.parse(content).templates[0].summary;
        const id = YAML.parse(content).templates[0].name;

        return [name, content, id];
      } catch (e) {
        return ['', '', ''];
      }
    },
    inputFilePath: 'tests/ia/templates/inputTemplate.yml',
    paths: {
      yml: 'tests/ia/templates/template.yml',
      yaml: 'tests/ia/templates/template.yaml',
      txt: 'tests/ia/templates/template.txt',
    },
  },

  getSourceLocator(templateName, source) {
    return `//td[contains(text(), "${templateName}")]/following-sibling::td[text()="${source}"]`;
  },

  async verifyInputContent(ymlPath) {
    const file = await I.readFile(ymlPath);

    I.seeInField(this.fields.templateInput, file);
  },

  openRuleTemplatesTab() {
    I.amOnPage(this.url);
    I.waitForVisible(this.elements.ruleTemplateTab, 30);
    I.click(this.elements.ruleTemplateTab);
    I.waitForVisible(this.elements.templatesTable, 30);
  },

  verifyPopUpMessage(message) {
    I.waitForVisible(this.elements.popUpTitle, 30);
    I.see(message, this.elements.popUpTitle);
  },
};
