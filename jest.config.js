module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testRunner: 'jest-circus/runner',
  setupFilesAfterEnv: ['./jest.setup.js'],
  modulePathIgnorePatterns: ['./out', './nodule_modules', './dist'],
  transform: {
    '.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
};
