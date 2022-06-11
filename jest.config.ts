
export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  watchman: true,
  verbose: true,
  setupFilesAfterEnv: ["<rootDir>/__test__/setup.ts"]
}
