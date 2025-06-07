#!/bin/bash -ex

declare DIR OWNER
DIR=$(realpath ../panels)
OWNER=$(id -u):$(id -g)

docker pull grafana/grafana

docker buildx build --progress=plain -t local/grafana -f Dockerfile.upgrade .

rm -rf "${DIR:?}"/*

docker run \
  --rm -t \
  --name grafana \
  -e GF_INSTALL_PLUGINS=grafana-clickhouse-datasource,grafana-polystat-panel,jdbranham-diagram-panel \
  -v "${DIR}":/var/lib/grafana/plugins \
  local/grafana

sudo chown -R "$OWNER" "$DIR"

echo "Listing upgraded Grafana plugins..."
ls -l "$DIR"

docker rmi local/grafana grafana/grafana
