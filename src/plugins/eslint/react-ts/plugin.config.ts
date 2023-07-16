import { VelupCategoryPlugin } from "../../../types";
import { deepMerge } from "../../../utils";
import ts from "../ts/plugin.config";
import config from "./v8/config";

const react: VelupCategoryPlugin = {
  id: "react-ts",
  devDependencies: ["eslint-plugin-react", "eslint-plugin-react-hooks", "eslint-plugin-jsx-a11y"],
  fileData: {
    config,
  },
};

export default deepMerge(ts, react) as VelupCategoryPlugin;
