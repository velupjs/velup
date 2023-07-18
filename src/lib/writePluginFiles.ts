import chalk from "chalk";
import { VelupPlugin } from "../types";
import { log } from "../utils";
import getCompiledTemplates from "./getCompiledTemplates";

const writePluginFiles = (plugins: VelupPlugin[]) => {
  const files = getCompiledTemplates(plugins);
  log
    .announce("Creating the following files")
    .info(files.map(({ outPath }) => outPath).join(", "))
    .dryrun("");
  files.forEach((file) => {
    log.dryrun(chalk.bold(file.outPath)).dryrun("");
    log.dryrun(file.content).e();
  });
};

export default writePluginFiles;
