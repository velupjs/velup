import fs from "fs";
import Handlebars from "handlebars";
import registerHelpers from "../helpers/registerHelpers";

registerHelpers();

const compileTemplate = (templatePath: string, data: unknown): string => {
  const templateContent = fs.readFileSync(templatePath, { encoding: "utf-8" });
  const template = Handlebars.compile(templateContent);
  return template(data);
};

export default compileTemplate;
