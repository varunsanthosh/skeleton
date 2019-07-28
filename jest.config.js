const env = "development";
const IN_PRODUCTION = true;

module.exports = {
  transform: {
    "^.+\\.(jsx?|tsx?)$": "babel-jest"
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  transformIgnorePatterns: ["/!node_modules\\/lodash-econsts/"],
  modulePaths: ["src"],
  collectCoverage: true,
  coverageReporters: ["json", "html"],
  globals: {
    env,
    IN_PRODUCTION,
  },
};
