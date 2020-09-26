module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRunner: 'jest-circus/runner',
  setupFilesAfterEnv: ['./jest.setup.js']
};