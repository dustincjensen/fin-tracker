/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
    // Run tests from one or more projects
    projects: [
        {
            displayName: 'app',
            rootDir: './',
            preset: 'ts-jest',
            testMatch: ['<rootDir>/src/app/**/*.spec.(ts|tsx)'],
            transform: {
                '^.+\\.(ts|tsx)?$': [
                    'ts-jest',
                    {
                        tsconfig: '<rootDir>/src/app/tsconfig.json',
                    },
                ],
            },
            moduleNameMapper: {
                '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
                    '<rootDir>/__mocks__/fileMock.js',
                '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
            },
            setupFiles: ['<rootDir>/jest.setup.js'],
            setupFilesAfterEnv: ['<rootDir>/jest.setupAfterEnv.js'],
            testEnvironment: 'jsdom',
            clearMocks: true,
        },
        {
            displayName: 'background-worker',
            rootDir: './',
            preset: 'ts-jest',
            testMatch: ['<rootDir>/src/background-worker/**/*.spec.(ts|tsx)'],
            transform: {
                '^.+\\.(ts|tsx)?$': [
                    'ts-jest',
                    {
                        tsconfig: '<rootDir>/src/background-worker/tsconfig.json',
                    },
                ],
            },
            setupFiles: ['<rootDir>/jest.setup.js'],
            testEnvironment: 'node',
            clearMocks: true,
        },
    ],
};

export default config;
