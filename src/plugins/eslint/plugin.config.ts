import path from "path";
import { VelupCategory } from "../../types";
import base from "./base/plugin.config";
import ts from "./ts/plugin.config";
import react from "./react/plugin.config";
import reactTs from "./react-ts/plugin.config";

const eslint: VelupCategory = {
  id: "eslint",
  label: "ESLint",
  files: [
    {
      id: "eslintrc",
      templatePath: path.resolve(__dirname, "./templates/config.hbs"),
      outFile: ".eslintrc.js",
    },
  ],
  plugins: [base, ts, react, reactTs],
};

export default eslint;
