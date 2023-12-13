// force timezone to UTC to allow tests to work regardless of local timezone
// generally used by snapshots, but can affect specific tests

process.env.TZ = 'GMT';

module.exports = {
  // Jest configuration provided by Grafana scaffolding
  ...require('./.config/jest.config'),
  snapshotSerializers: ['enzyme-to-json/serializer'],
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
};
