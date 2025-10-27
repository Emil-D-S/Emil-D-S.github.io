// projects/three_empty/sketch.js
// Empty Three.js sketch using shared utils. Should render a blank scene and show a canvas.

// ============================================================================
// IMPORTS
// ============================================================================
import * as paths from "./paths.js";
import { DH6DOF } from "./kinematics.js";
import GUI from "https://cdn.jsdelivr.net/npm/lil-gui@0.21/+esm";
import * as THREE from "https://unpkg.com/three@0.161.0/build/three.module.js";
import {
  domReady,
  getFixedSize,
  centerBody,
  postCanvasSizeOnceFactory,
} from "../../templates/common/embed-utils.js";
import { OrbitControls } from "https://unpkg.com/three@0.161.0/examples/jsm/controls/OrbitControls.js";
import { RobotState } from "./robotState.js";

// ============================================================================
// CONSTANTS
// ============================================================================
const HIT_LAYER = 2;

// ============================================================================
// ROBOT ARM DIMENSIONS
// ============================================================================
let columnHeight = 1;
let columnRadius = 0.4;
let columnRotatingHeight = 0.25;
let columnRotatingRadius = 0.4;

let arm1Length = 2;
let arm1Height = 0.3;
let arm1Width = 0.3;

let arm2Length = 1.5;
let arm2Height = 0.25;
let arm2Width = 0.3;

let arm3Length = 1;
let arm3Radius = 0.1;

let arm4Length = 0.3;
let arm4Radius = 0.1;

let arm5Length = 0.1;
let arm5Radius = 0.08;

// ============================================================================
// GLOBAL VARIABLES - Three.js Core
// ============================================================================
let renderer, scene, camera, rafId;
let orbitControls;
const clock = new THREE.Clock();

// ============================================================================
// GLOBAL VARIABLES - Robot Arm
// ============================================================================
let arm1, arm2, arm3, arm4, arm5, arm6;
let pivots = [];
let armVisuals = [];
let kinematics;
let robotState;

let dhParams = [
  {
    a: 0,
    alpha: Math.PI / 2,
    d: columnHeight + columnRotatingHeight,
    theta: 0,
  },
  { a: arm1Length, alpha: 0, d: 0, theta: Math.PI / 2 },
  { a: 0, alpha: Math.PI / 2, d: 0, theta: 0 },
  { a: 0, alpha: Math.PI / 2, d: arm2Length + arm3Length, theta: 0 },
  { a: 0, alpha: -Math.PI / 2, d: 0, theta: 0 },
  { a: 0, alpha: 0, d: arm4Length + arm5Length, theta: 0 },
];

// TCP/Toolframe offset (relative to end-effector)
const tcpOffset = {
  x: 0,
  y: 0,
  z: 0.5,
  rx: 0,
  ry: 0,
  rz: 0,
};

// let tcpMarker;

// ============================================================================
// GLOBAL VARIABLES - Scene Objects
// ============================================================================
let hitGroup;
let groundPlane;
let mouseRaycastPlane;
let markerNormalLine;
let planeController;

// ============================================================================
// GLOBAL VARIABLES - Raycasting & Interaction
// ============================================================================
const mouseRaycaster = new THREE.Raycaster();
const mousePointer = new THREE.Vector2();
const robotRaycaster = new THREE.Raycaster();

