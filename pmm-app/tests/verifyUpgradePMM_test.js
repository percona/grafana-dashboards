Feature('to verify PMM server Upgrade works via UI');

Before((I) => {
  I.Authorize();

});

Scenario(
  'Open Home Dashboard, upgrade PMM version @visual-test @pmm-update',
  async (I, adminPage, homePage) => {
    await homePage.upgradePMM();
  }
);
