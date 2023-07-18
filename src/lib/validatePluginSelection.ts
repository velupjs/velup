import { VelupPluginList } from "../types";
import { findFirstDuplicate, getFlatPluginIdArray } from "../utils";

type PluginSelectionValidation = {
  success: boolean;
  message?: string;
};

function findMissingIds(strings: string[], objects: { id: string; label: string }[]): string[] {
  const objectIdsSet = new Set(objects.map((obj) => obj.id));
  const missingIds: string[] = [];

  for (const str of strings) {
    if (!objectIdsSet.has(str)) {
      missingIds.push(str);
    }
  }

  return missingIds;
}

/**
 * Check that the list of selected plugins is valid
 *
 * @param {string[]} selection Array containing the selected plugin IDs
 * @param {VelupPluginList} pluginList List of plugins to validate the availability of a plugin
 * @returns {PluginSelectionValidation} Validation status and message
 */
const validatePluginSelection = (
  selection: string[],
  pluginList?: VelupPluginList
): PluginSelectionValidation => {
  if (!selection.length) {
    return { success: false, message: "Please select at least 1 plugin" };
  }

  const categories = selection.filter((p) => p.includes(":")).map((p) => p.split(":")[0]);
  const dupe = findFirstDuplicate(categories);

  if (dupe) {
    return { success: false, message: `You can only select 1 ${dupe} plugin.` };
  }

  if (pluginList) {
    const validPluginIds = getFlatPluginIdArray(pluginList);
    const invalidPlugins = findMissingIds(selection, validPluginIds);

    if (invalidPlugins.length) {
      return {
        success: false,
        message: `The provided plugin(s) [${invalidPlugins.join(
          ", "
        )}] are not available for installation`,
      };
    }
  }

  return { success: true };
};

export default validatePluginSelection;
