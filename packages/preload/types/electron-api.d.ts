import { IpcRenderer } from "electron";

interface ElectronApi {
  readonly versions: Readonly<NodeJS.ProcessVersions>;
  readonly ipc: IpcRenderer;
  readonly path: any;
  readonly onNotify: any;
}

declare interface Window {
  electron: Readonly<ElectronApi>;
  electronRequire?: NodeRequire;
}
