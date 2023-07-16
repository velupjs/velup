import { VelupPlugin } from "../types";
import { mergePlugins } from "../utils";

const patchPlugins = (pluginIds: string[], pluginList: VelupPlugin[]): VelupPlugin[] => {
  // Consolidate all selected module configs
  const selectedPluginList: VelupPlugin[] = pluginIds.map((pluginId: string) => {
    return pluginList.find((plugin) => plugin.id === pluginId) as VelupPlugin;
  });
  // Check plugins to see if any needs to be patched based on the precense of another
  selectedPluginList.forEach((plugin) => {
    if (plugin.patches) {
      Object.keys(plugin.patches).forEach((patchKey) => {
        // Check if the plugin to patch is present
        const pluginToPatchId = patchKey.includes(":*") ? patchKey.split(":")[0] + ":" : patchKey;
        const isPatchPluginPresent = pluginIds.some((id) => id.includes(pluginToPatchId));
        if (isPatchPluginPresent && plugin.patches) {
          const pluginIdx = pluginIds.findIndex((id) => id.includes(pluginToPatchId));
          selectedPluginList[pluginIdx] = mergePlugins(
            selectedPluginList[pluginIdx],
            plugin.patches[patchKey]
          );
        }
      });
    }
  });

  return selectedPluginList;
};

export default patchPlugins;
