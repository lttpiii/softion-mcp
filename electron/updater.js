const { autoUpdater } = require("electron-updater");

function initUpdater(win) {
  autoUpdater.on("update-available", (info) => {
    win.webContents.send("update-available", info.version);
  });

  autoUpdater.on("update-not-available", (info) => {
    win.webContents.send("update-not-available", info.version);
  });

  autoUpdater.on("update-downloaded", (info) => {
    win.webContents.send("update-downloaded", info.version);
  });

  autoUpdater.on("error", (err) => {
    win.webContents.send("update-error", err.message);
  });

  autoUpdater.checkForUpdatesAndNotify().catch((e) => {
    win.webContents.send("update-error", e.message || String(e));
  });
}

function quitAndInstall() {
  autoUpdater.quitAndInstall();
}

module.exports = { initUpdater, quitAndInstall };
