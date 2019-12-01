"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cwd = process.cwd();
exports.changeCwdToGrafanaUi = function () {
    process.chdir(cwd + "/packages/grafana-ui");
    return process.cwd();
};
exports.changeCwdToGrafanaToolkit = function () {
    process.chdir(cwd + "/packages/grafana-toolkit");
    return process.cwd();
};
exports.changeCwdToGrafanaUiDist = function () {
    process.chdir(cwd + "/packages/grafana-ui/dist");
};
exports.restoreCwd = function () {
    process.chdir(cwd);
};
exports.changeCwdToPackage = function (scope) {
    try {
        process.chdir(cwd + "/packages/grafana-" + scope);
    }
    catch (e) {
        throw e;
    }
    return process.cwd();
};
//# sourceMappingURL=cwd.js.map