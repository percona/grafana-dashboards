"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var path = require("path");
var fs_1 = tslib_1.__importDefault(require("fs"));
exports.allowedJestConfigOverrides = ['snapshotSerializers', 'moduleNameMapper'];
exports.jestConfig = function (baseDir) {
    if (baseDir === void 0) { baseDir = process.cwd(); }
    var jestConfigOverrides = (require(path.resolve(baseDir, 'package.json')).jest || {});
    var deniedOverrides = jestConfigOverrides
        ? Object.keys(jestConfigOverrides).filter(function (override) { return exports.allowedJestConfigOverrides.indexOf(override) === -1; })
        : [];
    if (deniedOverrides.length > 0) {
        console.error("\ngrafana-toolkit doesn't support following Jest options: ", deniedOverrides);
        console.log('Supported Jest options are: ', JSON.stringify(exports.allowedJestConfigOverrides));
        throw new Error('Provided Jest config is not supported');
    }
    var shimsFilePath = path.resolve(baseDir, 'config/jest-shim.ts');
    var setupFilePath = path.resolve(baseDir, 'config/jest-setup.ts');
    // Mock css imports for tests. Otherwise Jest will have troubles understanding SASS/CSS imports
    var moduleNameMapper = jestConfigOverrides.moduleNameMapper, otherOverrides = tslib_1.__rest(jestConfigOverrides, ["moduleNameMapper"]);
    var moduleNameMapperConfig = tslib_1.__assign({ '\\.(css|sass|scss)$': __dirname + "/styles.mock.js" }, moduleNameMapper);
    var setupFile = fs_1.default.existsSync(setupFilePath) ? setupFilePath : undefined;
    var shimsFile = fs_1.default.existsSync(shimsFilePath) ? shimsFilePath : undefined;
    var setupFiles = [setupFile, shimsFile].filter(function (f) { return f; });
    var defaultJestConfig = {
        preset: 'ts-jest',
        verbose: false,
        moduleDirectories: ['node_modules', 'src'],
        moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
        setupFiles: setupFiles,
        globals: { 'ts-jest': { isolatedModules: true } },
        coverageReporters: ['json-summary', 'text', 'lcov'],
        collectCoverageFrom: ['src/**/*.{ts,tsx}', '!**/node_modules/**', '!**/vendor/**'],
        testMatch: [
            '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
            '<rootDir>/src/**/*.{spec,test,jest}.{js,jsx,ts,tsx}',
        ],
        transformIgnorePatterns: [
            '[/\\\\\\\\]node_modules[/\\\\\\\\].+\\\\.(js|jsx|ts|tsx)$',
            '^.+\\\\.module\\\\.(css|sass|scss)$',
        ],
        moduleNameMapper: moduleNameMapperConfig,
    };
    return tslib_1.__assign(tslib_1.__assign({}, defaultJestConfig), otherOverrides);
};
//# sourceMappingURL=jest.plugin.config.js.map