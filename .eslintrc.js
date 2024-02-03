module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "next", "airbnb"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    quotes: 0,
    "react/jsx-filename-extension": 0,
    "react/prop-types": 0,
    "react/jsx-props-no-spreading": 0,
    "react/jsx-no-bind": 0,
    "comma-dangle": 0,
    "linebreak-style": 0,
    "no-param-reassign": 0,
    "object-curly-newline": 0,
    "react/jsx-wrap-multilines": 0,
    "implicit-arrow-linebreak": 0,
    "operator-linebreak": 0,
    "no-underscore-dangle": 0,
    "react/jsx-curly-newline": 0,
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [["@", "."]],
      },
    },
  },
};
