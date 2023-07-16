import { VelupPlugin, VelupPluginList, VelupCategory } from "../types";
import { mergeFileList } from "../utils";

const isCategory = (obj: VelupPlugin | VelupCategory): obj is VelupCategory => {
  return "plugins" in obj;
};

const flattenPluginCategories = (plugins: VelupPluginList): VelupPlugin[] => {
  return plugins.reduce((list, item) => {
    if (!isCategory(item)) {
      list.push(item);
    } else {
      item.plugins.forEach((plugin) => {
        const id = `${item.id}:${plugin.id}`;
        const files = mergeFileList(item.files || [], plugin.files || []);

        if (!files.length) {
          console.error(
            `The plugin ${id} is not including any files in either the category or the plugin. All plugins need to include at least 1 file`
          );
          process.exit(1);
        }

        list.push({ ...plugin, id, files });
      });
    }

    return list;
  }, [] as VelupPlugin[]);
};

const getAvailablePlugins = (
  plugins: VelupPluginList,
  external?: VelupPluginList
): VelupPlugin[] => {
  return flattenPluginCategories([...plugins, ...(external || [])]);
};

export default getAvailablePlugins;
