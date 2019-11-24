"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var path_1 = tslib_1.__importDefault(require("path"));
var fs_1 = tslib_1.__importDefault(require("fs"));
var constants_1 = require("../../e2e/constants");
var env = null;
function getEndToEndSettings() {
    if (env) {
        return env;
    }
    var f = path_1.default.resolve(process.cwd(), 'ci', 'dist', 'plugin.json');
    if (!fs_1.default.existsSync(f)) {
        f = path_1.default.resolve(process.cwd(), 'dist', 'plugin.json');
        if (!fs_1.default.existsSync(f)) {
            f = path_1.default.resolve(process.cwd(), 'src', 'plugin.json');
        }
    }
    var outputFolder = path_1.default.resolve(process.cwd(), 'e2e-results');
    if (!fs_1.default.existsSync(outputFolder)) {
        fs_1.default.mkdirSync(outputFolder, { recursive: true });
    }
    constants_1.constants.screenShotsTruthDir = path_1.default.resolve(process.cwd(), 'e2e', 'truth');
    constants_1.constants.screenShotsOutputDir = outputFolder;
    return (env = {
        plugin: require(f),
        outputFolder: outputFolder,
    });
}
exports.getEndToEndSettings = getEndToEndSettings;
//# sourceMappingURL=settings.js.map