// ============================================================================
// GLOBAL VARIABLES - Kinematics & Targeting
// ============================================================================
let lastTarget = new THREE.Vector3(arm1Length + arm2Length - 0.001, 0, 0);
let targetPositon = new THREE.Vector3();
// let calcFKMarker = new THREE.AxesHelper(0.1);
let calcFKMarker = new THREE.Mesh(
  new THREE.BoxGeometry(0.1, 0.1, 0.1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);

// ============================================================================
// GLOBAL VARIABLES - GUI State
// ============================================================================
let updatingFKSliders = false;
let updatingIKSliders = false;
let updatingIKLocalSliders = false;
let deltaOrigin = new THREE.Vector3();
let deltaOriginQuat = [0, 0, 0, 1];
let changingLocalDelta = false;
let tcpMarker;

// ============================================================================
// GUI SETUP
// ============================================================================
const gui = new GUI();
const guiLeft = new GUI();

guiLeft.domElement.style.position = "absolute";
guiLeft.domElement.style.left = "12px";
guiLeft.domElement.style.top = "0px";
guiLeft.domElement.style.zIndex = "1000";

const visualFolder = guiLeft.addFolder("Visuals");

const guiVisualParams = {
  visibleArm: true,
  visibleDhAxes: false,
  doExamplePath: false,
};

visualFolder
  .add(guiVisualParams, "visibleArm")
  .name("Show Arm")
  .onChange((value) => {
    armVisuals.forEach((mesh) => (mesh.material.visible = value));
  });

visualFolder
  .add(guiVisualParams, "visibleDhAxes")
  .name("Show DH Axes")
  .onChange((value) => {
    pivots.forEach((mesh) => (mesh.material.visible = value));
  });

visualFolder
  .add(guiVisualParams, "doExamplePath")
  .name("Run Example Path")
  .onChange((value) => {
    if (value) {
      animatePath(robotPath);
      pathTraceLine.visible = true;
    } else {
      stopAnimation();
      pathTraceLine.visible = false;
    }
  });

// FK Controls
const fkControlsFolder = gui.addFolder("FK - control individual joints");

const guiFKParams = {
  theta1: 0,
  theta2: 0,
  theta3: 0,
  theta4: 0,
  theta5: 0,
  theta6: 0,
  resetPos: function () {
    // Reset robot to zero joint angles
    robotState.setJoints([0, 0, 0, 0, 0, 0]);
    moveArmToAngles(robotState.joints);

    // Get the FK result for zero position
    const pos = robotState.endEffector.position;
    const q = robotState.endEffector.orientation;

    // Update marker
    calcFKMarker.position.set(pos[0], pos[1], pos[2]);
    if (q && q.length === 4) {
      calcFKMarker.quaternion.set(q[0], q[1], q[2], q[3]);
    }

    // Update IK sliders to match FK result (accounting for TCP)
    updatingIKSliders = true;
    const tcpPose = kinematics.calcTCPPose(pos, q);
    guiIKParams.x = tcpPose.pos[0];
    guiIKParams.y = tcpPose.pos[1];
    guiIKParams.z = tcpPose.pos[2];

    const threeQ = new THREE.Quaternion(
      tcpPose.quat[0],
      tcpPose.quat[1],
      tcpPose.quat[2],
      tcpPose.quat[3]
    );
    const e = new THREE.Euler().setFromQuaternion(threeQ, "XYZ");
    guiIKParams.rx = e.x;
    guiIKParams.ry = e.y;
    guiIKParams.rz = e.z;

    slidersIK.forEach((s, i) => {
      sliderIKControllers[i].updateDisplay();
    });
    updatingIKSliders = false;

    // Also sync FK sliders
    updatingFKSliders = true;
    slidersFK.forEach((s, i) => {
      guiFKParams[s.key] = 0;
      sliderFKControllers[i].updateDisplay();
    });
    updatingFKSliders = false;
  },
};

const slidersFK = [
  { key: "theta1", min: -Math.PI, max: Math.PI, step: 0.01 },
  { key: "theta2", min: -Math.PI / 2, max: Math.PI / 2, step: 0.01 },
  { key: "theta3", min: -Math.PI / 2, max: Math.PI / 2, step: 0.01 },
  { key: "theta4", min: -Math.PI, max: Math.PI, step: 0.01 },
  { key: "theta5", min: -Math.PI / 2, max: Math.PI / 2, step: 0.01 },
  { key: "theta6", min: -Math.PI, max: Math.PI, step: 0.01 },
];

const sliderFKControllers = [];

fkControlsFolder.add(guiFKParams, "resetPos").name("Reset Position");

slidersFK.forEach((s, i) => {
  const controller = fkControlsFolder
    .add(guiFKParams, s.key, s.min, s.max)
    .decimals(2)
    .name(s.key)
    .onChange((val) => {
      if (!updatingFKSliders) {
        onFKControlChange(i, val);
      }
    });
  sliderFKControllers.push(controller);
});

// IK Controls
const ikControlsFolder = gui.addFolder("IK - Control end-effector pose");

const guiIKParams = {
  x: 0,
  y: 0,
  z: 0,
  rz: 0,
  ry: 0,
  rx: 0,
  resetPos: function () {
    // Reset robot to zero joint angles
    robotState.setJoints([0, 0, 0, 0, 0, 0]);
    moveArmToAngles(robotState.joints);

    // Get the FK result for zero position
    const pos = robotState.endEffector.position;
    const q = robotState.endEffector.orientation;

    // Update marker
    calcFKMarker.position.set(pos[0], pos[1], pos[2]);
    if (q && q.length === 4) {
      calcFKMarker.quaternion.set(q[0], q[1], q[2], q[3]);
    }

    // Update IK sliders to match FK result (accounting for TCP)
    updatingIKSliders = true;
    const tcpPose = kinematics.calcTCPPose(pos, q);
    guiIKParams.x = tcpPose.pos[0];
    guiIKParams.y = tcpPose.pos[1];
    guiIKParams.z = tcpPose.pos[2];

    const threeQ = new THREE.Quaternion(
      tcpPose.quat[0],
      tcpPose.quat[1],
      tcpPose.quat[2],
      tcpPose.quat[3]
    );
    const e = new THREE.Euler().setFromQuaternion(threeQ, "XYZ");
    guiIKParams.rx = e.x;
    guiIKParams.ry = e.y;
    guiIKParams.rz = e.z;

    slidersIK.forEach((s, i) => {
      sliderIKControllers[i].updateDisplay();
    });
    updatingIKSliders = false;

    // Also sync FK sliders
    updatingFKSliders = true;
    slidersFK.forEach((s, i) => {
      guiFKParams[s.key] = 0;
      sliderFKControllers[i].updateDisplay();
    });
    updatingFKSliders = false;
  },
};

const slidersIK = [
  { key: "x", min: -5, max: 5, step: 0.01 },
  { key: "y", min: -5, max: 5, step: 0.01 },
  { key: "z", min: -5, max: 5, step: 0.01 },
  { key: "rz", min: -Math.PI, max: Math.PI, step: 0.01 },
  { key: "ry", min: -Math.PI, max: Math.PI, step: 0.01 },
  { key: "rx", min: -Math.PI, max: Math.PI, step: 0.01 },
];

const sliderIKControllers = [];

ikControlsFolder.add(guiIKParams, "resetPos").name("Reset Position");

slidersIK.forEach((s, i) => {
  const controller = ikControlsFolder
    .add(guiIKParams, s.key, s.min, s.max, s.step)
    .decimals(2)
    .name(s.key)
    .onChange((val) => {
      if (!updatingIKSliders) {
        onIKControlChange({
          x: guiIKParams.x,
          y: guiIKParams.y,
          z: guiIKParams.z,
          rx: guiIKParams.rx,
          ry: guiIKParams.ry,
          rz: guiIKParams.rz,
        });
      }
    });
  sliderIKControllers.push(controller);
});

//===========================================

// LOCAL IK Controls

const ikLocalControlsFolder = guiLeft.addFolder(
  "Local EE IK - control relative to EE pose"
);

const guiIKLocalParams = {
  dx: 0,
  dy: 0,
  dz: 0,
  drz: 0,
  dry: 0,
  drx: 0,
  resetSlidersDelta: function () {
    updatingIKLocalSliders = true;

    guiIKLocalParams.dx = 0;
    guiIKLocalParams.dy = 0;
    guiIKLocalParams.dz = 0;
    guiIKLocalParams.drx = 0;
    guiIKLocalParams.dry = 0;
    guiIKLocalParams.drz = 0;

    sliderIKLocalControllers.forEach((c) => c.updateDisplay());

    updatingIKLocalSliders = false;
  },
};

const slidersIKLocal = [
  { key: "dx", min: -5, max: 5, step: 0.01 },
  { key: "dy", min: -5, max: 5, step: 0.01 },
  { key: "dz", min: -5, max: 5, step: 0.01 },
  { key: "drz", min: -Math.PI, max: Math.PI, step: 0.01 },
  { key: "dry", min: -Math.PI / 2, max: Math.PI / 2, step: 0.01 },
  { key: "drx", min: -Math.PI, max: Math.PI, step: 0.01 },
];

const sliderIKLocalControllers = [];

slidersIKLocal.forEach((s, i) => {
  const controller = ikLocalControlsFolder
    .add(guiIKLocalParams, s.key, s.min, s.max, s.step)
    .decimals(2)
    .name(s.key)
    .onChange((val) => {
      // When user starts moving any slider, capture the origin TCP pose once
      if (!changingLocalDelta) {
        // get current EE world pose
        const eePos = robotState.getEndEffectorPosition();
        const eeQuat = robotState.getEndEffectorOrientation();

        // compute TCP pose from EE (world frame)
        const tcpPose = kinematics.calcTCPPose(eePos, eeQuat);

        // store TCP world position + orientation as origin
        deltaOrigin.set(tcpPose.pos[0], tcpPose.pos[1], tcpPose.pos[2]);
        deltaOriginQuat = tcpPose.quat.slice();

        changingLocalDelta = true;
      }

      // Build local delta from the GUI local params (dx/dy/dz etc)
      const localDelta = {
        pos: [
          Number(guiIKLocalParams.dx) || 0,
          Number(guiIKLocalParams.dy) || 0,
          Number(guiIKLocalParams.dz) || 0,
        ],
        rotEuler: [
          Number(guiIKLocalParams.drx) || 0,
          Number(guiIKLocalParams.dry) || 0,
          Number(guiIKLocalParams.drz) || 0,
        ],
      };

      // origin in the format moveEERelativeToPosition expects:
      const origin = {
        pos: [deltaOrigin.x, deltaOrigin.y, deltaOrigin.z],
        quat: deltaOriginQuat,
      };

      // call mover that uses origin + relative local delta
      const { res, targetPose } = robotState.moveEERelativeToPosition(
        origin,
        localDelta,
        {
          maxIters: 120,
          tolPos: 1e-4,
          tolOri: 1e-3,
          lambda: 0.1,
        }
      );

      if (res && res.success) {
        moveArmToAngles(robotState.joints);

        // update markers / sliders similar to other flows
        const pos = robotState.endEffector.position;
        calcFKMarker.position.set(pos[0], pos[1], pos[2]);
        const qq = robotState.endEffector.orientation;
        if (qq && qq.length === 4) {
          calcFKMarker.quaternion.set(qq[0], qq[1], qq[2], qq[3]);
        }
        updateTCPMarker();

        // sync FK sliders WITHOUT triggering their onChange
        updatingFKSliders = true;
        sliderFKControllers.forEach((c, j) => {
          try {
            guiFKParams[slidersFK[j].key] = robotState.joints[j];
            c.updateDisplay();
          } catch (e) {}
        });
        updatingFKSliders = false;
      } else {
        // IK failed for this incremental step — ignore or log if you want
        // console.warn("Local IK step failed:", res);
      }
    })
    .onFinishChange((val) => {
      // When user releases the slider: reset the local delta sliders and origin capture
      updatingIKLocalSliders = true;
      guiIKLocalParams.dx = 0;
      guiIKLocalParams.dy = 0;
      guiIKLocalParams.dz = 0;
      guiIKLocalParams.drx = 0;
      guiIKLocalParams.dry = 0;
      guiIKLocalParams.drz = 0;
      sliderIKLocalControllers.forEach((c) => c.updateDisplay());
      updatingIKLocalSliders = false;

      // reset stored origin so next drag will re-capture
      changingLocalDelta = false;
      deltaOrigin.set(0, 0, 0);
      deltaOriginQuat = [0, 0, 0, 1];
    });
  sliderIKLocalControllers.push(controller);
});

//======================================

// TCP/Toolframe Configuration
const tcpFolder = guiLeft.addFolder("TCP / Toolframe").close();

const guiTCPParams = {
  x: 0,
  y: 0,
  z: 0,
  rx: 0,
  ry: 0,
  rz: 0,
  resetTCP: function () {
    guiTCPParams.x = 0;
    guiTCPParams.y = 0;
    guiTCPParams.z = 0;
    guiTCPParams.rx = 0;
    guiTCPParams.ry = 0;
    guiTCPParams.rz = 0;

    kinematics.setTCP([0, 0, 0], [0, 0, 0]);

    tcpFolder.controllersRecursive().forEach((c) => c.updateDisplay());
    updateTCPVisualization();
  },
};

tcpFolder
  .add(guiTCPParams, "x", -1, 1, 0.01)
  .name("TCP X")
  .onChange((v) => {
    const tcp = kinematics.getTCP();
    kinematics.setTCP([v, tcp.pos[1], tcp.pos[2]], tcp.rot);
    updateTCPVisualization();
  });

tcpFolder
  .add(guiTCPParams, "y", -1, 1, 0.01)
  .name("TCP Y")
  .onChange((v) => {
    const tcp = kinematics.getTCP();
    kinematics.setTCP([tcp.pos[0], v, tcp.pos[2]], tcp.rot);
    updateTCPVisualization();
  });

tcpFolder
  .add(guiTCPParams, "z", -1, 1, 0.01)
  .name("TCP Z")
  .onChange((v) => {
    const tcp = kinematics.getTCP();
    kinematics.setTCP([tcp.pos[0], tcp.pos[1], v], tcp.rot);
    updateTCPVisualization();
  });

tcpFolder
  .add(guiTCPParams, "rx", -Math.PI, Math.PI, 0.01)
  .name("TCP RX")
  .onChange((v) => {
    const tcp = kinematics.getTCP();
    kinematics.setTCP(tcp.pos, [v, tcp.rot[1], tcp.rot[2]]);
    updateTCPVisualization();
  });

tcpFolder
  .add(guiTCPParams, "ry", -Math.PI, Math.PI, 0.01)
  .name("TCP RY")
  .onChange((v) => {
    const tcp = kinematics.getTCP();
    kinematics.setTCP(tcp.pos, [tcp.rot[0], v, tcp.rot[2]]);
    updateTCPVisualization();
  });

tcpFolder
  .add(guiTCPParams, "rz", -Math.PI, Math.PI, 0.01)
  .name("TCP RZ")
  .onChange((v) => {
    const tcp = kinematics.getTCP();
    kinematics.setTCP(tcp.pos, [tcp.rot[0], tcp.rot[1], v]);
    updateTCPVisualization();
  });

tcpFolder.add(guiTCPParams, "resetTCP").name("Reset TCP");

// ============================================================================
// GUI HELPER FUNCTIONS
// ============================================================================

function updateTCPVisualization() {
  // Update IK sliders to reflect new TCP position
  if (!updatingIKSliders) {
    updatingIKSliders = true;
    const currentPos = robotState.endEffector.position;
    const currentQuat = robotState.endEffector.orientation;
    const tcpPose = kinematics.calcTCPPose(currentPos, currentQuat);

    guiIKParams.x = tcpPose.pos[0];
    guiIKParams.y = tcpPose.pos[1];
    guiIKParams.z = tcpPose.pos[2];

    const threeQ = new THREE.Quaternion(
      tcpPose.quat[0],
      tcpPose.quat[1],
      tcpPose.quat[2],
      tcpPose.quat[3]
    );
    const e = new THREE.Euler().setFromQuaternion(threeQ, "XYZ");
    guiIKParams.rx = e.x;
    guiIKParams.ry = e.y;
    guiIKParams.rz = e.z;

    slidersIK.forEach((s, i) => {
      sliderIKControllers[i].updateDisplay();
    });
    updatingIKSliders = false;
  }

  // Update visual marker
  updateTCPMarker();
}

function updateTCPMarker() {
  if (!tcpMarker) return;

  const currentPos = robotState.endEffector.position;
  const currentQuat = robotState.endEffector.orientation;
  const tcpPose = kinematics.calcTCPPose(currentPos, currentQuat);

  tcpMarker.position.set(tcpPose.pos[0], tcpPose.pos[1], tcpPose.pos[2]);
  tcpMarker.quaternion.set(
    tcpPose.quat[0],
    tcpPose.quat[1],
    tcpPose.quat[2],
    tcpPose.quat[3]
  );
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================
function applyUnitTiling(mesh, texture) {
  const { width, height } = mesh.geometry.parameters;
  const sx = mesh.scale.x ?? 1;
  const sy = mesh.scale.y ?? 1;

  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(width * sx, height * sy);
}

// ============================================================================
// EVENT HANDLERS
// ============================================================================
function onPointerMove(e) {
  const rect = renderer.domElement.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width;
  const y = (e.clientY - rect.top) / rect.height;
  mousePointer.x = x * 2 - 1;
  mousePointer.y = -y * 2 + 1;
}

window.addEventListener("pointermove", onPointerMove);

window.addEventListener("beforeunload", () => {
  if (rafId) cancelAnimationFrame(rafId);
  renderer?.dispose?.();
});

// ============================================================================
// RAYCASTING FUNCTIONS
// ============================================================================
function raycastAndDrawHits() {
  hitGroup.clear();
  const targets = scene.children.filter((o) => o !== hitGroup);
  mouseRaycaster.setFromCamera(mousePointer, camera);
  const hits = mouseRaycaster.intersectObjects(targets, true);

  if (hits.length > 0) {
    const p = hits[0].point;
    lastTarget.copy(p);
    const marker = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );
    marker.position.copy(p);
    hitGroup.add(marker);
  } else {
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

// ============================================================================
// ROBOT ARM MOVEMENT
// ============================================================================

function moveArmToAngles(angles, i = -1) {
  if (0 <= i && i < 6) {
    pivots[i].rotation.z = angles + dhParams[i].theta;
    //console.log("1");
  } else {
    for (let i = 0; i < 6; i++) {
      pivots[i].rotation.z = angles[i] + dhParams[i].theta;
    }
    //console.log("2");
  }
}

function onFKControlChange(i, joint) {
  robotState.setJoint(i, joint);

  moveArmToAngles(robotState.joints);

  // apply rotation if quaternion is sane
  const q = robotState.endEffector.orientation;
  if (!q || q.length !== 4 || q.some((v) => !isFinite(v))) {
    console.warn("Invalid EE quaternion, skipping rotation");
  } else {
    calcFKMarker.quaternion.set(q[0], q[1], q[2], q[3]);
  }

  // set marker position
  const pos = robotState.endEffector.position;
  calcFKMarker.position.set(pos[0], pos[1], pos[2]);

  // --- SYNC IK SLIDERS WITHOUT TRIGGERING onChange ---
  updatingIKSliders = true;

  // Get TCP pose instead of EE pose
  const tcpPose = kinematics.calcTCPPose(pos, q);
  guiIKParams.x = tcpPose.pos[0];
  guiIKParams.y = tcpPose.pos[1];
  guiIKParams.z = tcpPose.pos[2];

  sliderIKControllers[0].updateDisplay();
  sliderIKControllers[1].updateDisplay();
  sliderIKControllers[2].updateDisplay();

  if (q && q.length === 4) {
    const threeQ = new THREE.Quaternion(
      tcpPose.quat[0],
      tcpPose.quat[1],
      tcpPose.quat[2],
      tcpPose.quat[3]
    );
    const e = new THREE.Euler().setFromQuaternion(threeQ, "XYZ");
    guiIKParams.rx = e.x;
    guiIKParams.ry = e.y;
    guiIKParams.rz = e.z;
    sliderIKControllers[3].updateDisplay();
    sliderIKControllers[4].updateDisplay();
    sliderIKControllers[5].updateDisplay();
  }

  updatingIKSliders = false;

  // Update TCP marker
  updateTCPMarker();
}

function onIKControlChange(payload) {
  const p =
    payload && typeof payload === "object"
      ? payload
      : {
          x: guiIKParams.x,
          y: guiIKParams.y,
          z: guiIKParams.z,
          rx: guiIKParams.rx,
          ry: guiIKParams.ry,
          rz: guiIKParams.rz,
        };

  if (!robotState) return;

  let targetTCPPos, targetTCPQuat;

  // WORLD MODE: Use absolute world TCP coordinates
  const e = new THREE.Euler(p.rx || 0, p.ry || 0, p.rz || 0, "XYZ");
  const q = new THREE.Quaternion().setFromEuler(e);

  targetTCPPos = [Number(p.x) || 0, Number(p.y) || 0, Number(p.z) || 0];
  targetTCPQuat = [q.x, q.y, q.z, q.w];

  // Convert TCP target to EE target using kinematics
  const eeTarget = kinematics.calcEEFromTCPPose(targetTCPPos, targetTCPQuat);

  const targetPose = {
    pos: eeTarget.pos,
    quat: eeTarget.quat,
  };

  const res = robotState.moveToTarget(targetPose, {
    maxIters: 120,
    tolPos: 1e-4,
    tolOri: 1e-3,
    lambda: 0.1,
  });

  if (res.success) {
    moveArmToAngles(robotState.joints);

    const pos = robotState.endEffector.position;
    calcFKMarker.position.set(pos[0], pos[1], pos[2]);
    const qq = robotState.endEffector.orientation;
    if (qq && qq.length === 4)
      calcFKMarker.quaternion.set(qq[0], qq[1], qq[2], qq[3]);

    // Update TCP marker
    updateTCPMarker();

    // sync FK sliders WITHOUT triggering their onChange
    updatingFKSliders = true;

    sliderFKControllers.forEach((c, i) => {
      try {
        if (c && typeof c.setValue === "function") {
          guiFKParams[slidersFK[i].key] = robotState.joints[i];
          c.updateDisplay();
        }
      } catch (e) {
        /* ignore sync errors */
      }
    });

    updatingFKSliders = false;
  } else {
    console.warn("IK failed:", res);
  }
}

function onLocalIkControlChange(payload) {
  const p = payload && typeof payload === "object" ? payload : null;
  if (!p) return;
  if (!robotState) return;

  // Extract local delta
  const localDelta = {
    pos: [Number(p.dx) || 0, Number(p.dy) || 0, Number(p.dz) || 0],
    rotEuler: [Number(p.dRx) || 0, Number(p.dRy) || 0, Number(p.dRz) || 0],
  };

  // Move EE by local delta (robotState handles conversion to world and IK)
  const { res, targetPose } = robotState.moveEERelativeToPosition(
    robotState.endEffector,
    localDelta,
    {
      maxIters: 120,
      tolPos: 1e-4,
      tolOri: 1e-3,
      lambda: 0.1,
    }
  );

  if (res.success) {
    moveArmToAngles(robotState.joints);
    console.log("Moved to:", robotState.joints);

    // Update FK marker
    const pos = robotState.endEffector.position;
    calcFKMarker.position.set(pos[0], pos[1], pos[2]);
    const qq = robotState.endEffector.orientation;
    if (qq && qq.length === 4) {
      calcFKMarker.quaternion.set(qq[0], qq[1], qq[2], qq[3]);
    }

    // Update TCP marker
    updateTCPMarker();

    // Sync FK sliders without triggering their onChange
    updatingFKSliders = true;
    sliderFKControllers.forEach((c, i) => {
      try {
        if (c && typeof c.setValue === "function") {
          guiFKParams[slidersFK[i].key] = robotState.joints[i];
          c.updateDisplay();
        }
      } catch (e) {
        // ignore sync errors
      }
    });
    updatingFKSliders = false;
  } else {
    console.warn("IK failed:", res);
  }
}

// ============================================================================
// SCENE SETUP
// ============================================================================
function setupRenderer() {
  const { WIDTH, HEIGHT } = getFixedSize(1300, 700);
  centerBody();

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(WIDTH, HEIGHT, true);
  document.body.appendChild(renderer.domElement);

  const postOnce = postCanvasSizeOnceFactory("three_sketch");
  postOnce(renderer.domElement);

  return { WIDTH, HEIGHT };
}

function setupScene() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x101014);

  hitGroup = new THREE.Group();
  hitGroup.name = "hitMarkers";
  hitGroup.layers.disable(HIT_LAYER);
  mouseRaycaster.layers.set(HIT_LAYER);
  robotRaycaster.layers.set(HIT_LAYER);
  scene.add(hitGroup);
}

function setupCamera(WIDTH, HEIGHT) {
  camera = new THREE.PerspectiveCamera(60, WIDTH / HEIGHT, 0.1, 100);
  camera.position.set(5, 3, 5);
  camera.lookAt(0, 0, 0);

  orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.enableDamping = true;
  orbitControls.dampingFactor = 0.05;
}

function setupLighting() {
  const ambLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambLight);

  const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
  scene.add(light);
}

