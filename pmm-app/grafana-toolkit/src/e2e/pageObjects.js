"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Selector = /** @class */ (function () {
    function Selector() {
    }
    Selector.fromAriaLabel = function (selector) {
        return "[aria-label=\"" + selector + "\"]";
    };
    Selector.fromSelector = function (selector) {
        return selector;
    };
    return Selector;
}());
exports.Selector = Selector;
var PageObject = /** @class */ (function () {
    function PageObject(selector) {
        var _this = this;
        this.selector = selector;
        this.init = function (page) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.page = page;
                return [2 /*return*/];
            });
        }); };
        this.exists = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var options;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = { visible: true };
                        return [4 /*yield*/, expect(this.page).not.toBeNull()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, expect(this.page).toMatchElement(this.selector, options)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.containsText = function (text) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var options;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = { visible: true, text: text };
                        return [4 /*yield*/, expect(this.page).not.toBeNull()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, expect(this.page).toMatchElement(this.selector, options)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
    }
    return PageObject;
}());
exports.PageObject = PageObject;
var ClickablePageObject = /** @class */ (function (_super) {
    tslib_1.__extends(ClickablePageObject, _super);
    function ClickablePageObject(selector) {
        var _this = _super.call(this, selector) || this;
        _this.click = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Trying to click on:', this.selector);
                        return [4 /*yield*/, expect(this.page).not.toBeNull()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, expect(this.page).toClick(this.selector)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    return ClickablePageObject;
}(PageObject));
exports.ClickablePageObject = ClickablePageObject;
var InputPageObject = /** @class */ (function (_super) {
    tslib_1.__extends(InputPageObject, _super);
    function InputPageObject(selector) {
        var _this = _super.call(this, selector) || this;
        _this.enter = function (text) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Trying to enter text:" + text + " into:", this.selector);
                        return [4 /*yield*/, expect(this.page).not.toBeNull()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, expect(this.page).toFill(this.selector, text)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    return InputPageObject;
}(PageObject));
exports.InputPageObject = InputPageObject;
var SelectPageObject = /** @class */ (function (_super) {
    tslib_1.__extends(SelectPageObject, _super);
    function SelectPageObject(selector) {
        var _this = _super.call(this, selector) || this;
        _this.select = function (text) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Trying to select text:" + text + " in dropdown:", this.selector);
                        return [4 /*yield*/, expect(this.page).not.toBeNull()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.page.select(this.selector, text)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    return SelectPageObject;
}(PageObject));
exports.SelectPageObject = SelectPageObject;
//# sourceMappingURL=pageObjects.js.map