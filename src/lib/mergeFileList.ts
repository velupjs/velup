import { FileTemplate } from "../types";
import { deepMergeArray } from "../utils";

const mergeFileObj = (file1: FileTemplate[], file2: FileTemplate[]) => {
  return deepMergeArray(file1, file2) as FileTemplate[];
};

export default mergeFileObj;
