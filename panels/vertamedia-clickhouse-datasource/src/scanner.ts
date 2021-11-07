import {isArray, isEmpty, toLower} from 'lodash-es';

export default class Scanner {
    tree: any;
    rootToken: any;
    token: any;
    skipSpace: boolean;
    re: RegExp;
    expectedNext: boolean;

    _sOriginal: any;
    _s: any;

    /** @ngInject */
    constructor(s) {
        this._sOriginal = s;
        this.token = null;
    }

    raw() {
        return this._sOriginal;
    }

    expectNext() {
        if (!this.next()) {
            throw("expecting additional token at the end of query [" + this._sOriginal + "]");
        }
        return true;
    }

    next() {
        while (this._next()) {
            if (this.skipSpace && isWS(this.token)) {
                // skip whitespace
                continue;
            }
            return true;
        }
        return false;
    }

    _next() {
        if (this._s.length === 0) {
            return false;
        }
        let r = this.re.exec(this._s);
        if (r === null) {
            throw "cannot find next token in [" + this._s + "]";
        }

        this.token = r[0];
        this._s = this._s.substring(this.token.length);

        return true;
    }

    Format() {
        return print(this.toAST());
    }

    Print(ast) {
        return print(ast);
    }

    push(argument) {
        if (Array.isArray(this.tree[this.rootToken])) {
            this.tree[this.rootToken].push(argument);
        } else if (this.tree[this.rootToken] instanceof Object) {
            if (!this.tree[this.rootToken].hasOwnProperty('aliases')) {
                this.tree[this.rootToken].aliases = [];
            }
            this.tree[this.rootToken].aliases.push(argument);
        }
        this.expectedNext = false;
    }

    setRoot(token) {
        this.rootToken = token.toLowerCase();
        this.tree[this.rootToken] = [];
        this.expectedNext = true;
    }

    isExpectedNext(): boolean {
        let v = this.expectedNext;
        this.expectedNext = false;
        return v;
    }

    appendToken(argument): string {
        return (argument === '' || isSkipSpace(argument[argument.length - 1]))
            ? this.token
            : ' ' + this.token;
    }

