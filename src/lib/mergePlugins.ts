import { PluginPatch, VelupPlugin } from "../types";
import { deepMerge } from "../utils";

/**
 * Deep merges two Velup plugins returning the combined result
 * @param {VelupPlugin|PluginPatch} p1 - The first plugin
 * @param {VelupPlugin|PluginPatch} p2 - The second plugin
 * @returns {VelupPlugin} The merged plugin
 */
const mergePlugins = (
  p1: VelupPlugin | PluginPatch,
  p2: VelupPlugin | PluginPatch
): VelupPlugin => {
  return deepMerge(p1, p2) as VelupPlugin;
};

export default mergePlugins;
