"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jestCLI = tslib_1.__importStar(require("jest-cli"));
var useSpinner_1 = require("../../utils/useSpinner");
var jest_plugin_config_1 = require("../../../config/jest.plugin.config");
exports.testPlugin = useSpinner_1.useSpinner('Running tests', function (_a) {
    var updateSnapshot = _a.updateSnapshot, coverage = _a.coverage, watch = _a.watch, testPathPattern = _a.testPathPattern, testNamePattern = _a.testNamePattern;
    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var testConfig, cliConfig, runJest, results;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    testConfig = jest_plugin_config_1.jestConfig();
                    cliConfig = {
                        config: JSON.stringify(testConfig),
                        updateSnapshot: updateSnapshot,
                        coverage: coverage,
                        watch: watch,
                        testPathPattern: testPathPattern ? [testPathPattern] : [],
                        testNamePattern: testNamePattern ? [testNamePattern] : [],
                        passWithNoTests: true,
                    };
                    runJest = function () { return jestCLI.runCLI(cliConfig, [process.cwd()]); };
                    if (!watch) return [3 /*break*/, 1];
                    runJest();
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, runJest()];
                case 2:
                    results = _b.sent();
                    if (results.results.numFailedTests > 0 || results.results.numFailedTestSuites > 0) {
                        throw new Error('Tests failed');
                    }
                    _b.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
});
//# sourceMappingURL=tests.js.map