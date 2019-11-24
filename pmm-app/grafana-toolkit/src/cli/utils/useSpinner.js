"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ora_1 = tslib_1.__importDefault(require("ora"));
exports.useSpinner = function (spinnerLabel, fn, killProcess) {
    if (killProcess === void 0) { killProcess = true; }
    return function (options) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var spinner, e_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    spinner = ora_1.default(spinnerLabel);
                    spinner.start();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fn(options)];
                case 2:
                    _a.sent();
                    spinner.succeed();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.trace(e_1);
                    spinner.fail(e_1.message || e_1);
                    if (killProcess) {
                        process.exit(1);
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
};
//# sourceMappingURL=useSpinner.js.map