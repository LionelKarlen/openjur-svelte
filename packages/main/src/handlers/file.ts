import { ipcMain, shell } from "electron";
import { join } from "path";
import * as fs from "fs/promises";
import ExportData from "../../../../types/export/ExportData";
import QRData from "../../../../types/export/QRdata";
import Settings from "/type/database/Settings";
import Docxtemplater from "docxtemplater";
const pizzip = require("pizzip");
// import { PDF } from "swissqrbill";

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
  //   let pdf = new PDF(qrData, `${path}.pdf`); //TODO: Add pdf export
  return true;
}
