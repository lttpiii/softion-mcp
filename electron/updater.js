const { autoUpdater } = require("electron-updater");

function initUpdater(win) {
  autoUpdater.on("update-available", () => {
    win.webContents.send("update-available");
  });

  autoUpdater.on("update-not-available", () => {
    win.webContents.send("update-not-available");
  });

  autoUpdater.on("update-downloaded", () => {
    win.webContents.send("update-downloaded");
  });

  autoUpdater.on("error", (err) => {
    win.webContents.send("update-error", err.message);
  });

  // cek update otomatis tiap app start (safe to call)
  autoUpdater.checkForUpdatesAndNotify().catch((e) => {
    // jika gagal, kirim error ke UI
    win.webContents.send("update-error", e.message || String(e));
  });
}

function quitAndInstall() {
  autoUpdater.quitAndInstall();
}

module.exports = { initUpdater, quitAndInstall };
