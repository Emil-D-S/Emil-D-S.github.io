const listBtn = document.getElementById("listView");
const cardBtn = document.getElementById("cardView");
const grid = document.getElementById("projectGrid");

// default to card view
cardBtn.classList.add("active");

listBtn.addEventListener("click", () => {
  grid.classList.add("list");
  grid.classList.remove("card");
  listBtn.classList.add("active");
  cardBtn.classList.remove("active");
});

cardBtn.addEventListener("click", () => {
  grid.classList.add("card");
  grid.classList.remove("list");
  cardBtn.classList.add("active");
  listBtn.classList.remove("active");
});

async function loadProjects() {
  const container = document.getElementById("projectGrid");
  const res = await fetch("projects/data.json");
  const projects = await res.json();

  const defaultImage = "assets/images/no_photo_drawn.png";

  projects.forEach((p, index) => {
    const el = document.createElement("article");
    el.className = "project";

    const projectUrl = `open_project.html?project=${encodeURIComponent(
      p.id ?? index
    )}`;
    const imgSrc = p.image && p.image.trim() ? p.image : defaultImage;

    el.innerHTML = `
    <a class="img-link" href="${projectUrl}" aria-label="Open ${p.title}">
      <img class="projectPreviewImg"
           src="${imgSrc}"
           alt="${p.title} screenshot"
           onerror="this.onerror=null;this.src='assets/images/no_photo_drawn.png';" />
    </a>
    <div class="projectInfo">
      <a href="${projectUrl}">
        <i class="fa-solid fa-arrow-right"></i> <h3>${p.title}</h3>
      </a>
      <p>${p.desc}</p>
    </div>
  `;
    container.appendChild(el);
  });
}

loadProjects();
