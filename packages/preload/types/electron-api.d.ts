import { IpcRenderer } from "electron";

interface ElectronApi {
  readonly versions: Readonly<NodeJS.ProcessVersions>;
  readonly ipc: IpcRenderer;
}

declare interface Window {
  electron: Readonly<ElectronApi>;
  electronRequire?: NodeRequire;
}
