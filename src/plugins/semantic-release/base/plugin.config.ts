import { VelupCategoryPlugin } from "../../../types";

const base: VelupCategoryPlugin = {
  id: "base",
  label: "Default",
  devDependencies: [
    "@semantic-release/changelog",
    "@semantic-release/commit-analyzer",
    "@semantic-release/git",
    "@semantic-release/release-notes-generator",
    "semantic-release",
  ],
};

export default base;
