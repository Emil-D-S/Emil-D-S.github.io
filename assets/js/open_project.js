// ========================
// Utilities
// ========================
function getQueryParam(name) {
  const url = new URLSearchParams(window.location.search);
  return url.get(name);
}
function $(id) {
  return document.getElementById(id);
}

// ========================
// Constants
// ========================
const IFRAME_ID = "projectFrame";
const TEMPLATE_BY_TYPE = {
  p5: "templates/p5_sketch.html",
  three: "templates/three_sketch.html",
  jsxgraph: "templates/jsxgraph_sketch.html",
  desmos: "templates/desmos_sketch.html",
};

// ========================
// Desktop mode (optional, per-project)
// ========================
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}
function forceDesktopViewport() {
  let vp = document.querySelector('meta[name="viewport"]');
  if (!vp) {
    vp = document.createElement("meta");
    vp.name = "viewport";
    document.head.appendChild(vp);
  }
  vp.content = "width=1280, initial-scale=0.5, user-scalable=yes";

  document.body.classList.add("force-desktop-mode");

  if (isMobileDevice()) {
    const notice = document.createElement("div");
    notice.className = "desktop-requirement-notice";
    notice.innerHTML = `
      <div style="background:#ff9800;color:#fff;padding:.5rem 1rem;text-align:center;position:sticky;top:0;z-index:1000;box-shadow:0 2px 8px rgba(0,0,0,.2);font-size:.85rem;">
        <i class="fa-solid fa-desktop"></i>
        <strong>Desktop Required:</strong> Enable "Desktop site" in your browser
      </div>`;
    document.body.insertAdjacentElement("afterbegin", notice);
  }
}

// ========================
// Compact mode toggle (Desmos)
// ========================
function setCompactMode(enabled) {
  document.body.classList.toggle("compact-desmos", !!enabled);
}

// ========================
// Canonicalization
// ========================
function normalizeType(t, fallback = "jsxgraph") {
  if (!t) return fallback;
  t = String(t).toLowerCase();
  if (t === "desmos_external") return "desmos_external";
  if (["p5", "three", "jsxgraph", "desmos", "html"].includes(t)) return t;
  return fallback;
}

// ========================
// Iframe routing
// ========================
function setIframeForProject(project) {
  const iframe = $(IFRAME_ID);
  if (!iframe) return console.error("Missing #projectFrame");

  // let CSS handle sizing; keep as fallback
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "0";

  const urlParams = new URLSearchParams(location.search);
  const queryType = urlParams.get("type");
  const type = normalizeType(project?.type || queryType);

  // Non-Desmos
  if (type !== "desmos" && type !== "desmos_external") {
    setCompactMode(false);
    if (type === "html") {
      const entry = project?.files?.[0] || "index.html";
      iframe.src = `${project.folder}/${entry}`;
      return;
    }
    const template = TEMPLATE_BY_TYPE[type] || TEMPLATE_BY_TYPE.jsxgraph;
    iframe.src = `${template}?folder=${encodeURIComponent(project.folder)}`;
    return;
  }

  // Desmos
  const cfg = project?.desmos || {};
  const overrideMode = urlParams.get("desmosMode");
  const overrideTarget = urlParams.get("desmosTarget");
  const mode = String(
    overrideMode ||
      cfg.mode ||
      (type === "desmos_external" ? "external" : "api")
  ).toLowerCase();

  if (mode === "redirect") {
    const url = cfg.url || project?.external?.url;
    if (!url) return console.error("Desmos redirect requires desmos.url");
    const target = (overrideTarget || cfg.target || "_self").toLowerCase();
    if (target === "_blank") window.open(url, "_blank", "noopener,noreferrer");
    else window.location.href = url;
    return;
  }

  if (mode === "external") {
    const url =
      cfg.url ||
      project?.external?.url ||
      "https://www.desmos.com/calculator?embed";
    iframe.src = url;
    setCompactMode(true);
    return;
  }

  // api (default)
  iframe.src = `${TEMPLATE_BY_TYPE.desmos}?folder=${encodeURIComponent(
    project.folder
  )}`;
  setCompactMode(true);
}

// ========================
// Project loading
// ========================
async function resolveProjectFromQuery() {
  // Direct folder mode (?folder=...&type=...)
  const folderParam = getQueryParam("folder");
  if (folderParam) {
    return {
      id: folderParam,
      folder: decodeURIComponent(folderParam).replace(/^\/+/, ""),
      type: getQueryParam("type") || "jsxgraph",
      title: getQueryParam("title") || "",
      desc: getQueryParam("desc") || "",
    };
  }

  // Data-driven mode (?project=...)
  const projectId = getQueryParam("project");
  if (!projectId) throw new Error("Provide ?project or ?folder");

  const res = await fetch("projects/data.json");
  const projects = await res.json();

  const idxNum = Number(projectId);
  const project = projects.find(
    (p, idx) => p.id === projectId || p.folder === projectId || idx === idxNum
  );

  if (!project) throw new Error("Project not found");
  project.folder = String(project.folder || project.id || projectId);
  return project;
}

