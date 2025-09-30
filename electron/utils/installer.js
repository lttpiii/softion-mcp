const fs = require("fs");
const path = require("path");
const claudeConfigHelper = require("./claudeConfig");
const os = require("os");

async function install({ installPath, claudeConfig }) {
  try {
    const binDir = path.join(__dirname, "..", "..", "bin");
    if (!installPath) installPath = os.homedir();

    installPath = path.join(installPath, "softion-mcp");
    if (!fs.existsSync(installPath))
      fs.mkdirSync(installPath, { recursive: true });

    // copy all files from bin
    if (!fs.existsSync(binDir)) {
      throw new Error("bin directory not found: " + binDir);
    }

    fs.readdirSync(binDir).forEach((file) => {
      fs.copyFileSync(path.join(binDir, file), path.join(installPath, file));
    });

    // update claude config
    await claudeConfigHelper.editConfig(claudeConfig, installPath);

    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

module.exports = { install };
