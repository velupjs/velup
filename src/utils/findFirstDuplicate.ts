import find from "lodash.find";
import indexOf from "lodash.indexof";

const findFirstDuplicate = (arr: string[]) => {
  const duplicate = find(
    arr,
    (item: string, index: number) => indexOf(arr, item, index + 1) !== -1
  );
  return duplicate || null;
};

export default findFirstDuplicate;
