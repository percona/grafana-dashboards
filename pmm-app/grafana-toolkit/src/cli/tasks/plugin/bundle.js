"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var webpack = require("webpack");
var formatWebpackMessages = require("react-dev-utils/formatWebpackMessages");
var clearConsole = require("react-dev-utils/clearConsole");
var webpack_plugin_config_1 = require("../../../config/webpack.plugin.config");
// export const bundlePlugin = useSpinner<PluginBundleOptions>('Bundle plugin', ({ watch }) => {
exports.bundlePlugin = function (_a) {
    var watch = _a.watch, production = _a.production;
    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var compiler, webpackPromise;
        return tslib_1.__generator(this, function (_b) {
            compiler = webpack(webpack_plugin_config_1.getWebpackConfig({
                watch: watch,
                production: production,
            }));
            webpackPromise = new Promise(function (resolve, reject) {
                if (watch) {
                    console.log('Started watching plugin for changes...');
                    compiler.watch({}, function (err, stats) { });
                    compiler.hooks.invalid.tap('invalid', function () {
                        clearConsole();
                        console.log('Compiling...');
                    });
                    compiler.hooks.done.tap('done', function (stats) {
                        clearConsole();
                        var json = stats.toJson(); // different @types/webpack between react-dev-utils and grafana-toolkit
                        var output = formatWebpackMessages(json);
                        if (!output.errors.length && !output.warnings.length) {
                            console.log('Compiled successfully!\n');
                            console.log(stats.toString({ colors: true }));
                        }
                        if (output.errors.length) {
                            console.log('Compilation failed!');
                            output.errors.forEach(function (e) { return console.log(e); });
                            if (output.warnings.length) {
                                console.log('Warnings:');
                                output.warnings.forEach(function (w) { return console.log(w); });
                            }
                        }
                        if (output.errors.length === 0 && output.warnings.length) {
                            console.log('Compiled with warnings!');
                            output.warnings.forEach(function (w) { return console.log(w); });
                        }
                    });
                }
                else {
                    compiler.run(function (err, stats) {
                        if (err) {
                            reject(err.message);
                        }
                        if (stats.hasErrors()) {
                            stats.compilation.errors.forEach(function (e) {
                                console.log(e.message);
                            });
                            reject('Build failed');
                        }
                        console.log('\n', stats.toString({ colors: true }), '\n');
                        resolve();
                    });
                }
            });
            return [2 /*return*/, webpackPromise];
        });
    });
};
//# sourceMappingURL=bundle.js.map