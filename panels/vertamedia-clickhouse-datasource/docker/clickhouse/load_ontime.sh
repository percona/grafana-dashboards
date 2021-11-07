#!/bin/bash
set -xeou pipefail
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y aria2

if [ ! -d "/var/lib/clickhouse/data/datasets/ontime/201810_364_364_1" ]; then
    aria2c -x 10 -s 10 -j 10 -c --dir=/var/lib/clickhouse/ --out=ontime.tar --file-allocation=none https://clickhouse-datasets.s3.yandex.net/ontime/partitions/ontime.tar
    tar xvf /var/lib/clickhouse/ontime.tar -C /var/lib/clickhouse
    chown -R clickhouse:clickhouse /var/lib/clickhouse
fi
