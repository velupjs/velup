import mergeFileList from "./mergeFileList";
import { VelupCategory, VelupPlugin, VelupPluginList } from "../types";

const isCategory = (obj: VelupPlugin | VelupCategory): obj is VelupCategory => {
  return "plugins" in obj;
};

const flattenPluginCategories = (plugins: VelupPluginList): VelupPlugin[] => {
  return Object.keys(plugins).reduce((list, pluginId: string) => {
    const category = plugins[pluginId];
    if (!isCategory(category)) {
      list.push(category);
    } else {
      category.plugins.forEach((plugin) => {
        const id = `${category.id}:${plugin.id}`;
        const files = mergeFileList(category.files || [], plugin.files || []);

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

export default flattenPluginCategories;
