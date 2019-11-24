"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var axios_1 = tslib_1.__importDefault(require("axios"));
var task_1 = require("./task");
var client = axios_1.default.create({
    baseURL: 'http://localhost:3000/api',
    auth: {
        username: 'admin',
        password: 'admin2',
    },
});
function getUser(user) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var search, rsp;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Creating user ' + user.name);
                    return [4 /*yield*/, client.get('/users/search', {
                            params: { query: user.login },
                        })];
                case 1:
                    search = _a.sent();
                    if (search.data.totalCount === 1) {
                        user.id = search.data.users[0].id;
                        return [2 /*return*/, user];
                    }
                    return [4 /*yield*/, client.post('/admin/users', user)];
                case 2:
                    rsp = _a.sent();
                    user.id = rsp.data.id;
                    return [2 /*return*/, user];
            }
        });
    });
}
exports.getUser = getUser;
function getTeam(team) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var teams, _a, _b, existing, e_1_1, teamRsp;
        var e_1, _c;
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, client.get('/teams/search')];
                case 1:
                    teams = _d.sent();
                    _d.label = 2;
                case 2:
                    _d.trys.push([2, 7, 8, 9]);
                    _a = tslib_1.__values(teams.data.teams), _b = _a.next();
                    _d.label = 3;
                case 3:
                    if (!!_b.done) return [3 /*break*/, 6];
                    existing = _b.value;
                    if (!(existing.name === team.name)) return [3 /*break*/, 5];
                    console.log('Team exists, deleting');
                    return [4 /*yield*/, client.delete('/teams/' + existing.id)];
                case 4:
                    _d.sent();
                    _d.label = 5;
                case 5:
                    _b = _a.next();
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 9];
                case 7:
                    e_1_1 = _d.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 9];
                case 8:
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 9:
                    console.log('Creating team ' + team.name);
                    return [4 /*yield*/, client.post("/teams", team)];
                case 10:
                    teamRsp = _d.sent();
                    team.id = teamRsp.data.teamId;
                    return [2 /*return*/, team];
            }
        });
    });
}
exports.getTeam = getTeam;
function addToTeam(team, user) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Adding user " + user.name + " to team " + team.name);
                    return [4 /*yield*/, client.post("/teams/" + team.id + "/members", { userId: user.id })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.addToTeam = addToTeam;
function setDashboardAcl(dashboardId, aclList) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Setting Dashboard ACL ' + dashboardId);
                    return [4 /*yield*/, client.post("/dashboards/id/" + dashboardId + "/permissions", { items: aclList })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.setDashboardAcl = setDashboardAcl;
var searchTestDataSetupRunnner = function (_a) {
    var count = _a.count;
    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var user1, team1, folder, err_1, rsp, dashboards, i, dashboard, rsp_1;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getUser({
                        name: 'searchTestUser1',
                        email: 'searchTestUser@team.com',
                        login: 'searchTestUser1',
                        password: '12345',
                    })];
                case 1:
                    user1 = _b.sent();
                    return [4 /*yield*/, getTeam({ name: 'searchTestTeam1', email: 'searchtestdata@team.com' })];
                case 2:
                    team1 = _b.sent();
                    addToTeam(team1, user1);
                    folder = {
                        uid: 'search-test-data',
                        title: 'Search test data folder',
                        version: 1,
                    };
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, client.delete("/folders/" + folder.uid)];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 6];
                case 5:
                    err_1 = _b.sent();
                    return [3 /*break*/, 6];
                case 6:
                    console.log('Creating folder');
                    return [4 /*yield*/, client.post("/folders", folder)];
                case 7:
                    rsp = _b.sent();
                    folder.id = rsp.data.id;
                    folder.url = rsp.data.url;
                    return [4 /*yield*/, setDashboardAcl(folder.id, [])];
                case 8:
                    _b.sent();
                    console.log('Creating dashboards');
                    dashboards = [];
                    i = 0;
                    _b.label = 9;
                case 9:
                    if (!(i < count)) return [3 /*break*/, 13];
                    dashboard = {
                        uid: 'search-test-dash-' + i.toString().padStart(5, '0'),
                        title: 'Search test dash ' + i.toString().padStart(5, '0'),
                    };
                    return [4 /*yield*/, client.post("/dashboards/db", {
                            dashboard: dashboard,
                            folderId: folder.id,
                            overwrite: true,
                        })];
                case 10:
                    rsp_1 = _b.sent();
                    dashboard.id = rsp_1.data.id;
                    dashboard.url = rsp_1.data.url;
                    console.log('Created dashboard ' + dashboard.title);
                    dashboards.push(dashboard);
                    return [4 /*yield*/, setDashboardAcl(dashboard.id, [{ userId: 0, teamId: team1.id, permission: 4 }])];
                case 11:
                    _b.sent();
                    _b.label = 12;
                case 12:
                    i++;
                    return [3 /*break*/, 9];
                case 13: return [2 /*return*/];
            }
        });
    });
};
exports.searchTestDataSetupTask = new task_1.Task('Search test data setup', searchTestDataSetupRunnner);
//# sourceMappingURL=searchTestDataSetup.js.map