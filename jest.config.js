module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    testMatch: [
        "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    collectCoverageFrom: [
        "src/**/*.ts*"
    ],
    coverageThreshold: {
        global: {
            branches: 0,
            functions: 80,
            lines: 80,
            statements: 80
        }
    },
    coverageReporters: ['json', 'lcov', 'text', 'clover']
};