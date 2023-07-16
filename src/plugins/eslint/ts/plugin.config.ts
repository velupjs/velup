import { VelupCategoryPlugin } from "../../../types";
import { deepMerge } from "../../../utils";
import base from "../base/plugin.config";
import config from "./v8/config";

const ts: VelupCategoryPlugin = {
  id: "ts",
  devDependencies: [
    ...(base.devDependencies || []),
    "@typescript-eslint/eslint-plugin",
    "@typescript-eslint/parser",
  ],
  fileData: {
    config,
  },
};

export default deepMerge(base, ts) as VelupCategoryPlugin;
