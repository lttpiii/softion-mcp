function Progress(root, ctx = {}) {
  root.innerHTML = `
    <div class="p-8 bg-gray-800 rounded-2xl shadow-xl text-center">
      <h1 class="text-xl font-bold mb-6">Sedang Menginstall...</h1>
      <div class="w-full bg-gray-700 rounded-full h-4 mb-4">
        <div id="progress-bar" class="bg-blue-600 h-4 rounded-full" style="width:0%"></div>
      </div>
      <p id="progress-text">0%</p>
      <p class="text-sm text-gray-400 mt-2">Menyalin file & mengupdate konfigurasi</p>
    </div>
  `;

  const bar = root.querySelector("#progress-bar");
  const text = root.querySelector("#progress-text");

  let progress = 0;
  const timer = setInterval(() => {
    progress = Math.min(progress + 10, 95);
    bar.style.width = progress + "%";
    text.textContent = progress + "%";
  }, 400);

  ctx.onComplete?.((result) => {
    clearInterval(timer);
    bar.style.width = "100%";
    text.textContent = "100%";
    setTimeout(() => ctx.onFinish?.(result), 500);
  });
}
