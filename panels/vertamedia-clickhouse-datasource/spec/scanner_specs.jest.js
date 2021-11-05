System.register(["test/lib/common", "./../scanner"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var common_1, scanner_1;
    return {
        setters: [
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (scanner_1_1) {
                scanner_1 = scanner_1_1;
            }
        ],
        execute: function () {
            common_1.describe("scanner:", function () {
                common_1.describe("highlight", function () {
                    var query = "SELECT $timeSeries as t, count() FROM $table WHERE $timeFilter GROUP BY t ORDER BY t", expectedHighlight = '<font color="darkorange">SELECT</font> <font color="darkcyan">' +
                        '$timeSeries</font> <font color="darkorange">as</font> t, <font color="navajowhite">' +
                        'count</font>() <font color="darkorange">FROM</font> <font color="darkcyan">$table' +
                        '</font> <font color="darkorange">WHERE</font> <font color="darkcyan">$timeFilter' +
                        '</font> <font color="darkorange">GROUP BY</font> t <font color="darkorange">ORDER BY</font> t';
                    var scanner = new scanner_1.default(query);
                    common_1.it("expects equality", function () {
                        common_1.expect(scanner.Highlight()).toBe(expectedHighlight);
                    });
                });
                common_1.describe("AST case 1", function () {
                    var query = "SELECT EventDate, col1, col2, toUInt32(col1 > 0 ? col2/col1*10000 : 0)/100 AS percent " +
                        "FROM ( SELECT   EventDate,   col1,   countIf(col2 GLOBAL IN some_table) AS col2_shared,   " +
                        "count() AS col_count,   uniqCombinedIf(col3, col3 GLOBAL IN some_table) AS col3_shared,   " +
                        "uniqCombined(col3) AS unique_col3 FROM   general_table_all PREWHERE   Event IN ('type1')   " +
                        "AND EventDate <= '2016-12-20'   WHERE     (EventDate, col1) GLOBAL IN some_table GROUP BY   " +
                        "EventDate, col1) GLOBAL ANY LEFT JOIN ( SELECT   EventDate,   col1,   countIf(col2 GLOBAL IN some_table) " +
                        "AS col2_shared,   count() AS col_count,   uniqCombinedIf(col3, col3 GLOBAL IN some_table) AS col3_shared,   " +
                        "uniqCombined(col3) AS unique_col3 FROM   general_table_all PREWHERE   Event IN ('type2')   " +
                        "AND EventDate <= '2016-12-20' WHERE   (EventDate, col1) GLOBAL IN some_table   " +
                        "AND col4 GLOBAL IN some_table GROUP BY   EventDate, col1) USING EventDate, col1 " +
                        "ORDER BY EventDate, col1 FORMAT CSVWithNames", scanner = new scanner_1.default(query);
                    var expectedAST = {
                        "root": [],
                        "select": [
                            "EventDate",
                            "col1",
                            "col2",
                            "toUInt32(col1 > 0 ? col2 / col1 * 10000 : 0) / 100 AS percent"
                        ],
                        "from": {
                            "root": [],
                            "select": [
                                "EventDate",
                                "col1",
                                "countIf(col2 GLOBAL IN some_table) AS col2_shared",
                                "count() AS col_count",
                                "uniqCombinedIf(col3,  col3 GLOBAL IN some_table) AS col3_shared",
                                "uniqCombined(col3) AS unique_col3"
                            ],
                            "from": [
                                "general_table_all"
                            ],
                            "prewhere": [
                                "Event IN ('type1')",
                                "AND EventDate <= '2016-12-20'"
                            ],
                            "where": [
                                "(EventDate,  col1) GLOBAL IN some_table"
                            ],
                            "group by": [
                                "EventDate",
                                "col1"
                            ]
                        },
                        "join": {
                            "type": "GLOBAL ANY LEFT JOIN",
                            "source": {
                                "root": [],
                                "select": [
                                    "EventDate",
                                    "col1",
                                    "countIf(col2 GLOBAL IN some_table) AS col2_shared",
                                    "count() AS col_count",
                                    "uniqCombinedIf(col3,  col3 GLOBAL IN some_table) AS col3_shared",
                                    "uniqCombined(col3) AS unique_col3"
                                ],
                                "from": [
                                    "general_table_all"
                                ],
                                "prewhere": [
                                    "Event IN ('type2')",
                                    "AND EventDate <= '2016-12-20'"
                                ],
                                "where": [
                                    "(EventDate,  col1) GLOBAL IN some_table",
                                    "AND col4 GLOBAL IN some_table"
                                ],
                                "group by": [
                                    "EventDate",
                                    "col1"
                                ]
                            },
                            "using": [
                                "EventDate",
                                "col1",
                                "EventDate",
                                "col1"
                            ]
                        },
                        "format": [
                            "CSVWithNames"
                        ]
                    };
                    common_1.it("expects equality", function () {
                        common_1.expect(scanner.toAST()).toEqual(expectedAST);
                    });
                });
                common_1.describe("AST case 2", function () {
                    var query = "$rateColumns((AppType = '' ? 'undefined' : AppType) type, sum(Hits) hits) " +
                        "FROM table_all  WHERE Event = 'request' AND (-1 IN ($template) OR col IN ($template)) HAVING hits > $interval", scanner = new scanner_1.default(query);
                    var expectedAST = {
                        "root": [],
                        "$rateColumns": [
                            "(AppType = '' ? 'undefined' : AppType) type",
                            "sum(Hits) hits"
                        ],
                        "select": [],
                        "from": [
                            "table_all"
                        ],
                        "where": [
                            "Event = 'request'",
                            "AND(- 1 IN ($template) OR col IN ($template))"
                        ],
                        "having": [
                            "hits > $interval"
                        ]
                    };
                    common_1.it("expects equality", function () {
                        common_1.expect(scanner.toAST()).toEqual(expectedAST);
                    });
                });
                common_1.describe("AST case 3", function () {
                    var query = "SELECT $timeSeries as t, count() AS `SMALL` FROM db.table " +
                        "WHERE W0 <= 400 AND LastEvent>=1 AND $timeFilter GROUP BY t ORDER BY t", scanner = new scanner_1.default(query);
                    var expectedAST = {
                        "root": [],
                        "select": [
                            "$timeSeries as t",
                            "count() AS `SMALL`"
                        ],
                        "from": [
                            "db.table"
                        ],
                        "where": [
                            "W0 <= 400",
                            "AND LastEvent >= 1",
                            "AND $timeFilter"
                        ],
                        "group by": [
                            "t"
                        ],
                        "order by": [
                            "t"
                        ]
                    };
                    common_1.it("expects equality", function () {
                        common_1.expect(scanner.toAST()).toEqual(expectedAST);
                    });
                });
                common_1.describe("AST case 4", function () {
                    var query = "SELECT LogTime, Entity, Message FROM $table " +
                        "ANY LEFT JOIN (SELECT * FROM default.log_events) USING EventCode " +
                        "WHERE $timeFilter ORDER BY LogTime DESC LIMIT $__limit", scanner = new scanner_1.default(query);
                    var expectedAST = {
                        "root": [],
                        "select": [
                            "LogTime",
                            "Entity",
                            "Message"
                        ],
                        "from": [
                            "$table"
                        ],
                        "join": {
                            "type": "ANY LEFT JOIN",
                            "source": {
                                "root": [],
                                "select": [
                                    "*"
                                ],
                                "from": [
                                    "default.log_events"
                                ]
                            },
                            "using": [
                                "EventCode"
                            ]
                        },
                        "where": [
                            "$timeFilter"
                        ],
                        "order by": [
                            "LogTime DESC"
                        ],
                        "limit": [
                            "$__limit"
                        ]
                    };
                    common_1.it("expects equality", function () {
                        common_1.expect(scanner.toAST()).toEqual(expectedAST);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=scanner_specs.jest.jsst.js.map
