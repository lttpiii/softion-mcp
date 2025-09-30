function Result(root, ctx = {}) {
  root.innerHTML = `
    <div class="p-8 bg-gray-800 rounded-2xl shadow-xl text-center">
      ${
        ctx.status === "success"
          ? `<div class="text-green-400 text-5xl mb-4">✔</div>
             <h1 class="text-xl font-bold mb-2">MCP berhasil di-install!</h1>`
          : `<div class="text-red-400 text-5xl mb-4">✖</div>
             <h1 class="text-xl font-bold mb-2">Instalasi gagal!</h1>`
      }
      <div class="flex gap-4 justify-center mt-6">
        <button id="back-btn" class="px-4 py-2 bg-blue-600 rounded-lg">Kembali</button>
      </div>
    </div>
  `;

  root.querySelector("#back-btn").onclick = () => ctx.onBack?.();
}
