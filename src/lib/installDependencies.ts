import fs from "fs";
import { VelupPlugin } from "../types";
import { States, log, runCommand, useState, wait } from "../utils";
import getPluginDependencies from "./getPluginDependencies";

type PackageManager = "npm" | "yarn" | "pnpm";

type Commands = Record<PackageManager, { dependencies: string; devDependencies: string }>;

const commands: Commands = {
  npm: { dependencies: "npm install --save", devDependencies: "npm install --save-dev" },
  yarn: { dependencies: "yarn add", devDependencies: "yarn add --dev" },
  pnpm: { dependencies: "pnpm add --save", devDependencies: "pnpm install --save-dev" },
};

const getPackageManager = async (): Promise<PackageManager> => {
  log.announce("Attempting to detect package manager");
  await wait();
  if (fs.existsSync("package-lock.json")) {
    log.info('Identified "npm" as a package manager. Proceeding to installation...').n();
    return `npm`;
  } else if (fs.existsSync("yarn.lock")) {
    log.info('Identified "yarn" as a package manager. Proceeding to installation...').n();
    return "yarn";
  } else if (fs.existsSync("pnpm-lock.yaml") || fs.existsSync("pnpm-lock.json")) {
    log.info('Identified "pnpm" as a package manager. Proceeding to installation...').n();
    return "pnpm";
  } else {
    log.info('Unable to identify package manager. Proceeding to installation with "npm"...').n();
    return "npm";
  }
};

const getWorkspaceFlag = (pkgManager: PackageManager): string => {
  switch (pkgManager) {
    case "npm":
      return " -w ";
    case "yarn":
      return " -W ";
    case "pnpm":
      return " -w ";
    default:
      return " ";
  }
};

const install = async (
  pkgManager: PackageManager,
  type: "dependencies" | "devDependencies",
  dependencies: string[]
) => {
  const [isDryRun] = useState(States.dryRun);
  const [isWorkspaceInstall] = useState(States.workspace);
  const cmd = `${commands[pkgManager][type]}${
    isWorkspaceInstall() ? getWorkspaceFlag(pkgManager) : " "
  }${isDryRun() ? "--dry-run " : ""}`;
  await runCommand(`${cmd}${dependencies.join(" ")}`);
};

const installDependencies = async (plugins: VelupPlugin[]) => {
  const pkgManager = await getPackageManager();
  const deps = getPluginDependencies(plugins);
  if (deps.dependencies.length) {
    log.announce(`Installing dependencies`);
    await install(pkgManager, "dependencies", deps.dependencies);
  }

  if (deps.devDependencies.length) {
    log.announce(`Installing the following devDependencies`);
    await install(pkgManager, "devDependencies", deps.devDependencies);
  }
};

export default installDependencies;
