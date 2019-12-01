"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pageInfo_1 = require("../pageInfo");
var pageObjects_1 = require("../pageObjects");
exports.loginPage = new pageInfo_1.TestPage({
    url: '/login',
    pageObjects: {
        username: new pageObjects_1.InputPageObject(pageObjects_1.Selector.fromAriaLabel('Username input field')),
        password: new pageObjects_1.InputPageObject(pageObjects_1.Selector.fromAriaLabel('Password input field')),
        submit: new pageObjects_1.ClickablePageObject(pageObjects_1.Selector.fromAriaLabel('Login button')),
    },
});
//# sourceMappingURL=loginPage.js.map