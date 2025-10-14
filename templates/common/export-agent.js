// templates/common/export-agent.js
// Responds to {type:"requestCapture"} from parent and returns a Blob (structured clone).

addEventListener("message", async (e) => {
  const msg = e.data;
  if (!msg || msg.type !== "requestCapture") return;

  try {
    const {
      scale = 2,
      mime = "image/png",
      quality,
      background = null,
      preferDom = false,
    } = msg;

    // Let the current frame finish (ensures WebGL canvas is fully drawn)
    await new Promise(requestAnimationFrame);

    const { blob } = preferDom
      ? await captureDOM({ scale, mime, quality, background })
      : await captureBestCanvasOrDOM({ scale, mime, quality, background });

    // Post the Blob itself (structured clone), plus a local blob URL for convenience
    const blobUrl = URL.createObjectURL(blob);
    parent.postMessage({ type: "captureReady", blob, blobUrl }, "*");
    // Parent will revoke its own URL; we'll revoke ours after a short delay
    setTimeout(() => URL.revokeObjectURL(blobUrl), 10_000);
  } catch (err) {
    console.error("[export-agent] capture error:", err);
    parent.postMessage({ type: "captureError", message: String(err) }, "*");
  }
});

async function captureBestCanvasOrDOM(opts) {
  const canvas = chooseMainCanvas();
  if (canvas) return captureCanvas(canvas, opts);
  return captureDOM(opts);
}

function chooseMainCanvas() {
  const flagged = document.querySelector("canvas[data-main-canvas='true']");
  if (flagged) return flagged;
  const list = Array.from(document.querySelectorAll("canvas"));
  if (!list.length) return null;
  return list.reduce((best, c) => {
    const area = (c.width || 0) * (c.height || 0);
    const bestArea = (best?.width || 0) * (best?.height || 0);
    return area > bestArea ? c : best;
  }, null);
}

async function captureCanvas(srcCanvas, { scale, mime, quality, background }) {
  // Prefer CSS size; fall back to intrinsic if CSS is 0 (prevents 1x1 blanks)
  const rect = srcCanvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const cssW = rect.width || srcCanvas.width / dpr || srcCanvas.width || 1;
  const cssH = rect.height || srcCanvas.height / dpr || srcCanvas.height || 1;

  const targetW = Math.max(1, Math.round(cssW * scale));
  const targetH = Math.max(1, Math.round(cssH * scale));

  const out = document.createElement("canvas");
  out.width = targetW;
  out.height = targetH;

  const ctx = out.getContext("2d", { willReadFrequently: true });
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  if (background !== null) {
    ctx.save();
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, targetW, targetH);
    ctx.restore();
  }

  // Draw the source canvas into the output canvas
  ctx.drawImage(srcCanvas, 0, 0, targetW, targetH);

  const blob = await new Promise((res, rej) =>
    out.toBlob(
      (b) => (b ? res(b) : rej(new Error("toBlob failed (canvas)"))),
      mime,
      quality
    )
  );
  return { blob };
}

async function captureDOM({ scale, mime, quality, background }) {
  await ensureHtml2Canvas();
  const canvas = await window.html2canvas(document.body, {
    backgroundColor: background === null ? null : background,
    scale,
    useCORS: true,
  });
  const blob = await new Promise((res, rej) =>
    canvas.toBlob(
      (b) => (b ? res(b) : rej(new Error("toBlob failed (DOM)"))),
      mime,
      quality
    )
  );
  return { blob };
}

function ensureHtml2Canvas() {
  return new Promise((resolve, reject) => {
    if (window.html2canvas) return resolve();
    const s = document.createElement("script");
    s.src =
      "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js";
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load html2canvas"));
    document.head.appendChild(s);
  });
}
