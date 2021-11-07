import SqlQuery, {TimeRange} from '../src/sql_query';
import moment from "moment";
import {RawTimeRangeStub} from './lib/raw_time_range_stub';
import TemplateSrvStub from './lib/template_srv_stub';

describe("Query SELECT with $timeFilterByColumn and range with from and to:", () => {
    const query = "SELECT * FROM table WHERE $timeFilterByColumn(column_name)";
    const range: TimeRange = {
        from: moment('2018-12-24 01:02:03Z'),
        to: moment('2018-12-31 23:59:59Z'),
        raw: RawTimeRangeStub,
    };

    it("gets replaced with BETWEEN filter", () => {
        expect(SqlQuery.replaceTimeFilters(query, range, 'DATETIME'))
            .toBe('SELECT * FROM table WHERE column_name >= toDateTime(1545613323) AND column_name <= toDateTime(1546300799)');
        expect(SqlQuery.replaceTimeFilters(query, range, 'DATETIME64'))
            .toBe('SELECT * FROM table WHERE toDateTime64(column_name, 3) >= toDateTime64(1545613323, 3) AND toDateTime64(column_name, 3) <= toDateTime64(1546300799, 3)');
    });
});

describe("Query SELECT with $timeFilterByColumn and range with from", () => {
    const query = "SELECT * FROM table WHERE $timeFilterByColumn(column_name)";
    const range: TimeRange = {
        from: moment('2018-12-24 01:02:03Z'),
        to: moment(),
        raw: {
            from: moment('2018-12-24 01:02:03Z'),
            to: 'now',
        },
    };

    it("gets replaced with >= filter", () => {
        expect(SqlQuery.replaceTimeFilters(query, range, 'DATETIME'))
            .toBe(
                'SELECT * FROM table WHERE ' +
                'column_name >= toDateTime(' + range.from.unix() + ') AND ' +
                'column_name <= toDateTime(' + range.to.unix() + ')'
            );
        expect(SqlQuery.replaceTimeFilters(query, range, 'DATETIME64'))
            .toBe(
                'SELECT * FROM table WHERE ' +
                'toDateTime64(column_name, 3) >= toDateTime64(' + range.from.unix() + ', 3) AND ' +
                'toDateTime64(column_name, 3) <= toDateTime64(' + range.to.unix() + ', 3)'
            );
    });
});


describe("Query SELECT with $timeSeries $timeFilter and DATETIME64", () => {
    const query = "SELECT $timeSeries as t, sum(x) AS metric\n" +
        "FROM $table\n" +
        "WHERE $timeFilter\n" +
        "GROUP BY t\n" +
        "ORDER BY t";
    const expQuery = "SELECT (intDiv(toFloat64(\"d\") * 1000, (15 * 1000)) * (15 * 1000)) as t, sum(x) AS metric\n" +
        "FROM default.test_datetime64\n" +
        "WHERE toDateTime64(\"d\", 3) >= toDateTime64(1545613320, 3) AND toDateTime64(\"d\", 3) <= toDateTime64(1546300740, 3)\n" +
        "GROUP BY t\n" +
        "ORDER BY t";
    let templateSrv = new TemplateSrvStub();
    const adhocFilters = [];
    let target = {
        query: query,
        interval: "15s",
        intervalFactor: 1,
        skip_comments: false,
        table: "test_datetime64",
        database: "default",
        dateTimeType: "DATETIME64",
        dateColDataType: "",
        dateTimeColDataType: "d",
        round: "1m",
        rawQuery: "",
    };
    const options = {
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
                text: "15s",
                value: "15s",
            },
            __interval_ms: {
                text: "15000",
                value: 15000,
            },
        },
    };
    let sql_query = new SqlQuery(target, templateSrv, options);
    it("applyMacros $timeSeries with $timeFilter with DATETIME64", () => {
        expect(sql_query.replace(options, adhocFilters)).toBe(expQuery);
    });
});

describe("$unescape", () => {
    const query = "SELECT $unescape('count()'), " +
        "$unescape('if(runningDifference(max_0) < 0, nan, " +
        "runningDifference(max_0) / runningDifference(t/1000)) AS max_0_Rate') " +
        "FROM requests WHERE $unescape('client_ID') = 5";
    const expQuery = "SELECT count(), if(runningDifference(max_0) < 0, " +
        "nan, runningDifference(max_0) / runningDifference(t/1000)) AS max_0_Rate " +
        "FROM requests WHERE client_ID = 5";
    it("gets replaced with >= filter", () => {
        expect(SqlQuery.unescape(query)).toBe(expQuery);
    });
});

