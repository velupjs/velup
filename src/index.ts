#!/usr/bin/env node

import {
  getAvailablePlugins,
  patchPlugins,
  getPluginDependencies,
  getCompiledTemplates,
} from "./lib";

import presetPlugins from "./plugins";

const run = () => {
  const availablePlugins = getAvailablePlugins(presetPlugins);
  const selectedPlugins = ["eslint:ts", "prettier"];
  const selectedPluginList = patchPlugins(selectedPlugins, availablePlugins);
  const dependencies = getPluginDependencies(selectedPluginList);
  const files = getCompiledTemplates(selectedPluginList);
  console.log(dependencies, files);
};

run();
