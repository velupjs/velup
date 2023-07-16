import { deepMerge } from "../../../../utils";
import base from "../../base/v8/config";

const config = deepMerge(base, {
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.d.ts"],
      excludedFiles: ["*.js"],
      parser: "@typescript-eslint/parser",
      settings: {
        "import/resolver": {
          typescript: true,
          node: true,
        },
      },
      plugins: ["@typescript-eslint", "import"],
      extends: ["plugin:@typescript-eslint/recommended", "plugin:import/typescript"],
      rules: {
        "@typescript-eslint/no-unused-vars": "error",
      },
    },
  ],
});

export default config;
