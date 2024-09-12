module.exports = {
  env: {
    browser: false,
    es2021: true,
    mocha: true,
    node: true,
  },
  plugins: ["@typescript-eslint"],
  extends: ["standard", "plugin:prettier/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    // "node/no-unsupported-features/es-syntax": ["error", { ignores: ["modules"] }],
    "eslint-disable-next-line no-throw-literal": "off",
    "no-throw-literal": "off",
    "prettier/prettier": "off",
    "node/no-path-concat": "off",
  },
};
