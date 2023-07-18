export type CliArgs = {
  /**
   * List of predefined plugins to install
   */
  "--plugins"?: string[];
  /**
   * Is this a dry run
   */
  "--dry-run"?: boolean;
  /**
   * is the help command being displayed and exiting
   */
  "--help"?: boolean;
  /**
   * is the version displayed and exiting
   */
  "--version"?: boolean;
  /**
   * shorthand for --help
   */
  "-h"?: boolean;
};

/**
 * A file to be written by a Velup plugin
 */
export type FileTemplate = {
  /**
   * An id to identify the file within the plugin
   */
  id: string;
  /**
   * path to the hbs template file to be used to write this file
   */
  templatePath: string;
  /**
   * path to where the file should be written to starting from the target project's root path
   */
  outFile: string;
};

/**
 * The base information needed for a Velup Plugin
 */
type BaseVelupPlugin = {
  /**
   * The id of the plugin
   */
  id: string;
  /**
   * Array of npm dependencies to be installed by the plugin
   */
  dependencies?: string[];
  /**
   * Array of npm devDependencies to be installed by the plugin
   */
  devDependencies?: string[];
  /**
   * The files to be created by the plugin
   */
  files: FileTemplate[];
  /**
   * Data to be used by the plugin's file templates
   */
  fileData?: unknown;
};

/**
 * Properties available to be patched in another plugin. They will be merged with the existing
 * values of the patched plugin. Anny arrays are appended at the end of the original array
 */
export type PluginPatch = Omit<BaseVelupPlugin, "id" | "files"> & {
  /**
   * Additional filed to be created by the plugin
   */
  files?: FileTemplate[];
};

/**
 * A Velup plugin's declaration
 */
export type VelupPlugin = BaseVelupPlugin & {
  /**
   * The human readable string to be used in the CLI
   */
  label: string;
  /**
   * Updates needed in other plugins if applied together. Each key is the name of the plugin to patch
   */
  patches?: {
    [key: string]: PluginPatch;
  };
};

/**
 * A plugin category that provides plugins as options. The user will be able to pick only one
 * plugin from the category to install
 */
export type VelupCategory = {
  /**
   * The id of the category
   */
  id: string;
  /**
   * The human readable string to be used in the CLI
   */
  label: string;
  /**
   * Files to be created by all plugins in the category
   */
  files?: FileTemplate[];
  /**
   * The plugins provided by the category
   */
  plugins: VelupCategoryPlugin[];
};

/**
 * A plugin category that provides plugins as options
 */
export type VelupCategoryPlugin = Omit<VelupPlugin, "files"> & {
  /**
   * Files to be created by all plugins in the category
   */
  files?: FileTemplate[];
};

/**
 *  A list of Velup plugins and categories
 */
export type VelupPluginList = Array<VelupPlugin | VelupCategory>;
