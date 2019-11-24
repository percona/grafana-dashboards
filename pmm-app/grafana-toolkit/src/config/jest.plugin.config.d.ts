export declare const allowedJestConfigOverrides: string[];
export declare const jestConfig: (baseDir?: string) => {
    snapshotSerializers: string[];
    preset: string;
    verbose: boolean;
    moduleDirectories: string[];
    moduleFileExtensions: string[];
    setupFiles: (string | undefined)[];
    globals: {
        'ts-jest': {
            isolatedModules: boolean;
        };
    };
    coverageReporters: string[];
    collectCoverageFrom: string[];
    testMatch: string[];
    transformIgnorePatterns: string[];
    moduleNameMapper: {
        '\\.(css|sass|scss)$': string;
    };
};
