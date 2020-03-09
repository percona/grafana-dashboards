#!/usr/bin/env bash

set -ex

PMM_SRV_ADDR=$(docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' pmm-server)

sed "s|%PMM_SRV_ADDR%|${PMM_SRV_ADDR}|g" browsers.json.template > browsers.json

docker-compose -f selenoid-docker-compose.yaml up

