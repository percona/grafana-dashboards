module.exports = {
  "verbose": true,
  "transform": {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.js$": "./node_modules/babel-jest"
  },
  "moduleNameMapper": {
    'app/core/utils/kbn': '<rootDir>/node_modules/grafana-sdk-mocks/app/core/utils/kbn.js',
    'app/core/time_series2': '<rootDir>/node_modules/grafana-sdk-mocks/app/headers/common.d.ts',
  },
  "transformIgnorePatterns": [
    '<rootDir>/node_modules/(?!grafana-sdk-mocks)',
  ],
  "testRegex": "(\\.|/)(spec|jest)\\.(jsx?|tsx?)$",
  "roots": [
    "tests",
    "src"
  ],
  "moduleDirectories": [
    "node_modules",
    "bower_components",
    "src",
  ],
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ]
};