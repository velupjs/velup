import { VelupCategoryPlugin } from "../../../types";
import config from "./v8/config";

const base: VelupCategoryPlugin = {
  id: "base",
  label: "Default",
  devDependencies: [
    "eslint",
    "eslint-plugin-security",
    "eslint-plugin-unicorn",
    "eslint-plugin-import",
  ],
  fileData: {
    config,
  },
};

export default base;
