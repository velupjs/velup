import mergeWith from "lodash.mergewith";
import deepMergeArray from "./deepMergeArray";

const mergeArrays = (objValue: unknown, srcValue: unknown) => {
  if (Array.isArray(objValue) && Array.isArray(srcValue)) {
    return deepMergeArray(objValue, srcValue);
  }

  return undefined;
};

const deepMerge = (obj1: unknown, obj2: unknown) => {
  return mergeWith({}, obj1, obj2, mergeArrays);
};

export default deepMerge;
