#!/usr/bin/env node
import clear from "clear";
import { CliArgs } from "./types";
import {
  parseCLI,
  getAvailablePlugins,
  patchPlugins,
  getPluginDependencies,
  getCompiledTemplates,
} from "./lib";
import presetPlugins from "./plugins";

const run = (cliArgs: CliArgs) => {
  clear();

  if (cliArgs["--dry-run"]) {
    console.info("The script is now running in dry-mode. No files will be written or changed");
  }

  const availablePlugins = getAvailablePlugins(presetPlugins);
  const selectedPlugins = ["eslint:ts", "prettier"];
  const selectedPluginList = patchPlugins(selectedPlugins, availablePlugins);
  const dependencies = getPluginDependencies(selectedPluginList);
  const files = getCompiledTemplates(selectedPluginList);
  console.log(dependencies, files);
};

const args = parseCLI();
run(args);