function setupGroundPlane() {
  groundPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({ color: 0xffffff })
  );

  const groundPlaneTexture = new THREE.TextureLoader().load(
    "../projects/scara-robot-IK/assets/Prototype_Grid_Gray_04-512x512.png",
    () => {
      groundPlane.material.map = groundPlaneTexture;
      groundPlane.material.needsUpdate = true;
      applyUnitTiling(groundPlane, groundPlaneTexture);
    }
  );

  groundPlane.rotation.x = -Math.PI / 2;
  scene.add(groundPlane);
}

function setupMouseRaycastPlane() {
  mouseRaycastPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshBasicMaterial({
      color: 0xff1010,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    })
  );
  mouseRaycastPlane.rotation.x = -Math.PI / 2;
  mouseRaycastPlane.layers.enable(HIT_LAYER);
  scene.add(mouseRaycastPlane);

  renderer.domElement.tabIndex = 0;
  renderer.domElement.focus();

  planeController = window.enableShiftScroll({
    canvas: renderer.domElement,
    object: mouseRaycastPlane,
    orbitControls,
    axis: "y",
    sensitivity: 0.001,
    min: 0,
    max: 5,
  });
}

function setupMarkerLine() {
  const linePos = new Float32Array(6);
  linePos[0] = lastTarget.x;
  linePos[1] = lastTarget.y;
  linePos[2] = lastTarget.z;
  linePos[3] = lastTarget.x;
  linePos[4] = groundPlane.position.y;
  linePos[5] = lastTarget.z;

  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute(
    "position",
    new THREE.BufferAttribute(linePos, 3).setUsage(THREE.DynamicDrawUsage)
  );

  const lineMat = new THREE.LineBasicMaterial({ color: 0x00ff00 });
  markerNormalLine = new THREE.Line(lineGeo, lineMat);
  scene.add(markerNormalLine);
}

