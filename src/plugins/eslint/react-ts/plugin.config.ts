import { VelupCategoryPlugin } from "../../../types";
import ts from "../ts/plugin.config";
import config from "./v8/config";
import { mergeCategoryPlugins } from "../../../utils";

const react: VelupCategoryPlugin = {
  id: "react-ts",
  label: "React (with Typescript)",
  devDependencies: ["eslint-plugin-react", "eslint-plugin-react-hooks", "eslint-plugin-jsx-a11y"],
  fileData: {
    config,
  },
};

export default mergeCategoryPlugins(ts, react);
