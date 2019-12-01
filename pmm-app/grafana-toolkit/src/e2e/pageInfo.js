"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var constants_1 = require("./constants");
var TestPage = /** @class */ (function () {
    function TestPage(config) {
        var _this = this;
        this.init = function (page) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.page = page;
                if (!this.pageObjects) {
                    return [2 /*return*/];
                }
                Object.keys(this.pageObjects).forEach(function (key) {
                    // @ts-ignore
                    var pageObject = _this.pageObjects[key];
                    pageObject.init(page);
                });
                return [2 /*return*/];
            });
        }); };
        this.navigateTo = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.throwIfNotInitialized();
                        console.log('Trying to navigate to:', this.pageUrl);
                        return [4 /*yield*/, this.page.goto(this.pageUrl)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.expectSelector = function (config) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var selector, containsText, isVisible, visible, text, options;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.throwIfNotInitialized();
                        selector = config.selector, containsText = config.containsText, isVisible = config.isVisible;
                        visible = isVisible || true;
                        text = containsText;
                        options = { visible: visible, text: text };
                        return [4 /*yield*/, expect(this.page).toMatchElement(selector, options)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.waitForResponse = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.throwIfNotInitialized();
                        return [4 /*yield*/, this.page.waitForResponse(function (response) { return response.url() === _this.pageUrl && response.status() === 200; })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.waitForNavigation = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.throwIfNotInitialized();
                        return [4 /*yield*/, this.page.waitForNavigation()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.getUrl = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.throwIfNotInitialized();
                        return [4 /*yield*/, this.page.url()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.getUrlWithoutBaseUrl = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var url;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.throwIfNotInitialized();
                        return [4 /*yield*/, this.getUrl()];
                    case 1:
                        url = _a.sent();
                        return [2 /*return*/, url.replace(constants_1.constants.baseUrl, '')];
                }
            });
        }); };
        this.waitFor = function (milliseconds) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.throwIfNotInitialized();
                        return [4 /*yield*/, this.page.waitFor(milliseconds)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.throwIfNotInitialized = function () {
            if (!_this.page) {
                throw new Error('pageFactory has not been initilized, did you forget to call init with a page?');
            }
        };
        if (config.url) {
            this.pageUrl = "" + constants_1.constants.baseUrl + config.url;
        }
        this.pageObjects = config.pageObjects;
    }
    return TestPage;
}());
exports.TestPage = TestPage;
//# sourceMappingURL=pageInfo.js.map