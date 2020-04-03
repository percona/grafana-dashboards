#!/usr/bin/env bash

set -ex

export CYPRESS_BASE_URL=$(docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' pmm-server)

echo $CYPRESS_BASE_URL

docker-compose -f cypress-docker-compose.yaml up

