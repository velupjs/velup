import { VelupCategoryPlugin } from "../types";
import deepMerge from "./deepMerge";

/**
 * Deep merges two Velup plugins returning the combined result
 * @param {VelupCategoryPlugin} p1 - The first plugin
 * @param {VelupCategoryPlugin} p2 - The second plugin
 * @returns {VelupCategoryPlugin} The merged plugin
 */
const mergeCategoryPlugins = (
  p1: VelupCategoryPlugin,
  p2: VelupCategoryPlugin
): VelupCategoryPlugin => {
  return deepMerge(p1, p2) as VelupCategoryPlugin;
};

export default mergeCategoryPlugins;
