#!/usr/bin/env bash
set -xeuo pipefail
if [[ $# -lt 1 ]]; then
    echo "release.sh [major|minor|patch]"
    exit 1
fi
if [[ $OSTYPE == *linux* ]]; then
    echo 1 > /proc/sys/vm/drop_caches
fi
source .release_env
git config core.eol lf
git config core.autocrlf input
git config user.name "$GITHUB_LOGIN"
git config user.email "$GITHUB_EMAIL"
docker-compose stop
docker-compose run frontend_builder
docker-compose run backend_builder
dos2unix ./dist/*
git add .
git commit -m "prepare to new release, $(grep current_version .bumpversion.cfg)"
bump2version --verbose $1
git push