    toAST() {
        this._s = this._sOriginal;
        this.tree = {};
        this.setRoot('root');
        this.expectedNext = false;
        this.skipSpace = true;
        this.re = new RegExp("^(?:" + tokenRe + ")", 'i');
        let subQuery = '',
            argument = '';

        while (this.next()) {
            if (!this.isExpectedNext() && isStatement(this.token) && !this.tree.hasOwnProperty(toLower(this.token))) {
                if (!isClosured(argument)) {
                    argument += this.appendToken(argument);
                    continue;
                }
                if (argument.length > 0) {
                    this.push(argument);
                    argument = '';
                }
                this.setRoot(this.token);
            } else if (this.token === ',' && isClosured(argument)) {
                this.push(argument);
                argument = '';
                if (this.rootToken === 'where') {
                    this.push(this.token);
                }
                this.expectedNext = true;
            } else if (isClosureChars(this.token) && this.rootToken === 'from') {
                subQuery = betweenBraces(this._s);
                if (!isTableFunc(argument)) {
                    this.tree[this.rootToken] = toAST(subQuery);
                } else {
                    this.push(argument + '(' + subQuery + ')');
                    argument = '';
                }
                this._s = this._s.substring(subQuery.length + 1);
            } else if (isMacroFunc(this.token)) {
                let func = this.token;
                if (!this.next()) {
                    throw("wrong function signature for `" + func + "` at [" + this._s + "]");
                }

                subQuery = betweenBraces(this._s);
                let subAST = toAST(subQuery);
                if (isSet(subAST, 'root')) {
                    this.tree[func] = subAST['root'].map(function (item) {
                        return item;
                    });
                } else {
                    this.tree[func] = subAST;
                }
                this._s = this._s.substring(subQuery.length + 1);

                // macro funcs are used instead of SELECT statement
                this.tree['select'] = [];
            } else if (isIn(this.token)) {
                argument += ' ' + this.token;
                if (!this.next()) {
                    throw("wrong in signature for `" + argument + "` at [" + this._s + "]");
                }

                if (isClosureChars(this.token)) {
                    subQuery = betweenBraces(this._s);
                    let subAST = toAST(subQuery);
                    if (isSet(subAST, 'root')) {
                        argument += ' (' + subAST['root'].map(function (item) {
                            return item;
                        });
                        argument = argument + ')';
                    } else {
                        argument += ' (' + newLine + print(subAST, tabSize) + ')';
                        this.push(argument);
                        argument = '';
                    }
                    this._s = this._s.substring(subQuery.length + 1);
                } else {
                    argument += ' ' + this.token;
                }
            } else if (isCond(this.token) && (this.rootToken === 'where' || this.rootToken === 'prewhere')) {
                if (isClosured(argument)) {
                    this.push(argument);
                    argument = this.token;
                } else {
                    argument += ' ' + this.token;
                }
            } else if (isJoin(this.token)) {
                argument = this.parseJOIN(argument);
            } else if (this.rootToken === 'union all') {
                let statement = 'union all';
                this._s = this.token + ' ' + this._s;
                let subQueryPos = this._s.toLowerCase().indexOf(statement);
                while (subQueryPos !== -1) {
                    let subQuery = this._s.substring(0, subQueryPos);
                    let ast = toAST(subQuery);
                    this.tree[statement].push(ast);
                    this._s = this._s.substring(subQueryPos + statement.length, this._s.length);
                    subQueryPos = this._s.toLowerCase().indexOf(statement);
                }
                let ast = toAST(this._s);
                this._s = '';
                this.tree[statement].push(ast);
            } else if (isComment(this.token)) {
                //comment is part of push element, and will be add after next statement
                argument += this.token + "\n";
            } else if (isClosureChars(this.token) || this.token === '.') {
                argument += this.token;
            } else if (this.token === ',') {
                argument += this.token + ' ';
            } else {
                argument += this.appendToken(argument);
            }
        }

        if (argument !== '') {
            this.push(argument);
        }
        return this.tree;
    }

    parseJOIN(argument) {
        if (!this.tree.hasOwnProperty('join')) {
            this.tree['join'] = [];
        }
        let joinType = this.token, source;
        if (!this.next()) {
            throw("wrong join signature for `" + joinType + "` at [" + this._s + "]");
        }

        if (isClosureChars(this.token)) {
            let subQuery = betweenBraces(this._s);
            source = toAST(subQuery);
            this._s = this._s.substring(subQuery.length + 1);
            this.token = "";
        } else {
            source = "";
            do {
                if (isID(this.token) && !isTable(source) && this.token.toUpperCase() !== "AS" && !onJoinTokenOnlyRe.test(this.token)) {
                    source += this.token;
                } else if (isMacro(this.token)) {
                    source += this.token;
                } else if (this.token === ".") {
                    source += this.token;
                } else {
                    break;
                }
            } while ( (joinType.toUpperCase().indexOf('ARRAY JOIN') === -1 && this.expectNext()) || this.next());
            if (this.token===source) {
                this.token = "";
            }
            source = [source];
        }
        let joinAST = {type: joinType, source: source, aliases: [], using: [], on: []};
        do {
            if (this.token !== "" && !onJoinTokenOnlyRe.test(this.token)) {
                joinAST.aliases.push(this.token);
            } else if (onJoinTokenOnlyRe.test(this.token)) {
                break;
            }
        } while ( (joinType.toUpperCase().indexOf('ARRAY JOIN') === -1 && this.expectNext()) || this.next());
        const joinExprToken = toLower(this.token);
        let joinConditions = "";
        while (this.next()) {
            if (isStatement(this.token)) {
                if (argument !== '') {
                    this.push(argument);
                    argument = '';
                }
                this.setRoot(this.token);
                break;
            }
            if (isJoin(this.token)) {
                if (joinConditions !== "") {
                    joinAST.on.push(joinConditions);
                    joinConditions = "";
                }
                this.tree['join'].push(joinAST);
                joinAST = null;
                argument = this.parseJOIN(argument);
                break;
            }

            if (joinExprToken === 'using') {
                if (!isID(this.token)) {
                    continue;
                }
                joinAST.using.push(this.token);
            } else {
                if (isCond(this.token)) {
                    joinConditions += " " + this.token.toUpperCase() + " ";
                } else {
                    joinConditions += this.token;
                }
            }
        }
        if (joinAST != null) {
            if (joinConditions !== "") {
                joinAST.on.push(joinConditions);
            }
            this.tree['join'].push(joinAST);
        }
        return argument;
    }

