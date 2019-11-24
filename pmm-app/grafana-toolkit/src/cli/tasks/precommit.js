"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var task_1 = require("./task");
var chalk_1 = tslib_1.__importDefault(require("chalk"));
var execa = require("execa");
var nodeVersionChecker_1 = require("./nodeVersionChecker");
var execTask_1 = require("../utils/execTask");
var simpleGit = require('simple-git/promise')(process.cwd());
var precommitRunner = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var status, sassFiles, testFiles, goTestFiles, affectedNodeVersionFiles, gruntTasks, task, stream;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, simpleGit.status()];
            case 1:
                status = _a.sent();
                sassFiles = status.files.filter(function (file) { return file.path.match(/^[a-zA-Z0-9\_\-\/]+(\.scss)$/g) || file.path.indexOf('.sass-lint.yml') > -1; });
                testFiles = status.files.filter(function (file) { return file.path.match(/^[a-zA-Z0-9\_\-\/]+(\.test.(ts|tsx))$/g); });
                goTestFiles = status.files.filter(function (file) { return file.path.match(/^[a-zA-Z0-9\_\-\/]+(\_test.go)$/g); });
                affectedNodeVersionFiles = status.files
                    .filter(function (file) { return nodeVersionChecker_1.nodeVersionFiles.indexOf(file.path) !== -1; })
                    .map(function (f) { return f.path; });
                gruntTasks = [];
                if (!(affectedNodeVersionFiles.length > 0)) return [3 /*break*/, 3];
                return [4 /*yield*/, execTask_1.execTask(nodeVersionChecker_1.nodeVersionCheckerTask)({})];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                if (sassFiles.length > 0) {
                    gruntTasks.push('sasslint');
                }
                if (testFiles.length) {
                    gruntTasks.push('no-only-tests');
                }
                if (goTestFiles.length) {
                    gruntTasks.push('no-focus-convey-tests');
                }
                if (gruntTasks.length > 0) {
                    console.log(chalk_1.default.yellow("Precommit checks: " + gruntTasks.join(', ')));
                    task = execa('grunt', gruntTasks);
                    stream = task.stdout;
                    if (stream) {
                        stream.pipe(process.stdout);
                    }
                    return [2 /*return*/, task];
                }
                console.log(chalk_1.default.yellow('Skipping precommit checks, not front-end changes detected'));
                return [2 /*return*/];
        }
    });
}); };
exports.precommitTask = new task_1.Task('Precommit task', precommitRunner);
//# sourceMappingURL=precommit.js.map