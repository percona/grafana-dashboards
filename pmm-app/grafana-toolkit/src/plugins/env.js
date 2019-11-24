"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var execa_1 = tslib_1.__importDefault(require("execa"));
var path_1 = tslib_1.__importDefault(require("path"));
var fs_1 = tslib_1.__importDefault(require("fs"));
var getJobFromProcessArgv = function () {
    var arg = process.argv[2];
    if (arg && arg.startsWith('plugin:ci-')) {
        var task = arg.substring('plugin:ci-'.length);
        if ('build' === task) {
            if ('--backend' === process.argv[3] && process.argv[4]) {
                return task + '_' + process.argv[4];
            }
            return 'build_plugin';
        }
        return task;
    }
    return 'unknown_job';
};
exports.job = process.env.CIRCLE_JOB || getJobFromProcessArgv();
exports.getPluginBuildInfo = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var info, pr, build, branch, hash;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (process.env.CIRCLE_SHA1) {
                    info = {
                        time: Date.now(),
                        repo: process.env.CIRCLE_REPOSITORY_URL,
                        branch: process.env.CIRCLE_BRANCH,
                        hash: process.env.CIRCLE_SHA1,
                    };
                    pr = exports.getPullRequestNumber();
                    build = exports.getBuildNumber();
                    if (pr) {
                        info.pr = pr;
                    }
                    if (build) {
                        info.number = build;
                    }
                    return [2 /*return*/, Promise.resolve(info)];
                }
                return [4 /*yield*/, execa_1.default('git', ['rev-parse', '--abbrev-ref', 'HEAD'])];
            case 1:
                branch = _a.sent();
                return [4 /*yield*/, execa_1.default('git', ['rev-parse', 'HEAD'])];
            case 2:
                hash = _a.sent();
                return [2 /*return*/, {
                        time: Date.now(),
                        branch: branch.stdout,
                        hash: hash.stdout,
                    }];
        }
    });
}); };
exports.getBuildNumber = function () {
    if (process.env.CIRCLE_BUILD_NUM) {
        return parseInt(process.env.CIRCLE_BUILD_NUM, 10);
    }
    return undefined;
};
exports.getPullRequestNumber = function () {
    if (process.env.CIRCLE_PULL_REQUEST) {
        var url = process.env.CIRCLE_PULL_REQUEST;
        var idx = url.lastIndexOf('/') + 1;
        return parseInt(url.substring(idx), 10);
    }
    return undefined;
};
exports.getJobFolder = function () {
    var dir = path_1.default.resolve(process.cwd(), 'ci', 'jobs', exports.job);
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.mkdirSync(dir, { recursive: true });
    }
    return dir;
};
exports.getCiFolder = function () {
    var dir = path_1.default.resolve(process.cwd(), 'ci');
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.mkdirSync(dir, { recursive: true });
    }
    return dir;
};
exports.writeJobStats = function (startTime, workDir) {
    var endTime = Date.now();
    var stats = {
        job: exports.job,
        startTime: startTime,
        endTime: endTime,
        elapsed: endTime - startTime,
        buildNumber: exports.getBuildNumber(),
    };
    var f = path_1.default.resolve(workDir, 'job.json');
    fs_1.default.writeFile(f, JSON.stringify(stats, null, 2), function (err) {
        if (err) {
            throw new Error('Unable to stats: ' + f);
        }
    });
};
function getCircleDownloadBaseURL() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var axios, buildNumber, repo, user, url, rsp, _a, _b, s, idx, _c;
        var e_1, _d;
        return tslib_1.__generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 2, , 3]);
                    axios = require('axios');
                    buildNumber = exports.getBuildNumber();
                    repo = process.env.CIRCLE_PROJECT_REPONAME;
                    user = process.env.CIRCLE_PROJECT_USERNAME;
                    url = "https://circleci.com/api/v1.1/project/github/" + user + "/" + repo + "/latest/artifacts";
                    return [4 /*yield*/, axios.get(url)];
                case 1:
                    rsp = _e.sent();
                    try {
                        for (_a = tslib_1.__values(rsp.data), _b = _a.next(); !_b.done; _b = _a.next()) {
                            s = _b.value;
                            idx = s.url.indexOf('-');
                            if (idx > 0) {
                                url = s.url.substring(idx);
                                idx = url.indexOf('circleci/plugin/ci');
                                if (idx > 0) {
                                    url = url.substring(0, idx);
                                    url = "https://" + buildNumber + url + "circleci/plugin/ci";
                                    return [2 /*return*/, url];
                                }
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    return [3 /*break*/, 3];
                case 2:
                    _c = _e.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/, undefined];
            }
        });
    });
}
exports.getCircleDownloadBaseURL = getCircleDownloadBaseURL;
//# sourceMappingURL=env.js.map