describe("Identifiers back-quoting", () => {
    it("Standard identifier - untouched", () => {
        expect(SqlQuery.escapeIdentifier("My_Identifier_33")).toBe("My_Identifier_33");
    });
    it("Begining with number", () => {
        expect(SqlQuery.escapeIdentifier("1nfoVista")).toBe("\"1nfoVista\"");
    });
    it("Containing spaces", () => {
        expect(SqlQuery.escapeIdentifier("My Identifier")).toBe("\"My Identifier\"");
    });
    it("Containing arithmetic operation special characters", () => {
        expect(SqlQuery.escapeIdentifier("a / 1000")).toBe("a / 1000");
        expect(SqlQuery.escapeIdentifier("a + b")).toBe("a + b");
        expect(SqlQuery.escapeIdentifier("b - c")).toBe("b - c");
        expect(SqlQuery.escapeIdentifier("5*c")).toBe("5*c");
        expect(SqlQuery.escapeIdentifier("a / 1000 + b - 5*c")).toBe("a / 1000 + b - 5*c");
        expect(SqlQuery.escapeIdentifier("a / 1000 + b - 5*c")).toBe("a / 1000 + b - 5*c");
    });
    it("Containing double-quote", () => {
        expect(SqlQuery.escapeIdentifier("My\"Bad\"Identifier")).toBe("\"My\\\"Bad\\\"Identifier\"");
    });
    it("Containing function calls", () => {
        expect(SqlQuery.escapeIdentifier("toDateTime(someDate)")).toBe("toDateTime(someDate)");
    });
});

/* check https://github.com/Vertamedia/clickhouse-grafana/issues/276 */
describe("$rateColumns and subquery + $conditionalTest + SqlQuery.replace + adhocFilters", () => {
    const query = "$rateColumns(\n" +
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
    const expQuery = "SELECT t, arrayMap(a -> (a.1, a.2/runningDifference( t/1000 )), groupArr) FROM (" +
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
        "    WHERE event_date >= toDate(1545613320) AND event_date <= toDate(1546300740) AND event_time >= toDateTime(1545613320) AND event_time <= toDateTime(1546300740) AND\n" +
        "        event_date >= toDate(1545613320) AND event_date <= toDate(1546300740) AND event_time >= toDateTime(1545613320) AND event_time <= toDateTime(1546300740)\n" +
        "        AND toLowerCase(service_name) IN ('mysql','postgresql')\n" +
        "        AND test = 'value'\n" +
        "        AND test2 LIKE '%value%'\n" +
        "        AND test3 NOT LIKE '%value%'\n" +
        "    GROUP BY\n" +
        "        event_time,\n" +
        "        from_user,\n" +
        "        service_name\n" +
        ") GROUP BY t, key ORDER BY t, key) GROUP BY t ORDER BY t)";
    let templateSrv = new TemplateSrvStub();
    templateSrv.variables = [
        {
            name: "repeated_service",
            type: "query",
            current: {
                value: ["mysql", "postgresql"],
            },
            options: [
                {selected: false, value: "$__all"},
                {selected: true, value: "mysql"},
                {selected: true, value: "postgresql"},
            ]
        },
    ];
    const adhocFilters = [
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
    let target = {
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
    const options = {
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
                    {selected: false, value: "$__all"},
                    {selected: true, value: "mysql"},
                    {selected: true, value: "postgresql"},
                ]
            },
        },
    };
    let sql_query = new SqlQuery(target, templateSrv, options);

    it("applyMacros with subQuery and adHocFilters", () => {
        expect(sql_query.replace(options, adhocFilters)).toBe(expQuery);
    });
});

/* check https://github.com/Vertamedia/clickhouse-grafana/issues/282 */
describe("check replace with $adhoc macros", () => {
    const query = "SELECT\n" +
        "    $timeSeries as t,\n" +
        "    count()\n" +
        "FROM $table\n" +
        "WHERE $timeFilter AND $adhoc\n" +
        "GROUP BY t\n" +
        "ORDER BY t";
    const expQuery = "SELECT\n" +
        "    (intDiv(toUInt32(TimeFlowStart), 15) * 15) * 1000 as t,\n" +
        "    count()\n" +
        "FROM default.flows_raw\n\n" +
        "WHERE\n" +
        "    TimeFlowStart >= toDate(1545613320) AND TimeFlowStart <= toDate(1546300740) AND TimeFlowStart >= toDateTime(1545613320) AND TimeFlowStart <= toDateTime(1546300740)\n" +
        "    AND (SrcAS = 1299)\n" +
        "GROUP BY t\n\n" +
        "ORDER BY t\n";
    let templateSrv = new TemplateSrvStub();
    const adhocFilters = [
        {
            key: "default.flows_raw.SrcAS",
            operator: "=",
            value: "1299"
        },
    ];
    let target = {
        query: query,
        interval: "15s",
        intervalFactor: 1,
        skip_comments: false,
        table: "flows_raw",
        database: "default",
        dateTimeType: "DATETIME",
        dateColDataType: "TimeFlowStart",
        dateTimeColDataType: "TimeFlowStart",
        round: "1m",
        rawQuery: "",
    };
    const options = {
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
                text: "15s",
                value: "15s",
            },
            __interval_ms: {
                text: "15000",
                value: 15000,
            },
        },
    };
    let sql_query = new SqlQuery(target, templateSrv, options);
    it("applyMacros with $adhoc", () => {
        expect(sql_query.replace(options, adhocFilters)).toBe(expQuery);
    });

});

