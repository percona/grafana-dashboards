Feature('To compare Mysql InnoDB Metrics visual testing');

Scenario('Open the Mysql InnoDB Metrics Dashboard and take screenshot @visual-test', async (I, adminPage, loginPage) => {
    I.amOnPage('/');
    I.wait(20);
    adminPage.navigateToDashboard("MySQL", "MySQL InnoDB Metrics");
    adminPage.applyTimer("3m");
    adminPage.viewMetric("InnoDB Checkpoint Age");
    I.saveScreenshot("mysql_innodb_checkpoint_age.png");
    I.click(adminPage.fields.backToDashboard);
    adminPage.viewMetric("InnoDB Transactions");
    I.saveScreenshot("mysql_innodb_transactions.png");
    I.click(adminPage.fields.backToDashboard);
    adminPage.viewMetric("Innodb Read-Ahead");
    I.saveScreenshot("mysql_innodb_read_ahead.png");
});

Scenario('Compare mysql_innodb_metrics with Base Image @visual-test', async (I, adminPage, loginPage) => {
    I.seeVisualDiff("mysql_innodb_read_ahead.png", {tolerance: 10, prepareBaseImage: false});
    I.seeVisualDiff("mysql_innodb_checkpoint_age.png", {tolerance: 10, prepareBaseImage: false});
    I.seeVisualDiff("mysql_innodb_transactions.png", {tolerance: 15, prepareBaseImage: false});
});
