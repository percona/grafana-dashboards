#!/bin/bash

set -ex

curl -fsSL https://rpm.nodesource.com/setup_16.x | bash -
yum install -y nodejs
node -v

test -d build && rm -rf build
npm install --production && npm run build
ls -la ./build
