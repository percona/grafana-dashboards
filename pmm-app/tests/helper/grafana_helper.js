const Helper = codecept_helper;
const { saveVideo } = require('playwright-video');
const fs = require('fs');

class Grafana extends Helper {

  constructor(config) {
    super(config);
    this.resultFilesFolder = global.output_dir + "/";
  }

  // async _before(test) {
  //   const { page } = this.helpers.Playwright;
  //   let videoFileName = test.title.replace(/\s/g, '_') + ".mp4";
  //   await saveVideo(page, this.resultFilesFolder + videoFileName);
  // }

  async Authorize() {
    const { browserContext } = this.helpers.Playwright;
    const basicAuthEncoded = Buffer.from(
        `${this.config.username || 'admin'}:${this.config.password || 'admin'}`
    ).toString('base64');
    await browserContext.setExtraHTTPHeaders({ Authorization: `Basic ${basicAuthEncoded}` });
  }

  /**
   * Helper function gets called if the test execution fails
   * @param test
   * @param error
   * @private
   */
  // _failed(test, error) {
  //   let videoFileName = test.title.replace(/\s/g, '_') + ".mp4";
  //   if (!fs.existsSync(this.resultFilesFolder + "video/")){
  //     fs.mkdirSync(this.resultFilesFolder + "video/");
  //   }
  //
  //   fs.rename(
  //       this.resultFilesFolder + videoFileName,
  //       this.resultFilesFolder + "video/" + videoFileName,
  //       function (err) {
  //         if (err) throw err
  //         console.log('Failed Video Saved in output video folder');
  //       });
  // }
}

module.exports = Grafana;