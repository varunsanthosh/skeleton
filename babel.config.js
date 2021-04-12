
module.exports = {
  presets: [
    [
      "@babel/env",
      {
        targets: {
          chrome: 52,
          browsers: ["last 2 versions", "safari 7"]
        },
        loose: true
      }
    ],
    "@babel/react",
    "@babel/typescript"
  ],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-transform-object-assign",
    "array-includes",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    "@babel/plugin-proposal-class-properties",
    [
      "@babel/plugin-transform-runtime",
      {
        helpers: false,
        regenerator: true
      }
    ]
  ],
  env: {
    development: {
      plugins: ["react-hot-loader/babel"]
    },
    test: {
      plugins: ["dynamic-import-node"]
    },
    production: {
      plugins: ["react-remove-properties"]
    },
    staging: {
      plugins: ["react-remove-properties"]
    }
  }
};
