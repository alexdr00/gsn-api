module.exports = {
  errorOnDeprecated: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleDirectories: ['node_modules', 'src'],
  testPathIgnorePatterns: ['./__tests__/reusableMocks'],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.dev.json',
      maxWorkers: '50%',
    },
  },
};
