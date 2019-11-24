"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var e2e_1 = require("@grafana/toolkit/src/e2e");
var plugins_1 = require("@grafana/toolkit/src/plugins");
// ****************************************************************
// NOTE, This file is copied to plugins at runtime, it is not run locally
// ****************************************************************
var sleep = function (milliseconds) {
    return new Promise(function (resolve) { return setTimeout(resolve, milliseconds); });
};
e2e_1.e2eScenario('Common Plugin Test', 'should pass', function (browser, page) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var settings, pluginPage, fileName;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                settings = plugins_1.getEndToEndSettings();
                pluginPage = e2e_1.pages.getPluginPage(settings.plugin.id);
                return [4 /*yield*/, pluginPage.init(page)];
            case 1:
                _a.sent();
                return [4 /*yield*/, pluginPage.navigateTo()];
            case 2:
                _a.sent();
                // TODO: find a better way to avoid the 'loading' page
                return [4 /*yield*/, sleep(500)];
            case 3:
                // TODO: find a better way to avoid the 'loading' page
                _a.sent();
                fileName = 'plugin-page';
                return [4 /*yield*/, e2e_1.takeScreenShot(page, fileName)];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=commonPluginTests.js.map