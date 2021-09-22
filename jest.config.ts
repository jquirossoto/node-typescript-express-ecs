import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    verbose: true,
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    collectCoverageFrom: [
        "src/**/*.ts*"
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    },
    coverageReporters: ['json', 'lcov', 'text', 'clover']
};
export default config;