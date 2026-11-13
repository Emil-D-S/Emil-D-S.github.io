// SCARA robot simulation with interactive obstacle placement.

import GUI from "https://cdn.jsdelivr.net/npm/lil-gui@0.21/+esm";
import * as THREE from "https://unpkg.com/three@0.161.0/build/three.module.js";
import {
  domReady,
  getFixedSize,
  postCanvasSizeOnceFactory,
} from "../../templates/common/embed-utils.js";

import { OrbitControls } from "https://unpkg.com/three@0.161.0/examples/jsm/controls/OrbitControls.js";

let renderer, scene, camera, rafId;

let orbitControls;

const HIT_LAYER = 2;

const mouseRaycaster = new THREE.Raycaster();
const mousePointer = new THREE.Vector2();

const robotRaycaster = new THREE.Raycaster();
const placementRaycaster = new THREE.Raycaster();

function onPointerMove(e) {
  if (!renderer) return;
  const rect = renderer.domElement.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width;
  const y = (e.clientY - rect.top) / rect.height;
  mousePointer.x = x * 2 - 1;
  mousePointer.y = -y * 2 + 1;
}

let hitGroup;
let obstacleGroup;
let groundPlane;
let baseColumn;
let pointerDownPosition;
let pointerDownId;
let nextObstacleId = 1;
const obstacles = [];
const collisionStatus = { state: "No obstacles" };

const obstacleDefaults = {
  shape: "Cylinder",
  radius: 0.3,
  width: 0.6,
  depth: 0.6,
  height: 1.6,
};

const OBSTACLE_COLOR = 0x45a9a0;
const COLLISION_COLOR = 0xff3030;
let JOINT_MAP_SIZE = 64;
const JOINT_MAP_ANGLE_MIN = -Math.PI;
const JOINT_MAP_ANGLE_MAX = Math.PI;
const jointSpaceMapState = {
  clickAction: "Set goal",
  status: "Click the map to set a goal",
  pathDuration: 4,
  interpolation: "Smoothstep",
  mapResolution: 64,
  safetyMargin: 0.2,
  transitionSamples: 8,
};

let jointMapCanvas;
let jointMapContext;
let jointMapCells = [];
let jointMapPath = [];
let jointMapStart = { j1: 0, j2: 0 };
let jointMapGoal = null;
let jointMapResizeObserver;
let jointMapPositionHandler;
let jointMapPointerActive = false;
let jointCommand = null;
let pathPlayback = null;

function holdCurrentJointPose() {
  pathPlayback = null;
  jointMapPointerActive = false;
  jointCommand = { j1: J1.angle, j2: J2.angle };
  J1.vel = 0;
  J2.vel = 0;
}

function updateObstacleGeometry(obstacle) {
  const { shape, radius, width, depth, height } = obstacle.settings;
  const geometry =
    shape === "Cylinder"
      ? new THREE.CylinderGeometry(radius, radius, height, 24)
      : new THREE.BoxGeometry(width, height, depth);

  obstacle.mesh.geometry.dispose();
  obstacle.mesh.geometry = geometry;
  obstacle.mesh.position.y = height / 2;
  rebuildJointSpaceMap();
  drawJointSpaceMap();
}

function removeObstacle(obstacle) {
  const index = obstacles.indexOf(obstacle);
  if (index < 0) return;

  obstacles.splice(index, 1);
  obstacle.folder.destroy();
  obstacleGroup.remove(obstacle.mesh);
  obstacle.mesh.geometry.dispose();
  obstacle.mesh.material.dispose();
  rebuildJointSpaceMap();
  drawJointSpaceMap();
}

function addObstacle(position) {
  const settings = { ...obstacleDefaults };
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(
      settings.radius,
      settings.radius,
      settings.height,
      24,
    ),
    new THREE.MeshStandardMaterial({ color: OBSTACLE_COLOR }),
  );
  mesh.position.set(position.x, settings.height / 2, position.z);

  const obstacle = {
    id: nextObstacleId++,
    mesh,
    settings,
    folder: null,
    colliding: false,
  };
  mesh.userData.obstacle = obstacle;
  obstacleGroup.add(mesh);
  obstacles.push(obstacle);

  const folder = obstacleFolder.addFolder(`Obstacle ${obstacle.id}`);
  obstacle.folder = folder;
  folder.add(settings, "shape", ["Cylinder", "Box"]).onChange(() => {
    updateObstacleGeometry(obstacle);
  });
  folder.add(settings, "radius", 0.05, 1, 0.05).onChange(() => {
    if (settings.shape === "Cylinder") updateObstacleGeometry(obstacle);
  });
  folder.add(settings, "width", 0.1, 2, 0.05).onChange(() => {
    if (settings.shape === "Box") updateObstacleGeometry(obstacle);
  });
  folder.add(settings, "depth", 0.1, 2, 0.05).onChange(() => {
    if (settings.shape === "Box") updateObstacleGeometry(obstacle);
  });
  folder.add(settings, "height", 0.1, 2, 0.05).onChange(() => {
    updateObstacleGeometry(obstacle);
  });
  folder
    .add({ remove: () => removeObstacle(obstacle) }, "remove")
    .name("Remove");
  rebuildJointSpaceMap();
  drawJointSpaceMap();
}

function angleToJointMapIndex(angle) {
  const normalized =
    (THREE.MathUtils.euclideanModulo(
      angle - JOINT_MAP_ANGLE_MIN,
      JOINT_MAP_ANGLE_MAX - JOINT_MAP_ANGLE_MIN,
    ) /
      (JOINT_MAP_ANGLE_MAX - JOINT_MAP_ANGLE_MIN)) *
    JOINT_MAP_SIZE;
  return Math.min(JOINT_MAP_SIZE - 1, Math.floor(normalized));
}

