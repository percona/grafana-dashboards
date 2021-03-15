const { I } = inject();
const YAML = require('yaml');

module.exports = {
  url: 'graph/integrated-alerting/alert-rule-templates',
  columnHeaders: ['Name', 'Source', 'Created', 'Actions'],
  elements: {
    addedTemplate: '//td[text()="TemplateForAutomation"]/following-sibling::td[text()="User-defined (UI)"]',
    ruleTemplateTab: '//li[@aria-label="Tab Alert Rule Templates"]',
    templatesTableHeader: '$alert-rule-templates-table-thead',
    templatesTable: '$table-tbody',
    templateName: '//tr/td[1]',
    modalHeader: '$modal-header',
    modalWarning: '$alert-rule-name-warning',
    columnHeaderLocator: (columnHeaderText) => `//th[text()="${columnHeaderText}"]`,
  },
  buttons: {
    openAddTemplateModal: '$alert-rule-template-add-modal-button',
    uploadFile: '$alert-rule-template-upload-button',
    closeModal: '$modal-close-button',
    addTemplate: '$alert-rule-template-add-button',
    editTemplate: '$alert-rule-template-edit-button',
    cancelAdding: '$alert-rule-template-cancel-button',
    confirmDelete: '$confirm-delete-modal-button',
    // editButtonBySource returns Edit template button locators for a given source
    editButtonBySource: (source) => `//tr[descendant::td[contains(text(), "${source}")]]//button[@data-qa="edit-template-button"]`,
    // deleteButtonBySource returns Delete template button locators for a given source
    deleteButtonBySource: (source) => `//tr[descendant::td[contains(text(), "${source}")]]//button[@data-qa="delete-template-button"]`,
    // editButtonByName returns Delete template button locator for a given Template name
    editButtonByName: (name) => `//td[contains(text(), "${name}")]/following-sibling::td//button[@data-qa="edit-template-button"]`,
    // deleteButtonByName returns Delete template button locator for a given Template name
    deleteButtonByName: (name) => `//td[contains(text(), "${name}")]/following-sibling::td//button[@data-qa="delete-template-button"]`,
  },
  fields: {
    templateInput: '$yaml-textarea-input',
    fileInput: '//div[@data-qa="modal-content"]//input[@type="file"]',
  },
  messages: {
    modalHeaderText: 'Add Alert Rule Template',
    editModalHeaderText: (name) => `Edit "${name}" Alert Rule Template`,
    editModalWarning: 'Name cannot be changed. If you need to change it, please create a new Template.',
    deleteModalHeaderText: 'Delete Alert Rule Template',
    deleteModalMessage: (name) => `Are you sure you want to delete the alert rule template "${name}"?`,
    successfullyAdded: 'Alert rule template successfully added',
    successfullyEdited: 'Alert rule template successfully edited',
    successfullyDeleted: (name) => `Alert rule template  "${name}" successfully deleted.`,
    failedToParse: 'Failed to parse rule template.',
    failedToDelete: (templateId) => `Failed to delete rule template ${templateId}, as it is being used by some rule.`,
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
        const { expr } = YAML.parse(content).templates[0];

        return [name, content, id, expr];
      } catch (e) {
        return ['', '', '', ''];
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

  verifyEditModalHeaderAndWarning(templateName) {
    // Checking Rule template name in modal header
    I.seeTextEquals(
      this.messages.editModalHeaderText(templateName),
      this.elements.modalHeader,
    );
    // Checking Warning in modal
    I.seeTextEquals(this.messages.editModalWarning, this.elements.modalWarning);
  },

  openEditDialog(templateName) {
    I.waitForElement(this.buttons.editButtonByName(templateName), 30);
    I.click(this.buttons.editButtonByName(templateName));
  },

  verifyRuleTemplateContent(content) {
    I.waitForVisible(this.fields.templateInput, 30);
    I.seeInField(this.fields.templateInput, content);
  },
};
