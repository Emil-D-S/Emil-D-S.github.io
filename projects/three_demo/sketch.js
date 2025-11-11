// projects/three_demo/sketch.js
import * as THREE from "https://unpkg.com/three@0.161.0/build/three.module.js";
import {
  domReady,
  getFixedSize,
  postCanvasSizeOnce,
} from "../../templates/common/embed-utils.js";

let renderer, scene, camera, cube, rafId;

function init() {
  const { WIDTH, HEIGHT } = getFixedSize(800, 600);

  // Host/layout (shared patterns)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(WIDTH, HEIGHT, true);
  document.body.appendChild(renderer.domElement);

  // Scene setup (project-specific)
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x101014);

  camera = new THREE.PerspectiveCamera(60, WIDTH / HEIGHT, 0.1, 100);
  camera.position.set(2.5, 2.0, 3.5);
  camera.lookAt(0, 0, 0);

  const ambient = new THREE.AmbientLight(0xffffff, 0.6);
  const dir = new THREE.DirectionalLight(0xffffff, 0.8);
  dir.position.set(3, 5, 2);
  scene.add(ambient, dir);

  const geom = new THREE.BoxGeometry(1, 1, 1);
  const mat = new THREE.MeshStandardMaterial({
    color: 0x3399ff,
    metalness: 0.2,
    roughness: 0.4,
  });
  cube = new THREE.Mesh(geom, mat);
  scene.add(cube);

  // Tell parent size once (shared pattern)
  const postOnce = postCanvasSizeOnce(renderer.domElement, "three_sketch");
  postOnce();

  animate();
}

function animate(ts = 0) {
  const t = ts * 0.001;
  cube.rotation.x = t * 0.8;
  cube.rotation.y = t * 1.2;
  renderer.render(scene, camera);
  rafId = requestAnimationFrame(animate);
}

domReady(init);

window.addEventListener("beforeunload", () => {
  if (rafId) cancelAnimationFrame(rafId);
  renderer?.dispose?.();
});
