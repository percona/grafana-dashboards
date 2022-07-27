#!/bin/bash

set -ex

yum install wget -y
wget https://rpm.nodesource.com/pub_16.x/el/7/x86_64/nodejs-16.14.2-1nodesource.x86_64.rpm
yum clean all
yum install -y nodejs-16.14.2-1nodesource.x86_64.rpm
node -v
rm nodejs-16.14.2-1nodesource.x86_64.rpm

npm install --production && npm run build
ls -la ./build
