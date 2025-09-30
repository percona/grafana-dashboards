#!/bin/bash -ex

declare PLATFORM=${PLATFORM:-linux/amd64}
declare DIR
DIR=$(realpath ../panels)

# Note: the PLATFORM matters because some plugins are built for a specific architecture.
docker buildx build --platform="$PLATFORM" --progress=plain --build-arg IMAGE_TAG=11.6 -t local/grafana -f Dockerfile.upgrade .

rm -rf "${DIR:?}"/*

docker run \
  --rm -t \
  --name grafana \
  --platform="$PLATFORM" \
  -e GF_INSTALL_PLUGINS=grafana-clickhouse-datasource,grafana-polystat-panel \
  -v "${DIR}":/var/lib/grafana/plugins \
  local/grafana

echo "Listing upgraded Grafana plugins..."
ls -l "$DIR"

docker rmi local/grafana
