import { mergePlugins } from "../../../lib";
import { VelupCategoryPlugin } from "../../../types";
import ts from "../ts/plugin.config";
import config from "./v8/config";

const react: VelupCategoryPlugin = {
  id: "react-ts",
  devDependencies: ["eslint-plugin-react", "eslint-plugin-react-hooks", "eslint-plugin-jsx-a11y"],
  fileData: {
    config,
  },
};

export default mergePlugins(ts, react);