function jointMapIndexToAngle(index) {
  return (
    JOINT_MAP_ANGLE_MIN +
    ((index + 0.5) / JOINT_MAP_SIZE) *
      (JOINT_MAP_ANGLE_MAX - JOINT_MAP_ANGLE_MIN)
  );
}

function jointConfigurationCollides(j1, j2) {
  const base = new THREE.Vector3(0, columnHeight, 0);
  const elbow = new THREE.Vector3(
    arm1Length * Math.sin(j1),
    columnHeight + arm1Height,
    arm1Length * Math.cos(j1),
  );
  const tool = new THREE.Vector3(
    elbow.x + arm2Length * Math.sin(j1 + j2),
    elbow.y,
    elbow.z + arm2Length * Math.cos(j1 + j2),
  );

  return obstacles.some(
    (obstacle) =>
      obstacleIntersectsSegment(obstacle, base, base, 0.25, 0, columnHeight) ||
      obstacleIntersectsSegment(
        obstacle,
        base,
        elbow,
        arm1Width / 2,
        columnHeight + arm1Height / 2,
        columnHeight + arm1Height / 2,
      ) ||
      obstacleIntersectsSegment(
        obstacle,
        elbow,
        tool,
        arm2Width / 2,
        columnHeight + arm1Height + arm2Height / 2,
        columnHeight + arm1Height + arm2Height / 2,
      ) ||
      obstacleIntersectsSegment(
        obstacle,
        tool,
        tool,
        0.05,
        tool.y - arm3Length / 2,
        tool.y + arm3Length / 2,
      ),
  );
}

function jointTransitionCollides(from, to) {
  return jointAnglesTransitionCollides(
    {
      j1: jointMapIndexToAngle(from.j1),
      j2: jointMapIndexToAngle(from.j2),
    },
    {
      j1: jointMapIndexToAngle(to.j1),
      j2: jointMapIndexToAngle(to.j2),
    },
  );
}

function jointAnglesTransitionCollides(from, to) {
  const deltaJ1 = shortestAngleErr(to.j1, from.j1);
  const deltaJ2 = shortestAngleErr(to.j2, from.j2);

  for (let step = 0; step <= jointSpaceMapState.transitionSamples; step++) {
    const fraction = step / jointSpaceMapState.transitionSamples;
    if (
      jointConfigurationCollides(
        from.j1 + deltaJ1 * fraction,
        from.j2 + deltaJ2 * fraction,
      )
    ) {
      return true;
    }
  }
  return false;
}

function rebuildJointSpaceMap() {
  if (!arm1) return;
  jointMapCells = Array.from({ length: JOINT_MAP_SIZE }, (_, row) =>
    Array.from({ length: JOINT_MAP_SIZE }, (_, column) => {
      const j1 = jointMapIndexToAngle(column);
      const j2 = jointMapIndexToAngle(JOINT_MAP_SIZE - row - 1);
      return !jointConfigurationCollides(j1, j2);
    }),
  );

  if (pathPlayback) {
    holdCurrentJointPose();
    jointSpaceMapState.status = "Path stopped because obstacles changed";
  }
  if (
    jointCommand &&
    !isJointMapCellFree({
      j1: angleToJointMapIndex(jointCommand.j1),
      j2: angleToJointMapIndex(jointCommand.j2),
    })
  ) {
    jointCommand = null;
    jointSpaceMapState.status = "Cursor target blocked by an obstacle";
  }

  if (jointMapStart && !isJointMapCellFree(jointMapStart)) {
    jointMapStart = null;
    jointMapPath = [];
    jointSpaceMapState.status = "Start is blocked; choose a new start";
  }
  if (jointMapGoal && !isJointMapCellFree(jointMapGoal)) {
    jointMapGoal = null;
    jointMapPath = [];
    jointSpaceMapState.status = "Goal is in collision; choose another";
  } else if (jointMapStart && jointMapGoal) {
    findJointSpacePath();
  }
}

function isJointMapCellFree(point) {
  return (
    point !== null &&
    point.j1 >= 0 &&
    point.j1 < JOINT_MAP_SIZE &&
    point.j2 >= 0 &&
    point.j2 < JOINT_MAP_SIZE &&
    jointMapCells[JOINT_MAP_SIZE - point.j2 - 1]?.[point.j1] === true
  );
}

