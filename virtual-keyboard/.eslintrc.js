module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "eslint:recommended",
    "airbnb-base/legacy"
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  rules: {
    semi: "warn",
    "no-use-before-define": ["error", { functions: false }],
    quotes: ["error", "double"],
    "linebreak-style": ["off", "windows"]
  }
};
