"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pageInfo_1 = require("../pageInfo");
exports.pluginsPage = new pageInfo_1.TestPage({
    url: '/plugins',
    pageObjects: {},
});
function getPluginPage(id) {
    return new pageInfo_1.TestPage({
        url: "/plugins/" + id + "/",
        pageObjects: {
        // TODO Find update/enable buttons
        },
    });
}
exports.getPluginPage = getPluginPage;
//# sourceMappingURL=pluginsPage.js.map