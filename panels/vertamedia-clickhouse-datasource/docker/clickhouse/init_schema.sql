DROP TABLE IF EXISTS default.test_grafana;
CREATE TABLE IF NOT EXISTS default.test_grafana
(
    event_time    DateTime,
    service_name  LowCardinality(String),
    from_user     LowCardinality(String),
    country       LowCardinality(String),
    too_big_value Float64
)
    ENGINE = MergeTree()
        PARTITION BY toYYYYMM(event_time)
        ORDER BY (event_time, service_name);

INSERT INTO default.test_grafana(event_time, service_name, from_user, country, too_big_value) SELECT toDateTime(now()-(number*10)) AS event_time, if(rand() % 2 = 1,'mysql','postgresql') AS service_name, if(rand() % 2 = 1,'bob','alice') AS from_user, multiIf(rand() % 10= 1,'RU', rand() % 10= 2,'DE', rand() % 10= 3,'CN', rand() % 10= 4,'UK', rand() % 10= 5,'NL', rand() % 10= 6,'EU', rand() % 10= 7,'TK', rand() % 10= 8,'AR', rand() % 10= 9,'FR', 'US') AS country, 1000000000.05 AS too_big_value FROM numbers(1000);
INSERT INTO default.test_grafana(event_time, service_name, from_user, country, too_big_value) SELECT toDateTime(now()+(number*10)) AS event_time, 'mysql' AS service_name, if(rand() % 2 = 1,'bob','alice') AS from_user, multiIf(rand() % 10= 1,'RU', rand() % 10= 2,'DE', rand() % 10= 3,'CN', rand() % 10= 4,'UK', rand() % 10= 5,'NL', rand() % 10= 6,'EU', rand() % 10= 7,'TK', rand() % 10= 8,'AR', rand() % 10= 9,'FR', 'US') AS country, 1000000000.05 AS too_big_value FROM numbers(1000);
INSERT INTO default.test_grafana(event_time, service_name, from_user, country, too_big_value) SELECT toDateTime(now()+((500+number)*10)) AS event_time, 'postgresql' AS service_name, if(rand() % 2 = 1,'bob','alice') AS from_user, multiIf(rand() % 10= 1,'RU', rand() % 10= 2,'DE', rand() % 10= 3,'CN', rand() % 10= 4,'UK', rand() % 10= 5,'NL', rand() % 10= 6,'EU', rand() % 10= 7,'TK', rand() % 10= 8,'AR', rand() % 10= 9,'FR', 'US') AS country, 1000000000.05 AS too_big_value FROM numbers(1000);


DROP TABLE IF EXISTS default.test_alerts;
CREATE TABLE IF NOT EXISTS default.test_alerts
(
    `Name` String,
    `EventDate` Date,
    `EventTime` DateTime,
    `Value` UInt64
) ENGINE = MergeTree()
  PARTITION BY toYYYYMM(EventTime)
  ORDER BY (EventTime, Name);

INSERT INTO default.test_alerts SELECT if(rand() % 2, 'test2','test1') AS Name, toDate( now() - ( 5400  - (60*number) ) ) AS EventDate, toDateTime( now() - ( 5400  - (60*number) ) ) AS EventTime, if((EventTime BETWEEN now() - INTERVAL 3600 SECOND AND now() + INTERVAL 600 SECOND) OR (EventTime BETWEEN now() + INTERVAL 1200 SECOND AND now() + INTERVAL 1800 SECOND), rand() % 20, rand() ) AS Value FROM numbers(180);

DROP TABLE IF EXISTS default.test_depends_on_variable;
CREATE TABLE IF NOT EXISTS default.test_depends_on_variable(
    event_time DateTime,
    bulk_id LowCardinality(String),
    city LowCardinality(Nullable(String)),
    service_name LowCardinality(String),
    too_big_value UInt64
)
    ENGINE = MergeTree()
        PARTITION BY toYYYYMM(event_time)
        ORDER BY (event_time, bulk_id, city, service_name);

INSERT INTO default.test_depends_on_variable(event_time, bulk_id, city, service_name, too_big_value) SELECT toDateTime(now()-(number*10)) AS event_time, concat('bulk',toString(number%10)) AS bulk_id, if (number%600 > 0,concat('city',toString(number%600)),null) AS city, concat('service',toString(number%1000)) AS service_name, rand64() AS too_big_value FROM numbers(10000);


DROP TABLE IF EXISTS default.test_interval;
CREATE TABLE IF NOT EXISTS default.test_interval
(
    d DateTime,
    x UInt32
) ENGINE = MergeTree() ORDER BY (d);

INSERT INTO default.test_interval(d,x) SELECT toDateTime(now()-(number*10)) AS d, rand() AS x FROM numbers(1000);


DROP TABLE IF EXISTS default.test_array_join_nested;
CREATE TABLE IF NOT EXISTS default.test_array_join_nested(
    d DateTime,
    JobName LowCardinality(String),
    Metrics Nested (
        Name LowCardinality(String),
        Value UInt64
    )
) ENGINE = MergeTree() ORDER BY (d);

INSERT INTO default.test_array_join_nested(d, JobName, Metrics.Name, Metrics.Value)
SELECT d, JobName, groupArray(metricname) AS metrics_name_arr, groupArray(metricval) AS metrics_value_arr
FROM (
      SELECT
          if(number%2,'Job2','Job1') AS JobName,
          toDateTime(now()-(number*10)) AS d,
          arrayJoin(['metric1', 'metric2']) AS metricname,
          rand64(cityHash64(arrayJoin(range(5)), number, metricname))%10 metricval
      FROM numbers(1000)
      ORDER BY d, metricname
         )
GROUP BY d, JobName;


DROP TABLE IF EXISTS default.test_datetime64;
CREATE TABLE IF NOT EXISTS default.test_datetime64
(
    d DateTime64(6),
    x UInt32
) ENGINE = MergeTree() ORDER BY (d);

INSERT INTO default.test_datetime64(d,x) SELECT toDateTime64(now64(6)-(number*10), 3) AS d, rand() AS x FROM numbers(1000);
