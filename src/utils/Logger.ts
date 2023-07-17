/* eslint-disable @typescript-eslint/no-explicit-any */
import chalk from "chalk";
import useState, { States } from "./useState";

enum LogLevel {
  "announce",
  "info",
  "warn",
  "debug",
  "error",
  "verbose",
  "dryrun",
}

class Logger {
  private prefixes: Record<LogLevel, string> = {
    [LogLevel.announce]: chalk.white.bold("📢 [info]"),
    [LogLevel.info]: chalk.white("   [info]"),
    [LogLevel.warn]: chalk.yellow(" ⚠️ [warn]"),
    [LogLevel.error]: chalk.red("⛔ [error]"),
    [LogLevel.debug]: chalk.blue("🐞[debug]"),
    [LogLevel.verbose]: chalk.gray.bold("[verbose]"),
    [LogLevel.dryrun]: chalk.green.bold("[dry-run]"),
  };

  private prefix: string = this.prefixes[LogLevel.info];
  private hasPrev = false;

  private log(...args: any[]): Logger {
    if (this.prefix) {
      this.logPrev();
      console.log(this.prefix, ...args);
    }
    return this;
  }

  private setPrefix(level: LogLevel): void {
    this.prefix = this.prefixes[level];
  }

  private logPrev() {
    if (this.hasPrev) {
      console.log(this.prefix);
      this.hasPrev = false;
    }
  }

  info(...args: any[]): Logger {
    this.setPrefix(LogLevel.info);
    return this.log(...args);
  }

  announce(...args: any[]): Logger {
    this.setPrefix(LogLevel.announce);
    return this.log(...args);
  }

  warn(...parameters: any[]): Logger {
    this.setPrefix(LogLevel.warn);
    return this.log(...parameters);
  }

  error(...parameters: any[]): Logger {
    this.setPrefix(LogLevel.error);
    return this.log(...parameters);
  }

  debug(...parameters: any[]): Logger {
    const [isDebugMode] = useState(States.debugMode);

    if (isDebugMode()) {
      this.setPrefix(LogLevel.debug);
      return this.log(...parameters);
    } else {
      return this;
    }
  }

  dryrun(args: string): Logger {
    const [isDryRun] = useState(States.dryRun);

    if (isDryRun()) {
      this.setPrefix(LogLevel.dryrun);
      args.split("\n").forEach((arg) => this.log(arg));
      return this;
    } else {
      return this;
    }
  }

  p(): Logger {
    this.hasPrev = true;
    return this;
  }

  n(): Logger {
    return this.log();
  }

  e(): Logger {
    console.log();
    return this;
  }
}

const log = new Logger();

export { log };
export default Logger;
