import fs from "fs";
import Handlebars from "handlebars";
import { FileTemplate, VelupPlugin } from "../types";
import registerHelpers from "../helpers/registerHelpers";

type FileAndDataList = {
  file: FileTemplate;
  data: unknown;
}[];

type FileList = {
  content: string;
  outPath: string;
}[];

const getCompiledTemplates = (plugins: VelupPlugin[]): FileList => {
  const fileList = plugins.reduce((list, plugin): FileAndDataList => {
    plugin.files.forEach((file) => {
      list.push({ file, data: plugin.fileData || {} });
    });

    return list;
  }, [] as FileAndDataList);

  // Ensure handlebars helpers are registered for compilation
  registerHelpers();
  return fileList.map((item) => {
    const templateContent = fs.readFileSync(item.file.templatePath, { encoding: "utf-8" });
    const template = Handlebars.compile(templateContent);

    return {
      content: template(item.data),
      outPath: item.file.outFile,
    };
  });
};

export default getCompiledTemplates;
