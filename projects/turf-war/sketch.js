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

const HIT_LAYER = 2;

const mouseRaycaster = new THREE.Raycaster();
const mousePointer = new THREE.Vector2();

const robotRaycaster = new THREE.Raycaster();

function onPointerMove(e) {
  const rect = renderer.domElement.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width;
  const y = (e.clientY - rect.top) / rect.height;
  mousePointer.x = x * 2 - 1;
  mousePointer.y = -y * 2 + 1;
}

let hitGroup;

function raycastAndDrawHits() {
  hitGroup.clear();
  const targets = scene.children.filter((o) => o !== hitGroup);
  mouseRaycaster.setFromCamera(mousePointer, camera);
  const hits = mouseRaycaster.intersectObjects(targets, true);

  if (hits.length > 0) {
    const p = hits[0].point;
    lastTarget.copy(p); // <-- persist
    const marker = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );
    marker.position.copy(p);
    hitGroup.add(marker);
  } else {
    // keep lastTarget as-is, but still show a marker so user sees where the arm is aiming
    const marker = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0x6666ff })
    );
    marker.position.copy(lastTarget);
    hitGroup.add(marker);
  }
}

function robotEEraycastAndDrawHits() {
  const targets = scene.children.filter((o) => o !== hitGroup);
  robotRaycaster.set(
    arm3.localToWorld(new THREE.Vector3(0, 0, 0)),
    new THREE.Vector3(0, -1, 0)
  );
  const hits = robotRaycaster.intersectObjects(targets, true);

  if (hits.length > 0) {
    const p = hits[0].point;
    const marker = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    );
    marker.position.copy(p);
    hitGroup.add(marker);
  }
}

window.addEventListener("pointermove", onPointerMove);

let arm1, arm2, arm3;

let pivotJ1, pivotJ2;

let columnHeight = 1;

let arm1Length = 2;
let arm1Height = 0.25;
let arm1Width = 0.5;

let arm2Length = 1.5;
let arm2Height = 0.25;
let arm2Width = 0.3;

let arm3Length = 1;

function applyUnitTiling(mesh, texture) {
  // Works for PlaneGeometry created as PlaneGeometry(width, height, ...).
  const { width, height } = mesh.geometry.parameters;
  const sx = mesh.scale.x ?? 1;
  const sy = mesh.scale.y ?? 1;

  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(width * sx, height * sy); // 1 tile per world unit
}

function init() {
  // 1) Host/layout
  const { WIDTH, HEIGHT } = getFixedSize(900, 600);
  centerBody(); // transparent body so border gap shows underlying color

  // 2) Renderer (fixed CSS size)
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(WIDTH, HEIGHT, true); // 'true' also sets CSS size
  document.body.appendChild(renderer.domElement);

  // 3) Scene & camera (no objects—intentionally empty)
  scene = new THREE.Scene();

  hitGroup = new THREE.Group();
  hitGroup.name = "hitMarkers";
  hitGroup.layers.disable(HIT_LAYER);
  mouseRaycaster.layers.set(HIT_LAYER);

  robotRaycaster.layers.set(HIT_LAYER);

  scene.add(hitGroup);
  // This is the canvas clear color; change/remove if you want transparent canvas:
  // For transparent canvas instead, set alpha:true in WebGLRenderer and skip background:
  //   renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
  //   (and do not set scene.background)
  scene.background = new THREE.Color(0x101014);

  camera = new THREE.PerspectiveCamera(60, WIDTH / HEIGHT, 0.1, 100);
  camera.position.set(5, 3, 5);
  camera.lookAt(0, 0, 0);

  orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.enableDamping = true;
  orbitControls.dampingFactor = 0.05;

  // 4) Tell parent the CSS size exactly once
  const postOnce = postCanvasSizeOnceFactory("three_sketch");
  postOnce(renderer.domElement);

  let groundPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      //map: groundPlaneTexture,
    })
  );

  const groundPlaneTexture = new THREE.TextureLoader().load(
    "../projects/turf-war/assets/Prototype_Grid_Gray_04-512x512.png",
    () => {
      groundPlane.material.map = groundPlaneTexture;
      groundPlane.material.needsUpdate = true;
      applyUnitTiling(groundPlane, groundPlaneTexture);
    }
  );

  const ambLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambLight);

  const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
  scene.add(light);

  //draw coordnite cross

  let axes = new THREE.AxesHelper(5);
  scene.add(axes);

  groundPlane.layers.enable(HIT_LAYER);
  scene.add(groundPlane);
  groundPlane.rotation.x = -Math.PI / 2;

  let baseColumn = new THREE.Mesh(
    new THREE.CylinderGeometry(0.25, 0.25, columnHeight, 32),
    new THREE.MeshStandardMaterial({ color: 0x8080ff })
  );

  arm1 = new THREE.Mesh(
    new THREE.BoxGeometry(arm1Width, arm1Height, arm1Length),
    new THREE.MeshStandardMaterial({ color: 0xff8080 })
  );

  let disk1 = new THREE.Mesh(
    new THREE.CylinderGeometry(arm1Width / 2, arm1Width / 2, arm1Height, 32),
    new THREE.MeshStandardMaterial({ color: 0xff8080 })
  );

  disk1.position.z = -arm1Length / 2;
  arm1.add(disk1);

  let disk2 = new THREE.Mesh(
    new THREE.CylinderGeometry(arm1Width / 2, arm1Width / 2, arm1Height, 32),
    new THREE.MeshStandardMaterial({ color: 0xff8080 })
  );

  disk2.position.z = arm1Length / 2;
  arm1.add(disk2);

  arm2 = new THREE.Mesh(
    new THREE.BoxGeometry(arm2Width, arm2Height, arm2Length),
    new THREE.MeshStandardMaterial({ color: 0x80ff80 })
  );

  let disk3 = new THREE.Mesh(
    new THREE.CylinderGeometry(arm2Width / 2, arm2Width / 2, arm2Height, 32),
    new THREE.MeshStandardMaterial({ color: 0x80ff80 })
  );

  disk3.position.z = -arm2Length / 2;
  arm2.add(disk3);

  let disk4 = new THREE.Mesh(
    new THREE.CylinderGeometry(arm2Width / 2, arm2Width / 2, arm2Height, 32),
    new THREE.MeshStandardMaterial({ color: 0x80ff80 })
  );

  disk4.position.z = arm2Length / 2;
  arm2.add(disk4);

  arm3 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 1, 32),
    new THREE.MeshStandardMaterial({ color: 0xffff80 })
  );

  scene.add(baseColumn);
  baseColumn.position.y = columnHeight / 2;

  pivotJ1 = new THREE.Object3D();
  pivotJ1.position.y = columnHeight / 2;
  baseColumn.add(pivotJ1);

  arm1.position.y = arm1Height / 2;
  arm1.position.z = arm1Length / 2;
  pivotJ1.add(arm1);

  pivotJ2 = new THREE.Object3D();
  pivotJ2.position.y = arm1Height;
  pivotJ2.position.z = arm1Length / 2;
  arm1.add(pivotJ2);

  arm2.position.z = arm2Length / 2;
  pivotJ2.add(arm2);

  arm3.position.y = -arm1Height - arm2Height / 2 + arm3Length / 2;
  arm3.position.z = arm2Length / 2;
  scene.add(arm3);
  arm2.add(arm3);

  // 5) Start loop
  animate();
}

