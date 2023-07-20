import fs from "fs-extra";
import chalk from "chalk";
import ProgressBar from "progress";
import { confirm } from "@inquirer/prompts";
import { VelupPlugin } from "../types";
import { States, log, useState, wait } from "../utils";
import getCompiledTemplates, { FileList } from "./getCompiledTemplates";
import path from "path";

const processPath = process.cwd();

const checkIfFilesEsxist = (files: FileList): string[] => {
  const existingFiles: string[] = [];

  files.forEach((file) => {
    if (fs.existsSync(file.outPath)) {
      existingFiles.push(file.outPath);
    }
  });

  return existingFiles;
};

const backupFile = async (filepath: string, time: string) => {
  const backupFilepath = path.resolve(processPath, filepath + "." + time + ".bpk");
  await fs.copy(filepath, backupFilepath);
};

const dryRunBackup = async (filepath: string, time: string) => {
  const backupFilepath = path.resolve(processPath, filepath + "." + time + ".bpk");
  log.dryrun(`backing up ${chalk.blue(filepath)} to  ${chalk.blue(backupFilepath)}`);
  await wait();
};

const writePluginFiles = async (plugins: VelupPlugin[]) => {
  const files = getCompiledTemplates(plugins);
  const [checkDryRun] = useState(States.dryRun);
  const isDryRun = checkDryRun();

  // Announce list of files to be written
  log.info().announce("Identifying plugin files to create").info();
  await wait();

  plugins.forEach(({ id, files }) => {
    log.info(chalk.bold(id));
    files.forEach((file) => {
      log.info(chalk.blue(file.outFile));
    });
    log.n();
  });

  await wait();

  // Check if any of the files to be written already exist
  const existingFiles = checkIfFilesEsxist(files);

  if (existingFiles.length) {
    const existingFilesFileNames = existingFiles.map((f) => path.basename(f));
    const backup = await confirm({
      message: `Some of these files already exist (${existingFilesFileNames.join(
        ", "
      )}). Would you like to back them up?`,
      default: true,
    });

    if (backup) {
      log.info().announce("Backing up files");
      const backupBar = new ProgressBar(
        `${chalk.white("⚙️  [info]")} backups [:bar] :rate/bps :percent :etas`,
        {
          complete: "=",
          incomplete: " ",
          width: 20,
          total: existingFiles.length,
        }
      );
      const time = new Date().toISOString().replace(/:/g, "-");
      for (let i = 0; i < existingFiles.length; i++) {
        if (!isDryRun) {
          await backupFile(existingFiles[i], time);
        } else {
          await dryRunBackup(existingFiles[i], time);
        }
        backupBar.tick();
        await wait();
      }
      log.info();
      existingFiles.forEach((f) =>
        log.success("New backup file:", chalk.blue(f + "." + time + "bkp"))
      );
    }
  }

  // Create new files
  log.announce("Creating plugin files").info();
  const bar = new ProgressBar(
    `${chalk.white("⚙️  [info]")} files [:bar] :rate/bps :percent :etas`,
    {
      complete: "=",
      incomplete: " ",
      width: 20,
      total: files.length,
    }
  );
  for (let i = 0; i < files.length; i++) {
    const { outPath, content } = files[i];
    const filePath = path.resolve(processPath, outPath);
    log.debug("checking for", chalk.blue(filePath));
    if (!isDryRun) {
      await fs.writeFile(filePath, content);
    } else {
      log.dryrun(chalk.blue(filePath));
      log.dryrun(content).n();
    }
    bar.tick();
    await wait();
  }

  log.info();
  files.forEach(({ outPath }) => log.success("New file:", chalk.blue(outPath)));
};

export default writePluginFiles;
