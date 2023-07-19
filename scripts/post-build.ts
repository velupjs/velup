#!/usr/bin/env node

import path from "path";
import fs from "fs-extra";

function findTemplateDirs(dir: string) {
  const templateDirs: string[] = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath: string = path.join(dir, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      if (file === "templates") {
        templateDirs.push(filePath);
      } else {
        templateDirs.push(...findTemplateDirs(filePath));
      }
    }
  }

  return templateDirs;
}

function copyTemplates(sourceDir: string, targetDir: string) {
  const templateDirs = findTemplateDirs(sourceDir);
  for (const templateDir of templateDirs) {
    const targetTemplateDir = path.join(targetDir, path.relative(sourceDir, templateDir));
    fs.copySync(templateDir, targetTemplateDir, { overwrite: true });
  }
}

// Copy all template files
copyTemplates(path.resolve(__dirname, "../src"), path.resolve(__dirname, "../dist/src"));
// Rename end "src" to "bin"
fs.renameSync(path.resolve(__dirname, "../dist/src"), path.resolve(__dirname, "../dist/bin"));
// Copy Markdown files
fs.readdirSync(path.resolve(__dirname, "../"))
  .filter((file) => file.endsWith(".md"))
  .forEach((file) =>
    fs.copyFileSync(path.resolve(__dirname, "../", file), path.resolve(__dirname, "../dist/", file))
  );
