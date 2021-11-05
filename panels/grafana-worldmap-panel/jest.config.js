module.exports = {
  verbose: true,
  "globals": {
    "ts-jest": {
      "tsConfig": "tsconfig.jest.json"
    },
  },
  "transform": {
    "\\.ts$": "ts-jest"
  },
  "testRegex": "(\\.|/)(test)\\.ts$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json"
  ],
  "setupFiles": [
    "<rootDir>/test/setupTests.ts"
  ]
};
