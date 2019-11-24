"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var task_1 = require("./task");
var plugin_build_1 = require("./plugin.build");
var cwd_1 = require("../utils/cwd");
var aws_1 = require("../../plugins/aws");
var pluginValidation_1 = require("../../config/utils/pluginValidation");
// @ts-ignore
var execa = require("execa");
var path = require("path");
var fs_1 = tslib_1.__importDefault(require("fs"));
var utils_1 = require("../../plugins/utils");
var env_1 = require("../../plugins/env");
var workflow_1 = require("../../plugins/workflow");
var types_1 = require("../../plugins/types");
var launcher_1 = require("../../plugins/e2e/launcher");
var index_1 = require("../../plugins");
/**
 * 1. BUILD
 *
 *  when platform exists it is building backend, otherwise frontend
 *
 *  Each build writes data:
 *   ~/ci/jobs/build_xxx/
 *
 *  Anything that should be put into the final zip file should be put in:
 *   ~/ci/jobs/build_xxx/dist
 */
var buildPluginRunner = function (_a) {
    var backend = _a.backend;
    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var start, workDir, makefile, _b, _c, name_1, dir;
        var e_1, _d;
        return tslib_1.__generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    start = Date.now();
                    workDir = env_1.getJobFolder();
                    return [4 /*yield*/, execa('rimraf', [workDir])];
                case 1:
                    _e.sent();
                    fs_1.default.mkdirSync(workDir);
                    if (!backend) return [3 /*break*/, 2];
                    makefile = path.resolve(process.cwd(), 'Makefile');
                    if (!fs_1.default.existsSync(makefile)) {
                        throw new Error("Missing: " + makefile + ". A Makefile is required for backend plugins.");
                    }
                    // Run plugin-ci task
                    execa('make', ['backend-plugin-ci']).stdout.pipe(process.stdout);
                    return [3 /*break*/, 4];
                case 2: 
                // Do regular build process with coverage
                return [4 /*yield*/, plugin_build_1.pluginBuildRunner({ coverage: true })];
                case 3:
                    // Do regular build process with coverage
                    _e.sent();
                    _e.label = 4;
                case 4:
                    try {
                        // Move local folders to the scoped job folder
                        for (_b = tslib_1.__values(['dist', 'coverage']), _c = _b.next(); !_c.done; _c = _b.next()) {
                            name_1 = _c.value;
                            dir = path.resolve(process.cwd(), name_1);
                            if (fs_1.default.existsSync(dir)) {
                                fs_1.default.renameSync(dir, path.resolve(workDir, name_1));
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_d = _b.return)) _d.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    env_1.writeJobStats(start, workDir);
                    return [2 /*return*/];
            }
        });
    });
};
exports.ciBuildPluginTask = new task_1.Task('Build Plugin', buildPluginRunner);
/**
 * 2. Build Docs
 *
 *  Take /docs/* and format it into /ci/docs/HTML site
 *
 */
var buildPluginDocsRunner = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var docsSrc, start, workDir, docsDest, exe;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                docsSrc = path.resolve(process.cwd(), 'docs');
                if (!fs_1.default.existsSync(docsSrc)) {
                    console.log('No docs src');
                    return [2 /*return*/];
                }
                start = Date.now();
                workDir = env_1.getJobFolder();
                return [4 /*yield*/, execa('rimraf', [workDir])];
            case 1:
                _a.sent();
                fs_1.default.mkdirSync(workDir);
                docsDest = path.resolve(process.cwd(), 'ci', 'docs');
                fs_1.default.mkdirSync(docsDest);
                return [4 /*yield*/, execa('cp', ['-rv', docsSrc + '/.', docsDest])];
            case 2:
                exe = _a.sent();
                console.log(exe.stdout);
                fs_1.default.writeFile(path.resolve(docsDest, 'index.html'), "TODO... actually build docs", function (err) {
                    if (err) {
                        throw new Error('Unable to docs');
                    }
                });
                env_1.writeJobStats(start, workDir);
                return [2 /*return*/];
        }
    });
}); };
exports.ciBuildPluginDocsTask = new task_1.Task('Build Plugin Docs', buildPluginDocsRunner);
/**
 * 2. Package
 *
 *  Take everything from `~/ci/job/{any}/dist` and
 *  1. merge it into: `~/ci/dist`
 *  2. zip it into packages in `~/ci/packages`
 *  3. prepare grafana environment in: `~/ci/grafana-test-env`
 */
