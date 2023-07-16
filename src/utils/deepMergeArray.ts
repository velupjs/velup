import isEqual from "lodash.isequal";
import unionWith from "lodash.unionwith";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deepMergeArray = (objValue: any[], srcValue: any[]) => {
  return unionWith(objValue, srcValue, isEqual);
};

export default deepMergeArray;
