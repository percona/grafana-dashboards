export default function () {

    if (!window['ace']) {
        return false;
    }

    ace.define("ace/mode/clickhouse_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (require, exports, module) {
        "use strict";

        var oop = require("../lib/oop");
        var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
        var ClickhouseInfo = require("./clickhouse_info").ClickhouseInfo;

        var ClickHouseHighlightRules = function () {
            var keywords = ClickhouseInfo.KeywordsRe(),
                builtinConstants = ClickhouseInfo.ConstantsRe(),
                builtinFunctions = ClickhouseInfo.FunctionsRe(),
                dataTypes = ClickhouseInfo.DataTypesRe();

            var keywordMapper = this.createKeywordMapper({
                "support.function": builtinFunctions,
                "keyword": keywords,
                "constant.language": builtinConstants,
                "storage.type": dataTypes
            }, "identifier", true);

            this.$rules = {
                "start": [{
                    token: "comment",
                    regex: "--.*$"
                }, {
                    token: "comment.block",
                    start: "```",
                    end: "```"
                }, {
                    token: "string",           // ' string
                    regex: "'.*?'"
                }, {
                    token: "variable",
                    regex: "\\$\\w+"
                }, {
                    token: "keyword.operator",
                    regex: "\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|=|\\?|:"
                }, {
                    token: "constant.numeric", // float
                    regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
                }, {
                    token: keywordMapper,
                    regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
                }, {
                    token: "paren.lparen",
                    regex: "[\\(]"
                }, {
                    token: "paren.rparen",
                    regex: "[\\)]"
                }, {
                    token: "text",
                    regex: "\\s+"
                }]
            };
            this.normalizeRules();
        };

        oop.inherits(ClickHouseHighlightRules, TextHighlightRules);

        exports.ClickHouseHighlightRules = ClickHouseHighlightRules;
    });

    ace.define("ace/mode/clickhouse_completions", ["require", "exports", "module", "ace/token_iterator", "ace/lib/lang"], function (require, exports, module) {
        "use strict";

        var lang = require("../lib/lang"),
            ClickhouseInfo = require("./clickhouse_info").ClickhouseInfo;

        var keyWordsCompletions = ClickhouseInfo.Keywords.map(function (word) {
            return {
                caption: word,
                value: word,
                meta: "keyword",
                score: Number.MAX_VALUE
            }
        });

        var constantCompletions = ClickhouseInfo.Constants.map(function (word) {
            return {
                caption: word,
                value: word,
                meta: "constant",
                score: Number.MAX_VALUE
            };
        });

        var macrosCompletions = ClickhouseInfo.MacrosCompletions().map(function (item) {
            return {
                caption: item.name,
                value: item.name,
                docHTML: convertToHTML(item),
                meta: "macros",
                score: Number.MAX_VALUE
            };
        });


        var functionsCompletions = ClickhouseInfo.FunctionsCompletions().map(function (item) {
            return {
                caption: item.name,
                value: item.name + "()",
                docHTML: convertToHTML(item),
                meta: "function",
                score: Number.MAX_VALUE
            };
        });

        function wrapText(str, len) {
            len = len || 90;
            var lines = [];
            var space_index = 0;
            var line_start = 0;
            var next_line_end = len;
            var line = "";
            for (var i = 0; i < str.length; i++) {
                if (str[i] === ' ') {
                    space_index = i;
                } else if (i >= next_line_end && space_index !== 0) {
                    line = str.slice(line_start, space_index);
                    lines.push(line);
                    line_start = space_index + 1;
                    next_line_end = i + len;
                    space_index = 0;
                }
            }
            line = str.slice(line_start);
            lines.push(line);
            return lines.join("&nbsp<br>");
        }

        function convertMarkDownTags(text) {
            text = text.replace(/```(.+)```/, "<pre>$1</pre>");
            text = text.replace(/`([^`]+)`/, "<code>$1</code>");
            return text;
        }

        function convertToHTML(item) {
            var docText = lang.escapeHTML(item.docText);
            docText = convertMarkDownTags(wrapText(docText, 90));
            return [
                "<b>", lang.escapeHTML(item.def), "</b>", "<hr></hr>", docText, "<br>&nbsp"
            ].join("");
        }

        var ClickhouseCompletions = function () {
        };

        (function () {
            this.getCompletions = function (state, session, pos, prefix, callback) {
                var completions = keyWordsCompletions.concat(functionsCompletions).concat(constantCompletions);
                completions = completions.concat(macrosCompletions);
                callback(null, completions);
            };

        }).call(ClickhouseCompletions.prototype);

        exports.ClickhouseCompletions = ClickhouseCompletions;
    });


    ace.define("ace/mode/clickhouse", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/clickhouse_highlight_rules"], function (require, exports, module) {
        "use strict";

        var oop = require("../lib/oop");
        var TextMode = require("./text").Mode;
        var ClickHouseHighlightRules = require("./clickhouse_highlight_rules").ClickHouseHighlightRules;
        var ClickhouseCompletions = require("./clickhouse_completions").ClickhouseCompletions;


        var Mode = function () {
            this.HighlightRules = ClickHouseHighlightRules;
            this.$completer = new ClickhouseCompletions();
            // replace keyWordCompleter
            this.completer = this.$completer;
        };

        oop.inherits(Mode, TextMode);

        (function () {
            this.$id = "ace/mode/clickhouse";
        }).call(Mode.prototype);

        exports.Mode = Mode;
    });

    return true;
}