var packagePluginRunner = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var start, ciDir, packagesDir, distDir, docsDir, grafanaEnvDir, d, dirs, dirs_1, dirs_1_1, j, contents, er_1, e_2_1, pluginJsonFile, pluginInfo, _a, zipName, zipFile, zipStats, info, _b, p, _c, customIniBody;
    var e_2, _d;
    return tslib_1.__generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                start = Date.now();
                ciDir = env_1.getCiFolder();
                packagesDir = path.resolve(ciDir, 'packages');
                distDir = path.resolve(ciDir, 'dist');
                docsDir = path.resolve(ciDir, 'docs');
                grafanaEnvDir = path.resolve(ciDir, 'grafana-test-env');
                return [4 /*yield*/, execa('rimraf', [packagesDir, distDir, grafanaEnvDir])];
            case 1:
                _e.sent();
                fs_1.default.mkdirSync(packagesDir);
                fs_1.default.mkdirSync(distDir);
                fs_1.default.mkdirSync(grafanaEnvDir);
                console.log('Build Dist Folder');
                d = path.resolve(process.cwd(), 'dist');
                if (!fs_1.default.existsSync(d)) return [3 /*break*/, 3];
                return [4 /*yield*/, execa('cp', ['-rn', d + '/.', distDir])];
            case 2:
                _e.sent();
                _e.label = 3;
            case 3:
                dirs = fs_1.default.readdirSync(path.resolve(ciDir, 'jobs'));
                _e.label = 4;
            case 4:
                _e.trys.push([4, 11, 12, 13]);
                dirs_1 = tslib_1.__values(dirs), dirs_1_1 = dirs_1.next();
                _e.label = 5;
            case 5:
                if (!!dirs_1_1.done) return [3 /*break*/, 10];
                j = dirs_1_1.value;
                contents = path.resolve(ciDir, 'jobs', j, 'dist');
                if (!fs_1.default.existsSync(contents)) return [3 /*break*/, 9];
                _e.label = 6;
            case 6:
                _e.trys.push([6, 8, , 9]);
                return [4 /*yield*/, execa('cp', ['-rn', contents + '/.', distDir])];
            case 7:
                _e.sent();
                return [3 /*break*/, 9];
            case 8:
                er_1 = _e.sent();
                throw new Error('Duplicate files found in dist folders');
            case 9:
                dirs_1_1 = dirs_1.next();
                return [3 /*break*/, 5];
            case 10: return [3 /*break*/, 13];
            case 11:
                e_2_1 = _e.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 13];
            case 12:
                try {
                    if (dirs_1_1 && !dirs_1_1.done && (_d = dirs_1.return)) _d.call(dirs_1);
                }
                finally { if (e_2) throw e_2.error; }
                return [7 /*endfinally*/];
            case 13:
                console.log('Save the source info in plugin.json');
                pluginJsonFile = path.resolve(distDir, 'plugin.json');
                pluginInfo = pluginValidation_1.getPluginJson(pluginJsonFile);
                _a = pluginInfo.info;
                return [4 /*yield*/, env_1.getPluginBuildInfo()];
            case 14:
                _a.build = _e.sent();
                fs_1.default.writeFile(pluginJsonFile, JSON.stringify(pluginInfo, null, 2), function (err) {
                    if (err) {
                        throw new Error('Error writing: ' + pluginJsonFile);
                    }
                });
                console.log('Building ZIP');
                zipName = pluginInfo.id + '-' + pluginInfo.info.version + '.zip';
                zipFile = path.resolve(packagesDir, zipName);
                process.chdir(distDir);
                return [4 /*yield*/, execa('zip', ['-r', zipFile, '.'])];
            case 15:
                _e.sent();
                cwd_1.restoreCwd();
                zipStats = fs_1.default.statSync(zipFile);
                if (zipStats.size < 100) {
                    throw new Error('Invalid zip file: ' + zipFile);
                }
                _b = {};
                return [4 /*yield*/, utils_1.getPackageDetails(zipFile, distDir)];
            case 16:
                info = (_b.plugin = _e.sent(),
                    _b);
                console.log('Setup Grafan Environment');
                p = path.resolve(grafanaEnvDir, 'plugins', pluginInfo.id);
                fs_1.default.mkdirSync(p, { recursive: true });
                return [4 /*yield*/, execa('unzip', [zipFile, '-d', p])];
            case 17:
                _e.sent();
                if (!fs_1.default.existsSync(docsDir)) return [3 /*break*/, 20];
                console.log('Creating documentation zip');
                zipName = pluginInfo.id + '-' + pluginInfo.info.version + '-docs.zip';
                zipFile = path.resolve(packagesDir, zipName);
                process.chdir(docsDir);
                return [4 /*yield*/, execa('zip', ['-r', zipFile, '.'])];
            case 18:
                _e.sent();
                cwd_1.restoreCwd();
                _c = info;
                return [4 /*yield*/, utils_1.getPackageDetails(zipFile, docsDir)];
            case 19:
                _c.docs = _e.sent();
                _e.label = 20;
            case 20:
                p = path.resolve(packagesDir, 'info.json');
                fs_1.default.writeFile(p, JSON.stringify(info, null, 2), function (err) {
                    if (err) {
                        throw new Error('Error writing package info: ' + p);
                    }
                });
                // Write the custom settings
                p = path.resolve(grafanaEnvDir, 'custom.ini');
                customIniBody = "# Autogenerated by @grafana/toolkit \n" +
                    "[paths] \n" +
                    ("plugins = " + path.resolve(grafanaEnvDir, 'plugins') + "\n") +
                    "\n";
                fs_1.default.writeFile(p, customIniBody, function (err) {
                    if (err) {
                        throw new Error('Unable to write: ' + p);
                    }
                });
                env_1.writeJobStats(start, env_1.getJobFolder());
                return [2 /*return*/];
        }
    });
}); };
exports.ciPackagePluginTask = new task_1.Task('Bundle Plugin', packagePluginRunner);
/**
 * 3. Test (end-to-end)
 *
 *  deploy the zip to a running grafana instance
 *
 */
