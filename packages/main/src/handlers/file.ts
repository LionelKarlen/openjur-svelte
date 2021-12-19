import { ipcMain, shell } from "electron";
import { join } from "path";
import * as fs from "fs/promises";

export default function registerFileHandlers() {
  ipcMain.handle("openFiles", async (event, data: string) => {
    return await openFiles(data);
  });

  ipcMain.handle("deleteFiles", async (event, data: string) => {
    return await openFiles(data);
  });

  ipcMain.handle("openFolder", async (event, data: string) => {
    return await openFiles(data);
  });
}

export async function openFiles(path: string) {
  //TODO: Error handling
  shell.openPath(path);
  shell.openPath(`${path.split(".")[0]}.pdf`);
}

export async function deleteFiles(path: string) {
  //TODO: Error handling
  fs.unlink(path);
  fs.unlink(`${path.split(".")[0]}.pdf`);
}

export function openFolder(path: string) {
  //TODO: Error handling
  shell.openPath(join(process.resourcesPath, "defaultFiles"));
}
