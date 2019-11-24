"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var githubClient_1 = tslib_1.__importDefault(require("./githubClient"));
var fakeClient = jest.fn();
beforeEach(function () {
    delete process.env.GITHUB_USERNAME;
    delete process.env.GITHUB_ACCESS_TOKEN;
});
afterEach(function () {
    delete process.env.GITHUB_USERNAME;
    delete process.env.GITHUB_ACCESS_TOKEN;
});
describe('GithubClient', function () {
    it('should initialise a GithubClient', function () {
        var github = new githubClient_1.default();
        var githubEnterprise = new githubClient_1.default({ enterprise: true });
        expect(github).toBeInstanceOf(githubClient_1.default);
        expect(githubEnterprise).toBeInstanceOf(githubClient_1.default);
    });
    describe('#client', function () {
        it('it should contain a grafana client', function () {
            // @ts-ignore
            var spy = jest.spyOn(githubClient_1.default.prototype, 'createClient').mockImplementation(function () { return fakeClient; });
            var github = new githubClient_1.default();
            var client = github.client;
            expect(spy).toHaveBeenCalledWith({
                baseURL: 'https://api.github.com/repos/grafana/grafana',
                timeout: 10000,
            });
            expect(client).toEqual(fakeClient);
        });
        it('it should contain a grafana enterprise client', function () {
            // @ts-ignore
            var spy = jest.spyOn(githubClient_1.default.prototype, 'createClient').mockImplementation(function () { return fakeClient; });
            var github = new githubClient_1.default({ enterprise: true });
            var client = github.client;
            expect(spy).toHaveBeenCalledWith({
                baseURL: 'https://api.github.com/repos/grafana/grafana-enterprise',
                timeout: 10000,
            });
            expect(client).toEqual(fakeClient);
        });
        describe('when the credentials are required', function () {
            it('should create the client when the credentials are defined', function () {
                var username = 'grafana';
                var token = 'averysecureaccesstoken';
                process.env.GITHUB_USERNAME = username;
                process.env.GITHUB_ACCESS_TOKEN = token;
                // @ts-ignore
                var spy = jest.spyOn(githubClient_1.default.prototype, 'createClient').mockImplementation(function () { return fakeClient; });
                var github = new githubClient_1.default({ required: true });
                var client = github.client;
                expect(spy).toHaveBeenCalledWith({
                    baseURL: 'https://api.github.com/repos/grafana/grafana',
                    timeout: 10000,
                    auth: { username: username, password: token },
                });
                expect(client).toEqual(fakeClient);
            });
            it('should create the enterprise client when the credentials are defined', function () {
                var username = 'grafana';
                var token = 'averysecureaccesstoken';
                process.env.GITHUB_USERNAME = username;
                process.env.GITHUB_ACCESS_TOKEN = token;
                // @ts-ignore
                var spy = jest.spyOn(githubClient_1.default.prototype, 'createClient').mockImplementation(function () { return fakeClient; });
                var github = new githubClient_1.default({ required: true, enterprise: true });
                var client = github.client;
                expect(spy).toHaveBeenCalledWith({
                    baseURL: 'https://api.github.com/repos/grafana/grafana-enterprise',
                    timeout: 10000,
                    auth: { username: username, password: token },
                });
                expect(client).toEqual(fakeClient);
            });
            describe('when the credentials are not defined', function () {
                it('should throw an error', function () {
                    expect(function () {
                        // tslint:disable-next-line
                        new githubClient_1.default({ required: true });
                    }).toThrow(/operation needs a GITHUB_USERNAME and GITHUB_ACCESS_TOKEN environment variables/);
                });
            });
        });
    });
});
//# sourceMappingURL=githubClient.test.js.map