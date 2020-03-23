#!/usr/bin/env bash

set -ex

CHROME_VERSION=${CHROME_VERSION:-80.0}

if ! docker version &> /dev/null ; then
    echo "Warning: you must have permission to run docker." 1>&2
    exit 1
fi

docker pull selenoid/vnc_chrome:${CHROME_VERSION}
docker pull selenoid/video-recorder:latest-release
docker pull aerokube/selenoid-ui

export PMM_SRV_ADDR=$(docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' pmm-server)

cat > pr.browsers.json << EOF
{
  "chrome": {
    "default": "${CHROME_VERSION}",
    "versions": {
      "${CHROME_VERSION}": {
        "image": "selenoid/vnc_chrome:${CHROME_VERSION}",
        "port": "4444",
        "tmpfs": {"/tmp":"size=1024m"},
        "shmSize" : 1073741824,
        "hosts" : [ "pmm-server:${PMM_SRV_ADDR}" ]
      }
    }
  }
}
EOF

docker-compose -f selenoid-docker-compose.yaml up -d

