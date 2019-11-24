"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var puppeteer_core_1 = tslib_1.__importDefault(require("puppeteer-core"));
exports.launchBrowser = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var browserFetcher, localRevisions, executablePath, browser;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                browserFetcher = puppeteer_core_1.default.createBrowserFetcher();
                return [4 /*yield*/, browserFetcher.localRevisions()];
            case 1:
                localRevisions = _a.sent();
                if (localRevisions.length === 0) {
                    throw new Error('Could not launch browser because there is no local revisions.');
                }
                executablePath = null;
                executablePath = browserFetcher.revisionInfo(localRevisions[0]).executablePath;
                return [4 /*yield*/, puppeteer_core_1.default.launch({
                        headless: process.env.BROWSER ? false : true,
                        slowMo: process.env.SLOWMO ? 100 : 0,
                        defaultViewport: {
                            width: 1920,
                            height: 1080,
                            deviceScaleFactor: 1,
                            isMobile: false,
                            hasTouch: false,
                            isLandscape: false,
                        },
                        args: ['--start-fullscreen'],
                        executablePath: executablePath,
                    })];
            case 2:
                browser = _a.sent();
                return [2 /*return*/, browser];
        }
    });
}); };
//# sourceMappingURL=launcher.js.map