function findJointSpacePath(start = jointMapStart, goal = jointMapGoal) {
  if (!start || !goal) {
    jointMapPath = [];
    return [];
  }
  if (!isJointMapCellFree(start) || !isJointMapCellFree(goal)) {
    jointMapPath = [];
    jointSpaceMapState.status = "Start or goal is in collision";
    return [];
  }

  const key = (point) => point.j2 * JOINT_MAP_SIZE + point.j1;
  const startKey = key(start);
  const goalKey = key(goal);
  const distance = new Float32Array(JOINT_MAP_SIZE * JOINT_MAP_SIZE);
  distance.fill(Infinity);
  distance[startKey] = 0;
  const cameFrom = new Int32Array(distance.length);
  cameFrom.fill(-1);
  const closed = new Uint8Array(distance.length);
  const open = [];

  function heuristic(point) {
    const rawDx = Math.abs(point.j1 - goal.j1);
    const rawDy = Math.abs(point.j2 - goal.j2);
    const dx = Math.min(rawDx, JOINT_MAP_SIZE - rawDx);
    const dy = Math.min(rawDy, JOINT_MAP_SIZE - rawDy);
    return Math.max(dx, dy) + (Math.SQRT2 - 1) * Math.min(dx, dy);
  }

  function pushOpen(point, score) {
    let index = open.length;
    open.push({ point, score });
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (open[parent].score <= score) break;
      open[index] = open[parent];
      index = parent;
    }
    open[index] = { point, score };
  }

  function popOpen() {
    const first = open[0];
    const last = open.pop();
    if (open.length && last) {
      let index = 0;
      while (true) {
        const left = index * 2 + 1;
        const right = left + 1;
        if (left >= open.length) break;
        const child =
          right < open.length && open[right].score < open[left].score
            ? right
            : left;
        if (open[child].score >= last.score) break;
        open[index] = open[child];
        index = child;
      }
      open[index] = last;
    }
    return first;
  }

  const wrapIndex = (index) =>
    THREE.MathUtils.euclideanModulo(index, JOINT_MAP_SIZE);
  const directions = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
  ];

  pushOpen(start, heuristic(start));
  while (open.length) {
    const current = popOpen().point;
    const currentKey = key(current);
    if (closed[currentKey]) continue;
    closed[currentKey] = 1;
    if (currentKey === goalKey) {
      const path = [current];
      let traceKey = currentKey;
      while (traceKey !== startKey) {
        traceKey = cameFrom[traceKey];
        path.push({
          j1: traceKey % JOINT_MAP_SIZE,
          j2: Math.floor(traceKey / JOINT_MAP_SIZE),
        });
      }
      path.reverse();
      jointMapPath = path;
      jointSpaceMapState.status = `Path found (${path.length} states)`;
      return path;
    }

    for (const [dx, dy] of directions) {
      const next = {
        j1: wrapIndex(current.j1 + dx),
        j2: wrapIndex(current.j2 + dy),
      };
      if (!isJointMapCellFree(next)) continue;
      if (
        dx !== 0 &&
        dy !== 0 &&
        (!isJointMapCellFree({
          j1: wrapIndex(current.j1 + dx),
          j2: current.j2,
        }) ||
          !isJointMapCellFree({
            j1: current.j1,
            j2: wrapIndex(current.j2 + dy),
          }))
      ) {
        continue;
      }
      if (jointTransitionCollides(current, next)) continue;

      const nextKey = key(next);
      if (closed[nextKey]) continue;
      const candidateDistance =
        distance[currentKey] + (dx !== 0 && dy !== 0 ? Math.SQRT2 : 1);
      if (candidateDistance >= distance[nextKey]) continue;

      distance[nextKey] = candidateDistance;
      cameFrom[nextKey] = currentKey;
      pushOpen(next, candidateDistance + heuristic(next));
    }
  }

  jointMapPath = [];
  jointSpaceMapState.status = "No collision-free path";
  return [];
}

function currentJointMapPoint() {
  return {
    j1: angleToJointMapIndex(J1.angle),
    j2: angleToJointMapIndex(J2.angle),
  };
}

function mapEventToJointAngles(event, clampToMap = false) {
  const rect = jointMapCanvas.getBoundingClientRect();
  const plotSize = Math.min(rect.width - 64, rect.height - 105);
  const left = 44;
  const top = 43;
  let x = event.clientX - rect.left - left;
  let y = event.clientY - rect.top - top;
  if (clampToMap) {
    x = THREE.MathUtils.clamp(x, 0, plotSize - Number.EPSILON);
    y = THREE.MathUtils.clamp(y, 0, plotSize - Number.EPSILON);
  } else if (x < 0 || y < 0 || x >= plotSize || y >= plotSize) {
    return null;
  }

  const j1Index = Math.floor((x / plotSize) * JOINT_MAP_SIZE);
  const j2Index =
    JOINT_MAP_SIZE - 1 - Math.floor((y / plotSize) * JOINT_MAP_SIZE);
  const point = { j1: j1Index, j2: j2Index };
  if (!isJointMapCellFree(point)) return null;

  return {
    point,
    j1:
      JOINT_MAP_ANGLE_MIN +
      (x / plotSize) * (JOINT_MAP_ANGLE_MAX - JOINT_MAP_ANGLE_MIN),
    j2:
      JOINT_MAP_ANGLE_MIN +
      ((plotSize - y) / plotSize) * (JOINT_MAP_ANGLE_MAX - JOINT_MAP_ANGLE_MIN),
  };
}

function handleJointMapPointer(event) {
  const target = mapEventToJointAngles(event, true);
  if (!target) {
    jointSpaceMapState.status = "That joint position is in collision";
    drawJointSpaceMap();
    return;
  }
  jointCommand = { j1: target.j1, j2: target.j2 };
  jointSpaceMapState.status = "Cursor control active";
  drawJointSpaceMap();
}

