module.exports = () => actor({

  verifyPopUpMessage(message) {
    this.waitForText(message, 30, '.page-alert-list div');
    this.click('.page-alert-list button');
  },
});
