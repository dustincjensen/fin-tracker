module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testRunner: 'jest-circus/runner',
  setupFilesAfterEnv: ['./jest.setup.js'],
  modulePathIgnorePatterns: ['./out', './nodule_modules']
};