function startPathPlayback() {
  if (!jointMapStart || !jointMapGoal) {
    jointSpaceMapState.status = "Set both a start and goal before playback";
    drawJointSpaceMap();
    return;
  }

  const selectedStart = jointMapStart;
  const selectedGoal = jointMapGoal;
  const currentStart = currentJointMapPoint();
  const firstPathTarget = {
    j1: jointMapIndexToAngle(currentStart.j1),
    j2: jointMapIndexToAngle(currentStart.j2),
  };
  if (
    jointAnglesTransitionCollides(
      { j1: J1.angle, j2: J2.angle },
      firstPathTarget,
    )
  ) {
    jointSpaceMapState.status =
      "Current pose cannot safely enter its map cell; increase resolution or reduce clearance";
    drawJointSpaceMap();
    return;
  }
  const approachPath = findJointSpacePath(currentStart, selectedStart);
  if (approachPath.length === 0) {
    jointSpaceMapState.status = "No safe route to the selected start";
    drawJointSpaceMap();
    return;
  }

  const routePath = findJointSpacePath(selectedStart, selectedGoal);
  if (routePath.length === 0) {
    jointSpaceMapState.status = "No safe path from the selected start";
    drawJointSpaceMap();
    return;
  }

  const path = [...approachPath, ...routePath.slice(1)];
  const waypoints = path.map((point) => ({
    j1: jointMapIndexToAngle(point.j1),
    j2: jointMapIndexToAngle(point.j2),
  }));
  waypoints[0] = { j1: J1.angle, j2: J2.angle };
  let totalLength = 0;
  const segmentLengths = [];
  for (let index = 1; index < waypoints.length; index++) {
    const previous = waypoints[index - 1];
    const current = waypoints[index];
    const length = Math.hypot(
      shortestAngleErr(current.j1, previous.j1),
      shortestAngleErr(current.j2, previous.j2),
    );
    segmentLengths.push(length);
    totalLength += length;
  }

  const smoothstep = jointSpaceMapState.interpolation === "Smoothstep";
  const speedScale = smoothstep ? 1.5 : 1;
  const segmentDurations = segmentLengths.map((length, index) => {
    let duration =
      totalLength > 0
        ? (jointSpaceMapState.pathDuration * length) / totalLength
        : jointSpaceMapState.pathDuration;
    for (const [axis, settings] of Object.entries(jointTuning)) {
      const jointKey = axis === "J1" ? "j1" : "j2";
      const delta = Math.abs(
        shortestAngleErr(
          waypoints[index + 1][jointKey],
          waypoints[index][jointKey],
        ),
      );
      duration = Math.max(
        duration,
        (delta * speedScale) / settings.maxVelocity,
      );
      if (smoothstep) {
        duration = Math.max(
          duration,
          Math.sqrt((6 * delta) / settings.maxAcceleration),
        );
      }
    }
    return duration;
  });
  const cumulativeTime = [0];
  for (const duration of segmentDurations) {
    cumulativeTime.push(cumulativeTime.at(-1) + duration);
  }
  const playbackDuration =
    cumulativeTime.at(-1) || jointSpaceMapState.pathDuration;

  pathPlayback = {
    waypoints,
    cumulativeTime,
    segmentDurations,
    elapsed: 0,
    duration: playbackDuration,
  };
  jointCommand = null;
  jointSpaceMapState.status =
    playbackDuration > jointSpaceMapState.pathDuration
      ? `Following path (${playbackDuration.toFixed(1)}s for joint limits)`
      : "Following planned path";
  drawJointSpaceMap();
}

function getPathPlaybackTarget(dt) {
  if (!pathPlayback) return null;
  pathPlayback.elapsed = Math.min(
    pathPlayback.elapsed + dt,
    pathPlayback.duration,
  );
  const progress = pathPlayback.elapsed / pathPlayback.duration;

  if (pathPlayback.segmentDurations.length === 0 || progress >= 1) {
    const finalTarget = pathPlayback.waypoints.at(-1);
    pathPlayback = null;
    jointCommand = finalTarget;
    jointSpaceMapState.status = "Path complete";
    return finalTarget;
  }

  let segment = 1;
  while (
    segment < pathPlayback.cumulativeTime.length - 1 &&
    pathPlayback.cumulativeTime[segment] < pathPlayback.elapsed
  ) {
    segment++;
  }

  const start = pathPlayback.waypoints[segment - 1];
  const end = pathPlayback.waypoints[segment];
  const segmentDuration = pathPlayback.segmentDurations[segment - 1];
  const rawSegmentProgress =
    (pathPlayback.elapsed - pathPlayback.cumulativeTime[segment - 1]) /
    segmentDuration;
  const segmentProgress =
    jointSpaceMapState.interpolation === "Smoothstep"
      ? rawSegmentProgress * rawSegmentProgress * (3 - 2 * rawSegmentProgress)
      : rawSegmentProgress;

  return {
    j1: start.j1 + shortestAngleErr(end.j1, start.j1) * segmentProgress,
    j2: start.j2 + shortestAngleErr(end.j2, start.j2) * segmentProgress,
  };
}

function createJointSpaceMap() {
  jointMapCanvas = document.createElement("canvas");
  jointMapCanvas.setAttribute("aria-label", "Joint-space reachability map");
  jointMapCanvas.style.cssText =
    "position:fixed;left:0;top:0;width:320px;height:390px;z-index:10;background:#15171c;border:1px solid #50545c;border-radius:6px;touch-action:none;cursor:crosshair;";
  jointMapContext = jointMapCanvas.getContext("2d");
  document.body.appendChild(jointMapCanvas);

  const positionMap = () => {
    const canvasRect = renderer.domElement.getBoundingClientRect();
    jointMapCanvas.style.left = `${canvasRect.right + 12}px`;
    jointMapCanvas.style.top = `${canvasRect.top}px`;
  };
  jointMapPositionHandler = positionMap;
  const resize = () => {
    positionMap();
    const rect = jointMapCanvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    jointMapCanvas.width = Math.round(rect.width * dpr);
    jointMapCanvas.height = Math.round(rect.height * dpr);
    jointMapContext.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawJointSpaceMap();
  };
  jointMapResizeObserver = new ResizeObserver(resize);
  jointMapResizeObserver.observe(jointMapCanvas);
  jointMapResizeObserver.observe(renderer.domElement);
  window.addEventListener("resize", jointMapPositionHandler);

  jointMapCanvas.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    const target = mapEventToJointAngles(event);
    if (!target) {
      jointSpaceMapState.status = "That joint position is in collision";
      drawJointSpaceMap();
      return;
    }

    if (jointSpaceMapState.clickAction === "Control arm") {
      jointMapPointerActive = true;
      jointMapCanvas.setPointerCapture(event.pointerId);
      pathPlayback = null;
      handleJointMapPointer(event);
    } else if (jointSpaceMapState.clickAction === "Set start") {
      pathPlayback = null;
      jointCommand = null;
      const { point } = target;
      jointMapStart = point;
      jointSpaceMapState.status = "Start set; choose a goal";
    } else if (jointMapStart) {
      pathPlayback = null;
      jointCommand = null;
      jointMapGoal = target.point;
      jointSpaceMapState.status = "Goal set";
    } else {
      jointSpaceMapState.status = "Set a start before choosing a goal";
    }
    if (jointSpaceMapState.clickAction !== "Control arm") findJointSpacePath();
    drawJointSpaceMap();
  });
  jointMapCanvas.addEventListener("pointermove", (event) => {
    if (
      jointMapPointerActive &&
      jointSpaceMapState.clickAction === "Control arm"
    ) {
      handleJointMapPointer(event);
    }
  });
  jointMapCanvas.addEventListener("pointerup", () => {
    jointMapPointerActive = false;
  });
  jointMapCanvas.addEventListener("pointercancel", () => {
    jointMapPointerActive = false;
  });
  resize();
}

