"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var chalk_1 = tslib_1.__importDefault(require("chalk"));
exports.execTask = function (task) { return function (options) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var e_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!options.silent) {
                    console.log(chalk_1.default.yellow("Running " + chalk_1.default.bold(task.name) + " task"));
                }
                task.setOptions(options);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                console.group();
                return [4 /*yield*/, task.exec()];
            case 2:
                _a.sent();
                console.groupEnd();
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                console.trace(e_1);
                process.exit(1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); }; };
//# sourceMappingURL=execTask.js.map