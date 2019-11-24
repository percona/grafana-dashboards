"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs_1 = tslib_1.__importDefault(require("fs"));
var pngjs_1 = require("pngjs");
var pixelmatch_1 = tslib_1.__importDefault(require("pixelmatch"));
var constants_1 = require("./constants");
exports.takeScreenShot = function (page, fileName) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var outputFolderExists, path;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                outputFolderExists = fs_1.default.existsSync(constants_1.constants.screenShotsOutputDir);
                if (!outputFolderExists) {
                    fs_1.default.mkdirSync(constants_1.constants.screenShotsOutputDir);
                }
                path = constants_1.constants.screenShotsOutputDir + "/" + fileName + ".png";
                return [4 /*yield*/, page.screenshot({ path: path, type: 'png', fullPage: false })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.compareScreenShots = function (fileName) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve) {
                var filesRead = 0;
                var doneReading = function () {
                    if (++filesRead < 2) {
                        return;
                    }
                    if (screenShotFromTest.width !== screenShotFromTruth.width) {
                        throw new Error("The screenshot:[" + fileName + "] taken during the test has a " +
                            ("width:[" + screenShotFromTest.width + "] that differs from the ") +
                            ("expected: [" + screenShotFromTruth.width + "]."));
                    }
                    if (screenShotFromTest.height !== screenShotFromTruth.height) {
                        throw new Error("The screenshot:[" + fileName + "] taken during the test has a " +
                            ("height:[" + screenShotFromTest.height + "] that differs from the ") +
                            ("expected: [" + screenShotFromTruth.height + "]."));
                    }
                    var diff = new pngjs_1.PNG({ width: screenShotFromTest.width, height: screenShotFromTruth.height });
                    var numDiffPixels = pixelmatch_1.default(screenShotFromTest.data, screenShotFromTruth.data, diff.data, screenShotFromTest.width, screenShotFromTest.height, { threshold: 0.1 });
                    if (numDiffPixels !== 0) {
                        var localMessage = "\nCompare the output from expected:[" + constants_1.constants.screenShotsTruthDir + "] " +
                            ("with outcome:[" + constants_1.constants.screenShotsOutputDir + "]");
                        var circleCIMessage = '\nCheck the Artifacts tab in the CircleCi build output for the actual screenshots.';
                        var checkMessage = process.env.CIRCLE_SHA1 ? circleCIMessage : localMessage;
                        var msg = "\nThe screenshot:[" + constants_1.constants.screenShotsOutputDir + "/" + fileName + ".png] " +
                            ("taken during the test differs by:[" + numDiffPixels + "] pixels from the expected.");
                        msg += '\n';
                        msg += checkMessage;
                        msg += '\n';
                        msg += '\n  If the difference between expected and outcome is NOT acceptable then do the following:';
                        msg += '\n    - Check the code for changes that causes this difference, fix that and retry.';
                        msg += '\n';
                        msg += '\n  If the difference between expected and outcome is acceptable then do the following:';
                        msg += '\n    - Replace the expected image with the outcome and retry.';
                        msg += '\n';
                        throw new Error(msg);
                    }
                    resolve();
                };
                var screenShotFromTest = fs_1.default
                    .createReadStream(constants_1.constants.screenShotsOutputDir + "/" + fileName + ".png")
                    .pipe(new pngjs_1.PNG())
                    .on('parsed', doneReading);
                var screenShotFromTruth = fs_1.default
                    .createReadStream(constants_1.constants.screenShotsTruthDir + "/" + fileName + ".png")
                    .pipe(new pngjs_1.PNG())
                    .on('parsed', doneReading);
            })];
    });
}); };
//# sourceMappingURL=images.js.map