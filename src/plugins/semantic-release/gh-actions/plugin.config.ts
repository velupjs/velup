import path from "path";
import { VelupCategoryPlugin } from "../../../types";
import { mergeCategoryPlugins } from "../../../utils";
import base from "../base/plugin.config";

const actions: VelupCategoryPlugin = {
  id: "gh-actions",
  label: "With GitHub Actions",
  files: [
    {
      id: "action",
      templatePath: path.resolve(__dirname, "../templates/actions.hbs"),
      outFile: ".github/workflows/release.yml",
    },
  ],
};

export default mergeCategoryPlugins(base, actions);
