import { docopt } from "docopt";
import { textSync } from "figlet";
import { version } from "../../package.json";
import { CliArgs } from "../types";

const doc = `${textSync("velup", { font: "Slant" })} @v${version}

CLI tool to install and configure code quality dependencies for projects

Usage:
    velup
    velup --dry-run | -h | --help | --version

Options
    --dry-run   Run the command and log the output without writing any files
    -h --help   Show this screen
    --version   Show version
`;

const parseCLI = (): CliArgs => {
  const args = docopt(doc, { version: `v${version}` });
  console.log(args);
  return args;
};

export default parseCLI;
