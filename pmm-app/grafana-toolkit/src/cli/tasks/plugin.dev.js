"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var task_1 = require("./task");
var bundle_1 = require("./plugin/bundle");
var useSpinner_1 = require("../utils/useSpinner");
var plugin_build_1 = require("./plugin.build");
// @ts-ignore
var execa = require("execa");
var path = require("path");
var bundlePlugin = useSpinner_1.useSpinner('Bundling plugin in dev mode', function (options) {
    return bundle_1.bundlePlugin(options);
});
var yarnlink = useSpinner_1.useSpinner('Linking local toolkit', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var e_1, args, packages, _a, _b, _c, key, value;
    var e_2, _d;
    return tslib_1.__generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 2, , 3]);
                // Make sure we are not using package.json defined toolkit
                return [4 /*yield*/, execa('yarn', ['remove', '@grafana/toolkit'])];
            case 1:
                // Make sure we are not using package.json defined toolkit
                _e.sent();
                return [3 /*break*/, 3];
            case 2:
                e_1 = _e.sent();
                console.log('\n', e_1.message, '\n');
                return [3 /*break*/, 3];
            case 3: return [4 /*yield*/, execa('yarn', ['link', '@grafana/toolkit'])];
            case 4:
                _e.sent();
                args = ['add'];
                packages = require(path.resolve(__dirname, '../../../package.json'));
                try {
                    for (_a = tslib_1.__values(Object.entries(packages.dependencies)), _b = _a.next(); !_b.done; _b = _a.next()) {
                        _c = tslib_1.__read(_b.value, 2), key = _c[0], value = _c[1];
                        args.push(key + "@" + value);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                return [4 /*yield*/, execa('yarn', args)];
            case 5:
                _e.sent();
                console.log('Added dependencies required by local @grafana/toolkit.  Do not checkin this package.json!');
                return [2 /*return*/, Promise.resolve()];
        }
    });
}); });
var pluginDevRunner = function (options) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var result;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (options.yarnlink) {
                    return [2 /*return*/, yarnlink()];
                }
                if (!options.watch) return [3 /*break*/, 2];
                return [4 /*yield*/, bundle_1.bundlePlugin(options)];
            case 1:
                _a.sent();
                return [3 /*break*/, 6];
            case 2: 
            // Always fix lint/prettier in dev mode
            return [4 /*yield*/, plugin_build_1.prettierCheckPlugin({ fix: true })];
            case 3:
                // Always fix lint/prettier in dev mode
                _a.sent();
                return [4 /*yield*/, plugin_build_1.lintPlugin({ fix: true })];
            case 4:
                _a.sent();
                return [4 /*yield*/, bundlePlugin(options)];
            case 5:
                result = _a.sent();
                return [2 /*return*/, result];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.pluginDevTask = new task_1.Task('Dev plugin', pluginDevRunner);
//# sourceMappingURL=plugin.dev.js.map