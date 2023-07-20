import path from "path";
import { FileTemplate, VelupPlugin } from "../types";
import { compileTemplate } from "../utils";

const processPath = process.cwd();

type FileAndDataList = {
  file: FileTemplate;
  data: unknown;
}[];

export type FileList = {
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
  return fileList.map((item) => {
    const content = compileTemplate(item.file.templatePath, item.data);

    return {
      content,
      outPath: path.resolve(processPath, item.file.outFile),
    };
  });
};

export default getCompiledTemplates;
