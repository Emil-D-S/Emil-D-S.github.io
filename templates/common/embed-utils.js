// templates/common/embed-utils.js

// Run a function when DOM is ready (now or after DOMContentLoaded)
export function domReady(run) {
  if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", run, { once: true });
  } else {
    run();
  }
}

// Read fixed size from URL (?w=...&h=...) with sane defaults
export function getFixedSize(defaultW = 800, defaultH = 600) {
  const qs = new URLSearchParams(location.search);
  const w = parseInt(qs.get("w") || "", 10);
  const h = parseInt(qs.get("h") || "", 10);
  const WIDTH = Number.isFinite(w) && w > 0 ? w : defaultW;
  const HEIGHT = Number.isFinite(h) && h > 0 ? h : defaultH;
  return { WIDTH, HEIGHT };
}

// // Center the canvas in the body; pass bg to set body background, or omit for transparent
// export function centerBody(bg /* string | null */) {
//   Object.assign(document.body.style, {
//     margin: "0",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     height: "100vh",
//     ...(bg ? { background: bg } : {}),
//   });
// }

// Factory that returns a function to post the canvas CSS size exactly once
export function postCanvasSizeOnceFactory(source = "three_sketch") {
  let posted = false;
  return function postCanvasSizeOnce(canvas) {
    if (posted || !canvas) return;
    try {
      if (window.parent && window.parent !== window) {
        const rect = canvas.getBoundingClientRect();
        window.parent.postMessage(
          {
            type: "canvasSize",
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            source,
          },
          "*"
        );
        posted = true;
      }
    } catch {
      // ignore cross-origin issues
    }
  };
}
