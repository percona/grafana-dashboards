"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var path_1 = tslib_1.__importDefault(require("path"));
var PLUGIN_ID;
exports.getPluginId = function () {
    if (!PLUGIN_ID) {
        var pluginJson = require(path_1.default.resolve(process.cwd(), 'src/plugin.json'));
        PLUGIN_ID = pluginJson.id;
    }
    return PLUGIN_ID;
};
//# sourceMappingURL=getPluginId.js.map