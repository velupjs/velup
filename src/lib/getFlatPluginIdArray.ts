import { VelupPluginList } from "../types";

const getFlatPluginIdArray = (list: VelupPluginList): { id: string; label: string }[] => {
  return list.reduce(
    (list, item) => {
      const isCategory = "plugins" in item;

      if (isCategory) {
        item.plugins.forEach(({ id, label }) => {
          list.push({ id: `${item.id}:${id}`, label: `${item.label} - ${label}` });
        });
      } else {
        list.push({ id: item.id, label: item.label });
      }
      return list;
    },
    [] as { id: string; label: string }[]
  );
};

export default getFlatPluginIdArray;
