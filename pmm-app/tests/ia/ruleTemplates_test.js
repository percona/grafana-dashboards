const assert = require('assert');
const page = require('./pages/ruleTemplatesPage');

const templates = new DataTable(['path']);

for (const i of Object.values(page.ruleTemplate.paths)) {
  templates.add([i]);
}

Feature('IA: Alert Rule Templates');

Before(async (I, ruleTemplatesPage) => {
  I.Authorize();
  ruleTemplatesPage.openRuleTemplatesTab();
});

Scenario(
  'PMM-T510 Verify Built-in Rule templates are non-editable @ia @not-pr-pipeline',
  async (I, ruleTemplatesPage) => {
    const editButton = ruleTemplatesPage.buttons
      .editButtonBySource(ruleTemplatesPage.templateSources.builtin);

    I.waitForVisible(editButton, 30);
    I.seeAttributesOnElements(editButton, { disabled: true });
  },
);

Scenario(
  'Verify Rule templates list elements @ia @not-pr-pipeline',
  async (I, ruleTemplatesPage) => {
    ruleTemplatesPage.columnHeaders.forEach((header) => {
      const columnHeader = ruleTemplatesPage.elements.columnHeaderLocator(header);

      I.waitForVisible(columnHeader, 30);
    });
    const templateName = await I.grabTextFrom(ruleTemplatesPage.elements.templateName);

    templateName.forEach((name) => {
      assert.ok(name.length > 0, 'Rule Template name should not be empty');
    });
    I.seeElement(ruleTemplatesPage.buttons.openAddTemplateModal);
  },
);

Scenario(
  'Add rule Template modal elements @ia @not-pr-pipeline',
  async (I, ruleTemplatesPage) => {
    I.click(ruleTemplatesPage.buttons.openAddTemplateModal);
    I.see(ruleTemplatesPage.messages.modalHeaderText, ruleTemplatesPage.elements.modalHeader);
    I.seeElement(ruleTemplatesPage.buttons.closeModal);
    I.seeElement(ruleTemplatesPage.buttons.uploadFile);
    I.seeElement(ruleTemplatesPage.buttons.addTemplate);
    I.seeElement(ruleTemplatesPage.buttons.cancelAdding);
  },
);

Scenario(
  'PMM-T500 Add Rule templates @ia @not-pr-pipeline',
  async (I, ruleTemplatesPage) => {
    const [templateName, fileContent] = ruleTemplatesPage.ruleTemplate
      .templateNameAndContent(ruleTemplatesPage.ruleTemplate.inputFilePath);
    const expectedSourceLocator = ruleTemplatesPage
      .getSourceLocator(templateName, ruleTemplatesPage.templateSources.ui);
    const editButton = ruleTemplatesPage.buttons
      .editButtonBySource(ruleTemplatesPage.templateSources.ui);

    I.click(ruleTemplatesPage.buttons.openAddTemplateModal);
    I.fillField(ruleTemplatesPage.fields.templateInput, fileContent);
    I.click(ruleTemplatesPage.buttons.addTemplate);
    ruleTemplatesPage.verifyPopUpMessage(ruleTemplatesPage.messages.successfullyAdded);
    I.waitForVisible(expectedSourceLocator, 30);
    I.seeAttributesOnElements(editButton, { disabled: null });
  },
);

Data(templates)
  .Scenario(
    'PMM-T482 PMM-T499 Upload Rule templates @ia @not-pr-pipeline',
    async (I, ruleTemplatesPage, current) => {
      const { path } = current;
      const validFile = path.endsWith('.yaml') || path.endsWith('.yml');
      const [templateName] = ruleTemplatesPage.ruleTemplate.templateNameAndContent(path);
      const expectedSourceLocator = ruleTemplatesPage
        .getSourceLocator(templateName, ruleTemplatesPage.templateSources.ui);
      const editButton = ruleTemplatesPage.buttons
        .editButtonBySource(ruleTemplatesPage.templateSources.ui);

      I.click(ruleTemplatesPage.buttons.openAddTemplateModal);
      I.attachFile(ruleTemplatesPage.fields.fileInput, path);
      ruleTemplatesPage.verifyInputContent(path);
      I.click(ruleTemplatesPage.buttons.addTemplate);

      if (validFile) {
        ruleTemplatesPage.verifyPopUpMessage(ruleTemplatesPage.messages.successfullyAdded);
        I.waitForVisible(expectedSourceLocator, 30);
        I.seeAttributesOnElements(editButton, { disabled: null });
      } else {
        ruleTemplatesPage.verifyPopUpMessage(ruleTemplatesPage.messages.failedToParse);
      }
    },
  );

Scenario(
  'PMM-T501 Upload duplicate Rule template @ia @not-pr-pipeline',
  async (I, ruleTemplatesPage) => {
    const path = ruleTemplatesPage.ruleTemplate.paths.yaml;
    const [, , id] = ruleTemplatesPage.ruleTemplate.templateNameAndContent(path);
    const message = ruleTemplatesPage.messages.duplicateTemplate(id);

    I.click(ruleTemplatesPage.buttons.openAddTemplateModal);
    I.attachFile(ruleTemplatesPage.fields.fileInput, path);
    ruleTemplatesPage.verifyInputContent(path);
    I.click(ruleTemplatesPage.buttons.addTemplate);
    ruleTemplatesPage.verifyPopUpMessage(message);
  },
);
