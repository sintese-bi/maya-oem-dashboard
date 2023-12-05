module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "no-case-declarations": "off",
    "no-duplicate-case": "off",
    "no-inner-declarations": "off",
    "no-unused-vars": "off",
    "react/prop-types": "off",
    "no-dupe-keys": "off",
    "react/no-unknown-property": "off",
    "no-mixed-spaces-and-tabs": "off",
    "no-unreachable": "off",
    "no-extra-semi": "off",
    "no-empty": "off",
    "no-useless-escape": "off",
  },
};
