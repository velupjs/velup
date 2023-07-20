import path from "path";
import fs from "fs-extra";
import { VelupPlugin } from "../types";
import { States, deepMerge, log, useState, wait } from "../utils";

const processPath = process.cwd();

const updatePackageJson = async (pluginList: VelupPlugin[]) => {
  const updates = pluginList.reduce((config, plugin) => {
    if (plugin.packageJsonUpdates) {
      return deepMerge(config, plugin.packageJsonUpdates);
    }
    return config;
  }, {});

  if (updates) {
    const [isDryRun] = useState(States.dryRun);
    log.info().announce("Updating package.json with necessary confriguration").info();
    await wait();
    log.debug("updates:", updates);
    const pkgJsonPath = path.resolve(processPath, "package.json");
    const pkg = await fs.readJSON(pkgJsonPath);
    const updatedPkg = deepMerge(pkg, updates);
    if (isDryRun()) {
      log.dryrun(JSON.stringify(updatedPkg, null, 2));
    } else {
      await fs.writeFile(pkgJsonPath, JSON.stringify(updatedPkg, null, 2));
    }
    log.success("package.json has been updated");
  }
};

export default updatePackageJson;
