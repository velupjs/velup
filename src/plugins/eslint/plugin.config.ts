import path from "path";
import { VelupCategory } from "../../types";
import base from "./base/plugin.config";
import ts from "./ts/plugin.config";

const eslint: VelupCategory = {
  id: "eslint",
  files: [
    {
      id: "eslintrc",
      templatePath: path.resolve(__dirname, "./templates/config.hbs"),
      outFile: ".eslintrc.js",
    },
  ],
  plugins: [base, ts],
};

export default eslint;
