"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jestCLI = tslib_1.__importStar(require("jest-cli"));
var fs_1 = tslib_1.__importDefault(require("fs"));
function runEndToEndTests(outputDirectory, results) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var setupPath, ext, jestConfig, cliConfig, runJest, jestOutput;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setupPath = 'node_modules/@grafana/toolkit/src/e2e/install';
                    ext = '.js';
                    if (!fs_1.default.existsSync(setupPath + ext)) {
                        ext = '.ts'; // When running yarn link
                    }
                    jestConfig = {
                        preset: 'ts-jest',
                        verbose: false,
                        moduleDirectories: ['node_modules'],
                        moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
                        setupFiles: [],
                        setupFilesAfterEnv: [
                            'expect-puppeteer',
                            '<rootDir>/' + setupPath + ext,
                        ],
                        globals: { 'ts-jest': { isolatedModules: true } },
                        testMatch: [
                            '<rootDir>/e2e-temp/**/*.test.ts',
                            '<rootDir>/e2e/test/**/*.test.ts',
                        ],
                        reporters: [
                            'default',
                            ['jest-junit', { outputDirectory: outputDirectory }],
                        ],
                    };
                    cliConfig = {
                        config: JSON.stringify(jestConfig),
                        passWithNoTests: true,
                    };
                    runJest = function () { return jestCLI.runCLI(cliConfig, [process.cwd()]); };
                    return [4 /*yield*/, runJest()];
                case 1:
                    jestOutput = _a.sent();
                    results.passed = jestOutput.results.numPassedTests;
                    results.failed = jestOutput.results.numFailedTestSuites;
                    return [2 /*return*/];
            }
        });
    });
}
exports.runEndToEndTests = runEndToEndTests;
//# sourceMappingURL=launcher.js.map