import path from "path";
import { VelupCategory } from "../../types";
import base from "./base/plugin.config";
import actions from "./gh-actions/plugin.config";

const semanticRelease: VelupCategory = {
  id: "semantic-release",
  label: "Semantic release",
  files: [
    {
      id: "releaserc",
      templatePath: path.resolve(__dirname, "./templates/releaserc.hbs"),
      outFile: ".releaserc",
    },
  ],
  plugins: [base, actions],
};

export default semanticRelease;
