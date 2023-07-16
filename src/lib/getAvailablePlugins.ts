import plugins from "../plugins";
import { VelupPlugin } from "../types";
import flattenPluginCategories from "./flattenPluginCategories";

const getAvailablePlugins = (external?: string): VelupPlugin[] => {
  const list = flattenPluginCategories(plugins);
  if (external) {
    // placeholder to prvide support for external plugins
    return list;
  }
  return list;
};

export default getAvailablePlugins;