function drawJointSpaceMap() {
  if (!jointMapContext || !jointMapCanvas) return;
  const rect = jointMapCanvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  const context = jointMapContext;
  const plotSize = Math.min(rect.width - 64, rect.height - 105);
  const left = 44;
  const top = 43;
  const cellSize = plotSize / JOINT_MAP_SIZE;

  context.clearRect(0, 0, rect.width, rect.height);
  context.fillStyle = "#15171c";
  context.fillRect(0, 0, rect.width, rect.height);
  context.font = "12px sans-serif";
  context.fillStyle = "#f1f1f1";
  context.fillText("Joint-space map (radians)", 12, 19);
  context.fillStyle = "#b9c3cf";
  context.fillText(
    `EE X ${arm3 ? arm3.getWorldPosition(new THREE.Vector3()).x.toFixed(2) : "—"}   Z ${arm3 ? arm3.getWorldPosition(new THREE.Vector3()).z.toFixed(2) : "—"}`,
    12,
    36,
  );

  for (let row = 0; row < JOINT_MAP_SIZE; row++) {
    for (let column = 0; column < JOINT_MAP_SIZE; column++) {
      context.fillStyle = jointMapCells[row]?.[column] ? "#35745b" : "#7c3539";
      context.fillRect(
        left + column * cellSize,
        top + row * cellSize,
        Math.ceil(cellSize),
        Math.ceil(cellSize),
      );
    }
  }

  context.strokeStyle = "#9ca4ad";
  context.lineWidth = 1;
  context.strokeRect(left, top, plotSize, plotSize);
  context.fillStyle = "#e7e7e7";
  context.textAlign = "center";
  context.fillText("J1", left + plotSize / 2, top + plotSize + 17);
  context.fillText("-π", left, top + plotSize + 17);
  context.fillText("π", left + plotSize, top + plotSize + 17);
  context.textAlign = "left";
  context.fillText("π", left + 6, top + 11);
  context.fillText("-π", left + 6, top + plotSize - 3);
  context.save();
  context.translate(12, top + plotSize / 2);
  context.rotate(-Math.PI / 2);
  context.fillText("J2", 0, 0);
  context.restore();

  const drawPoint = (point, color, radius) => {
    if (!point) return;
    const x = left + (point.j1 + 0.5) * cellSize;
    const y = top + (JOINT_MAP_SIZE - point.j2 - 0.5) * cellSize;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fillStyle = color;
    context.fill();
    context.strokeStyle = "#101014";
    context.lineWidth = 1;
    context.stroke();
  };

  if (jointMapPath.length > 1) {
    context.beginPath();
    jointMapPath.forEach((point, index) => {
      const x = left + (point.j1 + 0.5) * cellSize;
      const y = top + (JOINT_MAP_SIZE - point.j2 - 0.5) * cellSize;
      if (index === 0) context.moveTo(x, y);
      else if (
        Math.abs(point.j1 - jointMapPath[index - 1].j1) <= 1 &&
        Math.abs(point.j2 - jointMapPath[index - 1].j2) <= 1
      ) {
        context.lineTo(x, y);
      } else {
        context.moveTo(x, y);
      }
    });
    context.strokeStyle = "#58c7ff";
    context.lineWidth = 2;
    context.stroke();
  }

  if (arm1 && arm2) {
    drawPoint(
      {
        j1: angleToJointMapIndex(J1.angle),
        j2: angleToJointMapIndex(J2.angle),
      },
      "#ffffff",
      4,
    );
  }
  if (jointCommand) {
    drawPoint(
      {
        j1: angleToJointMapIndex(jointCommand.j1),
        j2: angleToJointMapIndex(jointCommand.j2),
      },
      "#ff8be8",
      4,
    );
  }
  drawPoint(jointMapStart, "#58c7ff", 5);
  drawPoint(jointMapGoal, "#ffd34e", 5);

  context.textAlign = "left";
  context.fillStyle = "#d9dce1";
  context.fillText(
    "Green: collision-free   Red: collision",
    12,
    top + plotSize + 37,
  );
  context.fillStyle = "#c4c9d0";
  context.fillText(jointSpaceMapState.status, 12, top + plotSize + 55);
  context.fillStyle = "#ffffff";
  context.fillText(
    "White pose | Pink target | Blue start | Yellow goal",
    12,
    top + plotSize + 73,
  );
}

function onCanvasPointerDown(event) {
  if (event.button !== 0) return;
  pointerDownId = event.pointerId;
  pointerDownPosition = { x: event.clientX, y: event.clientY };
}

function onCanvasPointerUp(event) {
  if (
    event.pointerId !== pointerDownId ||
    !pointerDownPosition ||
    event.button !== 0
  ) {
    return;
  }

  const moved = Math.hypot(
    event.clientX - pointerDownPosition.x,
    event.clientY - pointerDownPosition.y,
  );
  pointerDownPosition = null;
  pointerDownId = null;
  if (moved > 5 || event.target !== renderer.domElement) return;

  const rect = renderer.domElement.getBoundingClientRect();
  mousePointer.set(
    ((event.clientX - rect.left) / rect.width) * 2 - 1,
    -((event.clientY - rect.top) / rect.height) * 2 + 1,
  );
  placementRaycaster.setFromCamera(mousePointer, camera);

  const hits = placementRaycaster.intersectObjects(
    [baseColumn, arm1, arm2, arm3, obstacleGroup, groundPlane],
    true,
  );
  const hit = hits[0];
  if (hit?.object.userData.obstacle) {
    removeObstacle(hit.object.userData.obstacle);
  } else if (hit?.object === groundPlane) {
    addObstacle(hit.point);
  }
}

