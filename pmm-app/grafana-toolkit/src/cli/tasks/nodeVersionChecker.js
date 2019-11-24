"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var task_1 = require("./task");
var chalk_1 = tslib_1.__importDefault(require("chalk"));
var semver_1 = require("semver");
var fs_1 = require("fs");
var pattern = /(circleci\/|FROM )node\:([0-9]+(\.[0-9]+){0,2})/gm;
var packageJsonFile = 'package.json';
var failures = [];
exports.nodeVersionFiles = [packageJsonFile, 'Dockerfile', '.circleci/config.yml'];
var nodeVersionCheckerRunner = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var packageJson, expectedVersion, nodeVersionFiles_1, nodeVersionFiles_1_1, file, fileContent, matches, matches_1, matches_1_1, match, actualVersion, satisfied, index, failure;
    var e_1, _a, e_2, _b;
    return tslib_1.__generator(this, function (_c) {
        packageJson = require(process.cwd() + "/" + packageJsonFile);
        expectedVersion = packageJson.engines.node;
        console.log(chalk_1.default.yellow("Specified node version in package.json is: " + expectedVersion));
        try {
            for (nodeVersionFiles_1 = tslib_1.__values(exports.nodeVersionFiles), nodeVersionFiles_1_1 = nodeVersionFiles_1.next(); !nodeVersionFiles_1_1.done; nodeVersionFiles_1_1 = nodeVersionFiles_1.next()) {
                file = nodeVersionFiles_1_1.value;
                fileContent = fs_1.readFileSync(process.cwd() + "/" + file);
                matches = fileContent.toString('utf8').match(pattern);
                if (!matches) {
                    continue;
                }
                try {
                    for (matches_1 = (e_2 = void 0, tslib_1.__values(matches)), matches_1_1 = matches_1.next(); !matches_1_1.done; matches_1_1 = matches_1.next()) {
                        match = matches_1_1.value;
                        actualVersion = semver_1.coerce(match);
                        if (!actualVersion) {
                            failures.push({
                                file: file,
                                line: match,
                            });
                            continue;
                        }
                        satisfied = semver_1.satisfies(actualVersion, expectedVersion);
                        if (!satisfied) {
                            failures.push({
                                file: file,
                                line: match,
                            });
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (matches_1_1 && !matches_1_1.done && (_b = matches_1.return)) _b.call(matches_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (nodeVersionFiles_1_1 && !nodeVersionFiles_1_1.done && (_a = nodeVersionFiles_1.return)) _a.call(nodeVersionFiles_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (failures.length > 0) {
            console.log(chalk_1.default.red('--------------------------------------------------------------------'));
            console.log(chalk_1.default.red("These entries don't satisfy the engine version in " + packageJsonFile));
            console.log(chalk_1.default.red('--------------------------------------------------------------------'));
            for (index = 0; index < failures.length; index++) {
                failure = failures[index];
                console.log(chalk_1.default.green("\tIn " + failure.file + " the line " + failure.line + " does not satisfy " + expectedVersion + "."));
            }
            throw new Error('Node versions not in sync');
        }
        console.log(chalk_1.default.yellow('--------------------------------------------------------------------'));
        console.log(chalk_1.default.yellow('All node versions seem ok.'));
        console.log(chalk_1.default.yellow("Don't forget to sync https://github.com/grafana/grafana-build-container"));
        console.log(chalk_1.default.yellow("also if you changed the engine version in " + packageJsonFile));
        console.log(chalk_1.default.yellow('--------------------------------------------------------------------'));
        return [2 /*return*/];
    });
}); };
exports.nodeVersionCheckerTask = new task_1.Task('Node Version Checker', nodeVersionCheckerRunner);
//# sourceMappingURL=nodeVersionChecker.js.map