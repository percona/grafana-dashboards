"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var execa = require("execa");
// @ts-ignore
var fs = tslib_1.__importStar(require("fs"));
// @ts-ignore
var path = tslib_1.__importStar(require("path"));
var chalk_1 = tslib_1.__importDefault(require("chalk"));
var useSpinner_1 = require("../utils/useSpinner");
var task_1 = require("./task");
var distDir, cwd;
// @ts-ignore
exports.clean = useSpinner_1.useSpinner('Cleaning', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, execa('npm', ['run', 'clean'])];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); });
// @ts-ignore
var compile = useSpinner_1.useSpinner('Compiling sources', function () { return execa('tsc', ['-p', './tsconfig.build.json']); });
// @ts-ignore
var rollup = useSpinner_1.useSpinner('Bundling', function () { return execa('npm', ['run', 'bundle']); });
// @ts-ignore
exports.savePackage = useSpinner_1.useSpinner('Updating package.json', 
// @ts-ignore
function (_a) {
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
    var version, name, deps;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pkg.main = 'index.js';
                pkg.types = 'index.d.ts';
                version = pkg.version;
                name = pkg.name;
                deps = pkg.dependencies;
                // Below we are adding cross-dependencies to Grafana's packages
                // with the version being published
                if (name.endsWith('/ui')) {
                    deps['@grafana/data'] = version;
                }
                else if (name.endsWith('/runtime')) {
                    deps['@grafana/data'] = version;
                    deps['@grafana/ui'] = version;
                }
                else if (name.endsWith('/toolkit')) {
                    deps['@grafana/data'] = version;
                    deps['@grafana/ui'] = version;
                }
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
var moveFiles = function () {
    var files = ['README.md', 'CHANGELOG.md', 'index.js'];
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
var buildTaskRunner = function (_a) {
    var scope = _a.scope;
    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var scopes;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!scope) {
                        throw new Error('Provide packages with -s, --scope <packages>');
                    }
                    scopes = scope.split(',').map(function (s) {
                        return function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var pkg;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        cwd = path.resolve(__dirname, "../../../../grafana-" + s);
                                        // Lerna executes this in package's dir context, but for testing purposes I want to be able to run from root:
                                        // grafana-toolkit package:build --scope=<package>
                                        process.chdir(cwd);
                                        distDir = cwd + "/dist";
                                        pkg = require(cwd + "/package.json");
                                        console.log(chalk_1.default.yellow("Building " + pkg.name + " (package.json version: " + pkg.version + ")"));
                                        return [4 /*yield*/, exports.clean()];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, compile()];
                                    case 2:
                                        _a.sent();
                                        return [4 /*yield*/, rollup()];
                                    case 3:
                                        _a.sent();
                                        return [4 /*yield*/, preparePackage(pkg)];
                                    case 4:
                                        _a.sent();
                                        return [4 /*yield*/, moveFiles()];
                                    case 5:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); };
                    });
                    return [4 /*yield*/, Promise.all(scopes.map(function (s) { return s(); }))];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
};
exports.buildPackageTask = new task_1.Task('Package build', buildTaskRunner);
//# sourceMappingURL=package.build.js.map