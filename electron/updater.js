const { autoUpdater } = require("electron-updater");

function initUpdater(win) {
  autoUpdater.on("update-available", () => {
    safeSend(win, "update-available");
  });

  autoUpdater.on("error", (err) => {
    safeSend(win, "update-error", err.message);
  });

  autoUpdater.on("update-not-available", () => {
    safeSend(win, "update-available");
  });

  autoUpdater.on("update-downloaded", () => {
    win.webContents.send("update-downloaded");
  });

  autoUpdater.on("error", (err) => {
    safeSend(win, "update-error", err.message);
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

function safeSend(win, channel, ...args) {
  if (win && !win.isDestroyed()) {
    win.webContents.send(channel, ...args);
  } else {
    console.warn(`⚠️ Skip send to ${channel}, window not ready`);
  }
}

module.exports = { initUpdater, quitAndInstall };
