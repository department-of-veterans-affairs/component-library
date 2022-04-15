module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['./src/**/*.js'],
  coverageThreshold: {
    global: {
      lines: 30,
    },
  },
};
