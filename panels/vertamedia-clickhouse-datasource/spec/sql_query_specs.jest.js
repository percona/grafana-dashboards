import SqlQuery from '../src/sql_query';
import moment from "moment";
import { RawTimeRangeStub } from './lib/raw_time_range_stub';
import TemplateSrvStub from './lib/template_srv_stub';
describe("Query SELECT with $timeFilterByColumn and range with from and to:", function () {
    var query = "SELECT * FROM table WHERE $timeFilterByColumn(column_name)";
    var range = {
        from: moment('2018-12-24 01:02:03Z'),
        to: moment('2018-12-31 23:59:59Z'),
        raw: RawTimeRangeStub,
    };
    it("gets replaced with BETWEEN filter", function () {
        expect(SqlQuery.replaceTimeFilters(query, range, 'DATETIME'))
            .toBe('SELECT * FROM table WHERE column_name BETWEEN toDateTime(1545613323) AND toDateTime(1546300799)');
    });
});
describe("Query SELECT with $timeFilterByColumn and range with from", function () {
    var query = "SELECT * FROM table WHERE $timeFilterByColumn(column_name)";
    var range = {
        from: moment('2018-12-24 01:02:03Z'),
        to: moment(),
        raw: {
            from: moment('2018-12-24 01:02:03Z'),
            to: 'now',
        },
    };
    it("gets replaced with >= filter", function () {
        expect(SqlQuery.replaceTimeFilters(query, range, 'DATETIME')).toBe('SELECT * FROM table WHERE column_name >= toDateTime(1545613323)');
    });
});
describe("$unescape", function () {
    var query = "SELECT $unescape('count()'), " +
        "$unescape('if(runningDifference(max_0) < 0, nan, " +
        "runningDifference(max_0) / runningDifference(t/1000)) AS max_0_Rate') " +
        "FROM requests WHERE $unescape('client_ID') = 5";
    var expQuery = "SELECT count(), if(runningDifference(max_0) < 0, " +
        "nan, runningDifference(max_0) / runningDifference(t/1000)) AS max_0_Rate " +
        "FROM requests WHERE client_ID = 5";
    it("gets replaced with >= filter", function () {
        expect(SqlQuery.unescape(query)).toBe(expQuery);
    });
});
describe("Identifiers back-quoting", function () {
    it("Standard identifier - untouched", function () {
        expect(SqlQuery.escapeIdentifier("My_Identifier_33")).toBe("My_Identifier_33");
    });
    it("Begining with number", function () {
        expect(SqlQuery.escapeIdentifier("1nfoVista")).toBe("\"1nfoVista\"");
    });
    it("Containing spaces", function () {
        expect(SqlQuery.escapeIdentifier("My Identifier")).toBe("\"My Identifier\"");
    });
    it("Containing arithmetic operation special characters", function () {
        expect(SqlQuery.escapeIdentifier("a / 1000")).toBe("a / 1000");
        expect(SqlQuery.escapeIdentifier("a + b")).toBe("a + b");
        expect(SqlQuery.escapeIdentifier("b - c")).toBe("b - c");
        expect(SqlQuery.escapeIdentifier("5*c")).toBe("5*c");
        expect(SqlQuery.escapeIdentifier("a / 1000 + b - 5*c")).toBe("a / 1000 + b - 5*c");
        expect(SqlQuery.escapeIdentifier("a / 1000 + b - 5*c")).toBe("a / 1000 + b - 5*c");
    });
    it("Containing double-quote", function () {
        expect(SqlQuery.escapeIdentifier("My\"Bad\"Identifier")).toBe("\"My\\\"Bad\\\"Identifier\"");
    });
    it("Containing function calls", function () {
        expect(SqlQuery.escapeIdentifier("toDateTime(someDate)")).toBe("toDateTime(someDate)");
    });
});
/* check https://github.com/Vertamedia/clickhouse-grafana/issues/276 */
describe("$rateColumns and subquery + $conditionalTest + SqlQuery.replace + adhocFilters", function () {
    var query = "$rateColumns(\n" +
        "    'User.' || toString(from_user) || ', Serv.' || toString(service_name) as key,\n" +
        "    sum(count) as value\n" +
        ") FROM\n" +
        "(\n" +
        "    SELECT\n" +
        "        toStartOfMinute(event_time) AS event_time,\n" +
        "        service_name,\n" +
        "        from_user,\n" +
        "        count() as count\n" +
        "    FROM $table\n" +
        "\n" +
        "    WHERE\n" +
        "        $timeFilter\n" +
        "        $conditionalTest(AND toLowerCase(service_name) IN ($repeated_service),$repeated_service)\n" +
        "    GROUP BY\n" +
        "        event_time,\n" +
        "        from_user,\n" +
        "        service_name\n" +
        ")";
    var expQuery = "SELECT t, arrayMap(a -> (a.1, a.2/runningDifference( t/1000 )), groupArr) FROM (" +
        "SELECT t, groupArray((key, value)) AS groupArr FROM ( " +
        "SELECT (intDiv(toUInt32(event_time), 20) * 20) * 1000 AS t, 'User.' || toString(from_user) || ', Serv.' || toString(service_name) as key, " +
        "sum(count) as value FROM\n" +
        "(\n" +
        "    SELECT\n" +
        "        toStartOfMinute(event_time) AS event_time,\n" +
        "        service_name,\n" +
        "        from_user,\n" +
        "        count() as count\n" +
        "    FROM default.test_grafana\n" +
        "\n" +
        "    WHERE event_date BETWEEN toDate(1545613320) AND toDate(1546300740) AND event_time BETWEEN toDateTime(1545613320) AND toDateTime(1546300740) AND\n" +
        "        event_date BETWEEN toDate(1545613320) AND toDate(1546300740) AND event_time BETWEEN toDateTime(1545613320) AND toDateTime(1546300740)\n" +
        "        AND toLowerCase(service_name) IN ('mysql','postgresql')\n" +
        "        AND test = 'value'\n" +
        "        AND test2 LIKE '%value%'\n" +
        "        AND test3 NOT LIKE '%value%'\n" +
        "    GROUP BY\n" +
        "        event_time,\n" +
        "        from_user,\n" +
        "        service_name\n" +
        ") GROUP BY t, key ORDER BY t, key) GROUP BY t ORDER BY t)";
    var templateSrv = new TemplateSrvStub();
    templateSrv.variables = [
        {
            name: "repeated_service",
            type: "query",
            current: {
                value: ["mysql", "postgresql"],
            },
            options: [
                { selected: false, value: "$__all" },
                { selected: true, value: "mysql" },
                { selected: true, value: "postgresql" },
            ]
        },
    ];
    var adhocFilters = [
        {
            key: "test",
            operator: "=",
            value: "value"
        },
        {
            key: "test2",
            operator: "=~",
            value: "%value%"
        },
        {
            key: "test3",
            operator: "!~",
            value: "%value%"
        },
    ];
    var target = {
        query: query,
        interval: "20s",
        intervalFactor: 1,
        skip_comments: false,
        table: "test_grafana",
        database: "default",
        dateTimeType: "DATETIME",
        dateColDataType: "event_date",
        dateTimeColDataType: "event_time",
        round: "1m",
        rawQuery: "",
    };
    var options = {
        rangeRaw: {
            from: moment('2018-12-24 01:02:03Z'),
            to: moment('2018-12-31 23:59:59Z'),
        },
        range: {
            from: moment('2018-12-24 01:02:03Z'),
            to: moment('2018-12-31 23:59:59Z'),
        },
        scopedVars: {
            __interval: {
                text: "20s",
                value: "20s",
            },
            __interval_ms: {
                text: "20000",
                value: 20000,
            },
            repeated_service: {
                value: ['mysql', 'postgresql'],
                multi: true,
                includeAll: true,
                options: [
                    { selected: false, value: "$__all" },
                    { selected: true, value: "mysql" },
                    { selected: true, value: "postgresql" },
                ]
            },
        },
    };
    var sql_query = new SqlQuery(target, templateSrv, options);
    it("applyMacros with subQuery and adHocFilters", function () {
        expect(sql_query.replace(options, adhocFilters)).toBe(expQuery);
    });
});
//# sourceMappingURL=sql_query_specs.jest.js.map