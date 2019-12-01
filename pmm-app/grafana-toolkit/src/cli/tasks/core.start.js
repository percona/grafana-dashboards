"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
//@ts-ignore
var concurrently_1 = tslib_1.__importDefault(require("concurrently"));
var task_1 = require("./task");
var startTaskRunner = function (_a) {
    var watchThemes = _a.watchThemes, noTsCheck = _a.noTsCheck, hot = _a.hot;
    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var noTsCheckArg, jobs, e_1;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    noTsCheckArg = noTsCheck ? 1 : 0;
                    jobs = [
                        watchThemes && {
                            command: 'nodemon -e ts -w ./packages/grafana-ui/src/themes -x yarn run themes:generate',
                            name: 'SASS variables generator',
                        },
                        hot
                            ? {
                                command: 'webpack-dev-server --progress --colors --config scripts/webpack/webpack.hot.js',
                                name: 'Dev server',
                            }
                            : {
                                command: "webpack --progress --colors --watch --env.noTsCheck=" + noTsCheckArg + " --config scripts/webpack/webpack.dev.js",
                                name: 'Webpack',
                            },
                    ];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, concurrently_1.default(jobs.filter(function (job) { return !!job; }), {
                            killOthers: ['failure', 'failure'],
                        })];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _b.sent();
                    console.error(e_1);
                    process.exit(1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.startTask = new task_1.Task('Core startTask', startTaskRunner);
//# sourceMappingURL=core.start.js.map