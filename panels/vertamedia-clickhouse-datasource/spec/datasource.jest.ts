import {size} from 'lodash-es';
import SqlSeries from '../src/sql_series';
import AdhocCtrl from "../src/adhoc";
import ResponseParser from "../src/response_parser";

describe("clickhouse sql series:", () => {
    describe("SELECT $timeseries response WHERE $adhoc = 1", () => {
        let response = {
            "meta":
            [
                {
                    "name": "t"
                },
                {
                    "name": "good"
                },
                {
                    "name": "bad"
                }
            ],
            "data":
            [
                {
                    "t": "1485443760000",
                    "good": 26070,
                    "bad": 17
                },
                {
                    "t": "1485443820000",
                    "good": 24824,
                    "bad": 12
                },
                {
                    "t": "1485443880000",
                    "good": 25268,
                    "bad": 17
                }
            ],
        };

        let sqlSeries = new SqlSeries({
            series: response.data,
            meta: response.meta,
            table: '',
        });
        let timeSeries = sqlSeries.toTimeSeries();
        it("expects two results", () => {
            expect(size(timeSeries)).toBe(2);
        });

        it("should get three datapoints", () => {
            expect(size(timeSeries[0].datapoints)).toBe(3);
            expect(size(timeSeries[1].datapoints)).toBe(3);
        });
    });

    describe("SELECT $columns response", () => {
        let response = {
            "meta":
                [
                    {
                        "name": "t",
                        "type": "UInt64"
                    },
                    {
                        "name": "requests",
                        "type": "Array(Tuple(String, Float64))"
                    }
                ],

            "data":
                [
                    {
                        "t": "1485445140000",
                        "requests": [["Chrome",null],["Edge",null],["Firefox",null]]
                    },
                    {
                        "t": "1485445200000",
                        "requests": [["Chrome",1],["Edge",4],["Firefox",7]]
                    },
                    {
                        "t": "1485445260000",
                        "requests": [["Chrome",2],["Chromium",5],["Edge",8],["Firefox",11]]
                    },
                    {
                        "t": "1485445320000",
                        "requests": [["Chrome",3],["Chromium",6],["Edge",9],["Firefox",12]]
                    }
                ]
        };

        let sqlSeries = new SqlSeries({
            series: response.data,
            meta: response.meta,
            table: '',
        });
        let timeSeries = sqlSeries.toTimeSeries();

        it("expects four results", () => {
            expect(size(timeSeries)).toBe(4);
        });

        it("should get three datapoints", () => {
            expect(size(timeSeries[0].datapoints)).toBe(4);
            expect(size(timeSeries[1].datapoints)).toBe(4);
            expect(size(timeSeries[2].datapoints)).toBe(4);
            expect(size(timeSeries[3].datapoints)).toBe(4);
        });
    });

    describe("When performing ad-hoc query", () => {
        let response = {
            "meta":
                [
                    {
                        "name": "database",
                        "type": "String"
                    },
                    {
                        "name": "table",
                        "type": "String"
                    },
                    {
                        "name": "name",
                        "type": "String"
                    },
                    {
                        "name": "type",
                        "type": "String"
                    }
                ],
            "data":
                [
                    {
                        "database": "default",
                        "table": "requests",
                        "name": "Event",
                        "type": "Enum8('VIEWS' = 1, 'CLICKS' = 2)"
                    },
                    {
                        "database": "default",
                        "table": "requests",
                        "name": "UserID",
                        "type": "UInt32"
                    },
                    {
                        "database": "default",
                        "table": "requests",
                        "name": "URL",
                        "type": "String"
                    }
                ],

            "rows": 3
        };

        // @ts-ignore
        let rp = new ResponseParser(this.$q);
        let adhocCtrl = new AdhocCtrl({defaultDatabase: "default"});
        it('should be inited', function () {
            expect(adhocCtrl.query).toBe('SELECT database, table, name, type FROM system.columns WHERE database = \'default\' AND database != \'system\' ORDER BY database, table');
            expect(adhocCtrl.datasource.defaultDatabase).toBe('default');
        });

        let data = rp.parse("", response);
        adhocCtrl.processTagKeysResponse(data);
        it('should return adhoc filter list', function() {
            let results = adhocCtrl.tagKeys;
            expect(results.length).toBe(6);
            expect(results[0].text).toBe('requests.Event');
            expect(results[0].value).toBe('Event');

            expect(results[1].text).toBe('requests.UserID');
            expect(results[1].value).toBe('UserID');

            expect(results[2].text).toBe('requests.URL');
            expect(results[2].value).toBe('URL');

            expect(results[3].text).toBe('Event');
            expect(results[3].value).toBe('Event');

            expect(results[4].text).toBe('UserID');
            expect(results[4].value).toBe('UserID');

            expect(results[5].text).toBe('URL');
            expect(results[5].value).toBe('URL');
        });
    });


});
