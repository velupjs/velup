---
inject: true
to: src/plugins/index.ts
before: ^\s\/
---
import <%= name %> from "./<%= name %>/plugin.config";