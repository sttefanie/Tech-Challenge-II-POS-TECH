module.exports = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["json", "lcov", "text", "clover"],
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/**/index.js",
    "!src/**/config/*.js",
    "!src/**/node_modules/**",
    "!**/node_modules/**"
  ],
  testTimeout: 60000,
  transform: {
    "^.+\\.js$": "babel-jest",  // Transpila arquivos JS com Babel
  },
  transformIgnorePatterns: [
    "/node_modules/"
  ],
};
