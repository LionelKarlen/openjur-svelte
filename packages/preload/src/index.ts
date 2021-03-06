import { contextBridge, ipcRenderer } from "electron";
import { ElectronApi } from "types/electron-api";
import * as path from "path";
import NotificationData from "../../../types/util/NotificationData";

const apiKey = "electron";
/**
 * @see https://github.com/electron/electron/issues/21437#issuecomment-573522360
 */
const api: ElectronApi = {
  versions: process.versions,
  ipc: ipcRenderer,
  path: path,
  onNotify: (cb: (notification: NotificationData) => void) =>
    ipcRenderer.on("sendNotification", (_event, notification) =>
      cb(notification)
    ),
};

/**
 * The "Main World" is the JavaScript context that your main renderer code runs in.
 * By default, the page you load in your renderer executes code in this world.
 *
 * @see https://www.electronjs.org/docs/api/context-bridge
 */
contextBridge.exposeInMainWorld(apiKey, api);
