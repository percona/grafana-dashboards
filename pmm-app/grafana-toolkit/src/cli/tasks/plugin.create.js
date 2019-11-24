"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var inquirer_1 = require("inquirer");
var path_1 = tslib_1.__importDefault(require("path"));
var task_1 = require("./task");
var prompt_1 = require("../utils/prompt");
var create_1 = require("./plugin/create");
var pluginCreateRunner = function (_a) {
    var name = _a.name;
    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var destPath, pluginDetails, type;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    destPath = path_1.default.resolve(process.cwd(), create_1.getPluginIdFromName(name || ''));
                    // 1. Verifying if git exists in user's env as templates are cloned from git templates
                    return [4 /*yield*/, create_1.verifyGitExists()];
                case 1:
                    // 1. Verifying if git exists in user's env as templates are cloned from git templates
                    _b.sent();
                    return [4 /*yield*/, create_1.promptPluginType()];
                case 2:
                    type = (_b.sent()).type;
                    // 3. Fetch plugin template from Github
                    return [4 /*yield*/, create_1.fetchTemplate({ type: type, dest: destPath })];
                case 3:
                    // 3. Fetch plugin template from Github
                    _b.sent();
                    _b.label = 4;
                case 4: return [4 /*yield*/, create_1.promptPluginDetails(name)];
                case 5:
                    pluginDetails = _b.sent();
                    create_1.formatPluginDetails(pluginDetails);
                    _b.label = 6;
                case 6: return [4 /*yield*/, inquirer_1.prompt(prompt_1.promptConfirm('confirm', 'Is that ok?'))];
                case 7:
                    if ((_b.sent()).confirm === false) return [3 /*break*/, 4];
                    _b.label = 8;
                case 8: 
                // 5. Update json files (package.json, src/plugin.json)
                return [4 /*yield*/, create_1.prepareJsonFiles({ pluginDetails: pluginDetails, pluginPath: destPath })];
                case 9:
                    // 5. Update json files (package.json, src/plugin.json)
                    _b.sent();
                    // 6. Remove cloned repository .git dir
                    return [4 /*yield*/, create_1.removeGitFiles(destPath)];
                case 10:
                    // 6. Remove cloned repository .git dir
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
};
exports.pluginCreateTask = new task_1.Task('plugin:create task', pluginCreateRunner);
//# sourceMappingURL=plugin.create.js.map