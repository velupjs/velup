#!/usr/bin/env node

import path from "path";
import fs from "fs-extra";

const newVersion = process.argv[2];

try {
  const packageJsonPath = path.resolve(__dirname, "../package.json");
  const changelogSrcPath = path.join(__dirname, "../dist", "CHANGELOG.md");
  const changelogDestPath = path.join(__dirname, "../CHANGELOG.md");

  // Update package.json
  const packageJson = fs.readJsonSync(packageJsonPath);
  packageJson.version = newVersion;
  fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });

  // Update CHANGELOG
  fs.copyFileSync(changelogSrcPath, changelogDestPath);

  console.log(`Updated package.json version to ${newVersion}`);
} catch (err) {
  console.error(err);
}
