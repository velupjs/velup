import { VelupPlugin, VelupCategory } from "../types";

const isCategory = (obj: VelupPlugin | VelupCategory): obj is VelupCategory => {
  return "plugins" in obj;
};

export default isCategory;