function onCanvasPointerCancel() {
  pointerDownPosition = null;
  pointerDownId = null;
}

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
      new THREE.MeshBasicMaterial({ color: 0xff0000 }),
    );
    marker.position.copy(p);
    hitGroup.add(marker);
  } else {
    // keep lastTarget as-is, but still show a marker so user sees where the arm is aiming
    const marker = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0x6666ff }),
    );
    marker.position.copy(lastTarget);
    hitGroup.add(marker);
  }
}

function robotEEraycastAndDrawHits() {
  const targets = scene.children.filter((o) => o !== hitGroup);
  robotRaycaster.set(
    arm3.localToWorld(new THREE.Vector3(0, 0, 0)),
    new THREE.Vector3(0, -1, 0),
  );
  const hits = robotRaycaster.intersectObjects(targets, true);

  if (hits.length > 0) {
    const p = hits[0].point;
    const marker = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
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

let gui;
let obstacleFolder;

const jointTuning = {
  J1: { maxAcceleration: 10, maxVelocity: 4, kp: 40, kd: 2 * Math.sqrt(40) },
  J2: { maxAcceleration: 12, maxVelocity: 5, kp: 50, kd: 2 * Math.sqrt(50) },
};

function setupGui(axes, groundPlane) {
  gui = new GUI({ title: "SCARA Controls" });

  const jointFolder = gui.addFolder("Joint tuning");
  for (const [name, settings] of Object.entries(jointTuning)) {
    const folder = jointFolder.addFolder(name);
    folder.add(settings, "maxAcceleration", 0.1, 30, 0.1);
    folder.add(settings, "maxVelocity", 0.1, 10, 0.1);
    folder.add(settings, "kp", 1, 100, 1);
    folder.add(settings, "kd", 0, 30, 0.1);
  }

  const display = { axes: true, ground: true, hitMarkers: true };
  const displayFolder = gui.addFolder("Display");
  displayFolder.add(display, "axes").onChange((visible) => {
    axes.visible = visible;
  });
  displayFolder.add(display, "ground").onChange((visible) => {
    groundPlane.visible = visible;
  });
  displayFolder.add(display, "hitMarkers").onChange((visible) => {
    hitGroup.visible = visible;
  });

  const obstacleSetup = gui.addFolder("New obstacle");
  obstacleSetup.add(obstacleDefaults, "shape", ["Cylinder", "Box"]);
  obstacleSetup.add(obstacleDefaults, "radius", 0.05, 1, 0.05);
  obstacleSetup.add(obstacleDefaults, "width", 0.1, 2, 0.05);
  obstacleSetup.add(obstacleDefaults, "depth", 0.1, 2, 0.05);
  obstacleSetup.add(obstacleDefaults, "height", 0.1, 2, 0.05);
  obstacleFolder = gui.addFolder("Obstacles");
  obstacleFolder.close();
  const collisionController = gui.add(collisionStatus, "state");
  collisionController.name("Collision check");
  collisionController.disable();
  collisionController.listen();

  const mapFolder = gui.addFolder("Joint-space path");
  mapFolder
    .add(jointSpaceMapState, "clickAction", [
      "Set start",
      "Set goal",
      "Control arm",
    ])
    .name("Map click sets")
    .onChange((mode) => {
      jointMapPointerActive = false;
      pathPlayback = null;
      jointCommand =
        mode === "Control arm" ? { j1: J1.angle, j2: J2.angle } : null;
      if (mode === "Control arm") {
        jointSpaceMapState.status = "Drag in the map to control the arm";
      }
      drawJointSpaceMap();
    });
  mapFolder
    .add(jointSpaceMapState, "pathDuration", 0.5, 20, 0.5)
    .name("Path duration (s)");
  mapFolder.add(jointSpaceMapState, "interpolation", ["Linear", "Smoothstep"]);
  mapFolder
    .add(jointSpaceMapState, "mapResolution", [32, 64, 96, 128])
    .name("Map resolution")
    .onChange((resolution) => {
      const startAngles = jointMapStart
        ? {
            j1: jointMapIndexToAngle(jointMapStart.j1),
            j2: jointMapIndexToAngle(jointMapStart.j2),
          }
        : null;
      const goalAngles = jointMapGoal
        ? {
            j1: jointMapIndexToAngle(jointMapGoal.j1),
            j2: jointMapIndexToAngle(jointMapGoal.j2),
          }
        : null;

      if (pathPlayback) holdCurrentJointPose();
      jointMapPointerActive = false;
      JOINT_MAP_SIZE = Number(resolution);
      jointMapStart = startAngles
        ? {
            j1: angleToJointMapIndex(startAngles.j1),
            j2: angleToJointMapIndex(startAngles.j2),
          }
        : null;
      jointMapGoal = goalAngles
        ? {
            j1: angleToJointMapIndex(goalAngles.j1),
            j2: angleToJointMapIndex(goalAngles.j2),
          }
        : null;
      rebuildJointSpaceMap();
      findJointSpacePath();
      drawJointSpaceMap();
    });
  mapFolder
    .add(jointSpaceMapState, "safetyMargin", 0, 0.75, 0.01)
    .name("Obstacle clearance")
    .onChange(() => {
      rebuildJointSpaceMap();
      drawJointSpaceMap();
    });
  mapFolder
    .add(jointSpaceMapState, "transitionSamples", 2, 24, 1)
    .name("Edge check samples")
    .onChange(() => {
      if (pathPlayback) holdCurrentJointPose();
      findJointSpacePath();
      drawJointSpaceMap();
    });
  mapFolder
    .add(
      {
        useCurrentAsStart: () => {
          pathPlayback = null;
          jointCommand = null;
          jointMapStart = {
            j1: angleToJointMapIndex(J1.angle),
            j2: angleToJointMapIndex(J2.angle),
          };
          findJointSpacePath();
          drawJointSpaceMap();
        },
      },
      "useCurrentAsStart",
    )
    .name("Set start to current");
  mapFolder
    .add(
      {
        clearGoal: () => {
          pathPlayback = null;
          jointCommand = null;
          jointMapGoal = null;
          jointMapPath = [];
          jointSpaceMapState.status = "Click the map to set a goal";
          drawJointSpaceMap();
        },
      },
      "clearGoal",
    )
    .name("Clear goal");
  mapFolder
    .add(
      {
        findPath: () => {
          findJointSpacePath();
          drawJointSpaceMap();
        },
      },
      "findPath",
    )
    .name("Find path");
  mapFolder.add({ playPath: startPathPlayback }, "playPath").name("Play path");
  mapFolder
    .add(
      {
        stopPath: () => {
          holdCurrentJointPose();
          jointSpaceMapState.status = "Path stopped";
          drawJointSpaceMap();
        },
      },
      "stopPath",
    )
    .name("Stop path");

  gui.add({ resetCamera: () => orbitControls.reset() }, "resetCamera");
}

function segmentIntersectsRectangle(
  start,
  end,
  centerX,
  centerZ,
  halfWidth,
  halfDepth,
) {
  let tMin = 0;
  let tMax = 1;
  const bounds = [
    ["x", centerX - halfWidth, centerX + halfWidth],
    ["z", centerZ - halfDepth, centerZ + halfDepth],
  ];

  for (const [axis, min, max] of bounds) {
    const delta = end[axis] - start[axis];
    if (Math.abs(delta) < 1e-8) {
      if (start[axis] < min || start[axis] > max) return false;
      continue;
    }

    let enter = (min - start[axis]) / delta;
    let exit = (max - start[axis]) / delta;
    if (enter > exit) [enter, exit] = [exit, enter];
    tMin = Math.max(tMin, enter);
    tMax = Math.min(tMax, exit);
    if (tMin > tMax) return false;
  }

  return true;
}

function segmentIntersectsCircle(start, end, centerX, centerZ, radius) {
  const dx = end.x - start.x;
  const dz = end.z - start.z;
  const lengthSquared = dx * dx + dz * dz;
  const t =
    lengthSquared === 0
      ? 0
      : THREE.MathUtils.clamp(
          ((centerX - start.x) * dx + (centerZ - start.z) * dz) / lengthSquared,
          0,
          1,
        );
  const closestX = start.x + t * dx;
  const closestZ = start.z + t * dz;
  return Math.hypot(closestX - centerX, closestZ - centerZ) <= radius;
}

function obstacleIntersectsSegment(
  obstacle,
  start,
  end,
  linkRadius,
  minY,
  maxY,
) {
  const { mesh, settings } = obstacle;
  const clearance = jointSpaceMapState.safetyMargin;
  if (minY > settings.height + clearance || maxY < -clearance) return false;

  if (settings.shape === "Cylinder") {
    return segmentIntersectsCircle(
      start,
      end,
      mesh.position.x,
      mesh.position.z,
      settings.radius + linkRadius + clearance,
    );
  }

  return segmentIntersectsRectangle(
    start,
    end,
    mesh.position.x,
    mesh.position.z,
    settings.width / 2 + linkRadius + clearance,
    settings.depth / 2 + linkRadius + clearance,
  );
}

function getLinkEndpoints(link, length) {
  return [
    link.localToWorld(new THREE.Vector3(0, 0, -length / 2)),
    link.localToWorld(new THREE.Vector3(0, 0, length / 2)),
  ];
}

function updateObstacleCollisions() {
  const basePosition = baseColumn.getWorldPosition(new THREE.Vector3());
  const arm1Endpoints = getLinkEndpoints(arm1, arm1Length);
  const arm2Endpoints = getLinkEndpoints(arm2, arm2Length);
  const toolPosition = arm3.getWorldPosition(new THREE.Vector3());

  let collisionCount = 0;
  for (const obstacle of obstacles) {
    const colliding =
      obstacleIntersectsSegment(
        obstacle,
        basePosition,
        basePosition,
        0.25,
        basePosition.y - columnHeight / 2,
        basePosition.y + columnHeight / 2,
      ) ||
      obstacleIntersectsSegment(
        obstacle,
        arm1Endpoints[0],
        arm1Endpoints[1],
        arm1Width / 2,
        arm1Endpoints[0].y - arm1Height / 2,
        arm1Endpoints[0].y + arm1Height / 2,
      ) ||
      obstacleIntersectsSegment(
        obstacle,
        arm2Endpoints[0],
        arm2Endpoints[1],
        arm2Width / 2,
        arm2Endpoints[0].y - arm2Height / 2,
        arm2Endpoints[0].y + arm2Height / 2,
      ) ||
      obstacleIntersectsSegment(
        obstacle,
        toolPosition,
        toolPosition,
        0.05,
        toolPosition.y - arm3Length / 2,
        toolPosition.y + arm3Length / 2,
      );

    obstacle.colliding = colliding;
    obstacle.mesh.material.color.setHex(
      colliding ? COLLISION_COLOR : OBSTACLE_COLOR,
    );
    if (colliding) collisionCount++;
  }

  collisionStatus.state =
    obstacles.length === 0
      ? "No obstacles"
      : collisionCount === 0
        ? "Clear"
        : `${collisionCount} obstacle${collisionCount === 1 ? "" : "s"} hit`;

  if (collisionCount > 0 && pathPlayback) {
    holdCurrentJointPose();
    jointSpaceMapState.status = "Playback halted: collision/clearance reached";
  }
}

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

  // 2) Renderer (fixed CSS size)
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(WIDTH, HEIGHT, true); // 'true' also sets CSS size
  document.body.appendChild(renderer.domElement);
  renderer.domElement.addEventListener("pointerdown", onCanvasPointerDown);
  renderer.domElement.addEventListener("pointerup", onCanvasPointerUp);
  renderer.domElement.addEventListener("pointercancel", onCanvasPointerCancel);

  // 3) Scene & camera (no objects—intentionally empty)
  scene = new THREE.Scene();

  hitGroup = new THREE.Group();
  hitGroup.name = "hitMarkers";
  hitGroup.layers.disable(HIT_LAYER);
  mouseRaycaster.layers.set(HIT_LAYER);

  robotRaycaster.layers.set(HIT_LAYER);

  obstacleGroup = new THREE.Group();
  obstacleGroup.name = "obstacles";
  scene.add(obstacleGroup);
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

  groundPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      //map: groundPlaneTexture,
    }),
  );

  const groundPlaneTexture = new THREE.TextureLoader().load(
    "../projects/scara-robot-IK/assets/Prototype_Grid_Gray_04-512x512.png",
    () => {
      groundPlane.material.map = groundPlaneTexture;
      groundPlane.material.needsUpdate = true;
      applyUnitTiling(groundPlane, groundPlaneTexture);
    },
  );

  const ambLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambLight);

  const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
  scene.add(light);

  //draw coordinate cross

  const axes = new THREE.AxesHelper(5);
  scene.add(axes);

  groundPlane.layers.enable(HIT_LAYER);
  scene.add(groundPlane);
  groundPlane.rotation.x = -Math.PI / 2;

  baseColumn = new THREE.Mesh(
    new THREE.CylinderGeometry(0.25, 0.25, columnHeight, 32),
    new THREE.MeshStandardMaterial({ color: 0x8080ff }),
  );

  arm1 = new THREE.Mesh(
    new THREE.BoxGeometry(arm1Width, arm1Height, arm1Length),
    new THREE.MeshStandardMaterial({ color: 0xff8080 }),
  );

  let disk1 = new THREE.Mesh(
    new THREE.CylinderGeometry(arm1Width / 2, arm1Width / 2, arm1Height, 32),
    new THREE.MeshStandardMaterial({ color: 0xff8080 }),
  );

  disk1.position.z = -arm1Length / 2;
  arm1.add(disk1);

  let disk2 = new THREE.Mesh(
    new THREE.CylinderGeometry(arm1Width / 2, arm1Width / 2, arm1Height, 32),
    new THREE.MeshStandardMaterial({ color: 0xff8080 }),
  );

  disk2.position.z = arm1Length / 2;
  arm1.add(disk2);

  arm2 = new THREE.Mesh(
    new THREE.BoxGeometry(arm2Width, arm2Height, arm2Length),
    new THREE.MeshStandardMaterial({ color: 0x80ff80 }),
  );

  let disk3 = new THREE.Mesh(
    new THREE.CylinderGeometry(arm2Width / 2, arm2Width / 2, arm2Height, 32),
    new THREE.MeshStandardMaterial({ color: 0x80ff80 }),
  );

  disk3.position.z = -arm2Length / 2;
  arm2.add(disk3);

  let disk4 = new THREE.Mesh(
    new THREE.CylinderGeometry(arm2Width / 2, arm2Width / 2, arm2Height, 32),
    new THREE.MeshStandardMaterial({ color: 0x80ff80 }),
  );

  disk4.position.z = arm2Length / 2;
  arm2.add(disk4);

  arm3 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 1, 32),
    new THREE.MeshStandardMaterial({ color: 0xffff80 }),
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

  jointMapStart = currentJointMapPoint();
  createJointSpaceMap();
  rebuildJointSpaceMap();
  setupGui(axes, groundPlane);

  // 5) Start loop
  animate();
}

