import { ipcMain, shell } from "electron";
import { join } from "path";
import * as fs from "fs/promises";
import ExportData from "../../../../types/export/ExportData";
import QRData from "../../../../types/export/QRdata";
import Settings from "/type/database/Settings";
import Docxtemplater from "docxtemplater";
import { notify } from "./notifications";
import NotificationType from "../../../../types/util/NotificationType";
const pizzip = require("pizzip");
const swissqrbill = require("swissqrbill");

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
  let doc = await shell.openPath(`${path}.docx`);
  if (doc != "") {
    notify({
      text: doc,
      type: NotificationType.ERROR,
    });
  }
  let pdf = await shell.openPath(`${path.split(".")[0]}.pdf`);
  if (pdf != "") {
    notify({
      text: pdf,
      type: NotificationType.ERROR,
    });
  }
}

export async function deleteFiles(path: string) {
  try {
    fs.unlink(`${path}.docx`);
    fs.unlink(`${path.split(".")[0]}.pdf`);
  } catch (e) {
    let x = "";
    if (typeof e === "string") {
      x = e.toUpperCase(); // works, `e` narrowed to string
    } else if (e instanceof Error) {
      x = e.message; // works, `e` narrowed to Error
    }
    notify({
      text: x,
      type: NotificationType.ERROR,
    });
  }
}

export async function openFolder(path: string) {
  let x = await shell.openPath(join(process.resourcesPath, "defaultFiles"));
  if (x != "") {
    notify({
      text: x,
      type: NotificationType.ERROR,
    });
  }
}

export async function fileExists(path: string) {
  try {
    let stat = await fs.stat(path);
    return true;
  } catch (e) {}
  return false;
}

export async function writeToFile(
  exportData: ExportData,
  qrData: QRData,
  settings: Settings,
  path: string,
  isUser = false
): Promise<boolean> {
  let templatePath = isUser
    ? settings.userTemplatePath
    : settings.clientTemplatePath;
  let content = await fs.readFile(templatePath, "binary");
  let zip = new pizzip(content);
  let doc;
  try {
    doc = new Docxtemplater(zip, { linebreaks: true });
  } catch (error) {
    console.log(error);
  }

  doc?.setData(exportData);

  try {
    doc?.render();
  } catch (error) {
    console.log(error);
  }
  let buf = doc?.getZip().generate({
    type: "nodebuffer",
  });
  fs.writeFile(`${path}.docx`, buf);
  let pdf = new swissqrbill.PDF(qrData, `${path}.pdf`);
  notify({
    text: "File written",
    type: NotificationType.SUCCESS,
  });
  return true;
}
