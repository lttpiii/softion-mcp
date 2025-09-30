const fs = require("fs");
const path = require("path");
const os = require("os");

async function editConfig(configPath, installPath) {
  try {
    if (!configPath) {
      if (process.platform === "win32") {
        configPath = path.join(
          os.homedir(),
          "AppData",
          "Roaming",
          "Claude",
          "claude_desktop_config.json"
        );
      } else if (process.platform === "darwin") {
        configPath = path.join(
          os.homedir(),
          "Library",
          "Application Support",
          "Claude",
          "claude_desktop_config.json"
        );
      } else {
        configPath = path.join(
          os.homedir(),
          ".config",
          "Claude",
          "claude_desktop_config.json"
        );
      }
    }

    let data = {};
    if (fs.existsSync(configPath)) {
      data = JSON.parse(fs.readFileSync(configPath, "utf8"));
    }

    if (!data.mcpServers) data.mcpServers = {};

    let exeName = process.platform === "win32" ? "main.exe" : "main";
    data.mcpServers["softion-mcp"] = {
      command: path.join(installPath || "", exeName),
      args: ["--stdio", "true"],
    };

    fs.writeFileSync(configPath, JSON.stringify(data, null, 2));
    return true;
  } catch (err) {
    throw new Error("Failed edit Claude config: " + err.message);
  }
}

module.exports = { editConfig };