// ========================
// Export agent injection
// ========================
function setupProjectExport() {
  const getIframe = () =>
    document.querySelector("#projectFrame") ||
    document.querySelector("iframe[data-role='project']") ||
    document.querySelector("main iframe") ||
    document.querySelector("iframe");

  const downloadBtn = $("downloadScreenshotButton");
  const copyBtn = $("copyScreenshotToClipboardButton");

  function injectAgentInto(iframe) {
    try {
      const doc = iframe.contentDocument;
      if (!doc) return;
      if (doc.querySelector('script[data-export-agent="1"]')) return;
      const s = doc.createElement("script");
      s.type = "module";
      s.dataset.exportAgent = "1";
      s.src = new URL("templates/common/export-agent.js", location.href).href;
      doc.head.appendChild(s);
    } catch (e) {
      console.error("Failed to inject export-agent:", e);
    }
  }

  function hookIframe() {
    const iframe = getIframe();
    if (!iframe) return;
    iframe.addEventListener("load", () => injectAgentInto(iframe));
    if (iframe.contentDocument?.readyState === "complete")
      injectAgentInto(iframe);
  }
  hookIframe();
  new MutationObserver(hookIframe).observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  function requestCapture({
    scale = 3,
    mime = "image/png",
    quality = 0.92,
    background = null,
    preferDom = false,
  } = {}) {
    return new Promise((resolve, reject) => {
      const iframe = getIframe();
      if (!iframe) return reject(new Error("No project iframe found."));
      const onMessage = (e) => {
        const msg = e.data;
        if (!msg) return;
        if (msg.type === "captureReady" && msg.blob) {
          removeEventListener("message", onMessage);
          resolve(msg.blob);
        } else if (msg.type === "captureError") {
          removeEventListener("message", onMessage);
          reject(new Error(msg.message || "Capture failed"));
        }
      };
      addEventListener("message", onMessage);
      iframe.contentWindow.postMessage(
        { type: "requestCapture", scale, mime, quality, background, preferDom },
        "*"
      );
    });
  }

  downloadBtn?.addEventListener("click", async () => {
    try {
      const blob = await requestCapture({
        scale: 3,
        mime: "image/png",
        quality: 0.92,
        background: null,
        preferDom: false,
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const folderName = currentProject?.folder?.split("/").pop() || "capture";
      a.download = folderName + ".png";
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        URL.revokeObjectURL(url);
        a.remove();
      }, 1000);
    } catch (err) {
      console.error("Capture error:", err);
      alert("Capture failed: " + err.message);
    }
  });

  copyBtn?.addEventListener("click", async () => {
    try {
      const mime = "image/png";
      const blob = await requestCapture({
        scale: 3,
        mime,
        quality: 0.92,
        background: null,
        preferDom: false,
      });
      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([new ClipboardItem({ [mime]: blob })]);
        console.log("Screenshot copied to clipboard.");
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "capture.png";
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          URL.revokeObjectURL(url);
          a.remove();
        }, 1000);
      }
    } catch (err) {
      console.error("Clipboard export failed:", err);
      alert("Copy to clipboard failed: " + err.message);
    }
  });
}

// ========================
// Boot
// ========================

let currentProject = null;
document.addEventListener("DOMContentLoaded", async () => {
  const iframe = $(IFRAME_ID);
  if (!iframe) return console.error("Missing #projectFrame");

  // smaller navbar on open_project
  const nav = document.querySelector("nav");
  if (nav && window.location.pathname.endsWith("open_project.html")) {
    nav.style.padding = "1rem 2rem";
  }

  try {
    currentProject = await resolveProjectFromQuery();

    if (currentProject.forceDesktop) forceDesktopViewport();

    // title/desc
    $("projectTitle")?.replaceChildren(currentProject.title || "");
    $("projectDesc")?.replaceChildren(currentProject.desc || "");

    setIframeForProject(currentProject);
  } catch (e) {
    console.error(e);
    const container =
      document.getElementById("projectContainer") ||
      document.getElementById("projectContentWrapper");
    if (container)
      container.innerHTML = `<p>${e.message || "Failed to load project."}</p>`;
  }

  // Start/Stop
  $("startBtn")?.addEventListener("click", () => {
    if (!currentProject) return;
    setIframeForProject(currentProject);
  });
  $("stopBtn")?.addEventListener("click", () => {
    if (iframe) iframe.src = "about:blank";
    setCompactMode(false);
  });

  setupProjectExport();
});
