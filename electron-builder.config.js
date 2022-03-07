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
  extraResources: [
    {
      from: "res/test.sqlite",
      to: "defaultFiles/test.sqlite",
    },
    {
      from: "res/db.sqlite",
      to: "defaultFiles/db.sqlite",
    },
  ],
  directories: {
    output: "dist",
    buildResources: "buildResources",
  },
  files: ["packages/**/dist/**"],
};
