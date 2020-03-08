Feature('to verify PMM server Upgrade works via UI');

Before((I, loginPage) => {
    I.amOnPage(loginPage.url);
    loginPage.login("admin", "admin");
});

Scenario('Open Home Dashboard, upgrade PMM version @visual-test @pmm-update', async (I, adminPage, homePage) => {
    await homePage.upgradePMM();
});
