const { name } = require('./package.json')

module.exports = {
  displayName: name,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
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
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
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
