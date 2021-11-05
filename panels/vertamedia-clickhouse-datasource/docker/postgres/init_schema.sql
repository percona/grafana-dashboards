CREATE USER grafana WITH PASSWORD 'grafana';
CREATE DATABASE grafana;
ALTER DATABASE grafana OWNER TO grafana;
GRANT ALL PRIVILEGES ON DATABASE grafana TO grafana;

\c grafana

DROP TABLE IF EXISTS test_grafana;
CREATE TABLE IF NOT EXISTS test_grafana(event_time TIMESTAMP, service_name VARCHAR(100), too_big_value FLOAT);

INSERT INTO test_grafana(event_time, service_name, too_big_value) SELECT to_timestamp(extract(epoch from now()) - (generate_series*10) ) AS event_time, CASE WHEN (random()*1000000000)::int % 2 = 1 THEN 'mysql' ELSE 'postgresql' END AS service_name, 1000000000.05 AS too_big_value FROM generate_series(1,1000);
INSERT INTO test_grafana(event_time, service_name, too_big_value) SELECT to_timestamp(extract(epoch from now()) + (generate_series*10)) AS event_time, 'mysql' AS service_name, 1000000000.05 AS too_big_value FROM generate_series(1,1000);
INSERT INTO test_grafana(event_time, service_name, too_big_value) SELECT to_timestamp(extract(epoch from now()) + ((500+generate_series)*10)) AS event_time, 'postgresql' AS service_name, 1000000000.05 AS too_big_value FROM generate_series(1,1000);

ALTER TABLE test_grafana OWNER TO grafana;
