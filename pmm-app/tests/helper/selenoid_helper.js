const Helper = codecept_helper;
const fs = require('fs');

class selenoidHelper extends Helper {
  constructor(config) {
    super(config);
    this.resultFilesFolder = global.output_dir + '/';
  }

  /**
   * Helper function gets called if the test execution fails
   * @param test
   * @param error
   * @private
   */
  _failed(test, error) {
    const sessionId = this._getSessionId();
    const config = this._getConfig();
    let testDataObj = {};
    testDataObj['sessionid'] = sessionId;
    testDataObj['testName'] = test.title;
    let testData = JSON.stringify(testDataObj);
    if (!fs.existsSync(this.resultFilesFolder + 'selenoid/')) {
      fs.mkdirSync(this.resultFilesFolder + 'selenoid/');
    }
    if (!fs.existsSync(this.resultFilesFolder + 'video/')) {
      fs.mkdirSync(this.resultFilesFolder + 'video/');
    }
    fs.appendFileSync(
      this.resultFilesFolder + 'selenoid/' + 'failing_tests_' + sessionId + '.json',
      testData
    );
  }

  _getConfig() {
    if (this.helpers.WebDriver) {
      return this.helpers.WebDriver.config;
    }
    if (this.helpers.Appium) {
      return this.helpers.Appium.config;
    }
    if (this.helpers.WebDriverIO) {
      return this.helpers.WebDriverIO.config;
    }
    throw new Error('No matching helper found. Supported helpers: WebDriver/Appium/WebDriverIO');
  }

  _getSessionId() {
    if (this.helpers.WebDriver) {
      return this.helpers.WebDriver.browser.sessionId;
    }
    if (this.helpers.Appium) {
      return this.helpers.Appium.browser.sessionId;
    }
    if (this.helpers.WebDriverIO) {
      return this.helpers.WebDriverIO.browser.requestHandler.sessionID;
    }
    throw new Error('No matching helper found. Supported helpers: WebDriver/Appium/WebDriverIO');
  }
}

module.exports = selenoidHelper;
