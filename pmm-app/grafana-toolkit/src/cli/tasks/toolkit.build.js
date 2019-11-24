"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var execa = require("execa");
var fs = tslib_1.__importStar(require("fs"));
var chalk_1 = tslib_1.__importDefault(require("chalk"));
var useSpinner_1 = require("../utils/useSpinner");
var task_1 = require("./task");
var path = require('path');
var distDir, cwd;
// @ts-ignore
exports.clean = useSpinner_1.useSpinner('Cleaning', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, execa('npm', ['run', 'clean'])];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); });
// @ts-ignore
var compile = useSpinner_1.useSpinner('Compiling sources', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var e_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, execa('tsc', ['-p', './tsconfig.json'])];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                console.log(e_1);
                throw e_1;
            case 3: return [2 /*return*/];
        }
    });
}); });
// @ts-ignore
exports.savePackage = useSpinner_1.useSpinner('Updating package.json', function (_a) {
    var path = _a.path, pkg = _a.pkg;
    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_b) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    fs.writeFile(path, JSON.stringify(pkg, null, 2), function (err) {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve();
                    });
                })];
        });
    });
});
var preparePackage = function (pkg) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pkg.bin = {
                    'grafana-toolkit': './bin/grafana-toolkit.dist.js',
                };
                return [4 /*yield*/, exports.savePackage({
                        path: cwd + "/dist/package.json",
                        pkg: pkg,
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var copyFiles = function () {
    var files = [
        'README.md',
        'CHANGELOG.md',
        'bin/grafana-toolkit.dist.js',
        'src/config/prettier.plugin.config.json',
        'src/config/prettier.plugin.rc.js',
        'src/config/tsconfig.plugin.json',
        'src/config/tsconfig.plugin.local.json',
        'src/config/tslint.plugin.json',
        'src/config/styles.mock.js',
        // plugin test file
        'src/plugins/e2e/commonPluginTests.ts',
    ];
    // @ts-ignore
    return useSpinner_1.useSpinner("Moving " + files.join(', ') + " files", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var promises;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    promises = files.map(function (file) {
                        return new Promise(function (resolve, reject) {
                            fs.copyFile(cwd + "/" + file, distDir + "/" + file, function (err) {
                                if (err) {
                                    reject(err);
                                    return;
                                }
                                resolve();
                            });
                        });
                    });
                    return [4 /*yield*/, Promise.all(promises)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); })();
};
var copySassFiles = function () {
    var files = ['_variables.generated.scss', '_variables.dark.generated.scss', '_variables.light.generated.scss'];
    // @ts-ignore
    return useSpinner_1.useSpinner("Copy scss files " + files.join(', ') + " files", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var sassDir, promises;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sassDir = path.resolve(cwd, '../../public/sass/');
                    promises = files.map(function (file) {
                        return new Promise(function (resolve, reject) {
                            var name = file.replace('.generated', '');
                            fs.copyFile(sassDir + "/" + file, distDir + "/sass/" + name, function (err) {
                                if (err) {
                                    reject(err);
                                    return;
                                }
                                resolve();
                            });
                        });
                    });
                    return [4 /*yield*/, Promise.all(promises)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); })();
};
var toolkitBuildTaskRunner = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var pkg;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cwd = path.resolve(__dirname, '../../../');
                distDir = cwd + "/dist";
                pkg = require(cwd + "/package.json");
                console.log(chalk_1.default.yellow("Building " + pkg.name + " (package.json version: " + pkg.version + ")"));
                return [4 /*yield*/, exports.clean()];
            case 1:
                _a.sent();
                return [4 /*yield*/, compile()];
            case 2:
                _a.sent();
                return [4 /*yield*/, preparePackage(pkg)];
            case 3:
                _a.sent();
                fs.mkdirSync('./dist/bin');
                fs.mkdirSync('./dist/sass');
                return [4 /*yield*/, copyFiles()];
            case 4:
                _a.sent();
                return [4 /*yield*/, copySassFiles()];
            case 5:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.toolkitBuildTask = new task_1.Task('@grafana/toolkit build', toolkitBuildTaskRunner);
//# sourceMappingURL=toolkit.build.js.map