"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var loaders_1 = require("./loaders");
describe('Loaders', function () {
    describe('stylesheet helpers', function () {
        var logSpy = jest.spyOn(console, 'log').mockImplementation();
        afterAll(function () {
            logSpy.mockRestore();
            logSpy.mockRestore();
        });
        describe('getStylesheetEntries', function () {
            it('returns entries for dark and light theme', function () {
                var result = loaders_1.getStylesheetEntries(__dirname + "/../mocks/stylesheetsSupport/ok");
                expect(Object.keys(result)).toHaveLength(2);
            });
            it('throws on theme files duplicates', function () {
                var result = function () {
                    loaders_1.getStylesheetEntries(__dirname + "/../mocks/stylesheetsSupport/duplicates");
                };
                expect(result).toThrow();
            });
        });
        describe('hasThemeStylesheets', function () {
            it('throws when only one theme file is defined', function () {
                var result = function () {
                    loaders_1.hasThemeStylesheets(__dirname + "/../mocks/stylesheetsSupport/missing-theme-file");
                };
                expect(result).toThrow();
            });
            it('returns false when no theme files present', function () {
                var result = loaders_1.hasThemeStylesheets(__dirname + "/../mocks/stylesheetsSupport/no-theme-files");
                expect(result).toBeFalsy();
            });
            it('returns true when theme files present', function () {
                var result = loaders_1.hasThemeStylesheets(__dirname + "/../mocks/stylesheetsSupport/ok");
                expect(result).toBeTruthy();
            });
        });
    });
});
//# sourceMappingURL=loaders.test.js.map