    removeComments(query) {
        return query.replace(new RegExp(commentRe,'g'), '');
    }
}

const wsRe = "\\s+",
    commentRe = "--[^\n]*|/\\*(?:[^*]|\\*[^/])*\\*/",
    idRe = "[a-zA-Z_][a-zA-Z_0-9]*",
    intRe = "\\d+",
    powerIntRe = "\\d+e\\d+",
    floatRe = "\\d+\\.\\d*|\\d*\\.\\d+|\\d+[eE][-+]\\d+",
    stringRe = "('(?:[^'\\\\]|\\\\.)*')|(`(?:[^`\\\\]|\\\\.)*`)|(\"(?:[^\"\\\\]|\\\\.)*\")",
    binaryOpRe = "=>|\\|\\||>=|<=|==|!=|<>|->|[-+/%*=<>\\.!]",
    statementRe = "\\b(with|select|from|where|having|order by|group by|limit|format|prewhere|union all)\\b",
    // look https://clickhouse.tech/docs/en/sql-reference/statements/select/join/
    // [GLOBAL] [ANY|ALL] [INNER|LEFT|RIGHT|FULL|CROSS] [OUTER] JOIN
    joinsRe = "\\b(" +
        "left\\s+array\\s+join|" +
        "array\\s+join|" +
        "global\\s+any\\s+inner\\s+outer\\s+join|" +
        "global\\s+any\\s+inner\\s+join|" +
        "global\\s+any\\s+left\\s+outer\\s+join|" +
        "global\\s+any\\s+left\\s+join|" +
        "global\\s+any\\s+right\\s+outer\\s+join|" +
        "global\\s+any\\s+right\\s+join|" +
        "global\\s+any\\s+full\\s+outer\\s+join|" +
        "global\\s+any\\s+full\\s+join|" +
        "global\\s+any\\s+cross\\s+outer\\s+join|" +
        "global\\s+any\\s+cross\\s+join|" +
        "global\\s+any\\s+outer\\s+join|" +
        "global\\s+any\\s+join|" +
        "global\\s+all\\s+inner\\s+outer\\s+join|" +
        "global\\s+all\\s+inner\\s+join|" +
        "global\\s+all\\s+left\\s+outer\\s+join|" +
        "global\\s+all\\s+left\\s+join|" +
        "global\\s+all\\s+right\\s+outer\\s+join|" +
        "global\\s+all\\s+right\\s+join|" +
        "global\\s+all\\s+full\\s+outer\\s+join|" +
        "global\\s+all\\s+full\\s+join|" +
        "global\\s+all\\s+cross\\s+outer\\s+join|" +
        "global\\s+all\\s+cross\\s+join|" +
        "global\\s+all\\s+outer\\s+join|" +
        "global\\s+all\\s+join|" +
        "global\\s+inner\\s+outer\\s+join|" +
        "global\\s+inner\\s+join|" +
        "global\\s+left\\s+outer\\s+join|" +
        "global\\s+left\\s+join|" +
        "global\\s+right\\s+outer\\s+join|" +
        "global\\s+right\\s+join|" +
        "global\\s+full\\s+outer\\s+join|" +
        "global\\s+full\\s+join|" +
        "global\\s+cross\\s+outer\\s+join|" +
        "global\\s+cross\\s+join|" +
        "global\\s+outer\\s+join|" +
        "global\\s+join|" +
        "any\\s+inner\\s+outer\\s+join|" +
        "any\\s+inner\\s+join|" +
        "any\\s+left\\s+outer\\s+join|" +
        "any\\s+left\\s+join|" +
        "any\\s+right\\s+outer\\s+join|" +
        "any\\s+right\\s+join|" +
        "any\\s+full\\s+outer\\s+join|" +
        "any\\s+full\\s+join|" +
        "any\\s+cross\\s+outer\\s+join|" +
        "any\\s+cross\\s+join|" +
        "any\\s+outer\\s+join|" +
        "any\\s+join|" +
        "all\\s+inner\\s+outer\\s+join|" +
        "all\\s+inner\\s+join|" +
        "all\\s+left\\s+outer\\s+join|" +
        "all\\s+left\\s+join|" +
        "all\\s+right\\s+outer\\s+join|" +
        "all\\s+right\\s+join|" +
        "all\\s+full\\s+outer\\s+join|" +
        "all\\s+full\\s+join|" +
        "all\\s+cross\\s+outer\\s+join|" +
        "all\\s+cross\\s+join|" +
        "all\\s+outer\\s+join|" +
        "all\\s+join|" +
        "inner\\s+outer\\s+join|" +
        "inner\\s+join|" +
        "left\\s+outer\\s+join|" +
        "left\\s+join|" +
        "right\\s+outer\\s+join|" +
        "right\\s+join|" +
        "full\\s+outer\\s+join|" +
        "full\\s+join|" +
        "cross\\s+outer\\s+join|" +
        "cross\\s+join|" +
        "outer\\s+join|" +
        "join" +
        ")\\b",
    onJoinTokenRe = '\\b(using|on)\\b',
    tableNameRe = '([A-Za-z0-9_]+|[A-Za-z0-9_]+\\.[A-Za-z0-9_]+)',
    macroFuncRe = "(\\$rateColumns|\\$perSecondColumns|\\$rate|\\$perSecond|\\$columns)",
    condRe = "\\b(or|and)\\b",
    inRe = "\\b(global in|global not in|not in|in)\\b",
    closureRe = "[\\(\\)\\[\\]]",
    specCharsRe = "[,?:]",
    macroRe = "\\$[A-Za-z0-9_$]+",
    skipSpaceRe = "[\\(\\.! \\[]",

    tableFuncRe = "\\b(remote|remoteSecure|cluster|clusterAllReplicas|merge|numbers|url|mysql|jdbc|odbc|hdfs|input|generateRandom)\\b",
    builtInFuncRe = "\\b(avg|countIf|first|last|max|min|sum|sumIf|ucase|lcase|mid|round|rank|now|" +
        "coalesce|ifnull|isnull|nvl|count|timeSlot|yesterday|today|now|toRelativeSecondNum|" +
        "toRelativeMinuteNum|toRelativeHourNum|toRelativeDayNum|toRelativeWeekNum|toRelativeMonthNum|" +
        "toRelativeYearNum|toTime|toStartOfHour|toStartOfFiveMinute|toStartOfMinute|toStartOfYear|" +
        "toStartOfQuarter|toStartOfMonth|toMonday|toSecond|toMinute|toHour|toDayOfWeek|toDayOfMonth|" +
        "toMonth|toYear|toFixedString|toStringCutToZero|reinterpretAsString|reinterpretAsDate|" +
        "reinterpretAsDateTime|reinterpretAsFloat32|reinterpretAsFloat64|reinterpretAsInt8|" +
        "reinterpretAsInt16|reinterpretAsInt32|reinterpretAsInt64|reinterpretAsUInt8|" +
        "reinterpretAsUInt16|reinterpretAsUInt32|reinterpretAsUInt64|toUInt8|toUInt16|toUInt32|" +
        "toUInt64|toInt8|toInt16|toInt32|toInt64|toFloat32|toFloat64|toDate|toDateTime|toString|" +
        "bitAnd|bitOr|bitXor|bitNot|bitShiftLeft|bitShiftRight|abs|negate|modulo|intDivOrZero|" +
        "intDiv|divide|multiply|minus|plus|empty|notEmpty|length|lengthUTF8|lower|upper|lowerUTF8|" +
        "upperUTF8|reverse|reverseUTF8|concat|substring|substringUTF8|appendTrailingCharIfAbsent|" +
        "position|positionUTF8|match|extract|extractAll|like|notLike|replaceOne|replaceAll|" +
        "replaceRegexpOne|range|arrayElement|has|indexOf|countEqual|arrayEnumerate|arrayEnumerateUniq|" +
        "arrayJoin|arrayMap|arrayFilter|arrayExists|arrayCount|arrayAll|arrayFirst|arraySum|splitByChar|" +
        "splitByString|alphaTokens|domainWithoutWWW|topLevelDomain|firstSignificantSubdomain|" +
        "cutToFirstSignificantSubdomain|queryString|URLPathHierarchy|URLHierarchy|extractURLParameterNames|" +
        "extractURLParameters|extractURLParameter|queryStringAndFragment|cutWWW|cutQueryString|" +
        "cutFragment|cutQueryStringAndFragment|cutURLParameter|IPv4NumToString|IPv4StringToNum|" +
        "IPv4NumToStringClassC|IPv6NumToString|IPv6StringToNum|rand|rand64|halfMD5|MD5|sipHash64|" +
        "sipHash128|cityHash64|intHash32|intHash64|SHA1|SHA224|SHA256|URLHash|hex|unhex|bitmaskToList|" +
        "bitmaskToArray|floor|ceil|round|roundToExp2|roundDuration|roundAge|regionToCountry|" +
        "regionToContinent|regionToPopulation|regionIn|regionHierarchy|regionToName|OSToRoot|OSIn|" +
        "OSHierarchy|SEToRoot|SEIn|SEHierarchy|dictGetUInt8|dictGetUInt16|dictGetUInt32|" +
        "dictGetUInt64|dictGetInt8|dictGetInt16|dictGetInt32|dictGetInt64|dictGetFloat32|" +
        "dictGetFloat64|dictGetDate|dictGetDateTime|dictGetString|dictGetHierarchy|dictHas|dictIsIn|" +
        "argMin|argMax|uniqCombined|uniqHLL12|uniqExact|uniqExactIf|groupArray|groupUniqArray|quantile|" +
        "quantileDeterministic|quantileTiming|quantileTimingWeighted|quantileExact|" +
        "quantileExactWeighted|quantileTDigest|median|quantiles|varSamp|varPop|stddevSamp|stddevPop|" +
        "covarSamp|covarPop|corr|sequenceMatch|sequenceCount|uniqUpTo|avgIf|" +
        "quantilesTimingIf|argMinIf|uniqArray|sumArray|quantilesTimingArrayIf|uniqArrayIf|medianIf|" +
        "quantilesIf|varSampIf|varPopIf|stddevSampIf|stddevPopIf|covarSampIf|covarPopIf|corrIf|" +
        "uniqArrayIf|sumArrayIf|uniq)\\b",
    operatorRe = "\\b(select|group by|order by|from|where|limit|offset|having|as|" +
        "when|else|end|type|left|right|on|outer|desc|asc|primary|key|between|" +
        "foreign|not|null|inner|cross|natural|database|prewhere|using|global|in)\\b",
    dataTypeRe = "\\b(int|numeric|decimal|date|varchar|char|bigint|float|double|bit|binary|text|set|timestamp|" +
        "money|real|number|integer|" +
        "uint8|uint16|uint32|uint64|int8|int16|int32|int64|float32|float64|datetime|enum8|enum16|" +
        "array|tuple|string)\\b",

    wsOnlyRe = new RegExp("^(?:" + wsRe + ")$"),
    commentOnlyRe = new RegExp("^(?:" + commentRe + ")$"),
    idOnlyRe = new RegExp("^(?:" + idRe + ")$"),
    closureOnlyRe = new RegExp("^(?:" + closureRe + ")$"),
    macroFuncOnlyRe = new RegExp("^(?:" + macroFuncRe + ")$"),
    statementOnlyRe = new RegExp("^(?:" + statementRe + ")$", 'i'),
    joinsOnlyRe = new RegExp("^(?:" + joinsRe + ")$", 'i'),
    onJoinTokenOnlyRe = new RegExp("^(?:" + onJoinTokenRe + ")$", 'i'),
    tableNameOnlyRe = new RegExp("^(?:" + tableNameRe + ")$", 'i'),
    operatorOnlyRe = new RegExp("^(?:" + operatorRe + ")$", 'i'),
    dataTypeOnlyRe = new RegExp("^(?:" + dataTypeRe + ")$"),
    builtInFuncOnlyRe = new RegExp("^(?:" + builtInFuncRe + ")$"),
    tableFuncOnlyRe = new RegExp("^(?:" + tableFuncRe + ")$", 'i'),
    macroOnlyRe = new RegExp("^(?:" + macroRe + ")$", 'i'),
    inOnlyRe = new RegExp("^(?:" + inRe + ")$", 'i'),
    condOnlyRe = new RegExp("^(?:" + condRe + ")$", 'i'),
    numOnlyRe = new RegExp("^(?:" + [powerIntRe, intRe, floatRe].join("|") + ")$"),
    stringOnlyRe = new RegExp("^(?:" + stringRe + ")$"),
    skipSpaceOnlyRe = new RegExp("^(?:" + skipSpaceRe + ")$"),
    binaryOnlyRe = new RegExp("^(?:" + binaryOpRe + ")$");

