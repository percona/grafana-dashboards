# PMM Database Checks

A UI component that visualizes the quantity & severity of failed database check results that PMM runs once it receives them from the Platform via Platform API.

## Links

[Alertmanager Docs](https://prometheus.io/docs/alerting/alertmanager/)

[Alertmanager Filtering API](https://github.com/prometheus/alertmanager/blob/master/ui/app/README.md#note-on-filtering-via-label-matchers)

## How to query alerts (examples)

Note: the queries below should be run inside of a PMM Server docker container.

- Query only active alerts: `curl -u admin:admin http://127.0.0.1/alertmanager/api/v2/alerts?active=true&silenced=false`

- Query alerts with a specific filter: `curl -u admin:admin http://127.0.0.1/alertmanager/api/v2/alerts?filter='node_name=pmm-server'`

## Test quirks

Occasionally, the tests may fail due to an unknown reason related to jest cache. The workaround would be to clean the cache by running `npx jest --clearCache`.
