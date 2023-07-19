import { VelupPlugin, VelupPluginList } from "../types";
import { log } from "../utils";
import flattenPluginCategories from "./flattenPluginCategories";
import getUserPluginSelection from "./getUserPluginSelection";
import patchPlugins from "./patchPlugins";
import validatePluginSelection from "./validatePluginSelection";

const getPluginsToInstall = async (
  pluginList: VelupPluginList,
  argsPlugins: string[]
): Promise<VelupPlugin[]> => {
  if (argsPlugins.length) {
    const validateArgPlugins = validatePluginSelection(argsPlugins[0].split(" "), pluginList);
    if (!validateArgPlugins.success) {
      log.error(validateArgPlugins.message);
      process.exit(0);
    }
    log.info("Argument plugins have been validated");
  }

  const selectedPlugins = argsPlugins.length
    ? argsPlugins[0].split(" ")
    : await getUserPluginSelection(pluginList);
  log.info(`You have selected the following plugins: ${selectedPlugins.join(", ")}`).e();

  const plugins = flattenPluginCategories(pluginList);
  return patchPlugins(selectedPlugins, plugins);
};

export default getPluginsToInstall;
