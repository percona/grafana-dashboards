const { I } = inject();
const assert = require('assert');

module.exports = {
  url: 'https://pmmdemo.percona.com/',
  mongoDBDashbordUrl: 'graph/d/mongodb-instance-overview/mongodb-instances-overview?orgId=1&refresh=1m',
  // eslint-disable-next-line max-len
  advancedDataExplorationDashboardUrl:
    // eslint-disable-next-line max-len
    'graph/d/prometheus-advanced/advanced-data-exploration?refresh=1m&var-metric=go_gc_duration_seconds&var-interval=$__auto_interval_interval&var-node_name=All',
  monitoredDB: [
    'pxc',
    6,
    'mongo',
    10,
    'ps',
    5,
    'pg',
    2,
    'pmm-server',
    1,
    'app',
    1,
    'rds',
    2,
    'mysql-azure',
    1,
    'proxysql1',
    1,
  ],
  fields: {
    copyrightsAndLegalPanel: '//a[contains(text(), "Copyrights & Legal")]',
    policyText:
      '//p[contains(text(), "MySQL and InnoDB are trademarks of Oracle Corp. Proudly running Percona Server. Copyright (c) 2006-2020 Percona LLC.")]',
    termsOfUse: '//a[contains(text(), "Terms of Use")]',
    privacy: '//a[contains(text(), "Privacy")]',
    copyright: '//a[contains(text(), "Copyright")]',
    legal: '//a[contains(text(), "Legal")]',
    accessDenied: '//div[contains(@class, "alert-title") and contains(text(), "Access denied.")]',
    title: '//span[contains(text(), "Percona Monitoring and Management")]',
    failedSecurityChecks: '//span[contains(text(), "Failed security check")]',
    dbCheckPanelNoAccess: '//div[@data-qa="db-check-panel-no-access"]',
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

  getHostLocator(hostType) {
    return `//p[contains(text(), '${hostType}')]`;
  },
};
