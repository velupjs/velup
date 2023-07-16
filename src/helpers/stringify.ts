import Handlebars from "handlebars";

const stringify = () => {
  return Handlebars.registerHelper("stringify", function (context) {
    return JSON.stringify(context, null, 2);
  });
};

export default stringify;
