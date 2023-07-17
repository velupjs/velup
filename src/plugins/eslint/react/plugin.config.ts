import { VelupCategoryPlugin } from "../../../types";
import base from "../base/plugin.config";
import config from "./v8/config";
import { mergeCategoryPlugins } from "../../../utils";

const react: VelupCategoryPlugin = {
  id: "react",
  label: "React",
  devDependencies: ["eslint-plugin-react", "eslint-plugin-react-hooks", "eslint-plugin-jsx-a11y"],
  fileData: {
    config,
  },
};

export default mergeCategoryPlugins(base, react);
