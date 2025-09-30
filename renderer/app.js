let currentPage = "dashboard";
let installPath = null;
let claudeConfig = null;
let lastResult = null;

function render() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  if (currentPage === "dashboard") {
    Dashboard(app, {
      onInstall: startInstall,
      onSettings: () => {
        currentPage = "settings";
        render();
      },
    });
  }

  if (currentPage === "progress") {
    Progress(app, {
      onComplete: (cb) => {
        window.__progressDone = cb;
      },
      onFinish: (res) => {
        lastResult = res;
        currentPage = "result";
        render();
      },
    });
  }

  if (currentPage === "result") {
    Result(app, {
      status: lastResult?.success ? "success" : "error",
      onBack: () => {
        currentPage = "dashboard";
        render();
      },
      onRetry: () => {
        currentPage = "dashboard";
        render();
      },
    });
  }

  if (currentPage === "settings") {
    Settings(app, {
      installPath,
      claudeConfig,
      onBack: () => {
        currentPage = "dashboard";
        render();
      },
      onSave: (opts) => {
        installPath = opts.installPath || null;
        claudeConfig =
          opts.claudeConfig === "auto detect" ? null : opts.claudeConfig;
        currentPage = "dashboard";
        render();
      },
    });
  }
}

async function startInstall() {
  currentPage = "progress";
  render();

  try {
    const result = await window.electronAPI.installMCP({
      installPath,
      claudeConfig,
    });
    window.__progressDone?.(result);
  } catch (err) {
    console.error("Installer error:", err);
    window.__progressDone?.({ success: false });
  }
}

render();
