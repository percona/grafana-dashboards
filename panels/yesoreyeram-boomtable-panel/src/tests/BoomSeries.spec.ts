import { normalizeColor, parseMathExpression, getColor, getActualNameWithoutTokens, getItemBasedOnThreshold, getMetricNameFromTaggedAlias, getSeriesValue, getCurrentTimeStamp, replaceDelimitedColumns, getRowName, getColName, doesValueNeedsToHide } from "./../app/boom/BoomUtils";

const dummy_series_1 = {
    stats: {
        "avg": 9.077777777777778,
        "count": 360,
        "current": 6,
        "delta": 1396,
        "diff": 4,
        "first": 2,
        "logmin": 1,
        "max": 24,
        "min": 0,
        "range": 24,
        "timeStep": 60000,
        "total": 3268,
    }
};
const dummy_series_2 = {
    "alias": "COM # count",
    "aliasEscaped": "COM # count",
    "datapoints": [
        [
            108,
            1575198840000
        ],
        [
            86,
            1575198900000
        ],
        [
            93,
            1575198960000
        ],
        [
            48,
            1575199020000
        ],
        [
            null,
            1575199080000
        ],
        [
            null,
            1575199140000
        ],
        [
            null,
            1575199200000
        ],
        [
            null,
            1575199260000
        ]
    ],
    "id": "COM # count",
    "label": "COM # count",
    "stats": {
        "avg": 41.875,
        "count": 8,
        "current": 0,
        "delta": 93,
        "diff": -108,
        "first": 108,
        "logmin": 48,
        "max": 108,
        "min": 0,
        "range": 108,
        "timeStep": 60000,
        "total": 335,
    }
};
describe("Boom Series", () => {
    it("getSeriesValue", () => {
        expect(getSeriesValue({}, "total")).toBe(NaN);
        expect(getSeriesValue({}, "foo")).toBe(NaN);
        expect(getSeriesValue(dummy_series_1, "foo")).toBe(null);
        expect(getSeriesValue(dummy_series_1, "total")).toBe(3268);
        expect(getSeriesValue(dummy_series_1, "TOTAL")).toBe(3268);
        expect(getSeriesValue(dummy_series_1, "last_time")).toBe(null);
        expect(getSeriesValue(dummy_series_1, "LAST_TIME")).toBe(null);
        expect(getSeriesValue(dummy_series_2, "total")).toBe(dummy_series_2.stats.total);
        expect(getSeriesValue(dummy_series_2, "last_time_nonnull")).toBe(1575199020000);
        expect(getSeriesValue(dummy_series_2, "last_time")).toBe(1575199260000);
    });
    it("getCurrentTimeStamp", () => {
        expect(getCurrentTimeStamp(dummy_series_2.datapoints)).toStrictEqual(new Date(1575199260000));
    });
    it("replaceDelimitedColumns", () => {
        expect(replaceDelimitedColumns("Hello _0_ is _1_", "foo.bar.baz", ".", "_")).toBe("Hello foo is bar");
        expect(replaceDelimitedColumns("Hello _0__1_", "foo.bar.baz", ".", "_")).toBe("Hello foobar");
        expect(replaceDelimitedColumns("Hello _0__1__1_", "foo.bar.baz", ".", "_")).toBe("Hello foobarbar");
        expect(replaceDelimitedColumns("Hello _0__1__3_", "foo.bar.baz", ".", "_")).toBe("Hello foobar_3_");
        expect(replaceDelimitedColumns("Hello _0__1__1_", "foo bar baz", " ", "_")).toBe("Hello foobarbar");
        expect(replaceDelimitedColumns("Hello #0##1##1#", "foo bar baz", " ", "#")).toBe("Hello foobarbar");
    });
    it("getRowName", () => {
        expect(getRowName("Hello _0_ is _1_", ".", "_", "foo.bar.baz", "", [])).toBe("Hello foo is bar");
        expect(getRowName("Hello _0_ is _1_ _series_ _series_", ".", "_", "foo.bar.baz", "", [])).toBe("Hello foo is bar foo.bar.baz foo.bar.baz");
    });
    it("getColName", () => {
        expect(getColName("Hello _0_ is _1_", ".", "_", "foo.bar.baz", "rowName", "", [])).toBe("Hello foo is bar");
        expect(getColName("foo.bar", ".", "_", "foo.bar", "foo.bar", "", [])).toBe("foo.bar");
    });
});
describe("Normalize Color", () => {
    it("Normalize Named Colors", () => {
        expect(normalizeColor("Green")).toBe("rgba(50, 172, 45, 0.97)");
        expect(normalizeColor("Orange")).toBe("rgba(237, 129, 40, 0.89)");
        expect(normalizeColor("Red")).toBe("rgba(245, 54, 54, 0.9)");
        expect(normalizeColor("Purple")).toBe("Purple");
    });
});
describe("Get Color", () => {
    it("Color Strings", () => {
        expect(getColor("Green", 0)).toBe(` style="color:rgba(50, 172, 45, 0.97)" `);
        expect(getColor("Orange", 0)).toBe(` style="color:rgba(237, 129, 40, 0.89)" `);
        expect(getColor("Red", 0)).toBe(` style="color:rgba(245, 54, 54, 0.9)" `);
        expect(getColor("Purple", 0)).toBe(` style="color:Purple" `);
    });
});
describe("Parse Math Tokens", () => {
    it("Sum", () => {
        expect(parseMathExpression("15+5", 0)).toBe(20);
        expect(parseMathExpression("0.2+2.3", 0)).toBe(3);
    });
    it("Substraction", () => {
        expect(parseMathExpression("15-5", 0)).toBe(10);
        expect(parseMathExpression("0.2-2.3", 0)).toBe(-2);
    });
    it("Multiplication", () => {
        expect(parseMathExpression("3*5", 0)).toBe(15);
        expect(parseMathExpression("0.2*2", 0)).toBe(0);
        expect(parseMathExpression("0.3*2", 0)).toBe(1);
    });
    it("Division", () => {
        expect(parseMathExpression("9/5", 0)).toBe(2);
        expect(parseMathExpression("0.2/2", 0)).toBe(0);
        expect(parseMathExpression("2.3/2", 0)).toBe(1);
    });
    it("Min", () => {
        expect(parseMathExpression("9min5", 0)).toBe(5);
        expect(parseMathExpression("5min9", 0)).toBe(5);
        expect(parseMathExpression("9min0.4", 0)).toBe(0);
        expect(parseMathExpression("5min0.9", 0)).toBe(1);
    });
});
describe("Get Actial name without tokens", () => {
    it("Row and colname", () => {
        expect(getActualNameWithoutTokens("hello")).toBe("hello");
        expect(getActualNameWithoutTokens("hello how are you!")).toBe("hello how are you!");
        expect(getActualNameWithoutTokens("hello _fa-circle_ how are you")).toBe("hello  how are you");
    });
});
describe("Threshold Validator", () => {
    it("BG Colors", () => {
        expect(getItemBasedOnThreshold([10, 20], ["green", "orange", "red"], 5, "black")).toBe("green");
        expect(getItemBasedOnThreshold([10, 20], ["green", "orange", "red"], 10, "black")).toBe("orange");
        expect(getItemBasedOnThreshold([10, 20], ["green", "orange", "red"], 15, "black")).toBe("orange");
        expect(getItemBasedOnThreshold([10, 20], ["green", "orange", "red", "blue"], 15, "black")).toBe("orange");
        expect(getItemBasedOnThreshold([10, 20], ["green", "orange", "red"], 20, "black")).toBe("red");
        expect(getItemBasedOnThreshold([10, 20], ["green", "orange", "red"], 25, "black")).toBe("red");
        expect(getItemBasedOnThreshold([10, 20], ["green", "orange", "red"], 20, "black")).toBe("red");
        expect(getItemBasedOnThreshold([10, 20], ["green", "orange"], 25, "black")).toBe("black");
    });
});
describe("Mertic Name from prometheus / influxdb Alias", () => {
    it("Prometheus Format", () => {
        expect(getMetricNameFromTaggedAlias("container_cpu_load_average_10s")).toBe("container_cpu_load_average_10s");
        expect(getMetricNameFromTaggedAlias("container_cpu_load_average_10s ")).toBe("container_cpu_load_average_10s");
        expect(getMetricNameFromTaggedAlias("container_cpu_load_average_10s {}")).toBe("container_cpu_load_average_10s");
        expect(getMetricNameFromTaggedAlias(" container_cpu_load_average_10s {}")).toBe("container_cpu_load_average_10s");
        expect(getMetricNameFromTaggedAlias(`container_cpu_load_average_10s{agentpool="agentpool1"}`)).toBe("container_cpu_load_average_10s");
        expect(getMetricNameFromTaggedAlias(`container_cpu_load_average_10s {agentpool="agentpool1"}`)).toBe("container_cpu_load_average_10s");
        expect(getMetricNameFromTaggedAlias(` container_cpu_load_average_10s { agentpool = "agentpool1" } `)).toBe("container_cpu_load_average_10s");
        expect(getMetricNameFromTaggedAlias(` container_cpu_load_average_10s { image = "abc:cba12:hello" } `)).toBe("container_cpu_load_average_10s");
        expect(getMetricNameFromTaggedAlias(`container_memory_usage_bytes{beta_kubernetes_io_arch="amd64",beta_kubernetes_io_instance_type="Standard_D2_v2"}`)).toBe("container_memory_usage_bytes");
    });
    it("InfluxDB Format", () => {
        expect(getMetricNameFromTaggedAlias("CPU.CPU TIme")).toBe("CPU.CPU TIme");
        expect(getMetricNameFromTaggedAlias("CPU.CPU TIme ")).toBe("CPU.CPU TIme");
        expect(getMetricNameFromTaggedAlias("CPU.CPU TIme {} ")).toBe("CPU.CPU TIme");
        expect(getMetricNameFromTaggedAlias("CPU.CPU TIme {environment: 279, instance: _Total}")).toBe("CPU.CPU TIme");
        expect(getMetricNameFromTaggedAlias(" CPU.CPU TIme { environment: 279, instance: _Total}")).toBe("CPU.CPU TIme");
        expect(getMetricNameFromTaggedAlias(" CPU.CPU TIme { environment: 279, equation: `_Tota=l`}")).toBe("CPU.CPU TIme");
    });

});
describe("Value needs to hidden", () => {
    it("Default Values", () => {
        expect(doesValueNeedsToHide(10, undefined)).toBe(false);
        expect(doesValueNeedsToHide(0, { value_below: "5" })).toBe(true);
        expect(doesValueNeedsToHide(-2, { value_below: "-1" })).toBe(true);
        expect(doesValueNeedsToHide(2, { value_below: "10" })).toBe(true);
        expect(doesValueNeedsToHide(10, { value_below: "5" })).toBe(false);
        expect(doesValueNeedsToHide(2, { value_below: "-1" })).toBe(false);
        expect(doesValueNeedsToHide(15, { value_above: "10" })).toBe(true);
        expect(doesValueNeedsToHide(15, { value_above: "0" })).toBe(true);
        expect(doesValueNeedsToHide(10, { value_above: "15" })).toBe(false);
        expect(doesValueNeedsToHide(0, { value_above: "15" })).toBe(false);
        expect(doesValueNeedsToHide(0, { value_below: "5", value_above: "-5" })).toBe(true);
        expect(doesValueNeedsToHide(10, { value_below: "15", value_above: "30" })).toBe(true);
        expect(doesValueNeedsToHide(10, { value_below: "5", value_above: "5" })).toBe(true);
        expect(doesValueNeedsToHide(10, { value_below: "15", value_above: "5" })).toBe(true);
        expect(doesValueNeedsToHide(10, { value_below: "015", value_above: "05" })).toBe(true);
        expect(doesValueNeedsToHide(0, { value_below: "5", value_above: "2" })).toBe(true);
        expect(doesValueNeedsToHide(0, { value_below: "2", value_above: "5" })).toBe(true);
        expect(doesValueNeedsToHide(10, { value_below: " 015 ", value_above: " 05 " })).toBe(true);
        expect(doesValueNeedsToHide(10, { value_below: " 5 ", value_above: "-5 " })).toBe(true);
        expect(doesValueNeedsToHide(10, { value_below: "15", value_above: "5 " })).toBe(true);
        expect(doesValueNeedsToHide(10, { value_below: "5", value_above: "30" })).toBe(false);
        expect(doesValueNeedsToHide(10, { value_below: " 5 ", value_above: " 30 " })).toBe(false);
        expect(doesValueNeedsToHide(0, { value_below: "-2", value_above: "5" })).toBe(false);
    });
});
