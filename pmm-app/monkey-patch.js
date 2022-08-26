const fs = require('fs');

const FILE = './node_modules/@grafana/toolkit/src/config/webpack/loaders.js';
const regex = /((?<!\/\/)global(.*)\[key\]\s?=\s?(("|')cjs("|')|("|')esm("|'));)/gm;

const fileContent = fs.readFileSync(FILE, { encoding: 'utf-8' });

if (fileContent) {
  const result = fileContent.replace('javascriptEnabled: true', 'lessOptions:{javascriptEnabled: true}');

  fs.writeFileSync(FILE, result, { encoding: 'utf-8' });
}
