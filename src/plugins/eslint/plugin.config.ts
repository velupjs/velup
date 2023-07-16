import path from "path";
import { VelupCategory } from "../../types";
import base from "./base/plugin.config";

const eslint: VelupCategory = {
  id: "eslint",
  files: [
    {
      id: "eslintrc",
      templatePath: path.resolve(__dirname, "./templates/config.hbs"),
      outFile: ".eslintrc.js",
    },
  ],
  plugins: [base],
};

export default eslint;
