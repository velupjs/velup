#!/usr/bin/env node

import {
  getAllPluginDependencies,
  getAvailablePlugins,
  getCompiledTemplates,
  getSelectedPluginListPatched,
} from "./lib";

const availablePlugins = getAvailablePlugins();

const run = () => {
  const selectedPlugins = ["eslint:react", "prettier"];
  const selectedPluginList = getSelectedPluginListPatched(selectedPlugins, availablePlugins);
  const dependencies = getAllPluginDependencies(selectedPluginList);
  const files = getCompiledTemplates(selectedPluginList);
  console.log(dependencies, files);
};

run();
