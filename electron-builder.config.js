/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
module.exports = {
  appId: "org.suspiciouslycool.openjur",
  productName: "OpenJUR",
  win: {
    target: "nsis",
  },
  linux: {
    target: "AppImage",
  },
  nsis: {
    allowToChangeInstallationDirectory: true,
    oneClick: false,
  },
  directories: {
    output: "dist",
    buildResources: "buildResources",
  },
  files: ["packages/**/dist/**"],
};
