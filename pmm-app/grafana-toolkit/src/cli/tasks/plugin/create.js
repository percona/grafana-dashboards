"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var command_exists_1 = tslib_1.__importDefault(require("command-exists"));
var fs_1 = require("fs");
var inquirer_1 = require("inquirer");
var kebabCase_1 = tslib_1.__importDefault(require("lodash/kebabCase"));
var path_1 = tslib_1.__importDefault(require("path"));
var promise_1 = tslib_1.__importDefault(require("simple-git/promise"));
var useSpinner_1 = require("../../utils/useSpinner");
var rmdir_1 = require("../../utils/rmdir");
var prompt_1 = require("../../utils/prompt");
var chalk_1 = tslib_1.__importDefault(require("chalk"));
var simpleGit = promise_1.default(process.cwd());
var RepositoriesPaths = {
    'angular-panel': 'https://github.com/grafana/simple-angular-panel.git',
    'react-panel': 'https://github.com/grafana/simple-react-panel.git',
    'datasource-plugin': 'https://github.com/grafana/simple-datasource.git',
};
exports.getGitUsername = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var name;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, simpleGit.raw(['config', '--global', 'user.name'])];
            case 1:
                name = _a.sent();
                return [2 /*return*/, name || ''];
        }
    });
}); };
exports.getPluginIdFromName = function (name) { return kebabCase_1.default(name); };
exports.getPluginId = function (pluginDetails) {
    return kebabCase_1.default(pluginDetails.org) + "-" + exports.getPluginIdFromName(pluginDetails.name);
};
exports.getPluginKeywords = function (pluginDetails) {
    return pluginDetails.keywords
        .split(',')
        .map(function (k) { return k.trim(); })
        .filter(function (k) { return k !== ''; });
};
exports.verifyGitExists = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                command_exists_1.default('git', function (err, exists) {
                    if (exists) {
                        resolve(true);
                    }
                    reject(new Error('git is not installed'));
                });
            })];
    });
}); };
exports.promptPluginType = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        return [2 /*return*/, inquirer_1.prompt([
                {
                    type: 'list',
                    message: 'Select plugin type',
                    name: 'type',
                    choices: [
                        { name: 'Angular panel', value: 'angular-panel' },
                        { name: 'React panel', value: 'react-panel' },
                        { name: 'Datasource plugin', value: 'datasource-plugin' },
                    ],
                },
            ])];
    });
}); };
exports.promptPluginDetails = function (name) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var username, responses;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.getGitUsername()];
            case 1:
                username = (_a.sent()).trim();
                return [4 /*yield*/, inquirer_1.prompt([
                        prompt_1.promptInput('name', 'Plugin name', true, name),
                        prompt_1.promptInput('org', 'Organization (used as part of plugin ID)', true),
                        prompt_1.promptInput('description', 'Description'),
                        prompt_1.promptInput('keywords', 'Keywords (separated by comma)'),
                        // Try using git specified username
                        prompt_1.promptConfirm('author', "Author (" + username + ")", username, username !== ''),
                        // Prompt for manual author entry if no git user.name specifed
                        prompt_1.promptInput('author', "Author", true, undefined, function (answers) { return !answers.author || username === ''; }),
                        prompt_1.promptInput('url', 'Your URL (i.e. organisation url)'),
                    ])];
            case 2:
                responses = _a.sent();
                return [2 /*return*/, tslib_1.__assign(tslib_1.__assign({}, responses), { author: responses.author === true ? username : responses.author })];
        }
    });
}); };
exports.fetchTemplate = useSpinner_1.useSpinner('Fetching plugin template...', function (_a) {
    var type = _a.type, dest = _a.dest;
    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var url;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    url = RepositoriesPaths[type];
                    if (!url) {
                        throw new Error('Unknown plugin type');
                    }
                    return [4 /*yield*/, simpleGit.clone(url, dest)];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
});
exports.prepareJsonFiles = useSpinner_1.useSpinner('Saving package.json and plugin.json files', function (_a) {
    var pluginDetails = _a.pluginDetails, pluginPath = _a.pluginPath;
    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var packageJsonPath, pluginJsonPath, packageJson, pluginJson, pluginId;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    packageJsonPath = path_1.default.resolve(pluginPath, 'package.json');
                    pluginJsonPath = path_1.default.resolve(pluginPath, 'src/plugin.json');
                    packageJson = JSON.parse(fs_1.readFileSync(packageJsonPath, 'utf8'));
                    pluginJson = JSON.parse(fs_1.readFileSync(pluginJsonPath, 'utf8'));
                    pluginId = kebabCase_1.default(pluginDetails.org) + "-" + exports.getPluginIdFromName(pluginDetails.name);
                    packageJson.name = pluginId;
                    packageJson.author = pluginDetails.author;
                    packageJson.description = pluginDetails.description;
                    pluginJson.name = pluginDetails.name;
                    pluginJson.id = pluginId;
                    pluginJson.info = tslib_1.__assign(tslib_1.__assign({}, pluginJson.info), { description: pluginDetails.description, author: {
                            name: pluginDetails.author,
                            url: pluginDetails.url,
                        }, keywords: exports.getPluginKeywords(pluginDetails) });
                    return [4 /*yield*/, Promise.all([packageJson, pluginJson].map(function (f, i) {
                            var filePath = i === 0 ? packageJsonPath : pluginJsonPath;
                            return fs_1.promises.writeFile(filePath, JSON.stringify(f, null, 2));
                        }))];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
});
exports.removeGitFiles = useSpinner_1.useSpinner('Cleaning', function (pluginPath) { return tslib_1.__awaiter(void 0, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
    return [2 /*return*/, rmdir_1.rmdir("" + path_1.default.resolve(pluginPath, '.git'))];
}); }); });
exports.formatPluginDetails = function (details) {
    console.group();
    console.log();
    console.log(chalk_1.default.bold.yellow('Your plugin details'));
    console.log('---');
    console.log(chalk_1.default.bold('Name: '), details.name);
    console.log(chalk_1.default.bold('ID: '), exports.getPluginId(details));
    console.log(chalk_1.default.bold('Description: '), details.description);
    console.log(chalk_1.default.bold('Keywords: '), exports.getPluginKeywords(details));
    console.log(chalk_1.default.bold('Author: '), details.author);
    console.log(chalk_1.default.bold('Organisation: '), details.org);
    console.log(chalk_1.default.bold('Website: '), details.url);
    console.log();
    console.groupEnd();
};
//# sourceMappingURL=create.js.map