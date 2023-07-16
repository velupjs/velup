import { VelupCategoryPlugin } from "../../../types";
import base from "../base/plugin.config";
import config from "./v8/config";
import { mergePlugins } from "../../../lib";

const react: VelupCategoryPlugin = {
  id: "react",
  devDependencies: [
    ...(base.devDependencies || []),
    "eslint-plugin-react",
    "eslint-plugin-react-hooks",
    "eslint-plugin-jsx-a11y",
  ],
  fileData: {
    config,
  },
};

export default mergePlugins(base, react);
