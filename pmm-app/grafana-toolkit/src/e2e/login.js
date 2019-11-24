"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var constants_1 = require("./constants");
var loginPage_1 = require("./pages/loginPage");
exports.login = function (page) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, loginPage_1.loginPage.init(page)];
            case 1:
                _a.sent();
                return [4 /*yield*/, loginPage_1.loginPage.navigateTo()];
            case 2:
                _a.sent();
                return [4 /*yield*/, loginPage_1.loginPage.pageObjects.username.enter('admin')];
            case 3:
                _a.sent();
                return [4 /*yield*/, loginPage_1.loginPage.pageObjects.password.enter('admin')];
            case 4:
                _a.sent();
                return [4 /*yield*/, loginPage_1.loginPage.pageObjects.submit.click()];
            case 5:
                _a.sent();
                return [4 /*yield*/, loginPage_1.loginPage.waitForResponse()];
            case 6:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.ensureLoggedIn = function (page) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, page.goto("" + constants_1.constants.baseUrl)];
            case 1:
                _a.sent();
                if (!(page.url().indexOf('login') > -1)) return [3 /*break*/, 3];
                console.log('Redirected to login page. Logging in...');
                return [4 /*yield*/, exports.login(page)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=login.js.map