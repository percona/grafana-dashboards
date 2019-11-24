"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.answerRequired = function (question) {
    return tslib_1.__assign(tslib_1.__assign({}, question), { validate: function (answer) { return answer.trim() !== '' || question.name + " is required"; } });
};
exports.promptInput = function (name, message, required, def, when) {
    if (required === void 0) { required = false; }
    if (def === void 0) { def = undefined; }
    if (when === void 0) { when = true; }
    var model = {
        type: 'input',
        name: name,
        message: message,
        default: def,
        when: when,
    };
    return required ? exports.answerRequired(model) : model;
};
exports.promptConfirm = function (name, message, def, when) {
    if (def === void 0) { def = undefined; }
    if (when === void 0) { when = true; }
    var model = {
        type: 'confirm',
        name: name,
        message: message,
        default: def,
        when: when,
    };
    return model;
};
//# sourceMappingURL=prompt.js.map