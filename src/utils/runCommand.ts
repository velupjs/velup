import { exec } from "child_process";
import { log } from "./Logger";
import useState, { States } from "./useState";
import chalk from "chalk";

const logMultiLine = (data: string, type: "warn" | "info" | "dryrun") => {
  const dataArr = data.split("\n");
  dataArr.forEach((d: string) => log[type](chalk.gray(d)));
};

const runCommand = async (command: string, ignoreDryRun = false): Promise<void> => {
  const [checkDryRun] = useState(States.dryRun);
  const isDryRun = checkDryRun();

  log.info("Running command:").info(chalk.blue(command)).n();

  return !isDryRun || ignoreDryRun
    ? new Promise((resolve, reject) => {
        const cmd = exec(command);

        cmd.stdout?.on("data", (data) => {
          // Log the command's output to the terminal
          logMultiLine(data, isDryRun ? "dryrun" : "info");
        });

        cmd.stderr?.on("data", (data) => {
          // Log any errors or error-like messages to the terminal
          logMultiLine(data, "warn");
        });

        cmd.on("error", (error) => {
          // Handle any errors that occur during the command execution
          log.error("Error occurred while executing the command:", error);
          reject(error);
        });

        cmd.on("exit", (code, signal) => {
          if (code === 0) {
            // The command finished successfully
            resolve();
          } else {
            log.error(`Command exited with code ${code} and signal ${signal}`);
            process.exit(code || 1);
          }
        });
      })
    : new Promise((r) => {
        log.dryrun("Command absorbed by --dry-run flag");
        r();
      });
};
export default runCommand;
