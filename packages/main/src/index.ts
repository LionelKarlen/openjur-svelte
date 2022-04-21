import { app, BrowserWindow, shell } from "electron";
import { join } from "path";
import { URL } from "url";
import knex from "knex";
import registerHandlers from "./handler";
import { JSONFile, Low } from "lowdb";
import Settings from "../../../types/database/Settings";

const isSingleInstance = app.requestSingleInstanceLock();
export const isDevelopment = import.meta.env.MODE === "development";

if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}

app.disableHardwareAcceleration();

let dbpath = !isDevelopment
  ? join(process.resourcesPath, "defaultFiles", "db.sqlite")
  : join(process.resourcesPath, "..", "..", "..", "..", "res", "test.sqlite");
console.log(dbpath);

let knexClient = knex({
  client: "sqlite3",
  connection: {
    filename: dbpath,
  },
  useNullAsDefault: true,
});

let settingsPath = !isDevelopment
  ? join(process.resourcesPath, "defaultFiles", "settings.json")
  : join(process.resourcesPath, "..", "..", "..", "..", "res", "settings.json");
const adapter = new JSONFile<Settings>(settingsPath);

export const settings = new Low<Settings>(adapter);

export let webContentsHandler: Electron.WebContents;

registerHandlers(knexClient);
let mainWindow: BrowserWindow | null = null;

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    show: false, // Use 'ready-to-show' event to show window
    webPreferences: {
      nativeWindowOpen: true,
      preload: join(__dirname, "../../preload/dist/index.cjs"),
    },
  });

  webContentsHandler = mainWindow.webContents;

  mainWindow.setMenuBarVisibility(false);

  /**
   * If you install `show: true` then it can cause issues when trying to close the window.
   * Use `show: false` and listener events `ready-to-show` to fix these issues.
   *
   * @see https://github.com/electron/electron/issues/25012
   */
  mainWindow.on("ready-to-show", () => {
    mainWindow?.show();

    if (isDevelopment) {
      mainWindow?.webContents.openDevTools();
    }
  });

  /**
   * URL for main window.
   * Vite dev server for development.
   * `file://../renderer/index.html` for production and test
   */
  const pageUrl =
    isDevelopment && import.meta.env.VITE_DEV_SERVER_URL !== undefined
      ? import.meta.env.VITE_DEV_SERVER_URL
      : new URL(
          "../renderer/dist/index.html",
          "file://" + __dirname
        ).toString();

  await mainWindow.loadURL(pageUrl);
};

app.on("web-contents-created", (_event, contents) => {
  /**
   * Block navigation to origins not on the allowlist.
   *
   * Navigation is a common attack vector. If an attacker can convince the app to navigate away
   * from its current page, they can possibly force the app to open web sites on the Internet.
   *
   * @see https://www.electronjs.org/docs/latest/tutorial/security#13-disable-or-limit-navigation
   */
  contents.on("will-navigate", (event, url) => {
    const allowedOrigins: ReadonlySet<string> = new Set<`https://${string}`>(); // Do not use insecure protocols like HTTP. https://www.electronjs.org/docs/latest/tutorial/security#1-only-load-secure-content
    const { origin, hostname } = new URL(url);
    const isDevLocalhost = isDevelopment && hostname === "localhost"; // permit live reload of index.html
    if (!allowedOrigins.has(origin) && !isDevLocalhost) {
      console.warn("Blocked navigating to an unallowed origin:", origin);
      event.preventDefault();
    }
  });

  /**
   * Hyperlinks to allowed sites open in the default browser.
   *
   * The creation of new `webContents` is a common attack vector. Attackers attempt to convince the app to create new windows,
   * frames, or other renderer processes with more privileges than they had before; or with pages opened that they couldn't open before.
   * You should deny any unexpected window creation.
   *
   * @see https://www.electronjs.org/docs/latest/tutorial/security#14-disable-or-limit-creation-of-new-windows
   * @see https://www.electronjs.org/docs/latest/tutorial/security#15-do-not-use-openexternal-with-untrusted-content
   */
  contents.setWindowOpenHandler(({ url }) => {
    const allowedOrigins: ReadonlySet<string> = new Set<`https://${string}`>([
      // Do not use insecure protocols like HTTP. https://www.electronjs.org/docs/latest/tutorial/security#1-only-load-secure-content
      "https://vitejs.dev",
      "https://github.com",
      "https://v3.vuejs.org",
    ]);
    const { origin } = new URL(url);
    if (allowedOrigins.has(origin)) {
      shell.openExternal(url);
    } else {
      console.warn("Blocked the opening of an unallowed origin:", origin);
    }
    return { action: "deny" };
  });
});

app.on("second-instance", () => {
  // Someone tried to run a second instance, we should focus our window.
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app
  .whenReady()
  .then(createWindow)
  .catch((e) => console.error("Failed create window:", e));
