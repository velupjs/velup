import { VelupPlugin } from "../types";
import { log } from "../utils";
import getPluginDependencies from "./getPluginDependencies";

const install = (type: "dependencies" | "devDependencies", dependencies: string[]) => {
  log.dryrun(
    `npm install ${type === "dependencies" ? "" : "--save-dev"} ${dependencies.join(" ")}`
  );
};

const installDependencies = (plugins: VelupPlugin[]) => {
  const deps = getPluginDependencies(plugins);
  if (deps.dependencies.length) {
    log.announce(`Installing the following dependencies`).info(deps.dependencies.join(", "));
    install("dependencies", deps.dependencies);
  }

  if (deps.devDependencies.length) {
    log.announce(`Installing the following devDependencies`).info(deps.devDependencies.join(","));
    install("dependencies", deps.dependencies);
  }
};

export default installDependencies;
