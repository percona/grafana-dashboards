import {isArray} from "lodash-es";
import SqlQuery from "../../src/sql_query";

const variableRegex = /\$(\w+)|\[\[([\s\S]+?)(?::(\w+))?\]\]|\${(\w+)(?:\.([^:^\}]+))?(?::([^\}]+))?}/g;
export default class TemplateSrvStub {
    variables = [];
    templateSettings = {interpolate: /\[\[([\s\S]+?)\]\]/g};
    data = {};

    replace(target: string, scopedVars?, format?: string | Function): string {
        let query = target.replace(variableRegex, (match, var1, var2, fmt2, var3, fieldPath, fmt3) => {
            const variableName = var1 || var2 || var3;
            let variable = this.data[variableName];
            const fmt = fmt2 || fmt3 || format;

            if (scopedVars) {
                let variable = scopedVars[variableName];
                if (variable !== null && variable !== undefined) {
                    let value = scopedVars[variableName].value;
                    return this.formatValue(value, fmt, variable);
                }
            }

            if (!variable) {
                return match;
            }
        });
        return query;
    }

    formatValue(value, fmt, variable) {
        if (typeof fmt === "string" && fmt === 'csv') {
            return isArray(value) ? value.join(',') : value;
        }
        if (typeof fmt === "function") {
            return fmt(value, variable);
        }
        return SqlQuery.clickhouseEscape(value, variable);
    }

    getAdhocFilters() {
        return [];
    }

    variableExists() {
        return false;
    }

    highlightVariablesAsHtml(str) {
        return str;
    }

    setGrafanaVariable(name, value) {
        this.data[name] = value;
    }

    init() {
    }

    fillVariableValuesForUrl() {
    }

    updateTemplateData() {
    }
}
