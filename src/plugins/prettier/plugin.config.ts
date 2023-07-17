import path from "path";
import { VelupPlugin } from "../../types";
import config from "./config";

const prettier: VelupPlugin = {
  id: "prettier",
  label: "Prettier",
  devDependencies: ["prettier"],
  files: [
    {
      id: "prettierrc",
      templatePath: path.resolve(__dirname, "./templates/prettierrc.hbs"),
      outFile: ".prettierrc.js",
    },
    {
      id: "prettierignore",
      templatePath: path.resolve(__dirname, "./templates/prettierignore.hbs"),
      outFile: ".prettierignore",
    },
  ],
  fileData: {
    config,
  },
  patches: {
    "eslint:*": {
      devDependencies: ["eslint-config-prettier"],
      fileData: {
        config: {
          extends: ["prettier"],
        },
      },
    },
  },
};

export default prettier;
