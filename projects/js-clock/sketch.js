// projects/three_empty/sketch.js
// Empty Three.js sketch using shared utils. Should render a blank scene and show a canvas.

import * as THREE from "https://unpkg.com/three@0.161.0/build/three.module.js";
import {
  domReady,
  getFixedSize,
  centerBody,
  postCanvasSizeOnceFactory,
} from "../../templates/common/embed-utils.js";

import { OrbitControls } from "https://unpkg.com/three@0.161.0/examples/jsm/controls/OrbitControls.js";

let renderer, scene, camera, rafId;

let orbitControls;

const pivotHour = new THREE.Object3D();
const pivotMinute = new THREE.Object3D();
const pivotSecond = new THREE.Object3D();

function init() {
  // 1) Host/layout
  const { WIDTH, HEIGHT } = getFixedSize(600, 600);
  centerBody(); // transparent body so border gap shows underlying color

  // 2) Renderer (fixed CSS size)
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(WIDTH, HEIGHT, true); // 'true' also sets CSS size
  document.body.appendChild(renderer.domElement);

  // 3) Scene & camera (no objects—intentionally empty)
  scene = new THREE.Scene();
  // This is the canvas clear color; change/remove if you want transparent canvas:
  // For transparent canvas instead, set alpha:true in WebGLRenderer and skip background:
  //   renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
  //   (and do not set scene.background)
  scene.background = new THREE.Color(0x101014);

  camera = new THREE.PerspectiveCamera(60, WIDTH / HEIGHT, 0.1, 100);
  camera.position.set(0, 0, 3);
  camera.lookAt(0, 0, 0);

  orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.enableDamping = true;
  orbitControls.dampingFactor = 0.05;

  // 4) Tell parent the CSS size exactly once
  const postOnce = postCanvasSizeOnceFactory("three_sketch");
  postOnce(renderer.domElement);

  const torus = new THREE.Mesh(
    new THREE.TorusGeometry(1.5, 0.05, 16, 64),
    new THREE.MeshStandardMaterial({ color: 0xffffff })
  );

  for (let i = 0; i < 12; i++) {
    const mark = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.03, 0.1, 8, 16),
      new THREE.MeshStandardMaterial({ color: 0xffffff })
    );
    const angle = (i / 12) * Math.PI * 2;
    mark.position.set(Math.sin(angle) * 1.4, Math.cos(angle) * 1.4, 0);
    mark.rotation.z = -angle;
    scene.add(mark);
  }

  scene.add(pivotHour);
  scene.add(pivotMinute);
  scene.add(pivotSecond);

  let hourLength = 1;
  let minuteLength = 1.2;
  let secondLength = 1.4;

  const hourHand = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.05, hourLength, 8, 16),
    new THREE.MeshStandardMaterial({ color: 0xffffff })
  );
  const minuteHand = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.03, minuteLength, 8, 16),
    new THREE.MeshStandardMaterial({ color: 0xffffff })
  );
  const secondHand = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.01, secondLength, 8, 16),
    new THREE.MeshStandardMaterial({ color: 0xff0000 })
  );
  scene.add(hourHand);
  scene.add(minuteHand);
  scene.add(secondHand);

  pivotHour.add(hourHand);
  pivotMinute.add(minuteHand);
  pivotSecond.add(secondHand);

  hourHand.position.set(0, hourLength / 2 - 0.1, 0);
  minuteHand.position.set(0, minuteLength / 2 - 0.1, 0.08);
  secondHand.position.set(0, secondLength / 2 - 0.1, 0.12);

  torus.position.x = 0;
  scene.add(torus);

  const ambLight = new THREE.AmbientLight(0xffffff, 5);
  scene.add(ambLight);

  // 5) Start loop
  animate();
}

function getZonedParts(timeZone) {
  const now = Date.now();
  // hours/minutes/seconds from Intl (correct for DST)
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  }).formatToParts(now);

  const pick = (t) => +parts.find((p) => p.type === t).value;
  return {
    hour: pick("hour"),
    minute: pick("minute"),
    second: pick("second"),
    millisecond: now % 1000, // ms don’t depend on zone; good enough
  };
}

const TAU = Math.PI * 2;
const MS_DAY = 86_400_000;
const MS_12H = 43_200_000;
const MS_HOUR = 3_600_000;
const MS_MIN = 60_000;

const clock = new THREE.Clock();
let lastSync = 1.1;
let omegaH = -TAU / (12 * 3600);
let omegaM = -TAU / 3600;
let omegaS = -TAU / 60;

function syncToZone(tz) {
  const t = getZonedParts(tz);
  const h12 =
    (t.hour % 12) + t.minute / 60 + t.second / 3600 + t.millisecond / 3_600_000;
  const m = t.minute + t.second / 60 + t.millisecond / 60_000;
  const s = t.second + t.millisecond / 1000;

  pivotHour.rotation.z = -TAU * (h12 / 12);
  pivotMinute.rotation.z = -TAU * (m / 60);
  pivotSecond.rotation.z = -TAU * (s / 60);
}

function animate() {
  const dt = clock.getDelta();

  // smooth advance
  pivotHour.rotation.z += omegaH * dt;
  pivotMinute.rotation.z += omegaM * dt;
  pivotSecond.rotation.z += omegaS * dt;

  // resync to wall time ~once per second (cheap & accurate)
  lastSync += dt;
  if (lastSync > 1.0) {
    lastSync = 0;
    syncToZone("Europe/Prague");
  }

  orbitControls?.update();
  renderer.render(scene, camera);
  rafId = requestAnimationFrame(animate);
}

// DOM ready + basic error breadcrumbs
domReady(() => {
  try {
    init();
  } catch (e) {
    console.error("[three_empty] init error:", e);
  }
});

window.addEventListener("beforeunload", () => {
  if (rafId) cancelAnimationFrame(rafId);
  renderer?.dispose?.();
});
