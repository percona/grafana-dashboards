"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var task_1 = require("./task");
var githubClient_1 = tslib_1.__importDefault(require("../utils/githubClient"));
var closeMilestoneTaskRunner = function (_a) {
    var milestone = _a.milestone;
    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var githubClient, cherryPickLabel, client, milestoneRes, milestoneState, issuesRes, _b, _c, issue, resDelete, e_1_1, resClose;
        var e_1, _d;
        return tslib_1.__generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    githubClient = new githubClient_1.default({ required: true });
                    cherryPickLabel = 'cherry-pick needed';
                    client = githubClient.client;
                    if (!/^\d+$/.test(milestone)) {
                        console.log('Use milestone number not title, find number in milestone url');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, client.get("/milestones/" + milestone, {})];
                case 1:
                    milestoneRes = _e.sent();
                    milestoneState = milestoneRes.data.state;
                    if (milestoneState === 'closed') {
                        console.log('milestone already closed. ✅');
                        return [2 /*return*/];
                    }
                    console.log('fetching issues/PRs of the milestone ⏬');
                    return [4 /*yield*/, client.get('/issues', {
                            params: {
                                state: 'closed',
                                labels: cherryPickLabel,
                                per_page: 100,
                                milestone: milestone,
                            },
                        })];
                case 2:
                    issuesRes = _e.sent();
                    if (issuesRes.data.length < 1) {
                        console.log('no issues to remove label from');
                    }
                    else {
                        console.log("found " + issuesRes.data.length + " issues to remove the cherry-pick label from \uD83D\uDD0E");
                    }
                    _e.label = 3;
                case 3:
                    _e.trys.push([3, 8, 9, 10]);
                    _b = tslib_1.__values(issuesRes.data), _c = _b.next();
                    _e.label = 4;
                case 4:
                    if (!!_c.done) return [3 /*break*/, 7];
                    issue = _c.value;
                    // the reason for using stdout.write is for achieving 'action -> result' on
                    // the same line
                    process.stdout.write("\uD83D\uDD27removing label from issue #" + issue.number + " \uD83D\uDDD1...");
                    return [4 /*yield*/, client.delete("/issues/" + issue.number + "/labels/" + cherryPickLabel, {})];
                case 5:
                    resDelete = _e.sent();
                    if (resDelete.status === 200) {
                        process.stdout.write('done ✅\n');
                    }
                    else {
                        console.log('failed ❌');
                    }
                    _e.label = 6;
                case 6:
                    _c = _b.next();
                    return [3 /*break*/, 4];
                case 7: return [3 /*break*/, 10];
                case 8:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 10];
                case 9:
                    try {
                        if (_c && !_c.done && (_d = _b.return)) _d.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 10:
                    console.log("cleaned up " + issuesRes.data.length + " issues/prs \u26A1\uFE0F");
                    return [4 /*yield*/, client.patch("/milestones/" + milestone, {
                            state: 'closed',
                        })];
                case 11:
                    resClose = _e.sent();
                    if (resClose.status === 200) {
                        console.log('milestone closed 🙌');
                    }
                    else {
                        console.log('failed to close the milestone, response:');
                        console.log(resClose);
                    }
                    return [2 /*return*/];
            }
        });
    });
};
exports.closeMilestoneTask = new task_1.Task('Close Milestone generator task', closeMilestoneTaskRunner);
//# sourceMappingURL=closeMilestone.js.map