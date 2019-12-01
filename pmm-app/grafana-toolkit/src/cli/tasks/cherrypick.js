"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var task_1 = require("./task");
var githubClient_1 = tslib_1.__importDefault(require("../utils/githubClient"));
var cherryPickRunner = function (_a) {
    var enterprise = _a.enterprise;
    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var githubClient, client, res, commands, _b, _c, item, issueDetails, e_1_1;
        var e_1, _d;
        return tslib_1.__generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    githubClient = new githubClient_1.default({ enterprise: enterprise });
                    client = githubClient.client;
                    return [4 /*yield*/, client.get('/issues', {
                            params: {
                                state: 'closed',
                                per_page: 100,
                                labels: 'cherry-pick needed',
                                sort: 'closed',
                                direction: 'asc',
                            },
                        })];
                case 1:
                    res = _e.sent();
                    // sort by closed date ASC
                    res.data.sort(function (a, b) {
                        return new Date(a.closed_at).getTime() - new Date(b.closed_at).getTime();
                    });
                    commands = '';
                    console.log('--------------------------------------------------------------------');
                    console.log('Printing PRs with cherry-pick-needed, in ASC merge date order');
                    console.log('--------------------------------------------------------------------');
                    _e.label = 2;
                case 2:
                    _e.trys.push([2, 7, 8, 9]);
                    _b = tslib_1.__values(res.data), _c = _b.next();
                    _e.label = 3;
                case 3:
                    if (!!_c.done) return [3 /*break*/, 6];
                    item = _c.value;
                    if (!item.milestone) {
                        console.log(item.number + ' missing milestone!');
                        return [3 /*break*/, 5];
                    }
                    return [4 /*yield*/, client.get(item.pull_request.url)];
                case 4:
                    issueDetails = _e.sent();
                    console.log("* " + item.title + ", (#" + item.number + "), merge-sha: " + issueDetails.data.merge_commit_sha);
                    commands += "git cherry-pick -x " + issueDetails.data.merge_commit_sha + "\n";
                    _e.label = 5;
                case 5:
                    _c = _b.next();
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 9];
                case 7:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 9];
                case 8:
                    try {
                        if (_c && !_c.done && (_d = _b.return)) _d.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 9:
                    console.log('--------------------------------------------------------------------');
                    console.log('Commands (in order of how they should be executed)');
                    console.log('--------------------------------------------------------------------');
                    console.log(commands);
                    return [2 /*return*/];
            }
        });
    });
};
exports.cherryPickTask = new task_1.Task('Cherry pick task', cherryPickRunner);
//# sourceMappingURL=cherrypick.js.map