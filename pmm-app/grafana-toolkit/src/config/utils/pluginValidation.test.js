"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pluginValidation_1 = require("./pluginValidation");
describe('pluginValdation', function () {
    describe('plugin.json', function () {
        test('missing plugin.json file', function () {
            expect(function () { return pluginValidation_1.getPluginJson(__dirname + "/mocks/missing-plugin.json"); }).toThrowError();
        });
    });
    describe('validatePluginJson', function () {
        test('missing plugin.json file', function () {
            expect(function () { return pluginValidation_1.validatePluginJson({}); }).toThrow('Plugin id is missing in plugin.json');
        });
    });
});
//# sourceMappingURL=pluginValidation.test.js.map