import { ipcMain, webContents } from "electron";
import NotificationData from "../../../../types/util/NotificationData";
import { webContentsHandler } from "../index";

export function notify(notification: NotificationData) {
  //   ipcMain.emit("notify", notification);
  webContentsHandler.send("sendNotification", notification);
  console.log("emit");
}
