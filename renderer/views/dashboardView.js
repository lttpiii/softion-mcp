function Dashboard(root, ctx = {}) {
  root.innerHTML = `
    <div class="p-8 bg-gray-800 rounded-2xl shadow-xl space-y-6">
      <h1 class="text-2xl font-bold text-center">MCP Installer & Updater</h1>

      <div class="bg-gray-700 p-4 rounded-lg">
        <p class="text-sm text-gray-400">Versi saat ini:</p>
        <p id="current-version" class="font-semibold">Mendeteksi...</p>

        <p class="text-sm text-gray-400 mt-2">Versi terbaru:</p>
        <p id="latest-version" class="font-semibold">Mengecek update...</p>
      </div>


      <button id="install-btn" class="w-full py-3 bg-blue-600 rounded-xl font-semibold hover:bg-blue-700 transition">
        Install / Update
      </button>

      <div id="status" class="text-center text-sm text-gray-300"></div>

      <div class="flex justify-between text-sm">
        <button id="settings-btn" class="text-gray-400 hover:text-white">Settings</button>
        <button id="check-update-btn" class="text-gray-400 hover:text-white">Cek Update</button>
      </div>
    </div>
  `;

  const statusEl = root.querySelector("#status");

  root.querySelector("#install-btn").onclick = () => {
    statusEl.textContent = "Menyiapkan instalasi...";
    ctx.onInstall?.();
  };

  root.querySelector("#settings-btn").onclick = () => ctx.onSettings?.();
  root.querySelector("#check-update-btn").onclick = async () => {
    statusEl.textContent = "🔍 Mengecek update...";
    const latest = await window.electronAPI.checkForUpdates();

    if (latest) {
      document.getElementById("latest-version").textContent = "v" + latest;
    } else {
      document.getElementById("latest-version").textContent =
        "Gagal cek update";
    }
  };

  // Updater events
  window.electronAPI.onUpdateAvailable(() => {
    statusEl.textContent = "🔄 Update tersedia, sedang diunduh...";
  });
  window.electronAPI.onUpdateNotAvailable(() => {
    statusEl.textContent = "✅ Sudah versi terbaru.";
  });
  window.electronAPI.onUpdateDownloaded(() => {
    statusEl.innerHTML = `
      ✅ Update siap dipasang.
      <button id="update-btn" class="bg-blue-600 text-white px-3 py-1 rounded ml-2">Restart & Update</button>
    `;
    root.querySelector("#update-btn").onclick = () =>
      window.electronAPI.quitAndInstall();
  });
  window.electronAPI.onUpdateError((msg) => {
    statusEl.textContent = `❌ Update error: ${msg}`;
  });

  (async () => {
    const version = await window.electronAPI.getAppVersion();
    document.getElementById("current-version").textContent = "v" + version;
  })();
}

// latest version listener
window.electronAPI.onUpdateAvailable((latest) => {
  document.getElementById("latest-version").textContent = "v" + latest;
});
window.electronAPI.onUpdateNotAvailable((current) => {
  document.getElementById("latest-version").textContent = "v" + current;
});