function setupCoordinateAxes() {
  for (let i = 0; i < 7; i++) {
    pivots[i] = new THREE.AxesHelper(0.5);
  }

  let axes = new THREE.AxesHelper(5);
  axes.position.x = -5;
  axes.position.z = -5;
  scene.add(axes);
}

function setupKinematics() {
  kinematics = new DH6DOF(dhParams);
  scene.add(calcFKMarker);
}

function setupRobotState() {
  robotState = new RobotState(kinematics);
}

// ============================================================================
// ROBOT ARM CONSTRUCTION
// ============================================================================
function buildRobotArm() {
  // Base column
  let baseColumn = new THREE.Mesh(
    new THREE.CylinderGeometry(columnRadius, columnRadius, columnHeight, 32),
    new THREE.MeshStandardMaterial({ color: 0x8080ff })
  );

  let baseRotating = new THREE.Mesh(
    new THREE.CylinderGeometry(
      columnRotatingRadius,
      columnRotatingRadius,
      columnRotatingHeight,
      32
    ),
    new THREE.MeshStandardMaterial({ color: 0x8f4fff })
  );

  // Arm 1
  arm1 = new THREE.Mesh(
    new THREE.BoxGeometry(arm1Length, arm1Height, arm1Width),
    new THREE.MeshStandardMaterial({ color: 0xff8080 })
  );

  let disk1a = new THREE.Mesh(
    new THREE.CylinderGeometry(arm1Height / 2, arm1Height / 2, arm1Width, 32),
    new THREE.MeshStandardMaterial({ color: 0xff8080 })
  );

  let disk1b = new THREE.Mesh(
    new THREE.CylinderGeometry(arm1Height / 2, arm1Height / 2, arm1Width, 32),
    new THREE.MeshStandardMaterial({ color: 0xff8080 })
  );

  // Arm 2
  arm2 = new THREE.Mesh(
    new THREE.BoxGeometry(arm2Height, arm2Length, arm2Width),
    new THREE.MeshStandardMaterial({ color: 0x80ff80 })
  );

  let counterweight2a = new THREE.Mesh(
    new THREE.BoxGeometry(arm2Height * 3, arm2Height * 2, arm2Width, 32),
    new THREE.MeshStandardMaterial({ color: 0x80ff80 })
  );

  let disk2b = new THREE.Mesh(
    new THREE.CylinderGeometry(arm2Height / 2, arm2Height / 2, arm2Width, 32),
    new THREE.MeshStandardMaterial({ color: 0x80ff80 })
  );

  // Arms 3, 4, 5
  arm3 = new THREE.Mesh(
    new THREE.CylinderGeometry(arm3Radius, arm3Radius, arm3Length),
    new THREE.MeshStandardMaterial({ color: 0xffff80 })
  );

  arm4 = new THREE.Mesh(
    new THREE.CylinderGeometry(arm4Radius, arm4Radius, arm4Length),
    new THREE.MeshStandardMaterial({ color: 0xffff80 })
  );

  arm5 = new THREE.Mesh(
    new THREE.CylinderGeometry(arm5Radius, arm5Radius, arm5Length),
    new THREE.MeshStandardMaterial({ color: 0xff80ff })
  );

  let joint34cylinder = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.1, 0.2),
    new THREE.MeshStandardMaterial({ color: 0x80ffff })
  );

  // Store visual elements
  armVisuals = [
    arm1,
    arm2,
    arm3,
    arm4,
    arm5,
    disk1a,
    disk1b,
    counterweight2a,
    disk2b,
    joint34cylinder,
    baseRotating,
  ];

  // Assemble hierarchy
  scene.add(baseColumn);
  baseColumn.position.y = columnHeight / 2;

  baseColumn.add(pivots[0]);
  pivots[0].position.y = columnHeight / 2;
  pivots[0].rotation.x = -Math.PI / 2;

  pivots[0].add(baseRotating);
  baseRotating.rotation.x = Math.PI / 2;
  baseRotating.position.z = columnRotatingHeight / 2;

  baseRotating.add(pivots[1]);
  pivots[1].position.y = columnRotatingHeight / 2;
  pivots[1].add(arm1);

  arm1.position.x = arm1Length / 2;
  arm1.position.z = -arm1Width;

  arm1.add(disk1a);
  disk1a.position.x = -arm1Length / 2;
  disk1a.rotation.x = Math.PI / 2;

  arm1.add(disk1b);
  disk1b.rotation.x = Math.PI / 2;
  disk1b.position.x = arm1Length / 2;

  arm1.add(pivots[2]);
  pivots[2].position.x = arm1Length / 2;
  pivots[2].position.z = arm1Width;
  pivots[2].add(arm2);
  arm2.position.y = -arm2Length / 2;

  arm2.add(counterweight2a);
  counterweight2a.position.y = arm2Length / 2 + arm2Height * 1.5;
  counterweight2a.rotation.z = Math.PI / 2;

  arm2.add(disk2b);
  disk2b.position.y = -arm2Length / 2;

  arm2.add(pivots[3]);
  pivots[3].position.y = -arm2Length / 2;
  pivots[3].rotation.x = Math.PI / 2;
  pivots[3].add(arm3);
  arm3.rotation.x = Math.PI / 2;
  arm3.rotation.y = Math.PI / 2;
  arm3.position.z = arm3Length / 2;

  arm3.add(pivots[4]);
  pivots[4].rotation.y = -Math.PI / 2;
  pivots[4].position.y = arm3Length / 2;
  pivots[4].add(joint34cylinder);
  joint34cylinder.rotation.x = Math.PI / 2;
  pivots[4].add(arm4);
  arm4.position.y = arm4Length / 2;

  arm4.add(pivots[5]);
  pivots[5].position.y = arm4Length / 2;
  pivots[5].rotation.x = -Math.PI / 2;

  pivots[5].add(arm5);
  arm5.position.z = arm5Length / 2;
  arm5.rotation.x = Math.PI / 2;
  pivots[5].add(pivots[6]);
  pivots[6].position.z = arm5Length;

  tcpMarker = new THREE.AxesHelper(0.3);
  scene.add(tcpMarker);

  pivots.forEach((mesh) => {
    mesh.material.visible = false;
  });
}