var testPluginRunner = function (_a) {
    var full = _a.full;
    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var start, workDir, results, args, settings, tempDir, axios, frontendSettings, loadedMetaRsp, loadedMeta, currentHash, err_1, f;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    start = Date.now();
                    workDir = env_1.getJobFolder();
                    results = { job: env_1.job, passed: 0, failed: 0, screenshots: [] };
                    args = {
                        withCredentials: true,
                        baseURL: process.env.BASE_URL || 'http://localhost:3000/',
                        responseType: 'json',
                        auth: {
                            username: 'admin',
                            password: 'admin',
                        },
                    };
                    settings = index_1.getEndToEndSettings();
                    return [4 /*yield*/, execa('rimraf', [settings.outputFolder])];
                case 1:
                    _b.sent();
                    fs_1.default.mkdirSync(settings.outputFolder);
                    tempDir = path.resolve(process.cwd(), 'e2e-temp');
                    return [4 /*yield*/, execa('rimraf', [tempDir])];
                case 2:
                    _b.sent();
                    fs_1.default.mkdirSync(tempDir);
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 8, , 9]);
                    axios = require('axios');
                    return [4 /*yield*/, axios.get('api/frontend/settings', args)];
                case 4:
                    frontendSettings = _b.sent();
                    results.grafana = frontendSettings.data.buildInfo;
                    console.log('Grafana: ' + JSON.stringify(results.grafana, null, 2));
                    return [4 /*yield*/, axios.get("api/plugins/" + settings.plugin.id + "/settings", args)];
                case 5:
                    loadedMetaRsp = _b.sent();
                    loadedMeta = loadedMetaRsp.data;
                    console.log('Plugin Info: ' + JSON.stringify(loadedMeta, null, 2));
                    if (loadedMeta.info.build) {
                        currentHash = settings.plugin.info.build.hash;
                        console.log('Check version: ', settings.plugin.info.build);
                        if (loadedMeta.info.build.hash !== currentHash) {
                            console.warn("Testing wrong plugin version.  Expected: " + currentHash + ", found: " + loadedMeta.info.build.hash);
                            throw new Error('Wrong plugin version');
                        }
                    }
                    if (!fs_1.default.existsSync('e2e-temp')) {
                        fs_1.default.mkdirSync(tempDir);
                    }
                    return [4 /*yield*/, execa('cp', [
                            'node_modules/@grafana/toolkit/src/plugins/e2e/commonPluginTests.ts',
                            path.resolve(tempDir, 'common.test.ts'),
                        ])];
                case 6:
                    _b.sent();
                    return [4 /*yield*/, launcher_1.runEndToEndTests(settings.outputFolder, results)];
                case 7:
                    _b.sent();
                    return [3 /*break*/, 9];
                case 8:
                    err_1 = _b.sent();
                    results.error = err_1;
                    console.log('Test Error', err_1);
                    return [3 /*break*/, 9];
                case 9: return [4 /*yield*/, execa('rimraf', [tempDir])];
                case 10:
                    _b.sent();
                    // Now copy everything to work folder
                    return [4 /*yield*/, execa('cp', ['-rv', settings.outputFolder + '/.', workDir])];
                case 11:
                    // Now copy everything to work folder
                    _b.sent();
                    results.screenshots = utils_1.findImagesInFolder(workDir);
                    f = path.resolve(workDir, 'results.json');
                    fs_1.default.writeFile(f, JSON.stringify(results, null, 2), function (err) {
                        if (err) {
                            throw new Error('Error saving: ' + f);
                        }
                    });
                    env_1.writeJobStats(start, workDir);
                    return [2 /*return*/];
            }
        });
    });
};
exports.ciTestPluginTask = new task_1.Task('Test Plugin (e2e)', testPluginRunner);
/**
 * 4. Report
 *
 *  Create a report from all the previous steps
 */
