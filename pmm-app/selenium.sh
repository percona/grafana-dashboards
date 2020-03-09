#!/usr/bin/env bash

set -ex

export PMM_SRV_ADDR=$(docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' pmm-server)

sed "s|%PMM_SRV_ADDR%|${PMM_SRV_ADDR}|g" browsers.json.template > browsers.json

mkdir ./video ./logs || true

docker-compose -f selenoid-docker-compose.yaml up