// ============================================================================
// ANIMATION LOOP
// ============================================================================

// Utility: compute Euler from Z-axis target
function lookAtZ(pos, targetZ) {
  // targetZ is normalized vector pointing in TCP local Z
  const z = new THREE.Vector3(...targetZ).normalize();
  const y = new THREE.Vector3(0, 1, 0); // temp up
  if (Math.abs(z.dot(y)) > 0.999) y.set(1, 0, 0); // prevent degenerate
  const x = new THREE.Vector3().crossVectors(y, z).normalize();
  const newY = new THREE.Vector3().crossVectors(z, x).normalize();
  const m = new THREE.Matrix4().makeBasis(x, newY, z);
  const euler = new THREE.Euler().setFromRotationMatrix(m, "XYZ");
  return [euler.x, euler.y, euler.z];
}

/**
 * Generate robot paths with different TCP orientations
 * @param {Array} basePath - array of positions [[x,y,z], ...]
 * @param {number} speed - linear speed (units/sec)
 * @returns {Array} paths - [zDownPath, zNormalPath, zAlongPath]
 */
function generatePaths(basePath, speed = 1.0) {
  const paths = [[], [], []]; // 0: Z down, 1: Z normal, 2: Z along

  for (let i = 0; i < basePath.length; i++) {
    const pos = basePath[i];

    // Compute distance to next (or previous for last) waypoint
    let dist;
    if (i < basePath.length - 1) {
      const next = basePath[i + 1];
      dist = Math.sqrt(
        Math.pow(next[0] - pos[0], 2) +
          Math.pow(next[1] - pos[1], 2) +
          Math.pow(next[2] - pos[2], 2)
      );
    } else if (i > 0) {
      const prev = basePath[i - 1];
      dist = Math.sqrt(
        Math.pow(pos[0] - prev[0], 2) +
          Math.pow(pos[1] - prev[1], 2) +
          Math.pow(pos[2] - prev[2], 2)
      );
    } else {
      dist = 0.1; // tiny default if single point
    }

    // Duration = distance / speed
    const duration = dist / Math.max(speed, 1e-6);

    // --- Compute tangent for along/normal ---
    let tangent;
    if (i < basePath.length - 1) {
      tangent = new THREE.Vector3()
        .subVectors(
          new THREE.Vector3(...basePath[i + 1]),
          new THREE.Vector3(...pos)
        )
        .normalize();
    } else if (i > 0) {
      tangent = new THREE.Vector3()
        .subVectors(
          new THREE.Vector3(...pos),
          new THREE.Vector3(...basePath[i - 1])
        )
        .normalize();
    } else {
      tangent = new THREE.Vector3(0, 0, 1);
    }

    // --- Z down variant ---
    paths[0].push({
      pos,
      rotEuler: lookAtZ(pos, [0, -1, 0]),
      duration,
    });

    // --- Z normal to path segment (cross with world up Y) ---
    const normal = new THREE.Vector3()
      .crossVectors(tangent, new THREE.Vector3(0, 1, 0))
      .normalize();
    paths[1].push({
      pos,
      rotEuler: lookAtZ(pos, normal.toArray()),
      duration,
    });

    // --- Z along path segment ---
    paths[2].push({
      pos,
      rotEuler: lookAtZ(pos, tangent.toArray()),
      duration,
    });
  }

  return paths;
}

