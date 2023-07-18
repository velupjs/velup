#!/usr/bin/env node

import { parseCLI, log } from "./utils";
import {
  getAvailablePlugins,
  patchPlugins,
  getPluginDependencies,
  getCompiledTemplates,
  getUserPluginSelection,
  validatePluginSelection,
} from "./lib";
import presetPlugins from "./plugins";
import chalk from "chalk";
import { CliArgs } from "./types";

const run = async (args: CliArgs) => {
  if (args["--plugins"]) {
    const validateArgPlugins = validatePluginSelection(
      args["--plugins"][0].split(" "),
      presetPlugins
    );
    if (!validateArgPlugins.success) {
      log.error(validateArgPlugins.message);
      process.exit(0);
    }
    console.info("Argument plugins have been validated");
  }

  const selectedPlugins = args["--plugins"]
    ? args["--plugins"][0].split(" ")
    : await getUserPluginSelection(presetPlugins);
  log.info(`You have selected the following plugins: ${selectedPlugins.join(", ")}`).e();

  const availablePluginList = getAvailablePlugins(presetPlugins);
  const selectedPluginList = patchPlugins(selectedPlugins, availablePluginList);

  const deps = getPluginDependencies(selectedPluginList);
  if (deps.dependencies.length) {
    log.announce(`Installing the following dependencies`).info(deps.dependencies.join(", "));
    log.dryrun(JSON.stringify(deps.dependencies)).e();
  }
  if (deps.devDependencies.length) {
    log.announce(`Installing the following devDependencies`).info(deps.devDependencies.join(","));
    log.dryrun(JSON.stringify(deps.devDependencies)).e();
  }

  const files = getCompiledTemplates(selectedPluginList);
  log
    .announce("Creating the following files")
    .info(files.map(({ outPath }) => outPath).join(", "))
    .dryrun("");
  files.forEach((file) => {
    log.dryrun(chalk.bold(file.outPath)).dryrun("");
    log.dryrun(file.content).e();
  });
};

const args = parseCLI();
run(args);
