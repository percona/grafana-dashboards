"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// @ts-ignore
var _ = tslib_1.__importStar(require("lodash"));
var task_1 = require("./task");
var githubClient_1 = tslib_1.__importDefault(require("../utils/githubClient"));
var difference_1 = tslib_1.__importDefault(require("lodash/difference"));
var chalk_1 = tslib_1.__importDefault(require("chalk"));
var useSpinner_1 = require("../utils/useSpinner");
var filterBugs = function (item) {
    if (item.title.match(/fix|fixes/i)) {
        return true;
    }
    if (item.labels.find(function (label) { return label.name === 'type/bug'; })) {
        return true;
    }
    return false;
};
var getPackageChangelog = function (packageName, issues) {
    var e_1, _a, e_2, _b;
    if (issues.length === 0) {
        return '';
    }
    var markdown = chalk_1.default.bold.yellow("\n\n/*** " + packageName + " changelog  ***/\n\n");
    var bugs = _.sortBy(issues.filter(filterBugs), 'title');
    var notBugs = _.sortBy(difference_1.default(issues, bugs), 'title');
    if (notBugs.length > 0) {
        markdown += '### Features / Enhancements\n';
        try {
            for (var notBugs_1 = tslib_1.__values(notBugs), notBugs_1_1 = notBugs_1.next(); !notBugs_1_1.done; notBugs_1_1 = notBugs_1.next()) {
                var item = notBugs_1_1.value;
                markdown += getMarkdownLineForIssue(item);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (notBugs_1_1 && !notBugs_1_1.done && (_a = notBugs_1.return)) _a.call(notBugs_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    if (bugs.length > 0) {
        markdown += '\n### Bug Fixes\n';
        try {
            for (var bugs_1 = tslib_1.__values(bugs), bugs_1_1 = bugs_1.next(); !bugs_1_1.done; bugs_1_1 = bugs_1.next()) {
                var item = bugs_1_1.value;
                markdown += getMarkdownLineForIssue(item);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (bugs_1_1 && !bugs_1_1.done && (_b = bugs_1.return)) _b.call(bugs_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    return markdown;
};
var changelogTaskRunner = useSpinner_1.useSpinner('Generating changelog', function (_a) {
    var milestone = _a.milestone;
    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var githubClient, client, res, issues, toolkitIssues, markdown;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    githubClient = new githubClient_1.default();
                    client = githubClient.client;
                    if (!/^\d+$/.test(milestone)) {
                        console.log('Use milestone number not title, find number in milestone url');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, client.get('/issues', {
                            params: {
                                state: 'closed',
                                per_page: 100,
                                labels: 'add to changelog',
                                milestone: milestone,
                            },
                        })];
                case 1:
                    res = _b.sent();
                    issues = res.data;
                    toolkitIssues = issues.filter(function (item) {
                        return item.labels.find(function (label) { return label.name === 'area/grafana/toolkit'; });
                    });
                    markdown = '';
                    markdown += getPackageChangelog('Grafana', issues);
                    markdown += getPackageChangelog('grafana-toolkit', toolkitIssues);
                    console.log(markdown);
                    return [2 /*return*/];
            }
        });
    });
});
function getMarkdownLineForIssue(item) {
    var githubGrafanaUrl = 'https://github.com/grafana/grafana';
    var markdown = '';
    var title = item.title.replace(/^([^:]*)/, function (_match, g1) {
        return "**" + g1 + "**";
    });
    markdown += '* ' + title + '.';
    markdown += " [#" + item.number + "](" + githubGrafanaUrl + "/pull/" + item.number + ")";
    markdown += ", [@" + item.user.login + "](" + item.user.html_url + ")";
    markdown += '\n';
    return markdown;
}
exports.changelogTask = new task_1.Task('Changelog generator task', changelogTaskRunner);
//# sourceMappingURL=changelog.js.map