const [pathZDown, pathZNormal, pathZAlong] = generatePaths(
  paths.basePathPositions
);

paths.cvutPath.pop();
paths.cvutPath.shift();

let robotPath = paths.cvutPath;

// robotPath = pathZDown;

let _animRAF = null;

/**
 * Animate the robot along a sequence of waypoints
 * using your IK slider-based control system.
 *
 * Each waypoint: {
 *   pos: [x,y,z],
 *   rotEuler?: [rx,ry,rz],
 *   duration?: seconds,     // Fixed time to reach waypoint
 *   speed?: units/second,   // Speed to travel (distance/time)
 *   hold?: seconds
 * }
 *
 * If both duration and speed are specified, duration takes precedence.
 * If neither is specified, uses options.defaultDuration or options.defaultSpeed.
 */
function animatePath(path, options = {}) {
  if (!Array.isArray(path) || path.length === 0) return;

  const defaultDuration = options.defaultDuration || null;
  const defaultSpeed = options.defaultSpeed || 1.0; // units per second
  let idx = 0;
  let segStartT = null; // seconds
  let holdUntil = null; // seconds
  let startPose = null; // { pos: [x,y,z], rotEuler: [rx,ry,rz] }
  let segmentDuration = null; // calculated duration for current segment

  // Helper: read current TCP pose from robot state (world TCP via kinematics)
  function getCurrentTCP() {
    const eePos = robotState.getEndEffectorPosition();
    const eeQuat = robotState.getEndEffectorOrientation();
    const tcpPose = kinematics.calcTCPPose(eePos, eeQuat);
    // convert tcp quat -> euler XYZ
    const threeQ = new THREE.Quaternion(
      tcpPose.quat[0],
      tcpPose.quat[1],
      tcpPose.quat[2],
      tcpPose.quat[3]
    );
    const e = new THREE.Euler().setFromQuaternion(threeQ, "XYZ");
    return { pos: tcpPose.pos.slice(), rotEuler: [e.x, e.y, e.z] };
  }

  // Linear interpolation helper
  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  // Calculate distance between two 3D points
  function distance(p1, p2) {
    const dx = p2[0] - p1[0];
    const dy = p2[1] - p1[1];
    const dz = p2[2] - p1[2];
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  function step() {
    const now = performance.now() / 1000; // seconds
    const wp = path[idx];

    if (!segStartT) {
      // initialize segment
      segStartT = now;
      holdUntil = null;
      startPose = getCurrentTCP();
      // ensure waypoint has default fields
      wp.pos = wp.pos || startPose.pos.slice();
      wp.rotEuler = wp.rotEuler || startPose.rotEuler.slice();

      // Calculate segment duration based on duration or speed
      if (wp.duration !== undefined) {
        segmentDuration = wp.duration;
      } else if (wp.speed !== undefined) {
        const dist = distance(startPose.pos, wp.pos);
        segmentDuration = dist / wp.speed;
      } else if (defaultDuration !== null) {
        segmentDuration = defaultDuration;
      } else {
        const dist = distance(startPose.pos, wp.pos);
        segmentDuration = dist / defaultSpeed;
      }

      // Ensure minimum duration to avoid division by zero
      segmentDuration = Math.max(segmentDuration, 1e-6);
    }

    const elapsed = now - segStartT;
    const t = Math.min(Math.max(elapsed / segmentDuration, 0), 1);

    // Interpolate pos
    const curPos = [
      lerp(startPose.pos[0], wp.pos[0], t),
      lerp(startPose.pos[1], wp.pos[1], t),
      lerp(startPose.pos[2], wp.pos[2], t),
    ];

    // Interpolate rotEuler (simple linear interpolation on euler angles)
    const curRot = [
      lerp(startPose.rotEuler[0], wp.rotEuler[0], t),
      lerp(startPose.rotEuler[1], wp.rotEuler[1], t),
      lerp(startPose.rotEuler[2], wp.rotEuler[2], t),
    ];

    // Call your IK slider handler (world TCP) — this will convert TCP->EE->IK and respect joint limits
    onIKControlChange({
      x: curPos[0],
      y: curPos[1],
      z: curPos[2],
      rx: curRot[0],
      ry: curRot[1],
      rz: curRot[2],
    });

    // Sync the GUI displays for IK sliders so they show the current target values
    try {
      sliderIKControllers[0].updateDisplay();
      sliderIKControllers[1].updateDisplay();
      sliderIKControllers[2].updateDisplay();
      sliderIKControllers[3].updateDisplay();
      sliderIKControllers[4].updateDisplay();
      sliderIKControllers[5].updateDisplay();
    } catch (e) {
      /* ignore GUI update errors */
    }

    // Update visuals
    updateTCPMarker();

    if (t >= 1) {
      // Reached waypoint
      if (wp.hold && !holdUntil) {
        holdUntil = now + wp.hold;
      }
      if (holdUntil && now < holdUntil) {
        _animRAF = requestAnimationFrame(step);
        return;
      }
      // next waypoint
      idx++;
      segStartT = null;
      startPose = null;
      segmentDuration = null;
      if (idx >= path.length) {
        // done
        options.onComplete?.();
        _animRAF = null;
        return;
      }
    }

    _animRAF = requestAnimationFrame(step);
  }

  // Start animation (cancel any previous)
  if (_animRAF) cancelAnimationFrame(_animRAF);
  segStartT = null;
  holdUntil = null;
  startPose = null;
  segmentDuration = null;
  _animRAF = requestAnimationFrame(step);
}

function stopAnimation() {
  if (_animRAF) {
    cancelAnimationFrame(_animRAF);
    _animRAF = null; // Reset the animation frame ID
  }
}

let geometry = new THREE.BufferGeometry().setFromPoints(
  robotPath.map((wp) => new THREE.Vector3(wp.pos[0], wp.pos[1], wp.pos[2]))
);

// Material for the line
const material = new THREE.LineBasicMaterial({ color: 0xffffff });

// Create the line
const pathTraceLine = new THREE.Line(geometry, material); // or LineLoop to close the loop

function animate() {
  const dt = clock.getDelta();

  const tx = lastTarget.x;
  const tz = lastTarget.z;

  const pos = markerNormalLine.geometry.attributes.position.array;
  pos[0] = lastTarget.x;
  pos[1] = lastTarget.y;
  pos[2] = lastTarget.z;
  pos[3] = lastTarget.x;
  pos[4] = groundPlane.position.y;
  pos[5] = lastTarget.z;
  markerNormalLine.geometry.attributes.position.needsUpdate = true;

  // raycastAndDrawHits();
  // robotEEraycastAndDrawHits();

  // const newAngles = robotState.endEffector.position;

  // newAngles.forEach((angle, i) => {
  //   sliderControllers[i].setValue(angle);
  // });

  // Update visuals from robot state

  // const safeValue = clampJoint(0, robotState.joints[0] + dt * 0.01);
  // robotState.setJoint(0, safeValue)

  updateTCPMarker();

  orbitControls?.update();
  renderer.render(scene, camera);
  rafId = requestAnimationFrame(animate);
}

// function updateFolderDisplay(folder) {
//   if (!folder) return;
//   // controllers list (lil-gui exposures vary by version)
//   const ctrls = folder.controllers || folder._controllers || [];
//   ctrls.forEach((c) => {
//     try {
//       if (typeof c.updateDisplay === "function") c.updateDisplay();
//     } catch (e) { /* ignore */ }
//   });

//   // subfolders can be in several properties depending on version
//   const subObj = folder.folders || folder._folders || folder.__folders || folder.children || {};
//   const subFolders = Array.isArray(subObj) ? subObj : Object.values(subObj || {});
//   subFolders.forEach((sf) => updateFolderDisplay(sf));
// }

// ============================================================================
// INITIALIZATION
// ============================================================================
function init() {
  const { WIDTH, HEIGHT } = setupRenderer();
  setupScene();
  setupCamera(WIDTH, HEIGHT);
  setupLighting();
  setupGroundPlane();
  setupMouseRaycastPlane();
  setupMarkerLine();
  setupCoordinateAxes();
  buildRobotArm();
  setupKinematics();
  setupRobotState();

  guiIKParams.resetPos();

  //map from the path waypoints to THREE.Vector3 points

  // Add it to the scene
  scene.add(pathTraceLine);
  pathTraceLine.visible = false;
  guiVisualParams.visibleDhAxes = false;
  // updateFolderDisplay(visualFolder);

  animate();
  //animatePath(robotPath, { defaultDuration: 1, onComplete: () => {} });
}

// ============================================================================
// ENTRY POINT
// ============================================================================
domReady(() => {
  try {
    init();
  } catch (e) {
    console.error("[three_empty] init error:", e);
  }
});
