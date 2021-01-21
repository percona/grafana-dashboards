const { I } = inject();
const assert = require('assert');
// The original regex source is https://regexlib.com/REDetails.aspx?regexp_id=5055
// eslint-disable-next-line no-useless-escape
const lastCheckRegex = /^(?:(((Jan(uary)?|Ma(r(ch)?|y)|Jul(y)?|Aug(ust)?|Oct(ober)?|Dec(ember)?)\ 31)|((Jan(uary)?|Ma(r(ch)?|y)|Apr(il)?|Ju((ly?)|(ne?))|Aug(ust)?|Oct(ober)?|(Sept|Nov|Dec)(ember)?) (0?[1-9]|([12]\d)|30))|(Feb(ruary)? (0?[1-9]|1\d|2[0-8]|(29(?=, ))))),) (?:[0-1]?[0-9]|[2][1-4]):[0-5]?[0-9]?\s??$/gim;

module.exports = {
  // insert your locators and methods here
  // setting locators
  url: 'graph/d/pmm-home/home-dashboard?orgId=1',
  requestEnd: '/v1/Updates/Check',
  fields: {
    systemsUnderMonitoringCount:
      '//span[@class="panel-title-text" and contains(text(), "Systems under monitoring")]//../../../..//span[@class="singlestat-panel-value"]',
    dbUnderMonitoringCount:
      '//span[@class="panel-title-text" and contains(text(), "Monitored DB Instances")]//../../../..//span[@class="singlestat-panel-value"]',
    dashboardHeaderText: 'Percona Monitoring and Management',
    dashboardHeaderLocator: '//div[contains(@class, "dashboard-header")]',
    oldLastCheckSelector: '#pmm-update-widget > .last-check-wrapper p',
    sttDisabledFailedChecksPanelSelector: '$db-check-panel-settings-link',
    sttFailedChecksPanelSelector: '$db-check-panel-has-checks',
    checksPanelSelector: '$db-check-panel-home',
    newsPanelTitleSelector: '//span[@class="panel-title-text" and text() = "Percona News"]',
    newsPanelContentSelector:
      '//span[contains(text(), "Percona News")]/ancestor::div[contains(@class, "panel-container")]//div[contains(@class, "view")]',
    noAccessRightsSelector: '$db-check-panel-no-access',
    updateWidget: {
      base: {
        checkUpdateButton: '#refresh',
        updateProgressModal: '.modal-content',
        successUpgradeMsgSelector: '.modal-content',
        lastCheckSelector: '.last-check-wrapper > p',
        triggerUpdate: 'button[ng-click="update()"]',
        reloadButtonAfterUpgrade: 'button[ng-click="reloadAfterUpdate()"]',
        upToDateLocator: '//div[@class="panel-content"]//section/p[text()="You are up to date"]',
        availableVersion: '#available_version > div > p',
        currentVersion: '#current_version > span',
        inProgressMessage: 'Update in progress',
        successUpgradeMessage: 'Successfully updated',
        whatsNewLink: 'a.text-primary.pmm-link',
      },
      latest: {
        checkUpdateButton: '$update-last-check-button',
        currentVersion: '$update-installed-version',
        lastCheckSelector: '$update-last-check',
        triggerUpdate: '//button//span[contains(text(), "Upgrade to")]',
        updateProgressModal: '//div/h4[text()="Upgrade in progress"]',
        successUpgradeMsgSelector: '$modal-update-success-text',
        reloadButtonAfterUpgrade: '$modal-close',
        availableVersion: '$update-latest-version',
        inProgressMessage: 'Upgrade in progress',
        successUpgradeMessage: 'PMM has been successfully upgraded to version',
        whatsNewLink: '//a[@rel="noreferrer"]',
      },
    },
  },
  upgradeMilestones: [
    'TASK [Gathering Facts]',
    'TASK [detect /srv/pmm-distribution]',
    'TASK [detect containers]',
    'TASK [Configure systemd]',
    'TASK [Remove old supervisord service confiuration]',
    'TASK [Reread supervisord configuration]',
    'TASK [Remove old packages]',
    'TASK [Download pmm2 packages]',
    'TASK [Update pmm2 packages]',
    'TASK [Update system packages]',
    'TASK [Check pg_stat_statements extension]',
    'TASK [Add ClickHouse datasource to the list of unsigned plugins in Grafana]',
    'TASK [Create working directory for VictoriaMetrics]',
    'TASK [Restart pmm-managed]',
    'TASK [Wait for pmm-managed]',
    'TASK [Reread supervisord configuration again]',
    'TASK [Restart services]',
    'TASK [Start Grafana dashboards update]',
    'TASK [Update/restart other services]',
    'TASK [Check supervisord log]',
    'Waiting for Grafana dashboards update to finish...',
  ],

  // introducing methods
  async upgradePMM(version) {
    let locators = this.getLocators(version);
    const milestones = this.upgradeMilestones;

    I.waitForElement(locators.triggerUpdate, 180);
    I.seeElement(locators.triggerUpdate);
    const available_version = await I.grabTextFrom(locators.availableVersion);

    I.click(locators.triggerUpdate);
    I.waitForElement(locators.updateProgressModal, 30);
    I.waitForText(locators.inProgressMessage, 30, locators.updateProgressModal);

    // skipping milestones checks for 2.9 and 2.10 versions due logs not showing issue
    if (version !== '9' && version !== '10') {
      for (const milestone of milestones) {
        I.waitForElement(`//pre[contains(text(), '${milestone}')]`, 1200);
      }
    }

    I.waitForText(locators.successUpgradeMessage, 1200, locators.successUpgradeMsgSelector);
    I.click(locators.reloadButtonAfterUpgrade);
    locators = this.getLocators('latest');

    I.waitForVisible(locators.upToDateLocator, 30);
    assert.equal(
      await I.grabTextFrom(locators.currentVersion),
      available_version.split(' ')[0],
      'Upgrade operation failed',
    );
  },

  async verifyPreUpdateWidgetIsPresent(version) {
    const locators = this.getLocators(version);

    I.waitForVisible(locators.triggerUpdate, 180);
    I.waitForVisible(locators.currentVersion, 180);
    I.seeElement(locators.availableVersion);
    I.seeElement(locators.currentVersion);
    I.seeElement(locators.triggerUpdate);
    I.dontSeeElement(locators.upToDateLocator);
    I.seeElement(locators.currentVersion);
    I.seeElement(locators.checkUpdateButton);
    I.see('Last check:');
    assert.notEqual(
      await I.grabTextFrom(locators.availableVersion),
      await I.grabTextFrom(locators.currentVersion),
      'Available and Current versions match',
    );
  },

  async verifyPostUpdateWidgetIsPresent() {
    const locators = this.getLocators('latest');

    I.waitForVisible(locators.upToDateLocator, 30);
    I.waitForVisible(locators.lastCheckSelector, 30);
    I.dontSeeElement(locators.availableVersion);
    I.dontSeeElement(locators.triggerUpdate);
    I.seeElement(locators.upToDateLocator);
    I.seeElement(locators.currentVersion);
    I.seeElement(locators.checkUpdateButton);
    const date = await I.grabTextFrom(locators.lastCheckSelector);

    assert.ok(lastCheckRegex.test(date), `Last Check Date has unexpected pattern: ${date}`);
  },

  async verifyVisibleService(serviceName) {
    I.scrollPageToBottom();
    const serviceExists = `//div[@class='react-grid-item']/descendant::p[contains(text(),'${serviceName}')]`;

    I.waitForElement(serviceExists, 30);
    I.seeElement(serviceExists);
  },

  // Method used to get selectors for different PMM versions, only to change locators after 2.9 version update
  getLocators(version) {
    let locators;

    if (version >= 9) {
      // eslint-disable-next-line no-param-reassign
      version = 'latest';
    }

    version in this.fields.updateWidget
      ? (locators = {
        ...this.fields.updateWidget.base,
        ...this.fields.updateWidget[version],
      })
      : (locators = this.fields.updateWidget.base);

    return locators;
  },
};
