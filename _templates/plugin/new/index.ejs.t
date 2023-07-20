---
to: src/plugins/<%= name %>/plugin.config.ts
---
<% if(locals.category) { %>import { VelupCategory } from "../../types";<% } else { %>import { VelupPlugin } from "../../types";<% } %>

<% if(locals.category) { %>const <%= name %>: VelupCategory = {<% } else { %>const <%= name %>: VelupPlugin = {<% } %>  
  id: "<%= name %>",
  label: "<%= h.capitalize(name) %>",
  files: [],<% if(locals.category) { %> 
  plugins: [],<% } else { %>
  devDependencies: [],
  fileData: {},
  patches: {},<% } %>
};

export default <%= name %>;

