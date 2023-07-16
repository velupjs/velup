import { VelupPlugin } from "../types";

type DependencyList = {
  dependencies: string[];
  devDependencies: string[];
};

const deps: DependencyList = { dependencies: [], devDependencies: [] };

const getAllPluginDependencies = (plugins: VelupPlugin[]): DependencyList => {
  return plugins.reduce((list, plugin) => {
    return {
      dependencies: [...list.dependencies, ...(plugin.dependencies || [])],
      devDependencies: [...list.devDependencies, ...(plugin.devDependencies || [])],
    };
  }, deps);
};

export default getAllPluginDependencies;
