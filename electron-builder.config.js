/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
module.exports = {
  directories: {
    output: "dist",
    buildResources: "buildResources",
  },
  files: ["packages/**/dist/**"],
};
