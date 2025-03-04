module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    // testMatch: ['**/tests/**/*.test.ts'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1"
    },
    moduleDirectories: ["node_modules", "src"],
    roots: ["<rootDir>/src/__tests__"]
}