const tokenRe = [statementRe, macroFuncRe, joinsRe, inRe, wsRe, commentRe, idRe, stringRe, powerIntRe, floatRe, intRe,
    binaryOpRe, closureRe, specCharsRe, macroRe].join("|");

function isSkipSpace(token) {
    return skipSpaceOnlyRe.test(token);
}

function isCond(token) {
    return condOnlyRe.test(token);
}

function isIn(token) {
    return inOnlyRe.test(token);
}

function isJoin(token) {
    return joinsOnlyRe.test(token);
}

function isTable(token) {
    return tableNameOnlyRe.test(token);
}

function isWS(token) {
    return wsOnlyRe.test(token);
}

function isMacroFunc(token) {
    return macroFuncOnlyRe.test(token);
}

function isMacro(token) {
    return macroOnlyRe.test(token);
}

function isComment(token) {
    return commentOnlyRe.test(token);
}

function isID(token) {
    return idOnlyRe.test(token);
}

function isStatement(token) {
    return statementOnlyRe.test(token);
}

function isOperator(token) {
    return operatorOnlyRe.test(token);
}

function isDataType(token) {
    return dataTypeOnlyRe.test(token);
}

function isBuiltInFunc(token) {
    return builtInFuncOnlyRe.test(token);
}

function isTableFunc(token) {
    return tableFuncOnlyRe.test(token);
}

