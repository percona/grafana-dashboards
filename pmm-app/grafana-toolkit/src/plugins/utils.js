"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var execa_1 = tslib_1.__importDefault(require("execa"));
var path_1 = tslib_1.__importDefault(require("path"));
var fs_1 = tslib_1.__importDefault(require("fs"));
var md5File = require('md5-file');
function getGrafanaVersions() {
    var dir = path_1.default.resolve(process.cwd(), 'node_modules', '@grafana');
    var versions = {};
    try {
        fs_1.default.readdirSync(dir).forEach(function (file) {
            var json = require(path_1.default.resolve(dir, file, 'package.json'));
            versions[file] = json.version;
        });
    }
    catch (err) {
        console.warn('Error reading toolkit versions', err);
    }
    return versions;
}
exports.getGrafanaVersions = getGrafanaVersions;
function getFileSizeReportInFolder(dir, info) {
    var acc = info ? info : {};
    var files = fs_1.default.readdirSync(dir);
    if (files) {
        files.forEach(function (file) {
            var newbase = path_1.default.join(dir, file);
            var stat = fs_1.default.statSync(newbase);
            if (stat.isDirectory()) {
                getFileSizeReportInFolder(newbase, info);
            }
            else {
                var ext = '_none_';
                var idx = file.lastIndexOf('.');
                if (idx > 0) {
                    ext = file.substring(idx + 1).toLowerCase();
                }
                var current = acc[ext];
                if (current) {
                    current.count += 1;
                    current.bytes += stat.size;
                }
                else {
                    acc[ext] = { bytes: stat.size, count: 1 };
                }
            }
        });
    }
    return acc;
}
exports.getFileSizeReportInFolder = getFileSizeReportInFolder;
function getPackageDetails(zipFile, zipSrc, writeChecksum) {
    if (writeChecksum === void 0) { writeChecksum = true; }
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var zipStats, info, exe, idx, sha1, _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    zipStats = fs_1.default.statSync(zipFile);
                    if (zipStats.size < 100) {
                        throw new Error('Invalid zip file: ' + zipFile);
                    }
                    info = {
                        name: path_1.default.basename(zipFile),
                        size: zipStats.size,
                        contents: getFileSizeReportInFolder(zipSrc),
                    };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, execa_1.default('shasum', [zipFile])];
                case 2:
                    exe = _b.sent();
                    idx = exe.stdout.indexOf(' ');
                    sha1 = exe.stdout.substring(0, idx);
                    if (writeChecksum) {
                        fs_1.default.writeFile(zipFile + '.sha1', sha1, function (err) { });
                    }
                    info.sha1 = sha1;
                    return [3 /*break*/, 4];
                case 3:
                    _a = _b.sent();
                    console.warn('Unable to read SHA1 Checksum');
                    return [3 /*break*/, 4];
                case 4:
                    try {
                        info.md5 = md5File.sync(zipFile);
                    }
                    catch (_c) {
                        console.warn('Unable to read MD5 Checksum');
                    }
                    return [2 /*return*/, info];
            }
        });
    });
}
exports.getPackageDetails = getPackageDetails;
function findImagesInFolder(dir, prefix, append) {
    if (prefix === void 0) { prefix = ''; }
    var imgs = append || [];
    var files = fs_1.default.readdirSync(dir);
    if (files) {
        files.forEach(function (file) {
            if (file.endsWith('.png')) {
                imgs.push(file);
            }
        });
    }
    return imgs;
}
exports.findImagesInFolder = findImagesInFolder;
function appendPluginHistory(report, info, history) {
    history.last = {
        info: info,
        report: report,
    };
    if (!history.size) {
        history.size = [];
    }
    console.log('TODO, append build stats to the last one');
}
exports.appendPluginHistory = appendPluginHistory;
//# sourceMappingURL=utils.js.map