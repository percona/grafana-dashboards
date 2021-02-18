module.exports = () => actor({

  verifyPopUpMessage(message) {
    this.waitForVisible('.page-alert-list', 30);
    this.see(message, '.page-alert-list');
    this.click('.page-alert-list button');
  },
});
