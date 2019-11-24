"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var path_1 = tslib_1.__importDefault(require("path"));
var fs_1 = tslib_1.__importDefault(require("fs"));
var env_1 = require("./env");
exports.agregateWorkflowInfo = function () {
    var now = Date.now();
    var workflow = {
        jobs: [],
        startTime: now,
        endTime: now,
        workflowId: process.env.CIRCLE_WORKFLOW_ID,
        repo: process.env.CIRCLE_PROJECT_REPONAME,
        user: process.env.CIRCLE_PROJECT_USERNAME,
        buildNumber: env_1.getBuildNumber(),
        elapsed: 0,
    };
    var jobsFolder = path_1.default.resolve(env_1.getCiFolder(), 'jobs');
    if (fs_1.default.existsSync(jobsFolder)) {
        var files = fs_1.default.readdirSync(jobsFolder);
        if (files && files.length) {
            files.forEach(function (file) {
                var p = path_1.default.resolve(jobsFolder, file, 'job.json');
                if (fs_1.default.existsSync(p)) {
                    var job = require(p);
                    workflow.jobs.push(job);
                    if (job.startTime < workflow.startTime) {
                        workflow.startTime = job.startTime;
                    }
                    if (job.endTime > workflow.endTime) {
                        workflow.endTime = job.endTime;
                    }
                }
                else {
                    console.log('Missing Job info: ', p);
                }
            });
        }
        else {
            console.log('NO JOBS IN: ', jobsFolder);
        }
    }
    workflow.elapsed = workflow.endTime - workflow.startTime;
    return workflow;
};
exports.agregateCoverageInfo = function () {
    var coverage = [];
    var ciDir = env_1.getCiFolder();
    var jobsFolder = path_1.default.resolve(ciDir, 'jobs');
    if (fs_1.default.existsSync(jobsFolder)) {
        var files = fs_1.default.readdirSync(jobsFolder);
        if (files && files.length) {
            files.forEach(function (file) {
                var dir = path_1.default.resolve(jobsFolder, file, 'coverage');
                if (fs_1.default.existsSync(dir)) {
                    var s = path_1.default.resolve(dir, 'coverage-summary.json');
                    var r = path_1.default.resolve(dir, 'lcov-report', 'index.html');
                    if (fs_1.default.existsSync(s)) {
                        var raw = require(s);
                        var info = {
                            job: file,
                            summary: raw.total,
                        };
                        if (fs_1.default.existsSync(r)) {
                            info.report = r.substring(ciDir.length);
                        }
                        coverage.push(info);
                    }
                }
            });
        }
        else {
            console.log('NO JOBS IN: ', jobsFolder);
        }
    }
    return coverage;
};
exports.agregateTestInfo = function () {
    var tests = [];
    var ciDir = env_1.getCiFolder();
    var jobsFolder = path_1.default.resolve(ciDir, 'jobs');
    if (fs_1.default.existsSync(jobsFolder)) {
        var files = fs_1.default.readdirSync(jobsFolder);
        if (files && files.length) {
            files.forEach(function (file) {
                if (file.startsWith('test')) {
                    var summary = path_1.default.resolve(jobsFolder, file, 'results.json');
                    if (fs_1.default.existsSync(summary)) {
                        tests.push(require(summary));
                    }
                }
            });
        }
        else {
            console.log('NO Jobs IN: ', jobsFolder);
        }
    }
    return tests;
};
//# sourceMappingURL=workflow.js.map