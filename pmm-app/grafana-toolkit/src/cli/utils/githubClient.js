"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var axios_1 = tslib_1.__importDefault(require("axios"));
var grafanaURL = 'https://api.github.com/repos/grafana/grafana';
var enterpriseURL = 'https://api.github.com/repos/grafana/grafana-enterprise';
var GithubClient = /** @class */ (function () {
    function GithubClient(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.required, required = _c === void 0 ? false : _c, _d = _b.enterprise, enterprise = _d === void 0 ? false : _d;
        var username = process.env.GITHUB_USERNAME;
        var token = process.env.GITHUB_ACCESS_TOKEN;
        var clientConfig = {
            baseURL: enterprise ? enterpriseURL : grafanaURL,
            timeout: 10000,
        };
        if (required && !username && !token) {
            throw new Error('operation needs a GITHUB_USERNAME and GITHUB_ACCESS_TOKEN environment variables');
        }
        if (username && token) {
            clientConfig.auth = { username: username, password: token };
        }
        this.client = this.createClient(clientConfig);
    }
    GithubClient.prototype.createClient = function (clientConfig) {
        return axios_1.default.create(clientConfig);
    };
    return GithubClient;
}());
exports.default = GithubClient;
//# sourceMappingURL=githubClient.js.map