function isClosureChars(token) {
    return closureOnlyRe.test(token);
}

function isNum(token) {
    return numOnlyRe.test(token);
}

function isString(token) {
    return stringOnlyRe.test(token);
}

function isBinary(token) {
    return binaryOnlyRe.test(token);
}

const tabSize = '    ', // 4 spaces
    newLine = '\n';

function printItems(items, tab = '', separator = '') {
    let result = '';
    if (isArray(items)) {
        if (items.length === 1) {
            result += ' ' + items[0] + newLine;
        } else {
            result += newLine;
            items.forEach(function (item, i) {
                result += tab + tabSize + item;
                if (i !== items.length - 1) {
                    result += separator;
                    result += newLine;
                }
            });
        }
    } else {
        result = newLine + '(' + newLine + print(items, tab + tabSize) + newLine + ')';
    }

    return result;
}

function toAST(s) {
    let scanner = new Scanner(s);
    return scanner.toAST();
}

function isSet(obj, prop) {
    return obj.hasOwnProperty(prop) && !isEmpty(obj[prop]);
}

function isClosured(argument) {
    return (argument.match(/\(/g) || []).length === (argument.match(/\)/g) || []).length;
}

function betweenBraces(query) {
    let openBraces = 1, subQuery = '';
    for (let i = 0; i < query.length; i++) {
        if (query.charAt(i) === '(') {
            openBraces++;
        }
        if (query.charAt(i) === ')') {
            if (openBraces === 1) {
                subQuery = query.substring(0, i);
                break;
            }
            openBraces--;
        }
    }
    return subQuery;
}

