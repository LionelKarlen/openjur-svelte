import type { IpcRenderer } from "electron";

const ipc: IpcRenderer = window["electron"].ipc;
export default ipc;
