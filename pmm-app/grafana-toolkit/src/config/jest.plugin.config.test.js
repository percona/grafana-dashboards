"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jest_plugin_config_1 = require("./jest.plugin.config");
describe('Jest config', function () {
    it('should throw if not supported overrides provided', function () {
        var getConfig = function () { return jest_plugin_config_1.jestConfig(__dirname + "/mocks/jestSetup/unsupportedOverrides"); };
        expect(getConfig).toThrow('Provided Jest config is not supported');
    });
    it("should allow " + jest_plugin_config_1.allowedJestConfigOverrides + " settings overrides", function () {
        var e_1, _a;
        var config = jest_plugin_config_1.jestConfig(__dirname + "/mocks/jestSetup/overrides");
        var configKeys = Object.keys(config);
        try {
            for (var allowedJestConfigOverrides_1 = tslib_1.__values(jest_plugin_config_1.allowedJestConfigOverrides), allowedJestConfigOverrides_1_1 = allowedJestConfigOverrides_1.next(); !allowedJestConfigOverrides_1_1.done; allowedJestConfigOverrides_1_1 = allowedJestConfigOverrides_1.next()) {
                var whitelistedOption = allowedJestConfigOverrides_1_1.value;
                expect(configKeys).toContain(whitelistedOption);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (allowedJestConfigOverrides_1_1 && !allowedJestConfigOverrides_1_1.done && (_a = allowedJestConfigOverrides_1.return)) _a.call(allowedJestConfigOverrides_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
    describe('stylesheets support', function () {
        it('should provide module name mapper for stylesheets by default', function () {
            var config = jest_plugin_config_1.jestConfig(__dirname + "/mocks/jestSetup/noOverrides");
            expect(config.moduleNameMapper).toBeDefined();
            expect(Object.keys(config.moduleNameMapper)).toContain('\\.(css|sass|scss)$');
        });
        it('should preserve mapping for stylesheets when moduleNameMapper overrides provided', function () {
            var config = jest_plugin_config_1.jestConfig(__dirname + "/mocks/jestSetup/overrides");
            expect(config.moduleNameMapper).toBeDefined();
            expect(Object.keys(config.moduleNameMapper)).toHaveLength(2);
            expect(Object.keys(config.moduleNameMapper)).toContain('\\.(css|sass|scss)$');
            expect(Object.keys(config.moduleNameMapper)).toContain('someOverride');
        });
    });
});
//# sourceMappingURL=jest.plugin.config.test.js.map