const clock = new THREE.Clock();

let lastTarget = new THREE.Vector3(arm1Length + arm2Length - 0.001, 0, 0); // some reachable default

// Joint state (angle = current rotation, vel = rad/s)
let J1 = { angle: 0, vel: 0 };
let J2 = { angle: 0, vel: 0 };

// Limits (tune to taste)
const J1_MAX_ACC = 10.0; // rad/s^2
const J1_MAX_VEL = 4.0; // rad/s
const J2_MAX_ACC = 12.0;
const J2_MAX_VEL = 5.0;

// PD gains (critically damped-ish: kd ≈ 2*sqrt(kp))
const J1_KP = 40.0;
const J1_KD = 2 * Math.sqrt(J1_KP);
const J2_KP = 50.0;
const J2_KD = 2 * Math.sqrt(J2_KP);

function shortestAngleErr(target, current) {
  return Math.atan2(Math.sin(target - current), Math.cos(target - current));
}

function stepJointPD(j, target, dt, kp, kd, amax, vmax) {
  const err = shortestAngleErr(target, j.angle);

  let a = kp * err - kd * j.vel; // desired accel

  a = Math.max(-amax, Math.min(amax, a)); // accel limit
  j.vel += a * dt;
  j.vel = Math.max(-vmax, Math.min(vmax, j.vel)); // velocity limit
  j.angle += j.vel * dt;
}

function animate() {
  const dt = clock.getDelta();
  raycastAndDrawHits();
  robotEEraycastAndDrawHits();

  const tx = lastTarget.x;
  const tz = lastTarget.z;

  const l1 = arm1Length;
  const l2 = arm2Length;

  // distance (clamped)
  let d = Math.hypot(tx, tz);
  const dMin = Math.abs(l1 - l2) + 1e-5;
  const dMax = l1 + l2 - 1e-5;
  d = Math.min(Math.max(d, dMin), dMax);

  // cos and sin of elbow angle
  let cos2 = (tx * tx + tz * tz - l1 * l1 - l2 * l2) / (2 * l1 * l2);
  cos2 = THREE.MathUtils.clamp(cos2, -1, 1);
  let sin2 = Math.sqrt(Math.max(0, 1 - cos2 * cos2)); // elbow-up candidate

  // two signed elbow candidates
  const t2_a = Math.atan2(sin2, cos2); // elbow-up (+)
  const t2_b = Math.atan2(-sin2, cos2); // elbow-down (-)

  // base ray angle (your x–z convention)
  const base = Math.atan2(tx, tz);

  // compute matching shoulder for each elbow sign
  const t1_a = base - Math.atan2(l2 * sin2, l1 + l2 * cos2);
  const t1_b = base - Math.atan2(l2 * -sin2, l1 + l2 * cos2);

  // choose the pair closest to current pose (keeps continuity)
  function chooseClosestPair(t1a, t2a, t1b, t2b, prev1, prev2) {
    const wrap = (a, b) => Math.atan2(Math.sin(a - b), Math.cos(a - b));
    const da = Math.hypot(wrap(t1a, prev1), wrap(t2a, prev2));
    const db = Math.hypot(wrap(t1b, prev1), wrap(t2b, prev2));
    return da <= db ? [t1a, t2a] : [t1b, t2b];
  }

  let [t1, t2] = chooseClosestPair(t1_a, t2_a, t1_b, t2_b, J1.angle, J2.angle);

  stepJointPD(J1, t1, dt, J1_KP, J1_KD, J1_MAX_ACC, J1_MAX_VEL);
  stepJointPD(J2, t2, dt, J2_KP, J2_KD, J2_MAX_ACC, J2_MAX_VEL);

  pivotJ1.rotation.y = J1.angle;
  pivotJ2.rotation.y = J2.angle;

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
