#!/usr/bin/env node

import { parseCLI, log } from "./utils";
import {
  getAvailablePlugins,
  patchPlugins,
  getPluginDependencies,
  getCompiledTemplates,
} from "./lib";
import presetPlugins from "./plugins";
import chalk from "chalk";

const run = () => {
  const availablePlugins = getAvailablePlugins(presetPlugins);
  const selectedPlugins = ["eslint:ts", "prettier"];
  const selectedPluginList = patchPlugins(selectedPlugins, availablePlugins);
  const deps = getPluginDependencies(selectedPluginList);
  if (deps.dependencies.length) {
    log.announce(`Installing the following dependencies`);
    log.dryrun(JSON.stringify(deps.dependencies)).e();
  }
  if (deps.devDependencies.length) {
    log.announce(`Installing the following devDependencies`);
    log.dryrun(JSON.stringify(deps.devDependencies)).e();
  }

  const files = getCompiledTemplates(selectedPluginList);
  log.announce("Creating the following files").dryrun("");
  files.forEach((file) => {
    log.dryrun(chalk.bold(file.outPath)).n();
    log.dryrun(file.content).e();
  });
};

parseCLI();
run();
