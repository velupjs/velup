import { checkbox, Separator } from "@inquirer/prompts";
import chalk from "chalk";
import validatePluginSelection from "./validatePluginSelection";
import { VelupPluginList } from "../types";

type PluginTree = {
  [key: string]: {
    label: string;
    plugins?: {
      id: string;
      label: string;
    }[];
  };
};

type Choices = Array<
  { value: string; name?: string; disabled?: boolean | string; checked?: boolean } | Separator
>;

/**
 * Creates a tree including the ids and labels of the plugins available to the user which can be
 * used to create the list of options for inquirer
 *
 * @param {VelupPluginList} pluginList The list of available plugins
 * @returns {PluginTree} The formatted tree of plugins
 */
const buildSelectionTree = (pluginList: VelupPluginList): PluginTree => {
  return pluginList.reduce((list, item) => {
    const { id, label } = item;
    const isCategory = "plugins" in item;

    if (isCategory) {
      list[id] = {
        label,
        plugins: item.plugins.map(({ label, ...plugin }) => ({ id: `${id}:${plugin.id}`, label })),
      };
    } else {
      list[id] = { label };
    }

    return list;
  }, {} as PluginTree);
};

/**
 * Builds the Choices object to be used by inquirer
 *
 * @param {string[]} selection The current selection to set default values if necesary
 * @param {PluginTree} pluginTree The tree of available plugin IDs and labels
 * @returns {Choices} The inquirer Choices array
 */
const buildSelectionChoices = (selection: string[], pluginTree: PluginTree): Choices => {
  return Object.keys(pluginTree).reduce((list, id) => {
    const item = pluginTree[id];
    const isCategory = "plugins" in item;

    if (isCategory) {
      list.push(new Separator(chalk.bold(item.label)));
      item.plugins?.map((p, idx) => {
        list.push({
          name: p.label,
          value: p.id,
          checked: selection.length ? selection.includes(p.id) : idx === 0,
        });
      });
    } else {
      list.push(new Separator(chalk.bold(item.label)));
      list.push({
        name: "Default",
        value: id,
        checked: selection.length ? selection.includes(id) : true,
      });
    }

    return list;
  }, [] as Choices);
};

/**
 * Fetches the user's validated plugin selection
 *
 * @param {VelupPluginList} pluginList The available list of plugins
 * @returns {Promise<string[]>} A promise containing the list of validated plugin IDs
 */
const getUserPluginSelection = async (pluginList: VelupPluginList): Promise<string[]> => {
  const pluginTree = buildSelectionTree(pluginList);
  let message = `Select the plugins configurations you'd like to install. You can only pick one per category: ${pluginList
    .map(({ label }) => label)
    .join(", ")}`;
  let selection: string[] = [];
  let isSelectionValid = false;

  while (!isSelectionValid) {
    selection = await checkbox({
      message,
      choices: buildSelectionChoices(selection, pluginTree),
    });

    const validate = validatePluginSelection(selection);

    if (validate.success) {
      isSelectionValid = true;
    } else {
      message = validate.message || "";
    }
  }

  return selection;
};

export default getUserPluginSelection;
