module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "standard-react"
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    quotes: [
      "error",
      "double"
    ],
    semi: [
      "error",
      "always"
    ],
    indent: [
      "error",
      2
    ],
    "no-multi-spaces": [
      "error"
    ],
    "no-unused-vars": [
      "error",
      {
        vars: "all", args: "after-used", ignoreRestSiblings: false, argsIgnorePattern: "^_", varsIgnorePattern: "^_"
      }
    ],
    "eol-last": [
      "error",
      "always"
    ]
  },
};
