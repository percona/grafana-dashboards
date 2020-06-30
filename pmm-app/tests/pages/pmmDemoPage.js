const { I } = inject();
const assert = require('assert');

module.exports = {
  url: 'https://pmmdemo.percona.com/',
  mongoDBDashbordUrl: 'graph/d/mongodb-instance-overview/mongodb-instances-overview?orgId=1&refresh=1m',

  fields: {
    copyrightsAndLegalPanel: "//a[contains(text(), 'Copyrights & Legal')]",
    policyText:
      "//p[contains(text(), 'MySQL and InnoDB are trademarks of Oracle Corp. Proudly running Percona Server. Copyright (c) 2006-2020 Percona LLC.')]",
    termsOfUse: "//a[contains(text(), 'Terms of Use')]",
    privacy: "//a[contains(text(), 'Privacy')]",
    copyright: "//a[contains(text(), 'Copyright')]",
    legal: "//a[contains(text(), 'Legal')]",
    accessDenied: "//div[contains(@class, 'alert-title') and contains(text(), 'Access denied.')]",
    title: "//span[contains(text(), 'Percona Monitoring and Management')]",
    failedSecurityChecks: "//span[contains(text(), 'Failed security check')]",
    dbCheckPanelNoAccess: "//div[@data-qa='db-check-panel-no-access']",
  },

  verifyCopyrightsAndLegal() {
    I.scrollTo(this.fields.copyrightsAndLegalPanel);
    I.waitForVisible(this.fields.policyText, 30);
    I.seeElement(this.fields.termsOfUse);
    I.seeElement(this.fields.privacy);
    I.seeElement(this.fields.copyright);
    I.seeElement(this.fields.legal);
  },

  async checkDBPanelText(text) {
    const checkedText = await I.grabTextFrom(this.fields.dbCheckPanelNoAccess);
    assert.equal(checkedText, text, 'Check the DB security checks text');
  },
};
