// force timezone to UTC to allow tests to work regardless of local timezone
// generally used by snapshots, but can affect specific tests
const baseConfig = require('./.config/jest.config');

process.env.TZ = 'GMT';

module.exports = {
  // Jest configuration provided by Grafana scaffolding
  ...baseConfig,
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/*styles.{ts,tsx}',
    '!**/*constants.{ts,tsx}',
    '!**/*module.{ts,tsx}',
    '!**/*types.ts',
  ],
  moduleNameMapper: {
    ...baseConfig.moduleNameMapper,
    d3: '<rootDir>/node_modules/d3/dist/d3.min.js',
  },
};