/* check https://github.com/Vertamedia/clickhouse-grafana/issues/284 */
describe("check replace with $columns and concat and ARRAY JOIN", () => {
    const query = "$columns(\n" +
        "substring(concat(JobName as JobName,' # ' , Metrics.Name as MetricName), 1, 50) as JobSource,\n" +
        "sum(Metrics.Value) as Kafka_lag_max)\n" +
        "FROM $table\n" +
        "ARRAY JOIN Metrics";
    const expQuery = "SELECT t, groupArray((JobSource, Kafka_lag_max)) AS groupArr FROM ( SELECT (intDiv(toUInt32(dateTimeColumn), 15) * 15) * 1000 AS t, substring(concat(JobName as JobName, ' # ', Metrics.Name as MetricName), 1, 50) as JobSource, sum(Metrics.Value) as Kafka_lag_max FROM default.test_array_join_nested\n" +
        "\n" +
        "ARRAY JOIN Metrics\n" +
        " \n\n" +
        "WHERE dateTimeColumn >= toDate(1545613320) AND dateTimeColumn <= toDate(1546300740) AND dateTimeColumn >= toDateTime(1545613320) AND dateTimeColumn <= toDateTime(1546300740) AND JobName LIKE 'Job'\n" +
        " GROUP BY t, JobSource ORDER BY t, JobSource) GROUP BY t ORDER BY t";
    let templateSrv = new TemplateSrvStub();
    const adhocFilters = [
        {
            key: "default.test_array_join_nested.JobName",
            operator: "=~",
            value: "Job"
        },
    ];
    let target = {
        query: query,
        interval: "15s",
        intervalFactor: 1,
        skip_comments: false,
        table: "test_array_join_nested",
        database: "default",
        dateTimeType: "DATETIME",
        dateColDataType: "dateTimeColumn",
        dateTimeColDataType: "dateTimeColumn",
        round: "1m",
        rawQuery: "",
    };
    const options = {
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
                text: "15s",
                value: "15s",
            },
            __interval_ms: {
                text: "15000",
                value: 15000,
            },
        },
    };
    let sql_query = new SqlQuery(target, templateSrv, options);
    it("replace with $columns and ARRAY JOIN", () => {
        expect(sql_query.replace(options, adhocFilters)).toBe(expQuery);
    });

});


/* check https://github.com/Vertamedia/clickhouse-grafana/issues/294 */
describe("combine $timeFilterByColumn and $dateTimeCol", () => {
    const query = "SELECT $timeSeries as t, count() FROM $table WHERE $timeFilter AND $timeFilterByColumn($dateTimeCol) AND $timeFilterByColumn(another_column) GROUP BY t";
    const expQuery = "SELECT (intDiv(toUInt32(tm), 15) * 15) * 1000 as t, count() FROM default.test_table " +
        "WHERE dt >= toDate(1545613320) AND dt <= toDate(1546300740) AND tm >= toDateTime(1545613320) AND tm <= toDateTime(1546300740) " +
        "AND tm >= toDateTime(1545613201) AND tm <= toDateTime(1546300859) " +
        "AND another_column >= toDateTime(1545613201) AND another_column <= toDateTime(1546300859) " +
        "GROUP BY t";

    let templateSrv = new TemplateSrvStub();
    const adhocFilters = [];
    let target = {
        query: query,
        interval: "15s",
        intervalFactor: 1,
        skip_comments: false,
        table: "test_table",
        database: "default",
        dateTimeType: "DATETIME",
        dateColDataType: "dt",
        dateTimeColDataType: "tm",
        round: "1m",
        rawQuery: "",
    };

    const options = {
        rangeRaw: {
            from: moment('2018-12-24 01:02:03Z'),
            to: moment('2018-12-31 23:59:59Z'),
        },
        range: {
            from: moment('2018-12-24 01:02:03Z'),
            to: moment('2018-12-31 23:59:59Z'),
            raw: RawTimeRangeStub,
        },
        scopedVars: {
            __interval: {
                text: "15s",
                value: "15s",
            },
            __interval_ms: {
                text: "15000",
                value: 15000,
            },
        },
    };
    let sql_query = new SqlQuery(target, templateSrv, options);
    it("replace with $timeFilterByColumn($dateTimeCol)", () => {
        expect(sql_query.replace(options, adhocFilters)).toBe(expQuery);
    });

});
