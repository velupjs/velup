#!/usr/bin/env node

import { parseCLI } from "./utils";
import {
  getPluginsToInstall,
  installDependencies,
  updatePackageJson,
  writePluginFiles,
} from "./lib";
import plugins from "./plugins";
import { CliArgs } from "./types";

const run = async (args: CliArgs) => {
  const selectedPluginList = await getPluginsToInstall(plugins, args["--plugins"] || []);
  await installDependencies(selectedPluginList);
  await writePluginFiles(selectedPluginList);
  await updatePackageJson(selectedPluginList);
};

const args = parseCLI();
run(args);
