let ruleIdForAlerts;
const ruleName = 'PSQL immortal rule';
const rulesForAlerts = [{
  ruleName,
  severity: 'SEVERITY_CRITICAL',
}, {
  ruleName,
  severity: 'SEVERITY_ERROR',
}, {
  ruleName,
  severity: 'SEVERITY_NOTICE',
}, {
  ruleName,
  severity: 'SEVERITY_WARNING',
},
];
const alertName = 'PostgreSQL too many connections (pmm-server-postgresql)';

const rulesToDelete = [];

Feature('IA: Alerts').retry(2);

Before(async ({ I, settingsAPI }) => {
  I.Authorize();
  await settingsAPI.apiEnableIA();
});

BeforeSuite(async ({
  settingsAPI, rulesAPI, alertsAPI,
}) => {
  await settingsAPI.apiEnableIA();
  await rulesAPI.clearAllRules(true);
  for (const rule of rulesForAlerts) {
    const ruleId = await rulesAPI.createAlertRule(rule);

    rulesToDelete.push(ruleId);
  }

  ruleIdForAlerts = await rulesAPI.createAlertRule({ ruleName });

  await alertsAPI.waitForAlerts(300, rulesToDelete.length + 1);
});

AfterSuite(async ({
  settingsAPI, rulesAPI,
}) => {
  await settingsAPI.apiEnableIA();
  await rulesAPI.clearAllRules(true);
});

Scenario(
  'PMM-T564 Verify Severity colors @ia @not-pr-pipeline',
  async ({ I, alertsPage, rulesAPI }) => {
    I.amOnPage(alertsPage.url);
    I.waitForElement(alertsPage.elements.criticalSeverity, 30);
    I.seeCssPropertiesOnElements(alertsPage.elements.criticalSeverity, { color: 'rgb(224, 47, 68)' });
    I.waitForElement(alertsPage.elements.highSeverity, 30);
    I.seeCssPropertiesOnElements(alertsPage.elements.highSeverity, { color: 'rgb(235, 123, 24)' });
    I.waitForElement(alertsPage.elements.noticeSeverity, 30);
    I.seeCssPropertiesOnElements(alertsPage.elements.noticeSeverity, { color: 'rgb(50, 116, 217)' });
    I.waitForElement(alertsPage.elements.warningSeverity, 30);
    I.seeCssPropertiesOnElements(alertsPage.elements.warningSeverity, { color: 'rgb(236, 187, 19)' });

    // Deleting used rules
    for (const ruleId of rulesToDelete) {
      await rulesAPI.removeAlertRule(ruleId);
    }
  },
);

Scenario(
  'Verify Firing Alert, labels and existence in alertmanager @ia @not-pr-pipeline',
  async ({
    I, alertsPage, inventoryAPI, alertmanagerAPI,
  }) => {
    I.amOnPage(alertsPage.url);
    I.waitForElement(alertsPage.elements.alertRow(alertName), 30);

    // Verify correct labels
    I.see(`rule_id=${ruleIdForAlerts}`, alertsPage.elements.labelsCell(alertName));
    I.see('Critical', alertsPage.elements.severityCell(alertName));
    const labels = await I.grabTextFromAll(alertsPage.elements.labelsCell(alertName));

    const [, serviceId] = labels
      .find((label) => label.includes('service_id='))
      .split('=');

    await inventoryAPI.verifyServiceIdExists(serviceId);

    // Verify Alert exists in alertmanager
    await alertmanagerAPI.verifyAlert({ ruleId: ruleIdForAlerts, serviceName: 'pmm-server-postgresql' });
  },
);

Scenario(
  'PMM-T540 Alerts list columns @ia @not-pr-pipeline',
  async ({ I, alertsPage }) => {
    I.amOnPage(alertsPage.url);
    I.waitForElement(alertsPage.elements.alertRow(alertName), 30);
    alertsPage.columnHeaders.forEach((header) => {
      const columnHeader = alertsPage.elements.columnHeaderLocator(header);

      I.waitForVisible(columnHeader, 30);
    });

    // Verify there are no duplicate alerts
    I.seeNumberOfElements(alertsPage.elements.alertRow(alertName), 1);
  },
);

Scenario(
  'PMM-T541 Verify user is able to silence/activate the alert @ia @not-pr-pipeline',
  async ({
    I, alertsPage, alertmanagerAPI,
  }) => {
    I.amOnPage(alertsPage.url);
    I.waitForVisible(alertsPage.elements.alertRow(alertName), 30);
    await alertsPage.silenceAlert(alertName);
    await alertmanagerAPI.verifyAlert({ ruleId: ruleIdForAlerts, serviceName: 'pmm-server-postgresql' }, true);
    await alertsPage.activateAlert(alertName);
    await alertmanagerAPI.verifyAlert({ ruleId: ruleIdForAlerts, serviceName: 'pmm-server-postgresql' });
  },
);

Scenario(
  'PMM-T587 Verify user cant see Alert with non-existing filter @ia @not-pr-pipeline',
  async ({ I, alertsPage, rulesAPI }) => {
    const rule = {
      ruleId: ruleIdForAlerts,
      ruleName,
      filters: [
        {
          key: 'service_name',
          value: 'pmm-server-postgresql111',
          type: 'EQUAL',
        },
      ],
    };

    await rulesAPI.updateAlertRule(rule);

    I.amOnPage(alertsPage.url);
    I.waitForVisible(alertsPage.elements.noData);
    I.dontSeeElement(alertsPage.elements.alertRow(alertName));
  },
);

Scenario(
  'PMM-T625 Verify Alert disappears after issue in rule is fixed @ia @not-pr-pipeline',
  async ({
    I, alertsPage, rulesAPI, alertsAPI,
  }) => {
    const rule = {
      ruleId: ruleIdForAlerts,
      ruleName,
      params: [
        {
          name: 'threshold',
          type: 'FLOAT',
          float: 500,
        },
      ],
    };

    await rulesAPI.updateAlertRule(rule);
    await alertsAPI.waitForAlertsToDisappear(300);

    I.amOnPage(alertsPage.url);
    I.waitForVisible(alertsPage.elements.noData);
    I.seeTextEquals(alertsPage.messages.noAlertsFound, alertsPage.elements.noData);
    I.dontSeeElement(alertsPage.elements.alertRow(alertName));
  },
);
