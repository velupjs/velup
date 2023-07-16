import { FileTemplate } from "../types";
import deepMergeArray from "./deepMergeArray";

const mergeFileList = (file1: FileTemplate[], file2: FileTemplate[]) => {
  return deepMergeArray(file1, file2) as FileTemplate[];
};

export default mergeFileList;
