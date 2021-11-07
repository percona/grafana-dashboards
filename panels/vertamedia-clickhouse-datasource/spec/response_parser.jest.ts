import ResponseParser from "../src/response_parser";
import {AnnotationEvent} from '@grafana/data';

describe("Parse response:", () => {
    describe("When __value and __text macros are used", () => {
        const response = {
            "meta": [
                {
                    "name": "__value",
                    "type": "String",
                },
                {
                    "name": "__text",
                    "type": "String",
                },
            ],

            "data": [
                {
                    "__value": "actual value",
                    "__text": "Label",
                },
            ],
        };

        // @ts-ignore
        const responseParser = new ResponseParser(this.$q);
        const data = responseParser.parse("SELECT hostname AS __text, id AS __value FROM host", response);

        it('should return key-value pairs', function () {
            expect(data[0].text).toBe('Label');
            expect(data[0].value).toBe('actual value');
        });
    });
});

// check annotation response https://github.com/Vertamedia/clickhouse-grafana/issues/303
describe("Check transformAnnotationResponse", () => {
    // @ts-ignore
    const responseParser = new ResponseParser(this.$q);
    let options = {
        annotation: {
            dateTimeColDataType: 'time'
        },
        interval: '30s'
    };
    const notRegionResponse = {
        "meta": [
            {
                "name": "text",
                "type": "String",
            },
            {
                "name": "title",
                "type": "String",
            },
            {
                "name": "tags",
                "type": "String",
            },
            {
                "name": "time",
                "type": "UInt64",
            },
        ],

        "data": [
            {
                "title": "annotation title",
                "text": "annotation text",
                "tags": "tag1,tag2,tag3",
                // 2020-11-25
                "time": 1606244400000,
            },
        ],
    };

    const notRegionEvents = responseParser.transformAnnotationResponse(options, notRegionResponse);
    const expectedNotRegionAnnotation: AnnotationEvent = {
        annotation: options.annotation,
        time: 1606244400000,
        timeEnd: 0,
        text: "annotation text",
        title: "annotation title",
        tags: ["tag1","tag2","tag3"],
        isRegion: false,
        type: "annotation"
    };

    it('should return array of AnnotationEvent', function () {
        expect(notRegionEvents[0]).toStrictEqual(expectedNotRegionAnnotation);
    });

    const regionResponse = {
        "meta": [
            {
                "name": "text",
                "type": "String",
            },
            {
                "name": "title",
                "type": "String",
            },
            {
                "name": "type",
                "type": "String",
            },
            {
                "name": "tags",
                "type": "String",
            },
            {
                "name": "time",
                "type": "UInt64",
            },
            {
                "name": "time_end",
                "type": "UInt64",
            },
        ],

        "data": [
            {
                "text": "annotation text",
                "title": "annotation title",
                "type": "alert",
                "tags": "tag1,tag2,tag3",
                // 2020-11-25
                "time": 1606244400000,
                // 2020-11-26
                "time_end": 1606330800000,
            },
        ],
    };

    const regionEvents = responseParser.transformAnnotationResponse(options, regionResponse);
    const expectedRegionAnnotation: AnnotationEvent = {
        annotation: options.annotation,
        time: 1606244400000,
        timeEnd: 1606330800000,
        text: "annotation text",
        title: "annotation title",
        tags: ["tag1","tag2","tag3"],
        isRegion: true,
        type: "alert"
    };
    it('should return array of AnnotationEvent', function () {
        expect(regionEvents[0]).toStrictEqual(expectedRegionAnnotation);
    });
});
