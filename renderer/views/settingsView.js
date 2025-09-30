function Settings(root, ctx = {}) {
  root.innerHTML = `
    <div class="p-8 bg-gray-800 rounded-2xl shadow-xl">
      <h1 class="text-xl font-bold mb-6">Settings</h1>

      <div class="mb-6">
        <p class="mb-1 text-gray-300">Lokasi instalasi:</p>
        <div class="flex justify-between bg-gray-700 px-3 py-2 rounded-lg">
          <span id="settings-install-path">${
            ctx.installPath || "(default)"
          }</span>
          <button id="change-path" class="px-3 py-1 bg-gray-600 rounded">Ubah</button>
        </div>
      </div>

      <div class="mb-6">
        <p class="mb-1 text-gray-300">Claude Config:</p>
        <div class="flex justify-between bg-gray-700 px-3 py-2 rounded-lg">
          <span id="settings-config">${ctx.claudeConfig || "auto detect"}</span>
          <button id="change-config" class="px-3 py-1 bg-gray-600 rounded">Ubah</button>
        </div>
      </div>

      <div class="flex justify-between">
        <button id="back-btn" class="px-4 py-2 bg-gray-600 rounded-lg">Kembali</button>
        <button id="save-btn" class="px-4 py-2 bg-blue-600 rounded-lg">Simpan</button>
      </div>
    </div>
  `;

  root.querySelector("#change-path").onclick = async () => {
    const p = await window.electronAPI.selectInstallPath();
    if (p) root.querySelector("#settings-install-path").textContent = p;
  };

  root.querySelector("#change-config").onclick = async () => {
    const c = await window.electronAPI.selectClaudeConfig();
    if (c) root.querySelector("#settings-config").textContent = c;
  };

  root.querySelector("#back-btn").onclick = () => ctx.onBack?.();
  root.querySelector("#save-btn").onclick = () => {
    const pathVal = root.querySelector("#settings-install-path").textContent;
    const configVal = root.querySelector("#settings-config").textContent;
    ctx.onSave?.({ installPath: pathVal, claudeConfig: configVal });
  };
}
