import { docopt } from "docopt";
import { textSync } from "figlet";
import clear from "clear";
import { version } from "../../package.json";
import { CliArgs } from "../types";
import { log } from "./Logger";
import useState, { States } from "./useState";

const doc = `${textSync("velup", { font: "Slant" })} @v${version}

⚡ Interactive CLI tool to install and configure code quality dependencies for projects

Usage:
    velup
    velup [--plugins=<plugins>...] [--dry-run] [--debug-mode] [-w | --workspace]
    velup -h | --help | --version

Options
    --plugins=<plugins>   Comma separated list of plugins to install
    -w --workspace        Run installation of tools at monorepo workspace level
    --debug-mode          Run the script logging information useful for debugging
    --dry-run             Run the command and log the output without writing any files
    -h --help             Show this screen
    --version             Show version
`;

const parseCLI = (): CliArgs => {
  const args = docopt(doc, { version: `v${version}` });

  clear();

  log.announce("⚡ velup@v" + version);

  if (process.env.DEBUG_MODE || args["--debug-mode"]) {
    const [, setDebugMode] = useState(States.debugMode);
    setDebugMode(true);
    log.debug("Debug mode is on");
  }

  if (args["--dry-run"]) {
    // Start Dry run
    const [, setDryRun] = useState(States.dryRun);
    setDryRun(true);
    log.dryrun("The script is now running in dry-mode. No files will be written or changed");
  }

  if (args["-w"] || args["--workspace"]) {
    const [, setWorkspace] = useState(States.workspace);
    setWorkspace(true);
  }

  log.e();

  return args;
};

export default parseCLI;
