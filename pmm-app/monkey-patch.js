const fs = require('fs');

const FILE = './node_modules/@grafana/toolkit/src/config/webpack/loaders.js';

const fileContent = fs.readFileSync(FILE, { encoding: 'utf-8' });

if (fileContent && !fileContent.includes('lessOptions')) {
  const result = fileContent.replace('javascriptEnabled: true', 'lessOptions:{javascriptEnabled: true, math: "always"}');

  fs.writeFileSync(FILE, result, { encoding: 'utf-8' });
}
