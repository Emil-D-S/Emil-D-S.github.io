const listBtn = document.getElementById("listView");
const cardBtn = document.getElementById("cardView");
const grid = document.getElementById("projectGrid");

// Default to card view
if (
  grid &&
  !grid.classList.contains("card") &&
  !grid.classList.contains("list")
) {
  grid.classList.add("card");
}
cardBtn?.classList.add("active");

listBtn?.addEventListener("click", () => {
  if (!grid) return;
  grid.classList.add("list");
  grid.classList.remove("card");
  listBtn.classList.add("active");
  cardBtn?.classList.remove("active");
});

cardBtn?.addEventListener("click", () => {
  if (!grid) return;
  grid.classList.add("card");
  grid.classList.remove("list");
  cardBtn.classList.add("active");
  listBtn?.classList.remove("active");
});

function projectHref(project) {
  const cfg = project.desmos || {};
  if (cfg.mode === "redirect" && cfg.url) {
    return cfg.url; // go straight to desmos
  }
  // default: your internal project opener
  const idOrFolder = project.id ?? project.folder ?? "";
  return `open_project.html?project=${encodeURIComponent(idOrFolder)}`;
}

function projectTarget(project) {
  const cfg = project.desmos || {};
  if (cfg.mode === "redirect" && cfg.url) {
    return cfg.target === "_blank" ? "_blank" : "_self";
  }
  return "_self";
}

function projectRel(project) {
  return projectTarget(project) === "_blank" ? "noopener noreferrer" : "";
}

async function loadProjects() {
  const container = document.getElementById("projectGrid");
  if (!container) return;

  const res = await fetch("projects/data.json");
  const projects = await res.json();

  const defaultImage = "assets/images/no_photo_drawn.png";

  projects.forEach((p) => {
    if (p.hidden == true) {
      return;
    }

    if (!p.image) {
      const folderName = p.folder.split("/").pop();
      p.image = `${p.folder}/${folderName}.png`;
    }

    const el = document.createElement("article");
    el.className = "project";

    const href = projectHref(p);
    const target = projectTarget(p);
    const rel = projectRel(p);
    const imgSrc = p.image && p.image.trim() ? p.image : defaultImage;

    el.innerHTML = `
      <a class="img-link" href="${href}" ${
      rel ? `rel="${rel}"` : ""
    } target="${target}" aria-label="Open ${p.title || "project"}">
        <img class="projectPreviewImg"
             src="${imgSrc}"
             alt="${p.title ? p.title + " screenshot" : "project screenshot"}"
             onerror="this.onerror=null;this.src='${defaultImage}';" />
      </a>
      <div class="projectInfo">
        <a href="${href}" ${rel ? `rel="${rel}"` : ""} target="${target}">
          <i style="display: none"class="fa-solid fa-arrow-right"></i> <h3>${
            p.title || "Untitled"
          } ${target == "_blank" ? "" : ""}</h3> 
        </a>
        <p>${p.desc || ""}</p>
      </div>
    `;

    container.appendChild(el);
  });
}

// ↗ sipka

loadProjects();
