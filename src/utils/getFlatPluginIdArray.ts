import { VelupPluginList } from "../types";
import isCategory from "./isCategory";

const getFlatPluginIdArray = (list: VelupPluginList): { id: string; label: string }[] => {
  return list.reduce(
    (list, item) => {
      if (isCategory(item)) {
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
