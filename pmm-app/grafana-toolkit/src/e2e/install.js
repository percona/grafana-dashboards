"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var puppeteer_core_1 = tslib_1.__importDefault(require("puppeteer-core"));
var constants_1 = require("./constants");
exports.downloadBrowserIfNeeded = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var browserFetcher, localRevisions;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                browserFetcher = puppeteer_core_1.default.createBrowserFetcher();
                return [4 /*yield*/, browserFetcher.localRevisions()];
            case 1:
                localRevisions = _a.sent();
                if (localRevisions && localRevisions.length > 0) {
                    console.log('Found a local revision for browser, exiting install.');
                    return [2 /*return*/];
                }
                console.log('Did not find any local revisions for browser, downloading latest this might take a while.');
                return [4 /*yield*/, browserFetcher.download(constants_1.constants.chromiumRevision, function (downloaded, total) {
                        if (downloaded === total) {
                            console.log('Chromium successfully downloaded');
                        }
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
beforeAll(function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('Checking Chromium');
                jest.setTimeout(60 * 1000);
                return [4 /*yield*/, exports.downloadBrowserIfNeeded()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=install.js.map