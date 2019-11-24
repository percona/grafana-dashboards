"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// @ts-ignore
var commander_1 = tslib_1.__importDefault(require("commander"));
var execTask_1 = require("./utils/execTask");
var chalk_1 = tslib_1.__importDefault(require("chalk"));
var core_start_1 = require("./tasks/core.start");
var changelog_1 = require("./tasks/changelog");
var cherrypick_1 = require("./tasks/cherrypick");
var precommit_1 = require("./tasks/precommit");
var template_1 = require("./tasks/template");
var plugin_build_1 = require("./tasks/plugin.build");
var toolkit_build_1 = require("./tasks/toolkit.build");
var plugin_tests_1 = require("./tasks/plugin.tests");
var searchTestDataSetup_1 = require("./tasks/searchTestDataSetup");
var closeMilestone_1 = require("./tasks/closeMilestone");
var plugin_dev_1 = require("./tasks/plugin.dev");
var plugin_ci_1 = require("./tasks/plugin.ci");
var package_build_1 = require("./tasks/package.build");
var plugin_create_1 = require("./tasks/plugin.create");
exports.run = function (includeInternalScripts) {
    if (includeInternalScripts === void 0) { includeInternalScripts = false; }
    if (includeInternalScripts) {
        commander_1.default.option('-d, --depreciate <scripts>', 'Inform about npm script deprecation', function (v) { return v.split(','); });
        commander_1.default
            .command('core:start')
            .option('-h, --hot', 'Run front-end with HRM enabled')
            .option('-T, --noTsCheck', 'Run bundler without TS type checking')
            .option('-t, --watchTheme', 'Watch for theme changes and regenerate variables.scss files')
            .description('Starts Grafana front-end in development mode with watch enabled')
            .action(function (cmd) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, execTask_1.execTask(core_start_1.startTask)({
                            watchThemes: cmd.watchTheme,
                            noTsCheck: cmd.noTsCheck,
                            hot: cmd.hot,
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        commander_1.default
            .command('package:build')
            .option('-s, --scope <packages>', 'packages=[data|runtime|ui|toolkit]')
            .description('Builds @grafana/* package to packages/grafana-*/dist')
            .action(function (cmd) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, execTask_1.execTask(package_build_1.buildPackageTask)({
                            scope: cmd.scope,
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        commander_1.default
            .command('changelog')
            .option('-m, --milestone <milestone>', 'Specify milestone')
            .description('Builds changelog markdown')
            .action(function (cmd) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!cmd.milestone) {
                            console.log('Please specify milestone, example: -m <milestone id from github milestone URL>');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, execTask_1.execTask(changelog_1.changelogTask)({
                                milestone: cmd.milestone,
                                silent: true,
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        commander_1.default
            .command('cherrypick')
            .option('-e, --enterprise', 'Run task for grafana-enterprise')
            .description('Helps find commits to cherry pick')
            .action(function (cmd) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, execTask_1.execTask(cherrypick_1.cherryPickTask)({ enterprise: !!cmd.enterprise })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        commander_1.default
            .command('precommit')
            .description('Executes checks')
            .action(function (cmd) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, execTask_1.execTask(precommit_1.precommitTask)({})];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        commander_1.default
            .command('debug:template')
            .description('Just testing')
            .action(function (cmd) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, execTask_1.execTask(template_1.templateTask)({})];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        commander_1.default
            .command('toolkit:build')
            .description('Prepares grafana/toolkit dist package')
            .action(function (cmd) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, execTask_1.execTask(toolkit_build_1.toolkitBuildTask)({})];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        commander_1.default
            .command('searchTestData')
            .option('-c, --count <number_of_dashboards>', 'Specify number of dashboards')
            .description('Setup test data for search')
            .action(function (cmd) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, execTask_1.execTask(searchTestDataSetup_1.searchTestDataSetupTask)({ count: cmd.count })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        commander_1.default
            .command('close-milestone')
            .option('-m, --milestone <milestone>', 'Specify milestone')
            .description('Helps ends a milestone by removing the cherry-pick label and closing it')
            .action(function (cmd) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!cmd.milestone) {
                            console.log('Please specify milestone, example: -m <milestone id from github milestone URL>');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, execTask_1.execTask(closeMilestone_1.closeMilestoneTask)({
                                milestone: cmd.milestone,
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    }
    commander_1.default
        .command('plugin:create [name]')
        .description('Creates plugin from template')
        .action(function (cmd) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, execTask_1.execTask(plugin_create_1.pluginCreateTask)({ name: cmd, silent: true })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    commander_1.default
        .command('plugin:build')
        .description('Prepares plugin dist package')
        .action(function (cmd) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, execTask_1.execTask(plugin_build_1.pluginBuildTask)({ coverage: false, silent: true })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    commander_1.default
        .command('plugin:dev')
        .option('-w, --watch', 'Run plugin development mode with watch enabled')
        .option('--yarnlink', 'symlink this project to the local grafana/toolkit')
        .description('Starts plugin dev mode')
        .action(function (cmd) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, execTask_1.execTask(plugin_dev_1.pluginDevTask)({
                        watch: !!cmd.watch,
                        yarnlink: !!cmd.yarnlink,
                        silent: true,
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    commander_1.default
        .command('plugin:test')
        .option('-u, --updateSnapshot', 'Run snapshots update')
        .option('--coverage', 'Run code coverage')
        .option('--watch', 'Run tests in interactive watch mode')
        .option('--testPathPattern <regex>', 'Run only tests with a path that matches the regex')
        .option('--testNamePattern <regex>', 'Run only tests with a name that matches the regex')
        .description('Executes plugin tests')
        .action(function (cmd) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, execTask_1.execTask(plugin_tests_1.pluginTestTask)({
                        updateSnapshot: !!cmd.updateSnapshot,
                        coverage: !!cmd.coverage,
                        watch: !!cmd.watch,
                        testPathPattern: cmd.testPathPattern,
                        testNamePattern: cmd.testNamePattern,
                        silent: true,
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    commander_1.default
        .command('plugin:ci-build')
        .option('--backend', 'Run Makefile for backend task', false)
        .description('Build the plugin, leaving results in /dist and /coverage')
        .action(function (cmd) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (typeof cmd === 'string') {
                        console.error("Invalid argument: " + cmd + "\nSee --help for a list of available commands.");
                        process.exit(1);
                    }
                    return [4 /*yield*/, execTask_1.execTask(plugin_ci_1.ciBuildPluginTask)({
                            backend: cmd.backend,
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    commander_1.default
        .command('plugin:ci-docs')
        .description('Build the HTML docs')
        .action(function (cmd) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, execTask_1.execTask(plugin_ci_1.ciBuildPluginDocsTask)({})];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    commander_1.default
        .command('plugin:ci-package')
        .description('Create a zip packages for the plugin')
        .action(function (cmd) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, execTask_1.execTask(plugin_ci_1.ciPackagePluginTask)({})];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    commander_1.default
        .command('plugin:ci-test')
        .option('--full', 'run all the tests (even stuff that will break)')
        .description('end-to-end test using bundle in /artifacts')
        .action(function (cmd) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, execTask_1.execTask(plugin_ci_1.ciTestPluginTask)({
                        full: cmd.full,
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    commander_1.default
        .command('plugin:ci-report')
        .description('Build a report for this whole process')
        .option('--upload', 'upload packages also')
        .action(function (cmd) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, execTask_1.execTask(plugin_ci_1.ciPluginReportTask)({
                        upload: cmd.upload,
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    commander_1.default.on('command:*', function () {
        console.error('Invalid command: %s\nSee --help for a list of available commands.', commander_1.default.args.join(' '));
        process.exit(1);
    });
    commander_1.default.parse(process.argv);
    if (commander_1.default.depreciate && commander_1.default.depreciate.length === 2) {
        console.log(chalk_1.default.yellow.bold("[NPM script depreciation] " + commander_1.default.depreciate[0] + " is deprecated! Use " + commander_1.default.depreciate[1] + " instead!"));
    }
};
//# sourceMappingURL=index.js.map