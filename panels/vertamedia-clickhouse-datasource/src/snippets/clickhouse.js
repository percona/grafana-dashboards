export default function() {
    if (!window['ace']) {
        return false;
    }

    ace.define("ace/snippets/clickhouse", ["require", "exports", "module"], function (require, exports, module) {
        "use strict";

        exports.snippets = [];

        exports.scope = "clickhouse";
    });

    return true;
}