import { deepMerge } from "../../../../utils";
import ts from "../../ts/v8/config";

const config = deepMerge(ts, {
  settings: {
    react: {
      version: "detect",
    },
  },
  plugins: ["react", "react-hooks", "jsx-a11y"],
  extends: [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
  ],
});

export default config;
