"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var task_1 = require("./task");
var fs_1 = tslib_1.__importDefault(require("fs"));
// @ts-ignore
var execa = require("execa");
var path = require("path");
var glob = require("glob");
var tslint_1 = require("tslint");
var prettier = tslib_1.__importStar(require("prettier"));
var useSpinner_1 = require("../utils/useSpinner");
var tests_1 = require("./plugin/tests");
var bundle_1 = require("./plugin/bundle");
exports.bundlePlugin = useSpinner_1.useSpinner('Compiling...', function (options) { return tslib_1.__awaiter(void 0, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, bundle_1.bundlePlugin(options)];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); });
// @ts-ignore
exports.clean = useSpinner_1.useSpinner('Cleaning', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, execa('rimraf', [process.cwd() + "/dist"])];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); });
exports.prepare = useSpinner_1.useSpinner('Preparing', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var filePath, srcFile, srcFile;
    return tslib_1.__generator(this, function (_a) {
        filePath = path.resolve(process.cwd(), 'tsconfig.json');
        if (!fs_1.default.existsSync(filePath)) {
            srcFile = path.resolve(__dirname, '../../config/tsconfig.plugin.local.json');
            fs_1.default.copyFile(srcFile, filePath, function (err) {
                if (err) {
                    throw err;
                }
                console.log("Created: " + filePath);
            });
        }
        // Make sure a local .prettierrc.js exists.  Otherwise this will work, but have odd behavior
        filePath = path.resolve(process.cwd(), '.prettierrc.js');
        if (!fs_1.default.existsSync(filePath)) {
            srcFile = path.resolve(__dirname, '../../config/prettier.plugin.rc.js');
            fs_1.default.copyFile(srcFile, filePath, function (err) {
                if (err) {
                    throw err;
                }
                console.log("Created: " + filePath);
            });
        }
        return [2 /*return*/, Promise.resolve()];
    });
}); });
// @ts-ignore
var typecheckPlugin = useSpinner_1.useSpinner('Typechecking', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, execa('tsc', ['--noEmit'])];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
var getTypescriptSources = function () {
    var globPattern = path.resolve(process.cwd(), 'src/**/*.+(ts|tsx)');
    return glob.sync(globPattern);
};
var getStylesSources = function () {
    var globPattern = path.resolve(process.cwd(), 'src/**/*.+(scss|css)');
    return glob.sync(globPattern);
};
exports.prettierCheckPlugin = useSpinner_1.useSpinner('Prettier check', function (_a) {
    var fix = _a.fix;
    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var prettierConfig, sources, promises, results, failures;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    prettierConfig = require(path.resolve(__dirname, '../../config/prettier.plugin.config.json'));
                    sources = tslib_1.__spread(getStylesSources(), getTypescriptSources());
                    promises = sources.map(function (s, i) {
                        return new Promise(function (resolve, reject) {
                            fs_1.default.readFile(s, function (err, data) {
                                var failed = false;
                                if (err) {
                                    throw new Error(err.message);
                                }
                                var opts = tslib_1.__assign(tslib_1.__assign({}, prettierConfig), { filepath: s });
                                if (!prettier.check(data.toString(), opts)) {
                                    if (fix) {
                                        var fixed = prettier.format(data.toString(), opts);
                                        if (fixed && fixed.length > 10) {
                                            fs_1.default.writeFile(s, fixed, function (err) {
                                                if (err) {
                                                    console.log('Error fixing ' + s, err);
                                                    failed = true;
                                                }
                                                else {
                                                    console.log('Fixed: ' + s);
                                                }
                                            });
                                        }
                                        else {
                                            console.log('No automatic fix for: ' + s);
                                            failed = true;
                                        }
                                    }
                                    else {
                                        failed = true;
                                    }
                                }
                                resolve({
                                    path: s,
                                    failed: failed,
                                });
                            });
                        });
                    });
                    return [4 /*yield*/, Promise.all(promises)];
                case 1:
                    results = _b.sent();
                    failures = results.filter(function (r) { return r.failed; });
                    if (failures.length) {
                        console.log('\nFix Prettier issues in following files:');
                        failures.forEach(function (f) { return console.log(f.path); });
                        console.log('\nRun toolkit:dev to fix errors');
                        throw new Error('Prettier failed');
                    }
                    return [2 /*return*/];
            }
        });
    });
});
// @ts-ignore
exports.lintPlugin = useSpinner_1.useSpinner('Linting', function (_a) {
    var fix = _a.fix;
    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var tsLintConfigPath, options, configuration, sourcesToLint, lintResults, failures;
        return tslib_1.__generator(this, function (_b) {
            tsLintConfigPath = path.resolve(process.cwd(), 'tslint.json');
            if (!fs_1.default.existsSync(tsLintConfigPath)) {
                tsLintConfigPath = path.resolve(__dirname, '../../config/tslint.plugin.json');
            }
            options = {
                fix: fix === true,
                formatter: 'json',
            };
            configuration = tslint_1.Configuration.findConfiguration(tsLintConfigPath).results;
            sourcesToLint = getTypescriptSources();
            lintResults = sourcesToLint
                .map(function (fileName) {
                var linter = new tslint_1.Linter(options);
                var fileContents = fs_1.default.readFileSync(fileName, 'utf8');
                linter.lint(fileName, fileContents, configuration);
                return linter.getResult();
            })
                .filter(function (result) {
                return result.errorCount > 0 || result.warningCount > 0;
            });
            if (lintResults.length > 0) {
                console.log('\n');
                failures = lintResults.reduce(function (failures, result) {
                    return tslib_1.__spread(failures, result.failures);
                }, []);
                failures.forEach(function (f) {
                    // tslint:disable-next-line
                    console.log((f.getRuleSeverity() === 'warning' ? 'WARNING' : 'ERROR') + ": " + f.getFileName().split('src')[1] + "[" + (f.getStartPosition().getLineAndCharacter().line + 1) + ":" + f.getStartPosition().getLineAndCharacter().character + "]: " + f.getFailure());
                });
                console.log('\n');
                throw new Error(failures.length + " linting errors found in " + lintResults.length + " files");
            }
            return [2 /*return*/];
        });
    });
});
exports.pluginBuildRunner = function (_a) {
    var coverage = _a.coverage;
    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, exports.clean()];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, exports.prepare()];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, exports.prettierCheckPlugin({ fix: false })];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, exports.lintPlugin({ fix: false })];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, tests_1.testPlugin({ updateSnapshot: false, coverage: coverage, watch: false })];
                case 5:
                    _b.sent();
                    return [4 /*yield*/, exports.bundlePlugin({ watch: false, production: true })];
                case 6:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
};
exports.pluginBuildTask = new task_1.Task('Build plugin', exports.pluginBuildRunner);
//# sourceMappingURL=plugin.build.js.map