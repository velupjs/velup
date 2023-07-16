import stringify from "./stringify";

const registerHelpers = (helperList?: [() => void]) => {
  stringify();

  if (helperList) {
    helperList.forEach((helper) => helper());
  }
};

export default registerHelpers;
