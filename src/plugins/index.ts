import { VelupPluginList } from "../types";
import eslint from "./eslint/plugin.config";
import prettier from "./prettier/plugin.config";

const list: VelupPluginList = { eslint, prettier };

export default list;
