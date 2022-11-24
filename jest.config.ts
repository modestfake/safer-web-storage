import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  // preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/helpers/', '/node_modules/'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        isolatedModules: true,
      },
    ],
  },
}

export default jestConfig
