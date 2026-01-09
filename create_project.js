const fs = require("fs");
const path = require("path");

const name = process.argv[2];
const type = process.argv[3]; // "p5" | "three"

if (!name || !type) {
  console.log("Usage: node new-project.js <project-name> <p5|three>");
  process.exit(1);
}

const projectsDir = "projects";
const dataFile = "data.json";
const projectFolder = path.join(projectsDir, name);

if (fs.existsSync(projectFolder)) {
  console.log("Project already exists.");
  process.exit(1);
}

// ---------- create project folder ----------
fs.mkdirSync(projectFolder, { recursive: true });

// ---------- sketch templates ----------
const p5Code = `function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
}
`;

const threeCode = `import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
`;

fs.writeFileSync(
  path.join(projectFolder, "sketch.js"),
  type === "p5" ? p5Code : threeCode
);

// ---------- UPDATE data.json ----------
const data = JSON.parse(fs.readFileSync(dataFile, "utf8"));

const title = name
  .replace(/[-_]/g, " ")
  .replace(/\b\w/g, (c) => c.toUpperCase());

const entry = {
  title,
  desc: "",
  folder: `${projectsDir}/${name}`,
  type,
  files: ["sketch.js"],
  hidden: true,
};

data.push(entry);

fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

console.log("Project created and added to data.json:");
console.log(entry);