const clock = new THREE.Clock();

let lastTarget = new THREE.Vector3(arm1Length + arm2Length - 0.001, 0, 0); // some reachable default

// Joint state (angle = current rotation, vel = rad/s)
let J1 = { angle: 0, vel: 0 };
let J2 = { angle: 0, vel: 0 };

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
  const dt = Math.min(clock.getDelta(), 0.05);
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

  const pathTarget = getPathPlaybackTarget(dt);
  if (pathTarget) {
    t1 = pathTarget.j1;
    t2 = pathTarget.j2;
  } else if (jointCommand) {
    t1 = jointCommand.j1;
    t2 = jointCommand.j2;
  }

  stepJointPD(
    J1,
    t1,
    dt,
    jointTuning.J1.kp,
    jointTuning.J1.kd,
    jointTuning.J1.maxAcceleration,
    jointTuning.J1.maxVelocity,
  );
  stepJointPD(
    J2,
    t2,
    dt,
    jointTuning.J2.kp,
    jointTuning.J2.kd,
    jointTuning.J2.maxAcceleration,
    jointTuning.J2.maxVelocity,
  );

  pivotJ1.rotation.y = J1.angle;
  pivotJ2.rotation.y = J2.angle;

  updateObstacleCollisions();
  drawJointSpaceMap();
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
  renderer?.domElement.removeEventListener("pointerdown", onCanvasPointerDown);
  renderer?.domElement.removeEventListener("pointerup", onCanvasPointerUp);
  renderer?.domElement.removeEventListener(
    "pointercancel",
    onCanvasPointerCancel,
  );
  jointMapResizeObserver?.disconnect();
  if (jointMapPositionHandler) {
    window.removeEventListener("resize", jointMapPositionHandler);
  }
  jointMapCanvas?.remove();
  gui?.destroy();
  renderer?.dispose?.();
});
