import eslint from "./eslint/plugin.config";
import prettier from "./prettier/plugin.config";
import commitlint from "./commitlint/plugin.config";
import semanticRelease from "./semantic-release/plugin.config";

// prettier-ignore
export default [
  eslint, 
  prettier,
  commitlint,
  semanticRelease,
];
