"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webpack_plugin_config_1 = require("./webpack.plugin.config");
var fs = require('fs');
jest.mock('fs');
var modulePathsMock = [
    'some/path/module.ts',
    'some/path/module.ts.whatever',
    'some/path/module.tsx',
    'some/path/module.tsx.whatever',
    'some/path/anotherFile.ts',
    'some/path/anotherFile.tsx',
];
describe('Plugin webpack config', function () {
    describe('findModuleTs', function () {
        beforeAll(function () {
            fs.statSync.mockReturnValue({
                isDirectory: function () { return false; },
            });
        });
        it('finds module.ts and module.tsx files', function () {
            var moduleFiles = webpack_plugin_config_1.findModuleFiles('/', modulePathsMock);
            expect(moduleFiles.length).toBe(2);
            expect(moduleFiles).toEqual(['/some/path/module.ts', '/some/path/module.tsx']);
        });
    });
});
//# sourceMappingURL=webpack.plugin.config.test.js.map