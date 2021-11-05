#!/bin/bash
set -xeou pipefail
if [ ! -d "/var/lib/clickhouse/data/datasets" ]; then
    wget -q -O - "https://clickhouse-datasets.s3.yandex.net/ontime/partitions/ontime.tar" | tar xvf - -C /var/lib/clickhouse
    chown -R clickhouse:clickhouse /var/lib/clickhouse
fi
