module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  plugins: ["sonarjs", "import", "@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:sonarjs/recommended",
    "plugin:import/recommended",
    "prettier",
  ],
  rules: {
    "import/export": "off",
    "security/detect-non-literal-require": "off",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.d.ts"],
      excludedFiles: ["*.js"],
      plugins: ["@typescript-eslint"],
      parser: "@typescript-eslint/parser",
      settings: {
        "import/parsers": {
          "@typescript-eslint/parser": [".ts", ".tsx"],
        },
        "import/resolver": {
          typescript: {
            alwaysTryTypes: true,
            project: ["tsconfig.json"],
          },
        },
      },
      extends: ["plugin:@typescript-eslint/recommended", "plugin:import/typescript"],
      rules: {
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
};