var pluginReportRunner = function (_a) {
    var upload = _a.upload;
    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var ciDir, packageDir, packageInfo, pluginJsonFile, pluginMeta, report, _b, pr, file, s3, build, version, branch, buildNumber, root, dirKey, jobKey, logo, latest, base, historyKey, history, indexKey, index, pluginIndex;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    ciDir = path.resolve(process.cwd(), 'ci');
                    packageDir = path.resolve(ciDir, 'packages');
                    packageInfo = require(path.resolve(packageDir, 'info.json'));
                    pluginJsonFile = path.resolve(ciDir, 'dist', 'plugin.json');
                    console.log('Load info from: ' + pluginJsonFile);
                    pluginMeta = pluginValidation_1.getPluginJson(pluginJsonFile);
                    _b = {
                        plugin: pluginMeta,
                        packages: packageInfo,
                        workflow: workflow_1.agregateWorkflowInfo(),
                        coverage: workflow_1.agregateCoverageInfo(),
                        tests: workflow_1.agregateTestInfo()
                    };
                    return [4 /*yield*/, env_1.getCircleDownloadBaseURL()];
                case 1:
                    report = (_b.artifactsBaseURL = _c.sent(),
                        _b.grafanaVersion = utils_1.getGrafanaVersions(),
                        _b);
                    pr = env_1.getPullRequestNumber();
                    if (pr) {
                        report.pullRequest = pr;
                    }
                    file = path.resolve(ciDir, 'report.json');
                    fs_1.default.writeFile(file, JSON.stringify(report, null, 2), function (err) {
                        if (err) {
                            throw new Error('Unable to write: ' + file);
                        }
                    });
                    console.log('Initalizing S3 Client');
                    s3 = new aws_1.S3Client();
                    build = pluginMeta.info.build;
                    if (!build) {
                        throw new Error('Metadata missing build info');
                    }
                    version = pluginMeta.info.version || 'unknown';
                    branch = build.branch || 'unknown';
                    buildNumber = env_1.getBuildNumber();
                    root = "dev/" + pluginMeta.id;
                    dirKey = pr ? root + "/pr/" + pr + "/" + buildNumber : root + "/branch/" + branch + "/" + buildNumber;
                    jobKey = dirKey + "/index.json";
                    return [4 /*yield*/, s3.exists(jobKey)];
                case 2:
                    if (_c.sent()) {
                        throw new Error('Job already registered: ' + jobKey);
                    }
                    console.log('Write Job', jobKey);
                    return [4 /*yield*/, s3.writeJSON(jobKey, report, {
                            Tagging: "version=" + version + "&type=" + pluginMeta.type,
                        })];
                case 3:
                    _c.sent();
                    return [4 /*yield*/, s3.uploadLogo(report.plugin.info, {
                            local: path.resolve(ciDir, 'dist'),
                            remote: root,
                        })];
                case 4:
                    logo = _c.sent();
                    latest = {
                        pluginId: pluginMeta.id,
                        name: pluginMeta.name,
                        logo: logo,
                        build: pluginMeta.info.build,
                        version: version,
                    };
                    base = root + "/branch/" + branch + "/";
                    latest.build.number = buildNumber;
                    if (pr) {
                        latest.build.pr = pr;
                        base = root + "/pr/" + pr + "/";
                    }
                    historyKey = base + "history.json";
                    console.log('Read', historyKey);
                    return [4 /*yield*/, s3.readJSON(historyKey, types_1.defaultPluginHistory)];
                case 5:
                    history = _c.sent();
                    utils_1.appendPluginHistory(report, latest, history);
                    return [4 /*yield*/, s3.writeJSON(historyKey, history)];
                case 6:
                    _c.sent();
                    console.log('wrote history');
                    // Private things may want to upload
                    if (upload) {
                        s3.uploadPackages(packageInfo, {
                            local: packageDir,
                            remote: dirKey + '/packages',
                        });
                        s3.uploadTestFiles(report.tests, {
                            local: ciDir,
                            remote: dirKey,
                        });
                    }
                    console.log('Update Directory Indexes');
                    indexKey = root + "/index.json";
                    return [4 /*yield*/, s3.readJSON(indexKey, { branch: {}, pr: {} })];
                case 7:
                    index = _c.sent();
                    if (pr) {
                        index.pr[pr] = latest;
                    }
                    else {
                        index.branch[branch] = latest;
                    }
                    return [4 /*yield*/, s3.writeJSON(indexKey, index)];
                case 8:
                    _c.sent();
                    indexKey = "dev/index.json";
                    return [4 /*yield*/, s3.readJSON(indexKey, {})];
                case 9:
                    pluginIndex = _c.sent();
                    pluginIndex[pluginMeta.id] = latest;
                    return [4 /*yield*/, s3.writeJSON(indexKey, pluginIndex)];
                case 10:
                    _c.sent();
                    console.log('wrote index');
                    return [2 /*return*/];
            }
        });
    });
};
exports.ciPluginReportTask = new task_1.Task('Generate Plugin Report', pluginReportRunner);
//# sourceMappingURL=plugin.ci.js.map
