Feature('to verify PMM server Upgrade works via UI');

Before( async (I) => {
  I.Authorize();

});

Scenario(
    'Verify user can see Update widget before upgrade @visual-test @pmm-update',
    async (I, adminPage, homePage) => {
        I.amOnPage(homePage.url);
        await homePage.verifyPreUpdateWidgetIsPresent();
    }
);

xScenario(
  'Open Home Dashboard, upgrade PMM version @visual-test @pmm-update',
  async (I, adminPage, homePage) => {
    await homePage.upgradePMM();
  }
);

xScenario(
    'Verify user can see Update widget after upgrade @visual-test @pmm-update',
    async (I, adminPage, homePage) => {
        I.amOnPage(homePage.url);
        homePage.verifyPostUpdateWidgetIsPresent();
    }
);
