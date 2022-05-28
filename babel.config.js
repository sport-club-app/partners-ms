// babel.config.js
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: { node: "current" }
      }
    ],
    "@babel/preset-typescript"
  ],
  plugins: [
    ["module-resolver", {
      alias: {
        "@UseCases": "./src/use-cases",
        "@Entity": "./src/entity",
        "@Validators": "./src/validators",
        "@Controllers": "./src/controllers",
        "@Repository": "./src/repository",
        "@Infra": "./src/infra",
        "@Utils": "./src/utils",
        "@Core": "./src/core",
        "@Factory": "./src/factory"
      }
    }],
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true
      }
    ],
    [
      "@babel/plugin-proposal-class-properties",
      {
        loose: true
      }
    ]
  ],
  ignore: [
    "build/**/*.test.ts"
  ]
}
