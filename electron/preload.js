const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  // updater
  onUpdateAvailable: (cb) =>
    ipcRenderer.on("update-available", (_, version) => cb(version)),
  onUpdateNotAvailable: (cb) =>
    ipcRenderer.on("update-not-available", (_, version) => cb(version)),
  onUpdateDownloaded: (cb) =>
    ipcRenderer.on("update-downloaded", (_, version) => cb(version)),
  onUpdateError: (cb) => ipcRenderer.on("update-error", (_, msg) => cb(msg)),
  quitAndInstall: () => ipcRenderer.send("quit-and-install"),

  // app info
  getAppVersion: () => ipcRenderer.invoke("get-app-version"),

  // installer
  selectInstallPath: () => ipcRenderer.invoke("select-install-path"),
  selectClaudeConfig: () => ipcRenderer.invoke("select-claude-config"),
  installMCP: (options) => ipcRenderer.invoke("install-mcp", options),
});
