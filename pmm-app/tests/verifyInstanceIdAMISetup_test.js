Feature('to run AMI Setup Page and verify Instance ID');

Scenario('Open the setup Page for AMI Instance @pmm-ami @visual-test', async (I, amiInstanceSetupPage) => {
  I.amOnPage(amiInstanceSetupPage.url);
  await amiInstanceSetupPage.verifyInstanceID(process.env.AMI_INSTANCE_ID);
  I.Authorize();
});
