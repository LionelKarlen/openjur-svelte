import { ipcMain } from "electron";
import { settings } from "../index";
import Settings from "/type/database/Settings";

export default function registerSettingsHandlers() {
  ipcMain.handle("getSettings", async (event, data) => {
    return await getSettings();
  });
  ipcMain.handle("setSettings", async (event, data: Settings) => {
    return await setSettings(data);
  });
}

export async function getSettings() {
  await settings.read();
  return settings.data!;
}

export async function setSettings(data: Settings) {
  settings.data = data;
  settings.write();
}
