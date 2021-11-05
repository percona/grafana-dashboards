import { isArray } from "lodash-es";
import SqlQuery from "../../src/sql_query";
var variableRegex = /\$(\w+)|\[\[([\s\S]+?)(?::(\w+))?\]\]|\${(\w+)(?:\.([^:^\}]+))?(?::([^\}]+))?}/g;
var TemplateSrvStub = /** @class */ (function () {
    function TemplateSrvStub() {
        this.variables = [];
        this.templateSettings = { interpolate: /\[\[([\s\S]+?)\]\]/g };
        this.data = {};
    }
    TemplateSrvStub.prototype.replace = function (target, scopedVars, format) {
        var _this = this;
        var query = target.replace(variableRegex, function (match, var1, var2, fmt2, var3, fieldPath, fmt3) {
            var variableName = var1 || var2 || var3;
            var variable = _this.data[variableName];
            var fmt = fmt2 || fmt3 || format;
            if (scopedVars) {
                var variable_1 = scopedVars[variableName];
                if (variable_1 !== null && variable_1 !== undefined) {
                    var value = scopedVars[variableName].value;
                    return _this.formatValue(value, fmt, variable_1);
                }
            }
            if (!variable) {
                return match;
            }
        });
        return query;
    };
    TemplateSrvStub.prototype.formatValue = function (value, fmt, variable) {
        if (typeof fmt === "string" && fmt === 'csv') {
            return isArray(value) ? value.join(',') : value;
        }
        if (typeof fmt === "function") {
            return fmt(value, variable);
        }
        return SqlQuery.clickhouseEscape(value, variable);
    };
    TemplateSrvStub.prototype.getAdhocFilters = function () {
        return [];
    };
    TemplateSrvStub.prototype.variableExists = function () {
        return false;
    };
    TemplateSrvStub.prototype.highlightVariablesAsHtml = function (str) {
        return str;
    };
    TemplateSrvStub.prototype.setGrafanaVariable = function (name, value) {
        this.data[name] = value;
    };
    TemplateSrvStub.prototype.init = function () {
    };
    TemplateSrvStub.prototype.fillVariableValuesForUrl = function () {
    };
    TemplateSrvStub.prototype.updateTemplateData = function () {
    };
    return TemplateSrvStub;
}());
export default TemplateSrvStub;
//# sourceMappingURL=template_srv_stub.js.map