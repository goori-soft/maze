const { name } = require('./package.json')

module.exports = {
  displayName: name,
  collectCoverageFrom: [
    '<rootDir>/src/maze/**/*.ts',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/tests/**',
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  moduleNameMapper: {
    '@/(.+)': '<rootDir>/src/$1'
  },
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75
    }
  },
  roots: [
    '<rootDir>/src',
    '<rootDir>/tests'
  ],
  transform: {
    '\\.ts$': 'ts-jest'
  }
}
