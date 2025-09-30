const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  onUpdateAvailable: (cb) =>
    ipcRenderer.on("update-available", (e, version) => cb(version)),
  onUpdateNotAvailable: (cb) =>
    ipcRenderer.on("update-not-available", (e, version) => cb(version)),
  getAppVersion: () => ipcRenderer.invoke("get-app-version"),
  selectInstallPath: () => ipcRenderer.invoke("select-install-path"),
  selectClaudeConfig: () => ipcRenderer.invoke("select-claude-config"),
  installMCP: (options) => ipcRenderer.invoke("install-mcp", options),

  // updater events
  onUpdateAvailable: (callback) => ipcRenderer.on("update-available", callback),
  onUpdateNotAvailable: (callback) =>
    ipcRenderer.on("update-not-available", callback),
  onUpdateDownloaded: (callback) =>
    ipcRenderer.on("update-downloaded", callback),
  onUpdateError: (callback) =>
    ipcRenderer.on("update-error", (_, msg) => callback(msg)),
  quitAndInstall: () => ipcRenderer.send("quit-and-install"),
});
