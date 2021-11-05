///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
import { each, isArray, isEmpty, isString, map } from 'lodash-es';
import * as dateMath from 'grafana/app/core/utils/datemath';
import moment from 'moment';
import Scanner from './scanner';
var durationSplitRegexp = /(\d+)(ms|s|m|h|d|w|M|y)/;
var NumberOnlyRegexp = /^[+-]?\d+(\.\d+)?$/;
var SqlQuery = /** @class */ (function () {
    /** @ngInject */
    function SqlQuery(target, templateSrv, options) {
        this.target = target;
        this.templateSrv = templateSrv;
        this.options = options;
    }
    SqlQuery.prototype.replace = function (options, adhocFilters) {
        var query = this.templateSrv.replace(SqlQuery.conditionalTest(this.target.query.trim(), this.templateSrv), options.scopedVars, SqlQuery.interpolateQueryExpr), scanner = new Scanner(query), dateTimeType = this.target.dateTimeType
            ? this.target.dateTimeType
            : 'DATETIME', i = this.templateSrv.replace(this.target.interval, options.scopedVars) || options.interval, interval = SqlQuery.convertInterval(i, this.target.intervalFactor || 1), adhocCondition = [];
        try {
            var ast_1 = scanner.toAST();
            var topQueryAST = ast_1;
            if (adhocFilters.length > 0) {
                /* Check sub queries for ad-hoc filters */
                while (ast_1.hasOwnProperty('from') && !isArray(ast_1.from)) {
                    ast_1 = ast_1.from;
                }
                if (!ast_1.hasOwnProperty('where')) {
                    ast_1.where = [];
                }
                var target_1 = SqlQuery.target(ast_1.from[0], this.target);
                adhocFilters.forEach(function (af) {
                    var parts = af.key.split('.');
                    /* Wildcard table, substitute current target table */
                    if (parts.length === 1) {
                        parts.unshift(target_1[1]);
                    }
                    /* Wildcard database, substitute current target database */
                    if (parts.length === 2) {
                        parts.unshift(target_1[0]);
                    }
                    /* Expect fully qualified column name at this point */
                    if (parts.length < 3) {
                        console.warn("adhoc filters: filter " + af.key + "` has wrong format");
                        return;
                    }
                    if (target_1[0] !== parts[0] || target_1[1] !== parts[1]) {
                        return;
                    }
                    var operator = SqlQuery.clickhouseOperator(af.operator);
                    // tslint:disable-next-line:max-line-length
                    var cond = parts[2] + " " + operator + " " + ((af.value.indexOf("'") > -1 || af.value.indexOf(", ") > -1 || af.value.match(/^\s*\d+\s*$/)) ? af.value : "'" + af.value + "'");
                    adhocCondition.push(cond);
                    if (ast_1.where.length > 0) {
                        // OR is not implemented
                        // @see https://github.com/grafana/grafana/issues/10918
                        cond = "AND " + cond;
                    }
                    ast_1.where.push(cond);
                });
                query = scanner.Print(topQueryAST);
            }
            query = SqlQuery.applyMacros(query, topQueryAST);
        }
        catch (err) {
            console.error('AST parser error: ', err);
        }
        /* Render the ad-hoc condition or evaluate to an always true condition */
        var renderedAdHocCondition = '1';
        if (adhocCondition.length > 0) {
            renderedAdHocCondition = '(' + adhocCondition.join(' AND ') + ')';
        }
        if (this.target.skip_comments) {
            query = scanner.removeComments(query);
        }
        query = SqlQuery.unescape(query);
        var timeFilter = SqlQuery.getDateTimeFilter(this.options.rangeRaw.to === 'now', dateTimeType);
        if (typeof this.target.dateColDataType === "string" && this.target.dateColDataType.length > 0) {
            timeFilter = SqlQuery.getDateFilter(this.options.rangeRaw.to === 'now') + ' AND ' + timeFilter;
        }
        var table = SqlQuery.escapeIdentifier(this.target.table);
        if (this.target.database) {
            table = SqlQuery.escapeIdentifier(this.target.database) + '.' + table;
        }
        var myround = this.target.round === "$step" ? interval : SqlQuery.convertInterval(this.target.round, 1), from = SqlQuery.convertTimestamp(SqlQuery.round(this.options.range.from, myround)), to = SqlQuery.convertTimestamp(SqlQuery.round(this.options.range.to, myround));
        this.target.rawQuery = query
            .replace(/\$timeSeries/g, SqlQuery.getTimeSeries(dateTimeType))
            .replace(/\$timeFilter/g, timeFilter)
            .replace(/\$table/g, table)
            .replace(/\$from/g, from)
            .replace(/\$to/g, to)
            .replace(/\$dateCol/g, SqlQuery.escapeIdentifier(this.target.dateColDataType))
            .replace(/\$dateTimeCol/g, SqlQuery.escapeIdentifier(this.target.dateTimeColDataType))
            .replace(/\$interval/g, interval)
            .replace(/\$adhoc/g, renderedAdHocCondition);
        var round = this.target.round === "$step"
            ? interval
            : SqlQuery.convertInterval(this.target.round, 1);
        this.target.rawQuery = SqlQuery.replaceTimeFilters(this.target.rawQuery, this.options.range, dateTimeType, round);
        return this.target.rawQuery;
    };
    SqlQuery.escapeIdentifier = function (identifier) {
        if (/^[a-zA-Z][0-9a-zA-Z_]+$/.test(identifier) || /\(.*\)/.test(identifier) || /[\/\*\+\-]/.test(identifier)) {
            return identifier;
        }
        else {
            return '"' + identifier.replace(/"/g, '\\"') + '"';
        }
    };
    SqlQuery.replaceTimeFilters = function (query, range, dateTimeType, round) {
        if (dateTimeType === void 0) { dateTimeType = 'DATETIME'; }
        var from = SqlQuery.convertTimestamp(SqlQuery.round(range.from, round || 0));
        var to = SqlQuery.convertTimestamp(SqlQuery.round(range.to, round || 0));
        // Extend date range to be sure that first and last points
        // data is not affected by round
        if (round > 0) {
            to += (round * 2) - 1;
            from -= (round * 2) - 1;
        }
        return query
            .replace(/\$timeFilterByColumn\(([\w_]+)\)/g, function (match, columnName) { return (columnName + " " + SqlQuery.getFilterSqlForDateTime(range.raw.to === 'now', dateTimeType)); })
            .replace(/\$from/g, from.toString())
            .replace(/\$to/g, to.toString());
    };
    SqlQuery.getFilterSqlForDateTime = function (isToNow, dateTimeType) {
        var convertFn = this.getConvertFn(dateTimeType);
        if (isToNow) {
            return ">= " + convertFn('$from');
        }
        return "BETWEEN " + convertFn('$from') + " AND " + convertFn('$to');
    };
    SqlQuery.getConvertFn = function (dateTimeType) {
        return function (t) {
            if (dateTimeType === 'DATETIME') {
                return 'toDateTime(' + t + ')';
            }
            return t;
        };
    };
    SqlQuery.target = function (from, target) {
        if (from.length === 0) {
            return ['', ''];
        }
        var targetTable, targetDatabase;
        var parts = from.split('.');
        switch (parts.length) {
            case 1:
                targetTable = parts[0];
                targetDatabase = target.database;
                break;
            case 2:
                targetDatabase = parts[0];
                targetTable = parts[1];
                break;
            default:
                throw { message: 'FROM expression "' + from + '" cant be parsed' };
        }
        if (targetTable === '$table') {
            targetTable = target.table;
        }
        return [targetDatabase, targetTable];
    };
    SqlQuery.applyMacros = function (query, ast) {
        if (SqlQuery.contain(ast, '$columns')) {
            return SqlQuery.columns(query, ast);
        }
        if (SqlQuery.contain(ast, '$rateColumns')) {
            return SqlQuery.rateColumns(query, ast);
        }
        if (SqlQuery.contain(ast, '$rate')) {
            return SqlQuery.rate(query, ast);
        }
        if (SqlQuery.contain(ast, '$perSecond')) {
            return SqlQuery.perSecond(query, ast);
        }
        if (SqlQuery.contain(ast, '$perSecondColumns')) {
            return SqlQuery.perSecondColumns(query, ast);
        }
        return query;
    };
    SqlQuery.contain = function (obj, field) {
        return obj.hasOwnProperty(field) && !isEmpty(obj[field]);
    };
    SqlQuery._parseMacro = function (macro, query) {
        var mLen = macro.length;
        var mPos = query.indexOf(macro);
        if (mPos === -1 || query.slice(mPos, mPos + mLen + 1) !== macro + '(') {
            return [query, ""];
        }
        var fromIndex = SqlQuery._fromIndex(query, macro);
        return [query.slice(0, mPos), query.slice(fromIndex)];
    };
    SqlQuery.columns = function (query, ast) {
        var _a = SqlQuery._parseMacro('$columns', query), beforeMacrosQuery = _a[0], fromQuery = _a[1];
        if (fromQuery.length < 1) {
            return query;
        }
        var args = ast['$columns'];
        if (args.length !== 2) {
            throw { message: 'Amount of arguments must equal 2 for $columns func. Parsed arguments are: ' + ast.$columns.join(', ') };
        }
        return SqlQuery._columns(args[0], args[1], beforeMacrosQuery, fromQuery);
    };
    SqlQuery._columns = function (key, value, beforeMacrosQuery, fromQuery) {
        if (key.slice(-1) === ')' || value.slice(-1) === ')') {
            throw { message: 'Some of passed arguments are without aliases: ' + key + ', ' + value };
        }
        var keyAlias = key.trim().split(' ').pop(), valueAlias = value.trim().split(' ').pop(), havingIndex = fromQuery.toLowerCase().indexOf('having'), having = "";
        if (havingIndex !== -1) {
            having = ' ' + fromQuery.slice(havingIndex, fromQuery.length);
            fromQuery = fromQuery.slice(0, havingIndex - 1);
        }
        fromQuery = SqlQuery._applyTimeFilter(fromQuery);
        return beforeMacrosQuery + 'SELECT' +
            ' t,' +
            ' groupArray((' + keyAlias + ', ' + valueAlias + ')) AS groupArr' +
            ' FROM (' +
            ' SELECT $timeSeries AS t' +
            ', ' + key +
            ', ' + value + ' ' +
            fromQuery +
            ' GROUP BY t, ' + keyAlias +
            having +
            ' ORDER BY t, ' + keyAlias +
            ')' +
            ' GROUP BY t' +
            ' ORDER BY t';
    };
    SqlQuery.rateColumns = function (query, ast) {
        var _a = SqlQuery._parseMacro('$rateColumns', query), beforeMacrosQuery = _a[0], fromQuery = _a[1];
        if (fromQuery.length < 1) {
            return query;
        }
        var args = ast['$rateColumns'];
        if (args.length !== 2) {
            throw { message: 'Amount of arguments must equal 2 for $rateColumns func. Parsed arguments are: ' + args.join(', ') };
        }
        query = SqlQuery._columns(args[0], args[1], "", fromQuery);
        return beforeMacrosQuery + 'SELECT t' +
            ', arrayMap(a -> (a.1, a.2/runningDifference( t/1000 )), groupArr)' +
            ' FROM (' +
            query +
            ')';
    };
    SqlQuery._fromIndex = function (query, macro) {
        var fromRe = new RegExp("\\" + macro + "\\([\\w\\s\\S]+\\)(\\s+FROM\\s+)", 'gim');
        var matches = fromRe.exec(query);
        if (matches === null || matches.length === 0) {
            throw { message: 'Could not find FROM-statement at: ' + query };
        }
        var fromRelativeIndex = matches[matches.length - 1].toLocaleLowerCase().indexOf("from");
        return fromRe.lastIndex - matches[matches.length - 1].length + fromRelativeIndex;
    };
    SqlQuery.rate = function (query, ast) {
        var _a = SqlQuery._parseMacro('$rate', query), beforeMacrosQuery = _a[0], fromQuery = _a[1];
        if (fromQuery.length < 1) {
            return query;
        }
        var args = ast['$rate'];
        if (args.length < 1) {
            throw { message: 'Amount of arguments must be > 0 for $rate func. Parsed arguments are:  ' + args.join(', ') };
        }
        return SqlQuery._rate(args, beforeMacrosQuery, fromQuery);
    };
    SqlQuery._rate = function (args, beforeMacrosQuery, fromQuery) {
        var aliases = [];
        each(args, function (arg) {
            if (arg.slice(-1) === ')') {
                throw { message: 'Argument "' + arg + '" cant be used without alias' };
            }
            aliases.push(arg.trim().split(' ').pop());
        });
        var cols = [];
        each(aliases, function (a) {
            cols.push(a + '/runningDifference(t/1000) ' + a + 'Rate');
        });
        fromQuery = SqlQuery._applyTimeFilter(fromQuery);
        return beforeMacrosQuery + 'SELECT ' +
            't,' +
            ' ' + cols.join(', ') +
            ' FROM (' +
            ' SELECT $timeSeries AS t' +
            ', ' + args.join(', ') +
            ' ' + fromQuery +
            ' GROUP BY t' +
            ' ORDER BY t' +
            ')';
    };
    SqlQuery.perSecondColumns = function (query, ast) {
        var _a = SqlQuery._parseMacro('$perSecondColumns', query), beforeMacrosQuery = _a[0], fromQuery = _a[1];
        if (fromQuery.length < 1) {
            return query;
        }
        var args = ast['$perSecondColumns'];
        if (args.length !== 2) {
            throw { message: 'Amount of arguments must equal 2 for $perSecondColumns func. Parsed arguments are: ' + args.join(', ') };
        }
        var key = args[0], value = 'max(' + args[1].trim() + ') AS max_0', havingIndex = fromQuery.toLowerCase().indexOf('having'), having = "", aliasIndex = key.toLowerCase().indexOf(' as '), alias = "perSecondColumns";
        if (aliasIndex === -1) {
            key = key + " AS " + alias;
        }
        else {
            alias = key.slice(aliasIndex + 4, key.length);
        }
        if (havingIndex !== -1) {
            having = ' ' + fromQuery.slice(havingIndex, fromQuery.length);
            fromQuery = fromQuery.slice(0, havingIndex - 1);
        }
        fromQuery = SqlQuery._applyTimeFilter(fromQuery);
        return beforeMacrosQuery + 'SELECT' +
            ' t,' +
            ' groupArray((' + alias + ', max_0_Rate)) AS groupArr' +
            ' FROM (' +
            ' SELECT t,' +
            ' ' + alias +
            ', if(runningDifference(max_0) < 0, nan, runningDifference(max_0) / runningDifference(t/1000)) AS max_0_Rate' +
            ' FROM (' +
            ' SELECT $timeSeries AS t' +
            ', ' + key +
            ', ' + value + ' ' +
            fromQuery +
            ' GROUP BY t, ' + alias +
            having +
            ' ORDER BY ' + alias + ', t' +
            ')' +
            ')' +
            ' GROUP BY t' +
            ' ORDER BY t';
    };
    // $perSecond(query)
    SqlQuery.perSecond = function (query, ast) {
        var _a = SqlQuery._parseMacro('$perSecond', query), beforeMacrosQuery = _a[0], fromQuery = _a[1];
        if (fromQuery.length < 1) {
            return query;
        }
        var args = ast['$perSecond'];
        if (args.length < 1) {
            throw { message: 'Amount of arguments must be > 0 for $perSecond func. Parsed arguments are:  ' + args.join(', ') };
        }
        each(args, function (a, i) {
            args[i] = 'max(' + a.trim() + ') AS max_' + i;
        });
        return SqlQuery._perSecond(args, beforeMacrosQuery, fromQuery);
    };
    SqlQuery._perSecond = function (args, beforeMacrosQuery, fromQuery) {
        var cols = [];
        each(args, function (a, i) {
            cols.push('if(runningDifference(max_' + i + ') < 0, nan, ' +
                'runningDifference(max_' + i + ') / runningDifference(t/1000)) AS max_' + i + '_Rate');
        });
        fromQuery = SqlQuery._applyTimeFilter(fromQuery);
        return beforeMacrosQuery + 'SELECT ' +
            't,' +
            ' ' + cols.join(', ') +
            ' FROM (' +
            ' SELECT $timeSeries AS t,' +
            ' ' + args.join(', ') +
            ' ' + fromQuery +
            ' GROUP BY t' +
            ' ORDER BY t' +
            ')';
    };
    SqlQuery._applyTimeFilter = function (query) {
        if (query.toLowerCase().indexOf('where') !== -1) {
            query = query.replace(/where/i, 'WHERE $timeFilter AND');
        }
        else {
            query += ' WHERE $timeFilter';
        }
        return query;
    };
    SqlQuery.getTimeSeries = function (dateTimeType) {
        if (dateTimeType === 'DATETIME') {
            return '(intDiv(toUInt32($dateTimeCol), $interval) * $interval) * 1000';
        }
        return '(intDiv($dateTimeCol, $interval) * $interval) * 1000';
    };
    SqlQuery.getDateFilter = function (isToNow) {
        if (isToNow) {
            return '$dateCol >= toDate($from)';
        }
        return '$dateCol BETWEEN toDate($from) AND toDate($to)';
    };
    SqlQuery.getDateTimeFilter = function (isToNow, dateTimeType) {
        var convertFn = function (t) {
            if (dateTimeType === 'DATETIME') {
                return 'toDateTime(' + t + ')';
            }
            return t;
        };
        if (isToNow) {
            return '$dateTimeCol >= ' + convertFn('$from');
        }
        return '$dateTimeCol BETWEEN ' + convertFn('$from') + ' AND ' + convertFn('$to');
    };
    // date is a moment object
    SqlQuery.convertTimestamp = function (date) {
        //return date.format("'Y-MM-DD HH:mm:ss'")
        if (isString(date)) {
            date = dateMath.parse(date, true);
        }
        return Math.floor(date.valueOf() / 1000);
    };
    SqlQuery.round = function (date, round) {
        if (round === 0) {
            return date;
        }
        if (isString(date)) {
            date = dateMath.parse(date, true);
        }
        var coefficient = 1000 * round;
        var rounded = Math.floor(date.valueOf() / coefficient) * coefficient;
        return moment(rounded);
    };
    SqlQuery.convertInterval = function (interval, intervalFactor) {
        if (interval === undefined || typeof interval !== 'string' || interval === "") {
            return 0;
        }
        var m = interval.match(durationSplitRegexp);
        if (m === null) {
            throw { message: 'Received interval is invalid: ' + interval };
        }
        var dur = moment.duration(parseInt(m[1]), m[2]);
        var sec = dur.asSeconds();
        if (sec < 1) {
            sec = 1;
        }
        return Math.ceil(sec * intervalFactor);
    };
    SqlQuery.interpolateQueryExpr = function (value, variable, defaultFormatFn) {
        // if no (`multiselect` or `include all`) and variable is not Array - do not escape
        if (!variable.multi && !variable.includeAll && !Array.isArray(value)) {
            return value;
        }
        if (!Array.isArray(value)) {
            return SqlQuery.clickhouseEscape(value, variable);
        }
        var escapedValues = map(value, function (v) {
            return SqlQuery.clickhouseEscape(v, variable);
        });
        return escapedValues.join(',');
    };
    SqlQuery.clickhouseOperator = function (value) {
        switch (value) {
            case "=":
            case "!=":
            case ">":
            case "<":
                return value;
            case "=~":
                return "LIKE";
            case "!~":
                return "NOT LIKE";
            default:
                console.warn("adhoc filters: got unsupported operator `" + value + "`");
                return value;
        }
    };
    SqlQuery.clickhouseEscape = function (value, variable) {
        var returnAsIs = true;
        var returnAsArray = false;
        // if at least one of options is not digit or is array
        each(variable.options, function (opt) {
            if (typeof opt.value === 'string' && opt.value === '$__all') {
                return true;
            }
            if (typeof opt.value === 'number') {
                returnAsIs = true;
                return false;
            }
            if (typeof opt.value === 'string' && !NumberOnlyRegexp.test(opt.value)) {
                returnAsIs = false;
                return false;
            }
            if (opt.value instanceof Array) {
                returnAsArray = true;
                each(opt.value, function (v) {
                    if (typeof v === 'string' && !NumberOnlyRegexp.test(v)) {
                        returnAsIs = false;
                        return false;
                    }
                    return true;
                });
                return false;
            }
            return true;
        });
        if (value instanceof Array && returnAsArray) {
            var arrayValues = map(value, function (v) {
                return SqlQuery.clickhouseEscape(v, variable);
            });
            return "[" + arrayValues.join(', ') + "]";
        }
        else if (typeof value === 'number' || (returnAsIs && (typeof value === 'string' && NumberOnlyRegexp.test(value)))) {
            return value;
        }
        else {
            return "'" + value.replace(/[\\']/g, '\\$&') + "'";
        }
    };
    SqlQuery.conditionalTest = function (query, templateSrv) {
        var macros = '$conditionalTest(';
        var openMacros = query.indexOf(macros);
        while (openMacros !== -1) {
            var r = SqlQuery.betweenBraces(query.substring(openMacros + macros.length, query.length));
            if (r.error.length > 0) {
                throw { message: '$conditionalIn macros error: ' + r.error };
            }
            var arg = r.result;
            // first parameters is an expression and require some complex parsing,
            // so parse from the end where you know that the last parameters is a comma with a variable
            var param1 = arg.substring(0, arg.lastIndexOf(',')).trim();
            var param2 = arg.substring(arg.lastIndexOf(',') + 1).trim();
            // remove the $ from the variable
            var varInParam = param2.substring(1);
            var done = 0;
            //now find in the list of variable what is the value
            for (var i = 0; i < templateSrv.variables.length; i++) {
                var varG = templateSrv.variables[i];
                if (varG.name === varInParam) {
                    var closeMacros = openMacros + macros.length + r.result.length + 1;
                    done = 1;
                    var value = varG.current.value;
                    if (
                    // for query variable when all is selected
                    // may be add another test on the all activation may be wise.
                    (varG.type === 'query' && ((value.length === 1 && value[0] === '$__all')
                        || (typeof value === 'string' && value === '$__all'))) ||
                        // for textbox variable when nothing is entered
                        (['textbox', 'custom'].includes(varG.type) && ['', undefined, null].includes(value))) {
                        query = query.substring(0, openMacros) + ' ' + query.substring(closeMacros, query.length);
                    }
                    else {
                        // replace of the macro with standard test.
                        query = query.substring(0, openMacros) + ' ' + param1 + ' ' + query.substring(closeMacros, query.length);
                    }
                    break;
                }
            }
            if (done === 0) {
                throw { message: '$conditionalTest macros error cannot find referenced variable: ' + param2 };
            }
            openMacros = query.indexOf(macros);
        }
        return query;
    };
    SqlQuery.unescape = function (query) {
        var macros = '$unescape(';
        var openMacros = query.indexOf(macros);
        while (openMacros !== -1) {
            var r = SqlQuery.betweenBraces(query.substring(openMacros + macros.length, query.length));
            if (r.error.length > 0) {
                throw { message: '$unescape macros error: ' + r.error };
            }
            var arg = r.result;
            arg = arg.replace(/[']+/g, '');
            var closeMacros = openMacros + macros.length + r.result.length + 1;
            query = query.substring(0, openMacros) + arg + query.substring(closeMacros, query.length);
            openMacros = query.indexOf('$unescape(');
        }
        return query;
    };
    SqlQuery.betweenBraces = function (query) {
        var r = {
            result: "",
            error: "",
        };
        var openBraces = 1;
        for (var i = 0; i < query.length; i++) {
            if (query.charAt(i) === '(') {
                openBraces++;
            }
            if (query.charAt(i) === ')') {
                openBraces--;
                if (openBraces === 0) {
                    r.result = query.substring(0, i);
                    break;
                }
            }
        }
        if (openBraces > 1) {
            r.error = "missing parentheses";
        }
        return r;
    };
    return SqlQuery;
}());
export default SqlQuery;
//# sourceMappingURL=sql_query.js.map