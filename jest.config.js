module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.{js,jsx,ts,tsx}',
      '!src/index.js', // Adjust this pattern based on your file structure
      '!src/serviceWorker.js', // Exclude files you don't want to test
      '!src/setupTests.js',
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],
  };
  