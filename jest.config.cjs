'use strict';

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: false,
    roots: ['<rootDir>/src'],
    resolver: "jest-ts-webcompat-resolver",
    coveragePathIgnorePatterns: [
        "routers"
    ],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    testMatch: [
        '**/?(*.)+(spec|test).+(ts|tsx|js)'
    ],
    collectCoverageFrom: [
        'src/**/*.ts*'
    ],
    coverageThreshold: {
        global: {
            branches: 0,
            functions: 80,
            lines: 80,
            statements: 80
        }
    },
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
    coverageDirectory: 'jest/coverage',
    reporters: [
        'default',
        [
            'jest-junit', 
            {
                outputDirectory: 'jest/junit',
                outputName: 'junit.xml',
            }
        ]
    ]
};