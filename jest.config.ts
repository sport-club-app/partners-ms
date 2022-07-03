
export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  watchman: true,
  verbose: true,
  setupFilesAfterEnv: ["<rootDir>/__test__/setup.ts"],
  collectCoverageFrom: [
    "src/app/controllers/**/*.{js,ts}",
    "src/app/core/**/*.{js,ts}",
    "src/app/dto/**/*.{js,ts}",
    "src/app/repository/**/*.{js,ts}",
    "src/app/validators/**/*.{js,ts}",
    "src/app/exceptions/**/*.{js,ts}",
    "!src/app/core/entity/*",
    "!src/app/repository/in-memory/*",
    "!**/node_modules/**",
    "!**/vendor/**"
  ]
}
