const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const installer = require("./utils/installer");
const updater = require("./updater");
const { autoUpdater } = require("electron-updater");

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 650,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadFile(path.join(__dirname, "..", "renderer", "index.html"));

  // inisialisasi updater
  win.once("ready-to-show", () => {
    updater.initUpdater(win);
  });
}

// IPC handler
ipcMain.handle("select-install-path", async () => {
  const result = await dialog.showOpenDialog({ properties: ["openDirectory"] });
  return result.filePaths && result.filePaths[0] ? result.filePaths[0] : null;
});

ipcMain.handle("select-claude-config", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [{ name: "JSON", extensions: ["json"] }],
  });
  return result.filePaths && result.filePaths[0] ? result.filePaths[0] : null;
});

ipcMain.handle("install-mcp", async (event, options) => {
  // options: { installPath, claudeConfig }
  return installer.install(options);
});

ipcMain.on("quit-and-install", () => {
  updater.quitAndInstall();
});

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.handle("get-app-version", () => {
  return app.getVersion(); // ini ambil dari package.json > version
});

autoUpdater.on("update-available", (info) => {
  createWindow.webContents.send("update-available", info.version);
});