// see https://clickhouse.tech/docs/en/sql-reference/statements/select/
function print(AST, tab = '') {
    let result = '';
    if (isSet(AST, 'root')) {
        result += printItems(AST.root, "\n", "\n");
    }

    if (isSet(AST, '$rate')) {
        result += tab + '$rate(';
        result += printItems(AST.$rate, tab, ',') + ')';
    }

    if (isSet(AST, '$perSecond')) {
        result += tab + '$perSecond(';
        result += printItems(AST.$perSecond, tab, ',') + ')';
    }

    if (isSet(AST, '$perSecondColumns')) {
        result += tab + '$perSecondColumns(';
        result += printItems(AST.$perSecondColumns, tab, ',') + ')';
    }

    if (isSet(AST, '$columns')) {
        result += tab + '$columns(';
        result += printItems(AST.$columns, tab, ',') + ')';
    }

    if (isSet(AST, '$rateColumns')) {
        result += tab + '$rateColumns(';
        result += printItems(AST.$rateColumns, tab, ',') + ')';
    }

    if (isSet(AST, 'with')) {
        result += tab + 'WITH';
        result += printItems(AST.with, tab, ',');
    }

    if (isSet(AST, 'select')) {
        result += tab + 'SELECT';
        result += printItems(AST.select, tab, ',');
    }

    if (isSet(AST, 'from')) {
        result += newLine + tab + 'FROM';
        result += printItems(AST.from, tab);
    }

    if (isSet(AST, 'aliases')) {
        result += printItems(AST.aliases, '', ' ');
    }

    if (isSet(AST, 'join')) {
        AST.join.forEach(function (item) {
            result += newLine + tab + item.type.toUpperCase() + printItems(item.source, tab) + ' ' + printItems(item.aliases, '', ' ');
            if (item.using.length > 0) {
                result += ' USING ' + printItems(item.using, '', ' ');
            } else if (item.on.length > 0) {
                result += ' ON ' + printItems(item.on, tab, ' ');
            }
        });
    }

    if (isSet(AST, 'prewhere')) {
        result += newLine + tab + 'PREWHERE';
        result += printItems(AST.prewhere, tab);
    }

    if (isSet(AST, 'where')) {
        result += newLine + tab + 'WHERE';
        result += printItems(AST.where, tab);
    }

    if (isSet(AST, 'group by')) {
        result += newLine + tab + 'GROUP BY';
        result += printItems(AST['group by'], tab, ',');
    }

    if (isSet(AST, 'having')) {
        result += newLine + tab + 'HAVING';
        result += printItems(AST.having, tab);
    }

    if (isSet(AST, 'order by')) {
        result += newLine + tab + 'ORDER BY';
        result += printItems(AST['order by'], tab, ',');
    }

    if (isSet(AST, 'limit')) {
        result += newLine + tab + 'LIMIT';
        result += printItems(AST.limit, tab, ',');
    }

    if (isSet(AST, 'union all')) {
        AST['union all'].forEach(function (v) {
            result += newLine + newLine + tab + 'UNION ALL' + newLine + newLine;
            result += print(v, tab);
        });
    }

    if (isSet(AST, 'format')) {
        result += newLine + tab + 'FORMAT';
        result += printItems(AST.format, tab);
    }

    return result;
}
