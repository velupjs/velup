import isEqual from "lodash.isequal";
import unionWith from "lodash.unionwith";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deepMergeArray = (arr1: any[], arr2: any[]) => {
  return unionWith(arr1, arr2, isEqual);
};

export default deepMergeArray;
