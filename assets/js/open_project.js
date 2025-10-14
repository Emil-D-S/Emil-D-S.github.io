// ------------------------
// Utilities
// ------------------------
function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// ------------------------
// Main
// ------------------------
document.addEventListener("DOMContentLoaded", () => {
  const iframe = document.getElementById("projectFrame");
  const container = document.getElementById("projectContainer");
  let currentProject = null;

  // ------------------------
  // Listen for canvas size messages from iframe
  // ------------------------
  window.addEventListener("message", (e) => {
    if (e.data?.type === "canvasSize" && iframe) {
      const padding = 24; // px extra
      iframe.style.width = e.data.width + padding + "px";
      iframe.style.height = e.data.height + padding + "px";
    }
  });

  // ------------------------
  // Load project from data.json
  // ------------------------
  async function loadProject() {
    const projectId = getQueryParam("project");
    const res = await fetch("projects/data.json");
    const projects = await res.json();

    // Find project by id or folder name
    const project = projects.find(
      (p, idx) =>
        p.id === projectId ||
        idx === Number(projectId) ||
        p.folder === projectId
    );

    if (!project) {
      if (container) container.innerHTML = "<p>Project not found.</p>";
      return;
    }

    // Update title/description
    document.getElementById("projectTitle").textContent = project.title;
    document.getElementById("projectDesc").textContent = project.desc;

    currentProject = project;

    // Set iframe src based on type
    if (project.type === "html") {
      iframe.src = `${project.folder}/${project.files[0]}`;
    } else if (project.type === "p5" || project.type === "three") {
      iframe.src = `templates/${
        project.type
      }_sketch.html?folder=${encodeURIComponent(project.folder)}`;
    }
  }

  loadProject();

  // ------------------------
  // Start / Stop buttons
  // ------------------------
  document.getElementById("startBtn").addEventListener("click", () => {
    if (!currentProject) return;
    if (currentProject.type === "html") {
      iframe.src = `${currentProject.folder}/${currentProject.files[0]}`;
    } else {
      iframe.src = `templates/${
        currentProject.type
      }_sketch.html?folder=${encodeURIComponent(currentProject.folder)}`;
    }
  });

  document.getElementById("stopBtn").addEventListener("click", () => {
    iframe.src = "about:blank";
  });

  // ------------------------
  // Optional: smaller navbar for open_project page
  // ------------------------
  const nav = document.querySelector("nav");
  if (nav && window.location.pathname.endsWith("open_project.html")) {
    nav.style.padding = "1rem 2rem";
  }

  // ------------------------
  // Canvas capture (parent)
  // ------------------------
  (function setupProjectExport() {
    const getIframe = () =>
      document.querySelector("#projectFrame") ||
      document.querySelector("iframe[data-role='project']") ||
      document.querySelector("main iframe") ||
      document.querySelector("iframe");

    const downloadBtn = document.getElementById("downloadScreenshotButton");
    const copyBtn = document.getElementById("copyScreenshotToClipboardButton");

    // Inject export-agent on iframe load (and if already loaded)
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
      if (iframe.contentDocument?.readyState === "complete") {
        injectAgentInto(iframe);
      }
    }
    hookIframe();
    new MutationObserver(hookIframe).observe(document.documentElement, {
      childList: true,
      subtree: true,
    });

    // Await a single capture from the child (returns a Promise<Blob>)
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
            resolve(msg.blob); // Blob comes from child via structured clone
          } else if (msg.type === "captureError") {
            removeEventListener("message", onMessage);
            reject(new Error(msg.message || "Capture failed"));
          }
        };
        addEventListener("message", onMessage);
        iframe.contentWindow.postMessage(
          {
            type: "requestCapture",
            scale,
            mime,
            quality,
            background,
            preferDom,
          },
          "*"
        );
      });
    }

    // Download button → capture then download
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
        a.download =
          (document.title || "capture").replace(/\s+/g, "_") + ".png";
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

    // Copy button → capture then write to clipboard (needs user gesture)
    copyBtn?.addEventListener("click", async () => {
      try {
        const mime = "image/png"; // or "image/webp" / "image/jpeg"
        const blob = await requestCapture({
          scale: 3,
          mime,
          quality: 0.92,
          background: null,
          preferDom: false,
        });

        if (navigator.clipboard && window.ClipboardItem) {
          await navigator.clipboard.write([
            new ClipboardItem({ [mime]: blob }),
          ]);
          // Optional toast
          console.log("Screenshot copied to clipboard.");
        } else {
          // Fallback: download if clipboard API missing
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
  })();
});
