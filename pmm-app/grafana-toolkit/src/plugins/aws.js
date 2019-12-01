"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var aws_sdk_1 = tslib_1.__importDefault(require("aws-sdk"));
var path_1 = tslib_1.__importDefault(require("path"));
var fs_1 = tslib_1.__importDefault(require("fs"));
var defaults_1 = tslib_1.__importDefault(require("lodash/defaults"));
var clone_1 = tslib_1.__importDefault(require("lodash/clone"));
var S3Client = /** @class */ (function () {
    function S3Client(bucket) {
        var _this = this;
        this.bucket = bucket || 'grafana-experiments';
        this.prefix = 'plugins/';
        this.s3 = new aws_sdk_1.default.S3({ apiVersion: '2006-03-01' });
        this.s3.headBucket({ Bucket: this.bucket }, function (err, data) {
            if (err) {
                throw new Error('Unable to read: ' + _this.bucket);
            }
            else {
                console.log('s3: ' + data);
            }
        });
    }
    S3Client.prototype.uploadPackage = function (file, folder) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var fpath;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fpath = path_1.default.resolve(process.cwd(), folder.local, file.name);
                        return [4 /*yield*/, this.uploadFile(fpath, folder.remote + '/' + file.name, file.md5)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    S3Client.prototype.uploadPackages = function (packageInfo, folder) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.uploadPackage(packageInfo.plugin, folder)];
                    case 1:
                        _a.sent();
                        if (!packageInfo.docs) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.uploadPackage(packageInfo.docs, folder)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    S3Client.prototype.uploadTestFiles = function (tests, folder) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var tests_1, tests_1_1, test_1, _a, _b, s, img, e_1_1, e_2_1;
            var e_2, _c, e_1, _d;
            return tslib_1.__generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 11, 12, 13]);
                        tests_1 = tslib_1.__values(tests), tests_1_1 = tests_1.next();
                        _e.label = 1;
                    case 1:
                        if (!!tests_1_1.done) return [3 /*break*/, 10];
                        test_1 = tests_1_1.value;
                        _e.label = 2;
                    case 2:
                        _e.trys.push([2, 7, 8, 9]);
                        _a = (e_1 = void 0, tslib_1.__values(test_1.screenshots)), _b = _a.next();
                        _e.label = 3;
                    case 3:
                        if (!!_b.done) return [3 /*break*/, 6];
                        s = _b.value;
                        img = path_1.default.resolve(folder.local, 'jobs', test_1.job, s);
                        return [4 /*yield*/, this.uploadFile(img, folder.remote + ("/jobs/" + test_1.job + "/" + s))];
                    case 4:
                        _e.sent();
                        _e.label = 5;
                    case 5:
                        _b = _a.next();
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_1_1 = _e.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 9:
                        tests_1_1 = tests_1.next();
                        return [3 /*break*/, 1];
                    case 10: return [3 /*break*/, 13];
                    case 11:
                        e_2_1 = _e.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 13];
                    case 12:
                        try {
                            if (tests_1_1 && !tests_1_1.done && (_c = tests_1.return)) _c.call(tests_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    S3Client.prototype.uploadLogo = function (meta, folder) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var logos, img, idx, name_1, key;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logos = meta.logos;
                        if (!(logos && logos.large)) return [3 /*break*/, 2];
                        img = folder.local + '/' + logos.large;
                        idx = img.lastIndexOf('.');
                        name_1 = 'logo' + img.substring(idx);
                        key = folder.remote + '/' + name_1;
                        return [4 /*yield*/, this.uploadFile(img, key)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, name_1];
                    case 2: return [2 /*return*/, undefined];
                }
            });
        });
    };
    S3Client.prototype.uploadFile = function (fpath, path, md5) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var stream;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                if (!fs_1.default.existsSync(fpath)) {
                    return [2 /*return*/, Promise.reject('File not found: ' + fpath)];
                }
                console.log('Uploading: ' + fpath);
                stream = fs_1.default.createReadStream(fpath);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.s3.putObject({
                            Key: _this.prefix + path,
                            Bucket: _this.bucket,
                            Body: stream,
                            ContentType: getContentTypeForFile(path),
                        }, function (err, data) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                if (md5 && md5 !== data.ETag && "\"" + md5 + "\"" !== data.ETag) {
                                    reject("Upload ETag does not match MD5 (" + md5 + " !== " + data.ETag + ")");
                                }
                                else {
                                    resolve(data.ETag);
                                }
                            }
                        });
                    })];
            });
        });
    };
    S3Client.prototype.exists = function (key) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.s3.getObject({
                            Bucket: _this.bucket,
                            Key: _this.prefix + key,
                        }, function (err, data) {
                            if (err) {
                                resolve(false);
                            }
                            else {
                                resolve(true);
                            }
                        });
                    })];
            });
        });
    };
    S3Client.prototype.readJSON = function (key, defaultValue) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.s3.getObject({
                            Bucket: _this.bucket,
                            Key: _this.prefix + key,
                        }, function (err, data) {
                            if (err) {
                                resolve(clone_1.default(defaultValue));
                            }
                            else {
                                try {
                                    var v = JSON.parse(data.Body);
                                    resolve(defaults_1.default(v, defaultValue));
                                }
                                catch (e) {
                                    console.log('ERROR', e);
                                    reject('Error reading response');
                                }
                            }
                        });
                    })];
            });
        });
    };
    S3Client.prototype.writeJSON = function (key, obj, params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.s3.putObject(tslib_1.__assign(tslib_1.__assign({}, params), { Key: _this.prefix + key, Bucket: _this.bucket, Body: JSON.stringify(obj, null, 2), ContentType: 'application/json' }), function (err, data) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(data);
                            }
                        });
                    })];
            });
        });
    };
    return S3Client;
}());
exports.S3Client = S3Client;
function getContentTypeForFile(name) {
    var idx = name.lastIndexOf('.');
    if (idx > 0) {
        var ext = name.substring(idx + 1).toLowerCase();
        if (ext === 'zip') {
            return 'application/zip';
        }
        if (ext === 'json') {
            return 'application/json';
        }
        if (ext === 'svg') {
            return 'image/svg+xml';
        }
        if (ext === 'png') {
            return 'image/png';
        }
    }
    return undefined;
}
//# sourceMappingURL=aws.js.map