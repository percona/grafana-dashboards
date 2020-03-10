#!/usr/bin/env bash

echo "Warning: you must have permission to run docker."
docker pull selenoid/vnc_chrome:80.0
docker pull selenoid/video-recorder:latest-release
docker pull aerokube/selenoid-ui

set -ex

export PMM_SRV_ADDR=$(docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' pmm-server)

sed "s|%PMM_SRV_ADDR%|${PMM_SRV_ADDR}|g" browsers.json.template > browsers.json

mkdir ./video ./logs || true

docker-compose -f selenoid-docker-compose.yaml up -d

