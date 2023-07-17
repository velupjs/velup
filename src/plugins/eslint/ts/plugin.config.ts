import { VelupCategoryPlugin } from "../../../types";
import base from "../base/plugin.config";
import config from "./v8/config";
import { mergeCategoryPlugins } from "../../../utils";

const ts: VelupCategoryPlugin = {
  id: "ts",
  label: "Typescript",
  devDependencies: ["@typescript-eslint/eslint-plugin", "@typescript-eslint/parser"],
  fileData: {
    config,
  },
};

export default mergeCategoryPlugins(base, ts);
