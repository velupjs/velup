import path from "path";
import { VelupPlugin } from "../../types";

const commitlint: VelupPlugin = {
  id: "commitlint",
  label: "Commitlint",
  files: [
    {
      id: "commitlintrc",
      templatePath: path.resolve(__dirname, "./templates/commitlintrc.hbs"),
      outFile: ".commitlintrc.js",
    },
  ],
  devDependencies: [
    "@commitlint/cli",
    "@commitlint/config-conventional",
    "@commitlint/prompt",
    "commitizen",
  ],
  packageJsonUpdates: {
    scripts: {
      commit: "git-cz",
    },
    config: {
      commitizen: {
        path: "@commitlint/prompt",
      },
    },
  },
};

export default commitlint;
